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

function takeScreenshot() {
  chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
      if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          return;
      }
      const time = new Date().toISOString();
      sendToBackend(dataUrl,time);
  });
}

function sendToBackend(dataUrl,time) {
  fetch("http://localhost:5000/screenshots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ screenshot: dataUrl,time: time })
  }).then(response => {
    console.log("Screenshot sent to backend.");
  }).catch(error => {
    console.error("Error sending screenshot:", error);
  });
}

setInterval(takeScreenshot, 60000);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'saveAudio') {
    saveAudio(request.data);
  }
});

function saveAudio(base64data) {
  fetch('http://localhost:5000/audios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ audio: base64data,time: new Date().toISOString() })
  })
  .then(response => response.json())
  .then(data => console.log('Audio saved at:', data.filepath))
  .catch(error => console.error('Error saving audio:', error));
}








