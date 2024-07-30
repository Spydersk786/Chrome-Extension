chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
      sendUrlLog({
          url: tab.url,
          time: new Date().toISOString()
      });
  }
});

function sendUrlLog(log) {
  fetch('http://localhost:5000/urlvisited', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(log)
  }).catch(error => console.error('Error:', error));
}












