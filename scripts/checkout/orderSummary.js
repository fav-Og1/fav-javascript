import {products,} from '../../data/products.js';
import {cart, saveToLocalStorage, cartRemover, dltQuantity, updateDeliveryOption} from '../../data/cart.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; 
import {deliveryOption} from '../../data/delivery.js';

export function renderSummary () {
    headerDisplay();
let cartitemSummary = ''
//cart array showing product array other details like price,name,image will be gotten from the product array in product.js
//using productid to get the full data of items when genertaing the html,so we wont have to write the full content of 
//products array in product.js
cart.forEach( (cartItem) => {
const productId = cartItem.productId;

let matchingProduct;

products.forEach( (product) => {

    if (product.id === productId) {
matchingProduct = product
    }

})
//updating the delivery date to the selected delivery option
const deliveryOptionId = cartItem.deliveryOptionId;

let deliveryoption;

deliveryOption.forEach ( (option) => {
if (option.id === deliveryOptionId ){
deliveryoption = option
}
});

const today = dayjs();
const deliveryDate = today.add(
    deliveryoption.deliveryDay,'days'
);

const dateString = deliveryDate.format('dddd, MMMM D');
 //generating the html using the cart-item-container data from the checkout page
    cartitemSummary += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name} 
            </div>
            <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link js-update-quantity link-primary" 
                data-product-id="${matchingProduct.id}"  >
                Update
                </span>
                <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                <span class="save-quantity-link js-save-quantity-link link-primary"
                data-product-id="${matchingProduct.id}" >Save</span>
                <span class="delete-quantity-link link-primary js-delete-quantity"
            data-product-id="${matchingProduct.id}" >
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
        ${deliverydateHTML(matchingProduct, cartItem)}   
            </div>
        </div>
        </div>
    `
    });

    //deliveryoption generating html
    function deliverydateHTML (matchingProduct, cartItem) {
    let html = ''

    deliveryOption.forEach( (deliveryoption) => {
        const today = dayjs();
        const deliveryDate = today.add(
            deliveryoption.deliveryDay,'days'
        );

        const dateString = deliveryDate.format('dddd, MMMM D');

        const priceString = deliveryoption.pricePercents === 0
        ? 'Free shipping'
        : `$${formatCurrency(deliveryoption.pricePercents)} - `

    const isChecked = deliveryoption.id === cartItem.deliveryOptionId;

        html +=
    `
    <div class="delivery-option"
    data-product-id="${matchingProduct.id}"
    data-delivery-option-id="${deliveryoption.id}">
                <input type="radio"
                class="delivery-option-input js-delivery-option"
            ${isChecked ?  'checked': '' }
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                ${priceString}- Shipping
                </div>
                </div>
    </div>
    `
    })
    return html;
    }

    //updating the checkout page with Html CartitemSummary generated
    document.querySelector('.js-order-summary').innerHTML = cartitemSummary;

    //checkoutpage delete button functionality working and confirmed
    // commit changes in Git after this process
    document.querySelectorAll('.js-delete-quantity')
    .forEach ( (link) => {

    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
    cartRemover(productId);
    //console.log(productId)
    // console.log(cart)

    const container =  document.querySelector(`.js-cart-item-container-${productId}`);
    //console.log(container)
    container.remove();

    dltQuantity();
renderSummary();
    }
    )});


    // function to calculate total cart quantity in the checkoutpage
    // and display quantity on header
    function headerDisplay () {
        let cartQuantity = 0
        
        cart.forEach( (cartItem) => { 
            cartQuantity += cartItem.quantity
            })
        // TcartinLstorage();

        const checkoutHeader = document.querySelector('.js-header-checkout');
    checkoutHeader.innerHTML = `checkout(${cartQuantity} item)`
    //console.log(checkoutHeader.innerHTML);
    }
    //console.log(cartQuantity);
    //console.log(cart)

    //update button onclick feature
    document.querySelectorAll('.js-update-quantity')
    .forEach( (link) => {

    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        //console.log(productId)
        document.querySelector(`.js-cart-item-container-${productId}`)
        .classList.add('is-editing-quantity')
        })  
    });
        // save button onclick feature
    document.querySelectorAll('.js-save-quantity-link')
    .forEach( (link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId
            //console.log(productId);
            document.querySelector(`.js-cart-item-container-${productId}`)
            .classList.remove('is-editing-quantity');
          
            const quantityInput =  document.querySelector(`.js-quantity-input-${productId}`).value
            
            const newQuantity = Number(quantityInput)
            
                updateItemquantity(productId,newQuantity); 
                renderSummary();
        });} )
        // this function collects the value from the input element,after clicking the save link
        //and changes the slected item quantity, then finally updates the totalcart quantity
        
        function updateItemquantity (productId,newQuantity) {
                
        let matchingItem;

            cart.forEach( (cartItem) => {
                if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                }

            });
    
            matchingItem.quantity = newQuantity
        console.log(cart)
            saveToLocalStorage();
    
            }

            document.querySelectorAll('.js-delivery-option')
            .forEach(
                (element) => {
                    element.addEventListener('click', () => {
                    const {productId, deliveryOptionId} = element.dataset;

                    updateDeliveryOption(productId, deliveryOptionId)
                    });
                renderSummary();
                });
            
            }        
    