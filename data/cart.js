export const cart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: "1",
  }, {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", 
    quantity: 1,
    deliveryOptionId: "2",
  }];

export function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  export function getCartQuantity() {
    let totalQuantity = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  }

  export function addToCart(productId) {
    const quantitySelector = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
  
    let matchingItem = null;
    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });
    if (matchingItem) {
      matchingItem.quantity += Number(quantitySelector.value);
    } else {
      cart.push({
        productId: productId,
        quantity: Number(quantitySelector.value),
        deliveryOptionId: "1",
      });
    }
    quantitySelector.value = 1;
    saveCartToLocalStorage();
  }

  export function removeFromCart(productId) {
    const cartItemIndex = cart.findIndex((item) => item.productId === productId);
    if (cartItemIndex !== -1) {
      cart.splice(cartItemIndex, 1);
    }
    saveCartToLocalStorage();
    
  }  

  export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem = null;
    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveCartToLocalStorage();
  }
