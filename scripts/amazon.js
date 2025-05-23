import {getCartQuantity, addToCart } from "../data/cart.js";
import { products, fetchProducts } from "../data/products.js";

//loadProducts(renderProductsGrid);
fetchProducts().then(renderProductsGrid);
function renderProductsGrid() {
let productsHtml = "";

  products.forEach((product) => {
    productsHtml += `
      <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.reviews} reviews
              </div>
            </div>

            <div class="product-price">
              $${product.getPriceDollars()}
            </div>

            <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${
              product.id
            }">
              Add to Cart
            </button>
          </div>`;
  });

  document.querySelector(".js-products-grid").innerHTML = productsHtml;

  function updateCartQuantity() {
    document.querySelector(".js-cart-quantity").innerHTML = getCartQuantity();
  }

  function showAddedToCart(productId) {
    const addedToCart = document.querySelector(`.js-added-to-cart-${productId}`);
    addedToCart.classList.add("added-to-cart-visible");
    if (addedToCart.timeoutId) {
      clearTimeout(addedToCart.timeoutId);
    }
    addedToCart.timeoutId = setTimeout(() => {
      addedToCart.classList.remove("added-to-cart-visible");
      addedToCart.timeoutId = null;
    }, 2000);
  }

  document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
      showAddedToCart(productId);
    });
  });
}