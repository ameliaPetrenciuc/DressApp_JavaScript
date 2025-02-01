import { cart, removeFromCart, updateDeliveryOption } from '../scripts/cart.js';
import { products, getProduct} from '../scripts/luxe-dress-boutique.js';
import { formatCurrency } from '../utils/money.js';
import { deliveryOptions, getDeliveryOption} from '../scripts/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';


export function renderOrderSummary(){
  let cartSummaryHTML = '';

if (cart.length === 0) {
  cartSummaryHTML = '<p>Your cart is empty</p>';
} else {
  cart.forEach((cartItem) => {
    const productName = cartItem.productName;
    const selectedSize=cartItem.size;

    // Găsește produsul corespunzător din lista de produse
    const matchingProduct = getProduct(productName);

    const deliveryOptionName = cartItem.deliveryOptionName;

    const deliveryOption = getDeliveryOption(deliveryOptionName);

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );
    
    if (!matchingProduct) {
      console.error(`Produsul ${cartItem.productName} nu a fost găsit în products.`);
      return;
    }

    const sanitizedProductName = sanitizeClassName(matchingProduct.name);

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${sanitizedProductName}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="./images/${matchingProduct.image}">
          <div class="cart-item-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-size">Size: ${selectedSize}</div>  
            <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
            <div class="product-quantity">
              <span>Quantity: ${cartItem.quantity}</span>
              <span class="update-quantity-link link-primary">Update</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-name="${matchingProduct.name}">
                Delete
              </span>
            </div>
          </div>
          <div class="delivery-options">
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>`;
  });
}

// Afișează HTML-ul generat în pagina de checkout
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

function deliveryOptionsHTML(matchingProduct, cartItem) {
  
  let html = '';
  deliveryOptions.forEach((option) => {
    const today=dayjs();
    const deliveryDate = today.add(
      option.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );
    const priceString = option.priceCents === 0 ? 'FREE' : `$${formatCurrency(option.priceCents)}-`;
    const isChecked = option.name === cartItem.deliveryOptionName;
    
    html += `
      <div class="delivery-option">
        <input type="radio" ${isChecked ? 'checked' : ''} 
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.name}" 
          data-product-name="${matchingProduct.name}"
          data-delivery-option-name="${option.name}">
        <div>
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${priceString} Shipping</div>
        </div>
      </div>`;
  });
  return html;
}

function sanitizeClassName(name) {
  return name.replace(/\s+/g, '_');
}

// Funcționalitatea pentru a elimina produse din coș
document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productName = link.dataset.productName;
    const sanitizedProductName = sanitizeClassName(productName);
    
    removeFromCart(productName);
    
    const container = document.querySelector(`.js-cart-item-container-${sanitizedProductName}`);
    container.remove();

    renderPaymentSummary();
  });
});

document.querySelectorAll('.delivery-option-input')
  .forEach((input) => {
    input.addEventListener('click', () => {
      const productName = input.dataset.productName;
      const deliveryOptionName = input.dataset.deliveryOptionName;
      
      updateDeliveryOption(productName, deliveryOptionName);
      renderOrderSummary(); // Re-randăm pentru a reflecta modificările
      renderPaymentSummary();
    });
  });

}

