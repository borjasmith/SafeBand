// Start scanning when the button is clicked
function startScan() {
  // Check if the browser supports NDEFReader
  if ('NDEFReader' in window) {
    const reader = new NDEFReader();

    // Try to start scanning for NFC tags
    reader.scan().then(() => {
      console.log('NFC scan started');
      
      // Event listener for when an NFC tag is scanned
      reader.addEventListener('reading', event => {
        const tag = event.message;
        const tagContent = tag.records.map(record => record.data).join(', '); // Joining the data if multiple records
        
        // Display the tag content in the input field
        document.getElementById('nfcReader').value = tagContent;

        // Log the NFC scan to the backend
        logNfc(tagContent);
      });
      
    }).catch(error => {
      console.error('Error starting NFC scan:', error);
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
