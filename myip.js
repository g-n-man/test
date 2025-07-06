document.addEventListener("DOMContentLoaded", function() {
  const ipAddressElement = document.getElementById('ip-address');
  const locationElement = document.getElementById('location');
  const mapElement = document.getElementById('map');

  const apiKey = '753b71f59a68fc';  // Replace with your actual IPinfo API key
  const apiUrl = `https://ipinfo.io/json?token=${apiKey}`;

  fetch(apiUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          console.log('IPinfo data:', data); // Log the full response data
          const [lat, lng] = data.loc.split(',');
          ipAddressElement.textContent = `IP Address: ${data.ip}`;
          locationElement.textContent = `Location: ${data.city}, ${data.region}, ${data.country}`;
          initMap(lat, lng);
      })
      .catch(error => {
          console.error('Error fetching IP address and location:', error);
          ipAddressElement.textContent = 'Error fetching IP address';
          locationElement.textContent = 'Error fetching location';
          mapElement.style.display = 'none'; // Hide the map in case of an error
      });
});

function initMap(lat, lng) {
  const map = L.map('map').setView([lat, lng], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([lat, lng]).addTo(map)
      .bindPopup('You are here')
      .openPopup();
}