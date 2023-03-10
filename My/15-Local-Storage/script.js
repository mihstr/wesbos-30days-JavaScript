const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem("items")) || [];
const deleteAll = document.getElementById("delete-all")
const checkAll = document.getElementById("check-all")
const uncheckAll = document.getElementById("uncheck-all")

function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector("[name=item]")).value;
    const item = {
        text: text,
        done: false
    }

    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem("items", JSON.stringify(items));
    this.reset();
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? "checked" : ""} />
                <label for="item${i}">${plate.text}</label>
            </li>
        `;
    }).join("");
}

function toggleDone(e) {
    if(!e.target.matches("input")) return; // skip unless it is input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem("items", JSON.stringify(items));
    populateList(items, itemsList)
}

function deleteItems() {
    items.splice(0, items.length);
    localStorage.removeItem("items");
    populateList(items, itemsList);
}

function checkItems() {
    items.forEach((item, i) => items[i].done = true);
    localStorage.setItem("items", JSON.stringify(items));
    populateList(items, itemsList);
}

function uncheckItems() {
    console.log("uncheck");
    items.forEach((item, i) => items[i].done = false);
    localStorage.setItem("items", JSON.stringify(items));
    populateList(items, itemsList);   
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
deleteAll.addEventListener("click", deleteItems);
checkAll.addEventListener("click", checkItems);
uncheckAll.addEventListener("click", uncheckItems);

populateList(items, itemsList);