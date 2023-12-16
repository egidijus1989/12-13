/////////////////////////////////////////Create html element/////////////////////////////////
let myForm = document.createElement("form");
let myBody = document.querySelector("body");

function createInput(text1, text2) {
  let myInput = document.createElement("input");
  myInput.setAttribute("type", "text");
  myInput.setAttribute("placeholder", text1);
  myInput.classList.add(`${text2}`);
  myForm.appendChild(myInput);
  myBody.appendChild(myForm);
}
function createButton(text1, text2) {
  let myButton = document.createElement("button");
  myButton.setAttribute("type", "button");
  myButton.textContent = text1;
  myButton.classList.add(`${text2}`);
  myForm.appendChild(myButton);
  myBody.appendChild(myForm);
}
createInput("Product Name", "name");
createInput("Product Price", "price");
createInput("Product Quantity", "quantity");
createButton("Add product", "addProductBtn");
createButton("Product quantity", "productQuantityBtn");
createButton("Cheapest product", "cheapestproductBtn");

let productTable = document.createElement("table");
let productTableHead = document.createElement("thead");
let productTableBody = document.createElement("tbody");
productTableBody.classList.add(`tBody`);
function createth(text) {
  let th = document.createElement("th");
  th.textContent = text;
  productTableHead.appendChild(th);
  productTable.appendChild(productTableHead);
  myBody.appendChild(productTable);
}
createth("Product Name");
createth("Product Price");
createth("Product Quantity");
productTable.appendChild(productTableBody);
//////////////////////////////////////////////////////////////////////////////////////////////////
productsArray = [];

function addProductToTable() {
  let tBody = document.querySelector(".tBody");
  tBody.innerHTML = "";
  const productsArray = JSON.parse(localStorage.getItem("productsArray")) || [];
  productsArray.forEach(function (product, index) {
    let row = tBody.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);

    cell1.textContent = product.name;
    cell2.textContent = product.price;
    cell3.textContent = product.quantity;

    let replaceBtn = document.createElement("button");
    replaceBtn.textContent = "Replace";
    replaceBtn.onclick = function () {
      replaceProduct(index);
    };
    cell4.appendChild(replaceBtn);
    let updateBtn = document.createElement("button");
    updateBtn.textContent = "Update";
    updateBtn.onclick = function () {
      updateProduct(index);
    };
    cell5.appendChild(updateBtn);
  });
}

let addProduct = document.querySelector(".addProductBtn");
addProduct.addEventListener("click", () => {
  let productName = document.querySelector(".name").value.trim();
  let productPrice = document.querySelector(".price").value.trim();
  let productQuantity = document.querySelector(".quantity").value.trim();

  let productObject = {
    name: productName,
    price: productPrice,
    quantity: productQuantity,
  };

  productsArray.push(productObject);
  localStorage.setItem("productsArray", JSON.stringify(productsArray));
  addProductToTable();
});

function replaceProduct(index) {
  const productsArray = JSON.parse(localStorage.getItem("productsArray")) || [];
  let buyQuantity = parseInt(prompt("How much your want to buy..."));
  let oldQuantity = parseInt(productsArray[index].quantity);
  productsArray[index].quantity = oldQuantity - buyQuantity;
  localStorage.setItem("productsArray", JSON.stringify(productsArray));
  addProductToTable();
}

function updateProduct(index) {
  const productsArray = JSON.parse(localStorage.getItem("productsArray")) || [];
  let newName = prompt("Enter new product name...");
  let newPrice = prompt("Enter new product price...");
  let newQuantity = prompt("Enter new product quantity...");
  productsArray[index].name = newName;
  productsArray[index].price = newPrice;
  productsArray[index].quantity = newQuantity;
  localStorage.setItem("productsArray", JSON.stringify(productsArray));
  addProductToTable();
}

let cheapestProduct = document.querySelector(".cheapestproductBtn");
cheapestProduct.addEventListener("click", () => {
  let price = document.querySelectorAll("td:nth-child(2)");
  let priceArray = [];
  price.forEach(function (prices) {
    priceArray.push(prices.innerHTML);
  });
  let cheapest = Math.min(...priceArray).toString();
  let rowNumber = priceArray.indexOf(cheapest);
  let name = document.querySelectorAll("td:nth-child(1)");
  namesArray = [];
  name.forEach(function (names) {
    namesArray.push(names.innerHTML);
  });
  let cheapestProductName = namesArray[rowNumber];
  let cheapstProductText = document.createElement("h1");
  cheapstProductText.textContent = `Cheapest product is ${cheapestProductName} with price of ${cheapest}`;
  myBody.appendChild(cheapstProductText);
});

let quantityButton = document.querySelector(".productQuantityBtn");
quantityButton.addEventListener("click", () => {
  let name = document.querySelectorAll("td:nth-child(1)");
  namesArray = [];
  name.forEach(function (names) {
    namesArray.push(names.innerHTML);
  });
  let quantity = document.querySelectorAll("td:nth-child(3)");
  let quantityArray = [];
  quantity.forEach(function (quantities) {
    quantityArray.push(quantities.innerHTML);
  });
  let likuciai = document.createElement("h2");
  for (let i = 0; i < quantityArray.length; i++) {
    let likuciai = document.createElement("h2");
    likuciai.textContent = `Product ${namesArray[i]} currently have ${quantityArray[i]} units in stock`;
    myBody.appendChild(likuciai);
  }
});

addProductToTable();
