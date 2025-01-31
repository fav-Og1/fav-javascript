export let  cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
cart = [{
    productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
    quantity: 1,
    deliveryOptionId: '1'
},
{
    productId:'54e0eccd-8f36-462b-b68a-8182611d9add',
    quantity: 1,
    deliveryOptionId: '2'
}]}


// updates cartitem quantity
let cartQuantity = 0
export function cartItemQuantity (productId) {
     cartQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value)
  
  let  MatchingItem;
  //this code helps to update item quantity in cart and prevent add more of the same item in cart
  cart.forEach((cartItem) => {
       if (productId === cartItem.productId) {
        MatchingItem = cartItem
       }
  });
  
  if (MatchingItem) {
  MatchingItem.quantity += cartQuantity
  } else(
      cart.push(
          {productId: productId,
          quantity : cartQuantity,
          deliveryOptionId: '1'
          }));
  //console.log(cart)
  //when we update cartitem quantity save in localstorage
  saveToLocalStorage();
  //TcartinLstorage();
  }


// function to save in checkoutpage in localstorage
// move to cart.js
 export function saveToLocalStorage (){
    localStorage.setItem('cart', JSON.stringify(cart))
  }
  
  
export function TcartinLstorage (){
    localStorage.setItem('total cart quantity', JSON.stringify(cartQuantity))
  }

  //move this function to cart.js and import to use here,after applying the module feature.
 export function cartRemover(productId){
    
    const newCart = [];
    
    cart.forEach( (cartItem) => {
        if (cartItem.productId !== productId){
    newCart.push(cartItem);
        }
    })
    cart = newCart;
    saveToLocalStorage();
    }

    // function to update cart quantity after deleting an item
// move to cart.js when using module
 export  function dltQuantity () {
   
    
    cart.forEach( (cartItem) => {
    cartQuantity -= cartItem.quantity
    })
    //TcartinLstorage();
    }

export function updateDeliveryOption (productId,deliveryOptionId) {
    let  MatchingItem;

  cart.forEach((cartItem) => {
       if (productId === cartItem.productId) {
        MatchingItem = cartItem
       }
  });

  MatchingItem.deliveryOptionId = deliveryOptionId;

  saveToLocalStorage();
}