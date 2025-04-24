const buyers = [
  { id: 1, name: 'Rahim', location: 'Dhaka', crop: 'Rice', contact: '01734983498' },
  { id: 2, name: 'Karim', location: 'Khulna', crop: 'Potato', contact: '01933322380' },
];

const sellers = [
  { id: 1, name: 'Miyad', location: 'Chittagong', crop: 'Sugarcane', contact: '01945322178' },
  { id: 2, name: 'Kamal', location: 'Barisal', crop: 'Corn', contact: '01722137688' },
];

function renderBuyers() {
  const buyerTable = document.querySelector('#buyerTable tbody');
  buyerTable.innerHTML = '';
  buyers.forEach((buyer, index) => {
    const row = `<tr>
      <td>${buyer.id}</td>
      <td>${buyer.name}</td>
      <td>${buyer.location}</td>
      <td>${buyer.crop}</td>
      <td>${buyer.contact}</td>
      <td>
        <button class="btn btn-edit" onclick="editBuyer(${index})">Edit</button>
        <button class="btn btn-delete" onclick="deleteBuyer(${index})">Delete</button>
      </td>
    </tr>`;
    buyerTable.innerHTML += row;
  });
}

function renderSellers() {
  const sellerTable = document.querySelector('#sellerTable tbody');
  sellerTable.innerHTML = '';
  sellers.forEach((seller, index) => {
    const row = `<tr>
      <td>${seller.id}</td>
      <td>${seller.name}</td>
      <td>${seller.location}</td>
      <td>${seller.crop}</td>
      <td>${seller.contact}</td>
      <td>
        <button class="btn btn-edit" onclick="editSeller(${index})">Edit</button>
        <button class="btn btn-delete" onclick="deleteSeller(${index})">Delete</button>
      </td>
    </tr>`;
    sellerTable.innerHTML += row;
  });
}

function addBuyer() {
  const id = document.getElementById('buyerId').value;
  const name = document.getElementById('buyerName').value;
  const location = document.getElementById('buyerLocation').value;
  const crop = document.getElementById('buyerCrop').value;
  const contact = document.getElementById('buyerContact').value;

  if (!id || !name || !location || !crop || !contact) {
    alert("Please fill in all buyer fields.");
    return;
  }

  buyers.push({ id, name, location, crop, contact });
  renderBuyers();
  document.getElementById('buyerForm').reset();
}

function addSeller() {
  const id = document.getElementById('sellerId').value;
  const name = document.getElementById('sellerName').value;
  const location = document.getElementById('sellerLocation').value;
  const crop = document.getElementById('sellerCrop').value;
  const contact = document.getElementById('sellerContact').value;

  if (!id || !name || !location || !crop || !contact) {
    alert("Please fill in all seller fields.");
    return;
  }

  sellers.push({ id, name, location, crop, contact });
  renderSellers();
  document.getElementById('sellerForm').reset();
}

function editBuyer(index) {
  const buyer = buyers[index];
  buyer.id = prompt('Edit ID', buyer.id);
  buyer.name = prompt('Edit Name', buyer.name);
  buyer.location = prompt('Edit Location', buyer.location);
  buyer.crop = prompt('Edit Crop', buyer.crop);
  buyer.contact = prompt('Edit Contact', buyer.contact);
  renderBuyers();
}

function deleteBuyer(index) {
  buyers.splice(index, 1);
  renderBuyers();
}

function editSeller(index) {
  const seller = sellers[index];
  seller.id = prompt('Edit ID', seller.id);
  seller.name = prompt('Edit Name', seller.name);
  seller.location = prompt('Edit Location', seller.location);
  seller.crop = prompt('Edit Crop', seller.crop);
  seller.contact = prompt('Edit Contact', seller.contact);
  renderSellers();
}

function deleteSeller(index) {
  sellers.splice(index, 1);
  renderSellers();
}

renderBuyers();
renderSellers();
