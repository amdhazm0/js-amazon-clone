import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";

loadProducts(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});

