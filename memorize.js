chrome.downloads.onCreated.addListener((downloadItem) => {
  let key = dateFormat.format(new Date(), 'yyyyMMddhhmmss');
  chrome.storage.local.set({key: downloadItem.url});
});