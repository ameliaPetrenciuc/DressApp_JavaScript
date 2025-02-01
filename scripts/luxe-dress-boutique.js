import {cart, addToCart} from './cart.js'
import { formatCurrency } from '../utils/money.js';

export function getProduct(productName){
  const matchingProduct = products.find(product => product.name === productName);
  return matchingProduct;
}

export const products= [{
  image:'rochie1.jpg',
  name:'Adda Dress',
  rating: {
    stars: 4.5,
    count:87
  },
  priceCents:10000
},{
  image:'rochie2.jpg',
  name:'Fasina Dress',
  rating: {
    stars: 4.0,
    count:127
  },
  priceCents:9095
}];

const searchInput=document.querySelector('.js-search-bar');

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search-bar');
  
  // Verificăm dacă bara de căutare există înainte de a atașa event listener-ul
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = searchInput.value.toLowerCase();
      filterProducts(searchTerm);
    });
  }
});
let productsHTML='';

products.forEach((product)=>{
  productsHTML+=`
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="./images/${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="./images/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
             $${(formatCurrency(product.priceCents))}
          </div>
 
          <div class="product-quantity-container">
            <select>
              <option selected value="3XS">3XS</option>
              <option value="2XS">2XS</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="2XL">2XL</option>
              <option value="3XL">3XL</option>
              <option value="4XL">4XL</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="./images/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-name="${product.name}">
            Add to Cart
          </button>
        </div>`;
});

document.addEventListener('DOMContentLoaded', () => {
  const productsGrid = document.querySelector('.js-products-grid');
  
  if (productsGrid) {
    productsGrid.innerHTML = productsHTML;

    document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
      button.addEventListener('click',()=>{
        const productName=button.dataset.productName;

        const productContainer=button.closest('.product-container');
        const selectedSize=productContainer.querySelector('select').value;
        addToCart(productName, selectedSize);
        console.log("Adăugat în coș:", cart);  // Verifică starea coșului după adăugarea produsului
console.log("Mărime selectată:", selectedSize);  // Verifică mărimea preluată

        savedCartToLocalStorage();
        updateCartQuantity();
      });
    });
    updateCartQuantity();
  }
});

function updateCartQuantity(){
  let cartQuantity=0;

    cart.forEach((item)=>{
      cartQuantity+=item.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
}

function savedCartToLocalStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

function filterProducts(searchTerm){
  const productContainers = document.querySelectorAll('.product-container');

  productContainers.forEach(container => {
    // Preluăm numele produsului din container
    const productName = container.querySelector('.product-name').innerText.toLowerCase();

    // Verificăm dacă numele produsului conține textul căutat
    if (productName.includes(searchTerm)) {
      container.style.display = 'block'; // Afișăm produsul dacă se potrivește
    } else {
      container.style.display = 'none'; // Ascundem produsul dacă nu se potrivește
    }
  });
}
export function loadCartFromLocalStorage(){
  const savedCart=JSON.parse(localStorage.getItem('cart') ||[]);
  return savedCart;
}




