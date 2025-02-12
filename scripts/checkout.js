import { renderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import { loadProducts,loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js';
//import '../data/backend-practice.js';


async function loadPage(){
    try{
        await loadProductsFetch();

        await  new Promise ( (resolve)=> {
            loadCart(()=> {
                resolve();
            })
        });
    
    } catch (error){
console.log('pls try again later')
    }
   
    renderSummary();
    renderPaymentSummary();  

    
}

loadPage();

/*
Promise.all([
    loadProductsFetch(),
    new Promise ( (resolve)=> {
        loadCart(()=> {
            resolve();
        })
    })
]).then( () =>{
    return new Promise (() =>{
        renderSummary();
        renderPaymentSummary();
    })
});   
*/


/*
new Promise( (resolve)=>{
    loadProducts(()=> {
        
        resolve('value1');
        
    })
}).then( (value)=>{
    console.log(value);
    return new Promise ( (resolve)=> {
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

*/

/*
loadProducts ( ()=>{
    loadCart( ()=> {
        
    });
    
});
*/