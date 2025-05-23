function Cart(localstorageKey) {
    const cart = {
        cartItems: undefined,
        loadFromStorage() {
            this.cartItems = localStorage.getItem(localstorageKey)
                ? JSON.parse(localStorage.getItem(localstorageKey))
                : [{
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 2,
            deliveryOptionId: "1",
          }, {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", 
            quantity: 1,
            deliveryOptionId: "2",
          }];
        },
    
        saveCartToLocalStorage() {
            localStorage.setItem(localstorageKey, JSON.stringify(this.cartItems));
          },
    
        getCartQuantity() {
            let totalQuantity = 0;
            this.cartItems.forEach((item) => {
                totalQuantity += item.quantity;
            });
            return totalQuantity;
        },
    
        addToCart(productId) {
            const quantitySelector = document.querySelector(
              `.js-quantity-selector-${productId}`
            );
          
            let matchingItem = null;
            this.cartItems.forEach((item) => {
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
            this.saveCartToLocalStorage();
        },
    
        removeFromCart(productId) {
            const cartItemIndex = this.cartItems.findIndex((item) => item.productId === productId);
            if (cartItemIndex !== -1) {
              this.cartItems.splice(cartItemIndex, 1);
            }
            this.saveCartToLocalStorage();
            
        },
          
        updateDeliveryOption(productId, deliveryOptionId) {
            let matchingItem = null;
            this.cartItems.forEach((item) => {
              if (productId === item.productId) {
                matchingItem = item;
              }
            });
            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveCartToLocalStorage();
        }
    
    
    }
    return cart;
}

const myCart = Cart('cart-oop');
myCart.loadFromStorage();
const myCart2 = Cart('cart2-oop');
myCart2.loadFromStorage();
myCart.loadFromStorage();
console.log(myCart);

console.log('myCart quantity');
console.log(myCart.getCartQuantity());
console.log('myCart after removeFromCart');
myCart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
console.log(myCart.getCartQuantity());
console.log('myCart2 quantity');
console.log(myCart2.getCartQuantity());




  

  

  

  
