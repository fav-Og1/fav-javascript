function Cart (localStorageKey){

    const cart = {
        cartItems : undefined,
        loadfromStorage(){
    
            this.cartItems = JSON.parse(localStorage.getItem('localStorageKey'));
           
           if (!this.cartItems) {
           this.cartItems = [{
               productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
               quantity: 1,
               deliveryOptionId: '1'
           },
           {
               productId:'54e0eccd-8f36-462b-b68a-8182611d9add',
               quantity: 1,
               deliveryOptionId: '2'
           }]}
           },
           
    // function to save in checkoutpage in localstorage
    // move to cart.js
    saveToLocalStorage (){
        localStorage.setItem('localStorageKey', JSON.stringify(this.cartItems))
      },
    
    // updates cartitem quantity
    
    cartItemQuantity (productId) {
            let cartQuantity = 0
    
            
        
        let  MatchingItem;
        //this code helps to update item quantity in cart and prevent add more of the same item in cart
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                MatchingItem = cartItem
            }
        });
        
        if (MatchingItem) {
        MatchingItem.quantity += 1
        } else(
            this.cartItems.push(
                {productId: productId,
                quantity : cartQuantity,
                deliveryOptionId: '1'
                }));
        //console.log(cart)
        //when we update cartitem quantity save in localstorage
        this.saveToLocalStorage();
        //TcartinLstorage();
        //cartQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value)
        },
    
      //move this function to cart.js and import to use here,after applying the module feature.
    cartRemover(productId){
        
        const newCart = [];
        
        this.cartItems.forEach( (cartItem) => {
            if (cartItem.productId !== productId){
        newCart.push(cartItem);
            }
        })
        this.cartItems = newCart;
        this.saveToLocalStorage();
        },
    
    updateDeliveryOption (productId,deliveryOptionId) {
            let  MatchingItem;
        
          this.cartItems.forEach((cartItem) => {
               if (productId === cartItem.productId) {
                MatchingItem = cartItem
               }
          });
        
          MatchingItem.deliveryOptionId = deliveryOptionId;
        
          this.saveToLocalStorage();
        }
    
    }
   return cart 

}


const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');








cart.loadfromStorage();
 console.log(cart)
businessCart.loadfromStorage();

console.log(businessCart);



  
/*  
export function TcartinLstorage (){
    localStorage.setItem('total cart quantity', JSON.stringify(cartQuantity))
  }

  

    // function to update cart quantity after deleting an item
// move to cart.js when using module
 export  function dltQuantity () {
   
    
    cart.forEach( (cartItem) => {
    cartQuantity -= cartItem.quantity
    })
    //TcartinLstorage();
    }

*/