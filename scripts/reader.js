// Start scanning when the button is clicked
function startScan() {
    // Assuming the browser supports Web NFC
    if ('NFC' in window) {
      const reader = new NFCReader();
      reader.scanTag().then(tag => {
        document.getElementById('nfcReader').value = tag.content;
        logNfc(tag.content);
      }).catch(error => {
        console.error('Error reading NFC tag:', error);
      });
    } else {
      alert('NFC is not supported in your browser.');
    }
  }
  
  // Send NFC log to the backend
  function logNfc(content) {
    fetch('/api/nfc-logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tagContent: content,
        action: 'scanned',
        timestamp: new Date(),
      })
    })
    .then(response => response.json())
    .then(data => console.log('Log saved:', data))
    .catch(error => console.error('Error saving NFC log:', error));
  }
  