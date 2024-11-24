import React from 'react';
import NfcReader from '../components/NfcReader';

const ScanView = () => (
  <div className="page-container">
    <h2>Scan NFC Tag</h2>
    <NfcReader />
  </div>
);

export default ScanView;
