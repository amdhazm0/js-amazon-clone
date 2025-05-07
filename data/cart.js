export const cart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : []; 

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