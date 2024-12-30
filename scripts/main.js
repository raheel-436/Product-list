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
            <button class="btn text-semibold btn-primary">
              <span><i class="fa-solid fa-cart-plus"></i></span>
              Add to Cart
            </button>
            <p class="category">${category}</p>
            <p class="name text-semibold">${name}</p>
            <p class="price text-semibold">$${price.toFixed(2)}</p>
          </div>`;

      productsContainer.innerHTML += productHtml;
    });
  } catch (error) {
    console.error(`Error fetching the products: ${error}`);
  }
}

displayProducts();
