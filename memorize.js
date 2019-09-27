chrome.downloads.onCreated.addListener((downloadItem) => {
  console.log(downloadItem.url);
});