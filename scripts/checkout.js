import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { fetchProducts } from "../data/products.js";


async function loadPage(){
    await fetchProducts();
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage().then(()=> console.log(typeof loadPage));


