const cart = [];

export function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += Number(item.quantity);
    });
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
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