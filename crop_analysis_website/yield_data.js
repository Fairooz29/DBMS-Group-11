document.getElementById('add-row-btn').addEventListener('click', function () {
    const tableBody = document.querySelector('#yield-table tbody');
    const newRow = document.createElement('tr');

    // Create cells for the new row
    newRow.innerHTML = `
        <td><input type="number" placeholder="Year"></td>
        <td><input type="text" placeholder="Crop"></td>
        <td><input type="number" placeholder="Yield (in tons)"></td>
        <td>
            <button class="save-btn">Save</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;

    // Append the new row to the table body
    tableBody.appendChild(newRow);

    // Add functionality to the Save button
    newRow.querySelector('.save-btn').addEventListener('click', function () {
        const year = newRow.cells[0].querySelector('input').value;
        const crop = newRow.cells[1].querySelector('input').value;
        const yieldValue = newRow.cells[2].querySelector('input').value;

        if (year && crop && yieldValue) {
            newRow.cells[0].innerHTML = year;
            newRow.cells[1].innerHTML = crop;
            newRow.cells[2].innerHTML = yieldValue;
            newRow.cells[3].innerHTML = `
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            `;

            // Add functionality to the Edit button
            newRow.querySelector('.edit-btn').addEventListener('click', function () {
                newRow.cells[0].innerHTML = `<input type="number" value="${year}">`;
                newRow.cells[1].innerHTML = `<input type="text" value="${crop}">`;
                newRow.cells[2].innerHTML = `<input type="number" value="${yieldValue}">`;
                newRow.cells[3].innerHTML = `
                    <button class="save-btn">Save</button>
                    <button class="delete-btn">Delete</button>
                `;

                // Reattach Save functionality
                newRow.querySelector('.save-btn').addEventListener('click', function () {
                    const updatedYear = newRow.cells[0].querySelector('input').value;
                    const updatedCrop = newRow.cells[1].querySelector('input').value;
                    const updatedYield = newRow.cells[2].querySelector('input').value;

                    if (updatedYear && updatedCrop && updatedYield) {
                        newRow.cells[0].innerHTML = updatedYear;
                        newRow.cells[1].innerHTML = updatedCrop;
                        newRow.cells[2].innerHTML = updatedYield;
                        newRow.cells[3].innerHTML = `
                            <button class="edit-btn">Edit</button>
                            <button class="delete-btn">Delete</button>
                        `;
                    }
                });
            });

            // Add functionality to the Delete button
            newRow.querySelector('.delete-btn').addEventListener('click', function () {
                newRow.remove();
            });
        }
    });

    // Add functionality to the Delete button
    newRow.querySelector('.delete-btn').addEventListener('click', function () {
        newRow.remove();
    });
});