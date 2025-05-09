import {cart ,removeFromCart ,getCartQuantity, updateDeliveryOption } from "../../data/cart.js";
import {products} from "../../data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions ,getDeliveryOptionById} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";


export function renderOrderSummary() {

function updateLableCount() {
const cartQuantity = getCartQuantity();
const cartQuantityElement = document.querySelector(".js-return-to-home-link");
cartQuantityElement.innerHTML = `${cartQuantity} Items`;
}

updateLableCount();

let cartSummaryHtml = ``;
function renderCartSummary() {
cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let product ;
    products.forEach((item) => {
        if (item.id === productId) {
            product = item;
        }
    });

    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOptionById(deliveryOptionId);
    const toDay = dayjs();
    const deliveryDate = toDay.add(
      deliveryOption.deliveryDays, 'days'
    );
    const dateString = deliveryDate.format('dddd, MMMM D');
    cartSummaryHtml += `
        <div class="cart-item-container js-cart-item-container-${productId}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                    ${product.name}
                </div>
                <div class="product-price">
                  $${(product.priceCents / 100).toFixed(2)} 
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span data-product-id="${product.id}" class="delete-quantity-link link-primary js-delete-link">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionHtml(product, cartItem)}
              </div>
            </div>
          </div>
    `;
    
});
}

function deliveryOptionHtml(product, cartItem) {
  let html = '';
  deliveryOptions.forEach((deliveryOption) => {
    const toDay = dayjs();
    const deliveryDate = toDay.add(
      deliveryOption.deliveryDays, 'days'
    );
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${(deliveryOption.priceCents / 100).toFixed(2)}`;
    const isChecked = cartItem.deliveryOptionId === deliveryOption.id;
    

    

    html += `
    <div class="delivery-option js-delivery-option" data-product-id="${product.id}"
        data-delivery-option-id="${deliveryOption.id}">
                  <input type="radio" 
                    class="delivery-option-input "
                    name="delivery-option-${product.id}"
                    ${isChecked ? 'checked' : ''}>
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      $${priceString} Shipping
                    </div>
                  </div>
                </div>
    `
  });
  return html;
}
renderCartSummary();
document.querySelector(".js-order-summary").innerHTML = cartSummaryHtml;
document.querySelectorAll('.js-delete-link').forEach((deleteLink) => {
    deleteLink.addEventListener('click', () => {
        const productId = deleteLink.dataset.productId;
            removeFromCart(productId);
            updateLableCount();
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();
            renderPaymentSummary();
        });
});

document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click', () => {
    const productId = element.dataset.productId;
    const deliveryOptionId = element.dataset.deliveryOptionId;
    updateDeliveryOption(productId, deliveryOptionId);
    renderOrderSummary();
    renderPaymentSummary();
  });
})
}//renderOrderSummary
