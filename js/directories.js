const buyers = [];

const sellers = [];

function renderBuyers() {
  const buyerTable = document.querySelector('#buyerTable tbody');
  buyerTable.innerHTML = '';
  buyers.forEach((buyer, index) => {
    const row = `<tr>
      <td>${buyer.id}</td>
      <td>${buyer.name}</td>
      <td>${buyer.email}</td>
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
      <td>${seller.thana}</td>
      <td>${seller.zip}</td>
      <td>${seller.city}</td>
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
  const email = document.getElementById('buyerEmail').value;

  if (!id || !name || !email) {
    alert("Please fill in all buyer fields.");
    return;
  }

  buyers.push({ id, name, email });
  renderBuyers();
  document.getElementById('buyerForm').reset();
}

function addSeller() {
  const id = document.getElementById('sellerId').value;
  const name = document.getElementById('sellerName').value;
  const thana = document.getElementById('sellerThana').value;
  const zip = document.getElementById('sellerZip').value;
  const city = document.getElementById('sellerCity').value;
  const contact = document.getElementById('sellerContact').value;

  if (!id || !name || !thana || !zip || !city || !contact) {
    alert("Please fill in all seller fields.");
    return;
  }

  sellers.push({ id, name, thana, zip, city, contact });
  renderSellers();
  document.getElementById('sellerForm').reset();
}

function editBuyer(index) {
  const buyer = buyers[index];
  buyer.id = prompt('Edit ID', buyer.id);
  buyer.name = prompt('Edit Name', buyer.name);
  buyer.email = prompt('Edit Email', buyer.email);
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
  seller.thana = prompt('Edit Thana', seller.thana);
  seller.zip = prompt('Edit Zip', seller.zip);
  seller.city = prompt('Edit City', seller.city);
  seller.contact = prompt('Edit Contact', seller.contact);
  renderSellers();
}

function deleteSeller(index) {
  sellers.splice(index, 1);
  renderSellers();
}

renderBuyers();
renderSellers();
