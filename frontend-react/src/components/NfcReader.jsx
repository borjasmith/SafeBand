import React from 'react';
import axios from 'axios';

const NfcReader = () => {
  const startScan = async () => {
    if ('NDEFReader' in window) {
      try {
        const ndef = new NDEFReader();
        await ndef.scan();
        console.log('Scan started successfully.');

        ndef.onreading = async (event) => {
          const { message } = event;

          message.records.forEach(async (record) => {
            const tagContent = new TextDecoder().decode(record.data);
            console.log('Tag content:', tagContent);

            try {
              await axios.post('/api/log-nfc', {
                nfcData: tagContent,
                action: 'scanned',
                timestamp: new Date().toISOString(),
              });
              console.log('NFC data logged successfully.', tagContent);
            } catch (error) {
              console.error('Error saving NFC log:', error);
            }
          });
        };

        ndef.onreadingerror = () => {
          console.log('Error reading NFC tag.');
        };
      } catch (error) {
        console.log(`Error starting scan: ${error}`);
      }
    } else {
      alert('Web NFC API is not supported in this browser.');
    }
  };

  return <button onClick={startScan}>Start NFC Scan</button>;
};

export default NfcReader;