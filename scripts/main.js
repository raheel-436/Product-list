let cartItemsCount = 0;
let cartItems = [];

const cartSection = document.querySelector(".cart-section");
const cartItemsNumber = document.querySelector(".cart-section h3");
const newOrderBtn = document.querySelector("#new-orderBtn");

async function displayProducts() {
  try {
    const response = await fetch("./scripts/data.json");
    const products = await response.json();

    const productsContainer = document.querySelector(".products");

    products.forEach((product, index) => {
      const { image, name, category, price } = product;

      //product html
      const productHtml = `<div class="product-card">
            <img
              src="${image.desktop}"
              alt="${name}"
              draggable="false"
            />
            <button class="btn text-semibold btn-primary" id="add-btn" data-index="${index}">
              <span><i class="fa-solid fa-cart-plus"></i></span>
              Add to Cart
            </button>
            <p class="category">${category}</p>
            <p class="name text-semibold">${name}</p>
            <p class="price text-semibold">$${price.toFixed(2)}</p>
          </div>`;
      //adding products to DOM
      productsContainer.innerHTML += productHtml;
    });

    //even listener to each of the element in DOM
    const btnElement = document.querySelectorAll("#add-btn");
    btnElement.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        const selectedProdcuts = products[index]; //getting the products details
        addtoCart(selectedProdcuts);
      });
    });
  } catch (error) {
    console.error(`Error fetching the products: ${error}`);
  }
}

function addtoCart(product) {
  const existingItem = cartItems.find((item) => item.name === product.name);

  if (existingItem) {
    alert(`${product.name} is already in the cart!`);
  } else {
    // Add the new item to the cart
    cartItemsCount++;
    cartItems.push(product);
    displayCartItems();
  }
}

function displayCartItems() {
  const cartEmptyHtml = `
    <h3>Your Cart (${cartItemsCount})</h3>
        <div class="items-container">
          <img
            src="./assets/illustration-empty-cart.svg"
            alt=""
            draggable="false"
          />
          <p class="add-items-msg">Your added items will appear here</p>
        </div>`;

  let cartHtml = `<h3>Your Cart (${cartItemsCount})</h3>
        <div class="items-container">`;

  cartItems.forEach((item, index) => {
    cartHtml += `
      <div class="item">
        <div class="item-info">
          <p class="name text-semibold">${item.name}</p>
          <div class="item-price">
            <span class="text-semibold">1x</span>
            <span>@ $${item.price.toFixed(2)}</span>
            <span class="text-semibold">$${item.price.toFixed(2)}</span>
          </div>
        </div>
        <div class="remove-item" data-index="${index}">
          <img src="./assets/icon-remove-item.svg" alt="Remove Item" />
        </div>
      </div>
    `;
  });

  cartHtml += `
    <div class="grand-total">
            <span>Order Total</span>
            <h2>$ ${cartItems
              .reduce((total, item) => total + item.price, 0)
              .toFixed(2)}</h2>
          </div>
          <div class="cart-message">
            <div class="message-img">
              <img src="./assets/icon-carbon-neutral.svg" alt="" />
            </div>
            <p>
              This is a
              <span class="text-semibold">carbon-netural</span> delivery
            </p>
          </div>
          <button id="cart-orderBtn" class="confirm-btn text-semibold">Confirm</button>
        </div>
  `;

  if (cartItemsCount !== 0) {
    cartSection.innerHTML = cartHtml;

    // Adding an event listener to remove items
    const removeBtns = document.querySelectorAll(".remove-item");

    removeBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target
          .closest(".remove-item")
          .getAttribute("data-index");
        removefromCart(index);
      });
    });

    const cartBtn = document.querySelector("#cart-orderBtn");
    const confirmedOrderContainer = document.querySelector(
      ".confirmed-order-container"
    );

    cartBtn.addEventListener("click", () => {
      poplulateConfirmedOrder();
      confirmedOrderContainer.style.display = "grid";
    });

    newOrderBtn.addEventListener("click", () => {
      confirmedOrderContainer.style.display = "none";
      cartItemsCount = 0;
      cartItems = [];
      displayCartItems();
    });
  } else {
    cartSection.innerHTML = cartEmptyHtml;
  }
}

function removefromCart(index) {
  cartItems.splice(index, 1);
  cartItemsCount--;
  displayCartItems();
}

function poplulateConfirmedOrder() {
  const confirmedOrderContainerBody = document.querySelector(
    ".confirmed-order-container .card-body"
  );
  const grandTotal = cartItems.reduce((total, item) => total + item.price, 0);

  let confirmedHtml = "";
  cartItems.forEach((item) => {
    confirmedHtml += `
      <div class="card-item">
            <div class="card-item-img">
              <img src="${item.image.thumbnail}" alt="" />
            </div>
            <div class="card-item-info">
              <p class="name text-semibold">${item.name}</p>
              <div class="card-item-price">
                <span class="text-semibold">1x</span>
                <span>@ $${item.price.toFixed(2)}</span>
              </div>
            </div>
            <span class="text-semibold">$${item.price.toFixed(2)}</span>
          </div>
    `;
  });

  confirmedHtml += `
    <div class="grand-total">
            <span>Order Total</span>
            <h2>$ ${grandTotal.toFixed(2)}</h2>
          </div>
  `;
  confirmedOrderContainerBody.innerHTML = confirmedHtml;
}

displayProducts();
displayCartItems();
