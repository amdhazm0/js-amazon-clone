import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { fetchProducts } from "../data/products.js";


async function loadPage(){
    try{
        await fetchProducts();
    }catch(e){
        console.log("error loading products", e);
    }
    
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage().then(()=> console.log(typeof loadPage));


