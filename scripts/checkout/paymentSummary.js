import { cart ,getCartQuantity} from "../../data/cart.js";
import { getProductById } from "../../data/products.js";
import { getDeliveryOptionById } from "../../data/deliveryOptions.js";

export function renderPaymentSummary() {
    console.log('renderPaymentSummary');
    let totalOrderCents = 0;
    let shippingCents = 0;
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        const product = getProductById(productId);
        totalOrderCents += product.priceCents * cartItem.quantity;
        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOptionById(deliveryOptionId);
        shippingCents += deliveryOption.priceCents;
    });
    console.log(totalOrderCents);
    console.log(shippingCents);
    const totalBeforeTaxCents = totalOrderCents + shippingCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    const totalSummaryHtml = `
<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${getCartQuantity()}):</div>
            <div class="payment-summary-money">$${Number(totalOrderCents / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${Number(shippingCents / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${Number(totalBeforeTaxCents / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${Number(taxCents / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${Number(totalCents / 100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
`;

const paymentSummaryElement = document.querySelector(".js-payment-summary");
paymentSummaryElement.innerHTML = totalSummaryHtml;
}
