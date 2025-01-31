
export const deliveryOption = [{
    id: '1',
    deliveryDay: 7,
    pricePercents: 0
},
{
    id:'2',
    deliveryDay: 3,
    pricePercents : 499
},
{
    id: '3',
    deliveryDay: 1,
    pricePercents: 999
}]


export function getdeliveryPrice (deliveryOptionId) {
    let deliveryOptions;

deliveryOption.forEach ( (option) => {
if (option.id === deliveryOptionId ){ 
deliveryOptions = option
}
});
return deliveryOptions || deliveryOptions[0]
}