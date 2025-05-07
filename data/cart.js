export const cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 1,
},{
    productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
    quantity: 2,
}];


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
      });
    }
    quantitySelector.value = 1;
  }

  export function removeFromCart(productId) {
    const cartItemIndex = cart.findIndex((item) => item.productId === productId);
    if (cartItemIndex !== -1) {
      cart.splice(cartItemIndex, 1);
    }
  }  