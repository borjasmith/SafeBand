// Fetch NFC logs from the backend and display them in the table
window.onload = function() {
    fetch('/api/nfc-logs')
      .then(response => response.json())
      .then(data => {
        const tbody = document.querySelector('table tbody');
        data.logs.forEach(log => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${new Date(log.timestamp).toLocaleString()}</td>
            <td>${log.tagContent}</td>
            <td>${log.action}</td>
          `;
          tbody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching NFC logs:', error);
      });
  };
  