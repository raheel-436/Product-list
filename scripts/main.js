let cartItemsCount = 0;

const cartSection = document.querySelector(".cart-section");
const cartItemsNumber = document.querySelector(".cart-section h3");
const newOrderBtn = document.querySelector("#new-orderBtn");

async function displayProducts() {
  try {
    const response = await fetch("./scripts/data.json");
    const products = await response.json();

    const productsContainer = document.querySelector(".products");

    products.forEach((product) => {
      const { image, name, category, price } = product;

      //product html
      const productHtml = `<div class="product-card">
            <img
              src="${image.desktop}"
              alt="Product Image"
              draggable="false"
            />
            <button class="btn text-semibold btn-primary" id="add-btn">
              <span><i class="fa-solid fa-cart-plus"></i></span>
              Add to Cart
            </button>
            <p class="category">${category}</p>
            <p class="name text-semibold">${name}</p>
            <p class="price text-semibold">$${price.toFixed(2)}</p>
          </div>`;
      //adding products to DOM
      productsContainer.innerHTML += productHtml;

      //even listener to each of the element in DOM
      const btnElement = document.querySelectorAll("#add-btn");
      btnElement.forEach((btn) => {
        btn.addEventListener("click", () => {
          cartItemsCount++;
          console.log(`cart items = ${cartItemsCount}`);
          displayCartItems();
        });
      });
    });
  } catch (error) {
    console.error(`Error fetching the products: ${error}`);
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

  const cartHtml = `<h3>Your Cart (${cartItemsCount})</h3>
        <div class="items-container">
          <div class="item">
            <div class="item-info">
              <p class="name text-semibold">Classic Tiramisu</p>
              <div class="item-price">
                <span class="text-semibold">1x</span>
                <span>@ $5.50</span>
                <span class="text-semibold">$5.50</span>
              </div>
            </div>
            <div class="remove-item">
              <img src="./assets/icon-remove-item.svg" alt="" />
            </div>
          </div>
          <div class="grand-total">
            <span>Order Total</span>
            <h2>$ 45.50</h2>
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
        </div>`;
  if (cartItemsCount != 0) {
    cartSection.innerHTML = cartHtml;

    const cartBtn = document.querySelector("#cart-orderBtn");
    const confirmedOrderContainer = document.querySelector(
      ".confirmed-order-container"
    );

    cartBtn.addEventListener("click", () => {
      confirmedOrderContainer.style.display = "grid";
    });

    newOrderBtn.addEventListener("click", () => {
      confirmedOrderContainer.style.display = "none";
    });
  } else {
    cartSection.innerHTML = cartEmptyHtml;
  }
}

displayProducts();
displayCartItems();
