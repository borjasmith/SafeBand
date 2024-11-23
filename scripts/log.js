// Fetch NFC logs from the backend and display them in the table
window.onload = function() {
  fetch('/api/nfc-logs')
    .then(response => response.json())
    .then(data => {
      const tbody = document.querySelector('table tbody'); // Get the table body where rows will be inserted
      data.logs.forEach(log => {
        const row = document.createElement('tr'); // Create a new row for each log
        row.innerHTML = `
          <td>${new Date(log.timestamp).toLocaleString()}</td>
          <td>${log.tagContent}</td>
          <td>${log.action}</td>
        `;
        tbody.appendChild(row); // Append the row to the table body
      });
    })
    .catch(error => {
      console.error('Error fetching NFC logs:', error); // Log any error that occurs
    });
};
