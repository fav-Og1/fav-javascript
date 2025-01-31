import {cart} from '../../data/cart.js'
import { getdeliveryPrice } from '../../data/delivery.js';
import {getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';

export function renderPaymentSummary(){
    let productPriceCents = 0
    let shippingPriceCents = 0
    let totalQuantity = 0

    
    cart.forEach( (cartItem) => {
      

       const product =  getProduct(cartItem.productId);
       productPriceCents += product.priceCents * cartItem.quantity;

       const deliveryOption = getdeliveryPrice(cartItem.deliveryOptionId);
       shippingPriceCents += deliveryOption.pricePercents;
       totalQuantity += cartItem.quantity
    });

    //console.log(totalQuantity)

   const totalBeforetax = productPriceCents + shippingPriceCents;
   const taxCents = totalBeforetax * 0.1
   const totalCents = totalBeforetax + taxCents

   

   //console.log(totalCents);

   const paymentSummaryhtml =
   `
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforetax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
    </button>     
   `

   document.querySelector('.js-payment-summary')
   .innerHTML = paymentSummaryhtml
}