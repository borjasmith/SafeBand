async function startWrite() {
    if ('NDEFReader' in window) {
      const dataToWrite = document.getElementById('nfcData').value;
  
      if (!dataToWrite) {
        alert("Please enter some data to write.");
        return;
      }
  
      try {
        const ndef = new NDEFReader();
  
        // Start the scan to prepare the tag for writing
        await ndef.scan();
        console.log("Scan started successfully. Tap an NFC tag to write.");
  
        alert("Tap an NFC tag to write the data.");
  
        // Write to the NFC tag when a tag is detected
        await ndef.write({
          records: [
            {
              recordType: "text",
              data: dataToWrite,
            },
          ],
        });
  
        console.log("Data written successfully to the NFC tag.");
        alert("Data written successfully!");
  
      } catch (error) {
        console.log("An error occurred while writing to the NFC tag:", error);
        alert("Failed to write to the tag. Ensure it's writable and try again.");
      }
    } else {
      alert('Web NFC API is not supported in this browser.');
    }
  }
  