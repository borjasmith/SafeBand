async function startScan() {
  if ('NDEFReader' in window) {
    try {
      const ndef = new NDEFReader();
      
      // Start scanning for NFC tags
      await ndef.scan();
      console.log("Scan started successfully.");
      
      // Handling tag reading event
      ndef.onreading = (event) => {
        console.log("NDEF message read.");
        const { message } = event;

        // Check if the tag contains NDEF records
        if (message.records.length === 0) {
          console.log("This tag contains no readable NDEF data.");
        } else {
          // Loop through each NDEF record and log its content
          message.records.forEach(record => {
            const tagContent = new TextDecoder().decode(record.data);
            console.log('Tag content:', tagContent);

            // Call the logNfc function with the tag content
            logNfc(tagContent);
          });
        }
      };

      // Handling reading error
      ndef.onreadingerror = (event) => {
        console.log("Error! Cannot read data from the NFC tag. Try a different one?");
      };
      
    } catch (error) {
      console.log(`Error! Scan failed to start: ${error}.`);
    }
  } else {
    alert('Web NFC API is not supported in this browser.');
  }
}




// Send NFC log to the backend
// function logNfc(content) {
//   fetch('/api/log-nfc', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       nfcData: content,
//       action: 'scanned',
//       timestamp: new Date(),
//     }),
//   })
//     .then(response => {
//       console.log('Raw response:', response);
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       // Check Content-Type before parsing
//       const contentType = response.headers.get('Content-Type') || '';
//       if (contentType.includes('application/json')) {
//         return response.json(); // Parse JSON if Content-Type is correct
//       } else {
//         throw new Error('Response is not JSON.');
//       }
//     })
//     .then(data => console.log('Log saved:', data))
//     .catch(error => console.error('Error saving NFC log:', error));
// }

function logNfc(nfcData) {
  fetch('/api/log-nfc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nfcData,
      action: 'scanned',
      timestamp: new Date().toISOString(),
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Read the response as text
      return response.text();
    })
    .then(message => console.log('Log saved:', message))
    .catch(error => console.error('Error saving NFC log:', error));
}
