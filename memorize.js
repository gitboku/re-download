const MAX_NUM_LIST_ITEM = 30;

chrome.downloads.onCreated.addListener((downloadItem) => {
  // 保存数が限界になったら古い順に削除していく
  chrome.storage.local.get(null, removeFirstStorageItemIfNecessary);

  let key = dateFormat.format(new Date(), 'yyyyMMddhhmmss');
  chrome.storage.local.set({key: downloadItem.url});
});

const removeFirstStorageItemIfNecessary = (storageItems) => {
  if (storageItems.length >= MAX_NUM_LIST_ITEM) {
    let firstKey = Object.keys(storageItems)[0];
    chrome.storage.local.remove(firstKey);
  }
}