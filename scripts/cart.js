export let cart=JSON.parse(localStorage.getItem('cart')) || [];


if(cart===0){
  cart=[{
    productName:'Adda Dress',
    size: 'S',
    quantity:2,
    deliveryOptionName:'1'
  }, {
    productName:'Fasina Dress',
    size: 'XS',
    quantity:1,
    deliveryOptionName:'2'
  }];  
}

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
  

}

export function addToCart(productName, selectedSize){
  let matchingItem;

    cart.forEach((item)=>{
      if(productName===item.productName){
        matchingItem=item;
      }
    });

    if(matchingItem){
      matchingItem.quantity+=1;
    }else{
      cart.push({
        productName: productName,
        quantity:1,
        size: selectedSize,
        deliveryOptionName:'1'
      });
    }
    saveToStorage();
}

export function removeFromCart(productName){
  const newCart=[];

  cart.forEach((cartItem)=>{
    if(cartItem.productName!==productName){
      newCart.push(cartItem);
    }
  });
  cart=newCart;
  saveToStorage();
}

export function updateDeliveryOption(productName, deliveryOptionName) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productName=== cartItem.productName) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionName = deliveryOptionName;

  saveToStorage();
}