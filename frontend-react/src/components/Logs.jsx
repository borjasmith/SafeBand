import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Logs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
        const response = await axios.get(`${backendUrl}/api/get-logs`);
        setLogs(response.data.logs);
        console.log(response.data.logs)
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Tag Content</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, index) => (
          <tr key={index}>
            <td>{new Date(log.timestamp).toLocaleString()}</td>
            <td>{log.tagContent}</td>
            <td>{log.action}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Logs;
