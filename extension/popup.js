console.log('popup running') 

let mediaRecorder;
let audioChunks = [];
const recordingDuration = 10 * 1000; // 10 seconds
const intervalDuration = 10 * 1000; // 10 seconds

// Start the automatic recording process
startAutomaticRecording();

function startAutomaticRecording() {
  console.log('Starting automatic recording loop');
  // Start recording immediately and set it to repeat every 20 seconds (10 sec recording + 10 sec interval)
  recordAudio();
  setInterval(() => {
    recordAudio();
  }, recordingDuration + intervalDuration);
}

// Function to start recording
async function recordAudio() {
  try {
    console.log('Requesting microphone access');
    // Request access to the microphone
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = event => {
      audioChunks.push(event.data);
    };

    mediaRecorder.start();
    console.log('Recording started');

    // Stop recording after `recordingDuration`
    setTimeout(() => {
      stopRecording();
    }, recordingDuration);

  } catch (error) {
    if (error.name === 'NotAllowedError') {
      alert('Microphone access was denied. Please allow access to continue.');
    } else if (error.name === 'NotFoundError') {
      alert('No microphone was found. Please connect a microphone and try again.');
    } else {
      console.error('Error accessing microphone:', error);
    }
  }
}

// Function to stop recording
function stopRecording() {
  if (mediaRecorder) {
    mediaRecorder.stop();
    mediaRecorder.onstop = async function() {
      console.log('Recording stopped, processing audio data');
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      audioChunks = []; // Clear the audio chunks for the next recording

      // Convert blob to base64 and send it to the backend
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = function() {
        const base64data = reader.result;
        console.log('Audio data ready to be sent to backend');
        sendToBackend(base64data); // Call the function to send data to backend
      };
    };
  }
}

// Function to send the recorded audio data to the backend
function sendToBackend(base64data) {
  console.log('Sending audio data to backend');
  chrome.runtime.sendMessage({ action: 'saveAudio', data: base64data });
}
