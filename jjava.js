let currentCategory = "";
let editIndex = null;

// Open Modal
function openModal(category, index = null) {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("currentCategory").value = category;
    document.getElementById("editIndex").value = index;
    document.getElementById("modal-title").innerText = index === null ? "Add Details" : "Edit Details";

    if (index !== null) {
        let list = document.getElementById(${category}-list).children[index];
        let [amount, description] = list.innerText.split(" - ");
        document.getElementById("amount").value = amount;
        document.getElementById("description").value = description;
    } else {
        document.getElementById("amount").value = "";
        document.getElementById("description").value = "";
    }
}

// Close Modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Save Details
function saveDetails() {
    let category = document.getElementById("currentCategory").value;
    let amount = document.getElementById("amount").value;
    let description = document.getElementById("description").value;
    let index = document.getElementById("editIndex").value;
    let list = document.getElementById(${category}-list);

    if (amount.trim() === "" || description.trim() === "") {
        alert("Please enter all details.");
        return;
    }

    if (index === "" || index === null) {
        // Adding a new item
        let li = document.createElement("li");
        li.innerHTML = `${amount} - ${description} 
            <button onclick="editItem('${category}', this)">Edit</button>
            <button onclick="deleteItem(this)">Delete</button>`;
        list.appendChild(li);
    } else {
        // Editing an existing item
        let li = list.children[index];
        li.innerHTML = `${amount} - ${description} 
            <button onclick="editItem('${category}', this)">Edit</button>
            <button onclick="deleteItem(this)">Delete</button>`;
    }

    closeModal();
}

// Edit Item
function editItem(category, btn) {
    let index = Array.from(btn.parentNode.parentNode.children).indexOf(btn.parentNode);
    openModal(category, index);
}

// Delete Item
function deleteItem(btn) {
    btn.parentNode.remove();
}