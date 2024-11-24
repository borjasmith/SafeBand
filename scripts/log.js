// Fetch NFC logs from the backend and display them in the table
window.onload = function() {

  fetch('/api/get-logs', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    console.log('Response:', response)
    if (!response.ok) { 
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = ''; // Clear the table before updating
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
  .catch(error => console.error('Error fetching NFC logs:', error));

};
