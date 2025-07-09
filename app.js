const parkingLot = [];
const parkingLotContainer = document.getElementById('parking-lot');
const parkCarButton = document.getElementById('park-car-button');
const removeCarButton = document.getElementById('remove-car-button');
const lotStatusButton = document.getElementById('lot-status-button');
const adminLoginButton = document.getElementById('admin-login-button');

function saveToLocalStorage() {
  localStorage.setItem('parkingLot', JSON.stringify(parkingLot));
}

function loadFromLocalStorage() {
  const stored = localStorage.getItem('parkingLot');
  if (stored) {
    const parsed = JSON.parse(stored);
    for (let i = 0; i < parsed.length; i++) {
      parkingLot[i] = parsed[i];
    }
  }
}

function initializeParkingLot() {
  for (let i = 0; i < 10; i++) {
    parkingLot.push({ carId: -1, carDetails: '', occupied: false });
  }
  loadFromLocalStorage();
  displayParkingLot();
}

function parkCar() {
  const carId = prompt('Enter car ID (letters & numbers allowed):');
  if (!carId || !/^[a-zA-Z0-9]+$/.test(carId)) {
    alert('Invalid Car ID! Please enter only letters and numbers (no spaces or symbols).');
    return;
  }

  const carColor = prompt('Enter car color:');
  if (!carColor) {
    alert('Car color is required.');
    return;
  }

  const spaceNumber = parkCarInLot(carId, carColor); // now only color
  if (spaceNumber === -1) {
    alert('Parking lot is full!');
  } else {
    alert(`Car parked in space ${spaceNumber}`);
  }
}



function parkCarInLot(carId, carDetails) {
  for (let i = 0; i < parkingLot.length; i++) {
    if (!parkingLot[i].occupied) {
      parkingLot[i].carId = carId;
      parkingLot[i].carDetails = carDetails;
      parkingLot[i].occupied = true;
      saveToLocalStorage();
      displayParkingLot();
      return i;
    }
  }
  return -1;
}

function removeCar() {
  const spaceNumber = prompt('Enter space number to remove car:');
  if (spaceNumber !== null) {
    if (removeCarFromLot(parseInt(spaceNumber))) {
      alert(`Car removed from space ${spaceNumber}`);
    } else {
      alert('Invalid space number or space is already empty!');
    }
  }
}

function removeCarFromLot(spaceNumber) {
  if (spaceNumber >= 0 && spaceNumber < parkingLot.length && parkingLot[spaceNumber].occupied) {
    parkingLot[spaceNumber].carId = -1;
    parkingLot[spaceNumber].carDetails = '';
    parkingLot[spaceNumber].occupied = false;
    saveToLocalStorage();
    displayParkingLot();
    return true;
  }
  return false;
}

function displayParkingLot() {
  parkingLotContainer.innerHTML = '';
  for (let i = 0; i < parkingLot.length; i++) {
    const space = document.createElement('div');
    space.classList.add('parking-space');
    space.classList.add(parkingLot[i].occupied ? 'occupied' : 'empty');

    if (parkingLot[i].occupied) {
      space.innerHTML = `
        <div>Space ${i}</div>
        <div>ID: ${parkingLot[i].carId}</div>
        <div>${parkingLot[i].carDetails}</div>`;
    } else {
      space.innerHTML = `<div>Space ${i}</div><div>Empty</div>`;
    }

    parkingLotContainer.appendChild(space);
  }
}

function lotStatus() {
  let message = 'Current Parking Lot Status:\n';
  for (let i = 0; i < parkingLot.length; i++) {
    message += `Space ${i}: ${parkingLot[i].occupied ? parkingLot[i].carDetails : 'Empty'}\n`;
  }
  alert(message);
}

function adminLogin() {
  const adminPassword = prompt('Enter admin password:');
  if (adminPassword === 'admin123') {
    alert('Admin login successful!');
    lotStatus();
  } else {
    alert('Invalid password!');
  }
}

// Initial setup
initializeParkingLot();

// Button event listeners
parkCarButton.addEventListener('click', parkCar);
removeCarButton.addEventListener('click', removeCar);
lotStatusButton.addEventListener('click', lotStatus);
adminLoginButton.addEventListener('click', adminLogin);
