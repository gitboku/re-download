const MAX_NUM_LIST_ITEM = 30;

const DOWNLOADITEM_STATES = {
  in_progress: 'in_progress',
  interrupted: 'interrupted',
  complete: 'complete'
}

let myDownloadItem = undefined

chrome.downloads.onCreated.addListener((downloadItem) => {
  myDownloadItem = downloadItem
})

chrome.downloads.onChanged.addListener((downloadDelta) => {
  // Sample of downloadDelta
  // {
  //   "endTime": {
  //     "current": "2019-10-26T04:36:57.568Z"
  //   },
  //   "id": 82,
  //   "state": {
  //     "current": "complete",
  //     "previous": "in_progress"
  //   }
  // }
  let nowState = downloadDelta.state
  if (nowState && nowState.current == DOWNLOADITEM_STATES.complete) {
    // 保存数が限界になったら古い順に削除していく
    chrome.storage.local.get(null, (items) => removeFirstStorageItemIfNecessary(items));
  
    let storageKey = Date.now()
    chrome.storage.local.set({[storageKey]: myDownloadItem.url});
    myDownloadItem = undefined
  }
});

const removeFirstStorageItemIfNecessary = (storageItems) => {
  if (Object.keys(storageItems).length >= MAX_NUM_LIST_ITEM) {
    let firstKey = Object.keys(storageItems)[0];
    chrome.storage.local.remove(firstKey);
  }
}