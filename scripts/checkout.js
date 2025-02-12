import { renderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js';
//import '../data/backend-practice.js';


new Promise( (resolve)=>{
    loadProducts(()=> {
        
        resolve();
        
    })
}).then( (resolve)=>{
    return new Promise ( ()=> {
        loadCart(()=> {
            resolve();
        })
    });
}).then( () =>{
    return new Promise (() =>{
        renderSummary();
        renderPaymentSummary();
    })
});



/*
loadProducts ( ()=>{
    loadCart( ()=> {
        
    });
    
});
*/