// Redirect to login if the user is not registered
if (!localStorage.getItem("currentUser")) {
  window.location.href = "./login.html";
}

// Fetch and render products on the home page
const home = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    data.forEach((item) => createProduct(item));
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Create a product card and append it to the DOM
function createProduct(product) {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product", "card");

  const imgDiv = document.createElement("div");
  imgDiv.classList.add("card-image-container");
  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.title;
  imgDiv.appendChild(img);

  const titleDiv = document.createElement("p");
  titleDiv.classList.add("card-title");
  titleDiv.textContent = product.title;

  const descDiv = document.createElement("p");
  descDiv.classList.add("card-des");
  descDiv.textContent = product.description;

  const footerDiv = document.createElement("div");
  footerDiv.classList.add("card-footer");

  const priceDiv = document.createElement("div");
  priceDiv.classList.add("price");
  priceDiv.innerHTML = `<span>$</span>${product.price}`;

  const btn = document.createElement("button");
  btn.innerHTML = `<i class="fa-solid fa-cart-plus"></i>`;
  btn.classList.add("card-btn");
  btn.addEventListener("click", () => addToCart(product));

  footerDiv.appendChild(priceDiv);
  footerDiv.appendChild(btn);

  productDiv.appendChild(imgDiv);
  productDiv.appendChild(titleDiv);
  productDiv.appendChild(descDiv);
  productDiv.appendChild(footerDiv);

  document.getElementById("products").appendChild(productDiv);
}

// Render the cart items from localStorage
function cart() {
  const products = JSON.parse(localStorage.getItem("cart")) || [];
  products.forEach((item) => createCartItem(item));
}

// Add a product to the cart and localStorage
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  createCartItem(product);
  updateTotalPrice();
  alert("Product added to cart");
}

// Update the cart UI with items from localStorage
function updateCart() {
  const products = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsHTML = products.map((item) => createCartItem(item));

  updateTotalPrice();
}

// Create a cart item element
function createCartItem(item) {
  const productHTML = `
    <div class="card mb-3" style="max-width: 540px;">
      <h2 class="delete-item" id="${item.id}">x</h2>
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${item.image}" class="img-fluid rounded-start" alt="${item.title}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <div class="card-text">$<span>${item.price}</span></div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.getElementById("cart-body").innerHTML += productHTML;
}

// Update the total price displayed in the cart
function updateTotalPrice() {
  const products = JSON.parse(localStorage.getItem("cart")) || [];
  const total = products.reduce((sum, item) => sum + item.price, 0);
  document.querySelector("#total-price span").textContent = total.toFixed(2);
}
//remove item from cart
function removeItemFromCart(item) {
console.log(typeof item.id)
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const updatedCart = cart.filter((product) => product.id!== +item.id);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  // updateCart();
  alert("Product removed from cart");
}
// Initialize the application
document.addEventListener("DOMContentLoaded", () => {

  home();
  cart();
  updateTotalPrice();
  document.querySelectorAll(".delete-item").forEach((item) => {
    item.addEventListener("click", () =>removeItemFromCart(item));
  })
  

});
