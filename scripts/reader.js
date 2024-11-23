async function startScan() {
  if ('NDEFReader' in window) {
    try {
      const reader = new NDEFReader();
      await reader.scan();  // Start the scan

      console.log("LEYENDO")

      reader.onreading = (event) => {
        const { message } = event;
        if (message.records.length === 0) {
          console.log("This tag contains no readable NDEF data.");
        } else {
          message.records.forEach(record => {
            const tagContent = new TextDecoder().decode(record.data);
            console.log('Tag content:', tagContent);
          });
        }
      };

      reader.onerror = () => {
        console.log("This tag is not supported., hora de harcodear");
      };

    } catch (error) {
      console.log("An error occurred while reading the NFC tag:", error);
    }
  } else {
    alert('Web NFC API is not supported in this browser.');
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
