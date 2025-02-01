import { cart } from './cart.js';
import { getProduct} from './luxe-dress-boutique.js';
import { deliveryOptions, getDeliveryOption} from './deliveryOptions.js';
import { formatCurrency } from '../../utils/money.js';
//import dayjs from 'dayjs';

function renderOrders(){
  const ordersGrid=document.querySelector('.orders-grid');
  let orderHTML='';

  cart.forEach((cartItem)=>{
    const productName = cartItem.productName;
    const selectedSize=cartItem.size;

    // Găsește produsul corespunzător din lista de produse
    const matchingProduct = getProduct(productName);
    const deliveryOptionName = cartItem.deliveryOptionName;
    const deliveryOption=getDeliveryOption(deliveryOptionName);
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('MMMM D, YYYY');

    orderHTML+=
    `<div class="order-container">

        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${today.format('MMMM D')}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(matchingProduct.priceCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>b6b6c212-d30e-4d4a-805d-90b52ce6b37d</div>
          </div>
        </div>

        <div class="order-details-grid">
          <div class="product-image-container">
            <img src="./images/${matchingProduct.image}">
          </div>

          <div class="product-details">
            <div class="product-name">
            ${matchingProduct.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${dateString}
            </div>
            <div class="product-quantity">
              Size:  ${selectedSize}
            </div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="./images/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
        </div>
      </div>`;
  });
  ordersGrid.innerHTML = orderHTML;

}
document.addEventListener('DOMContentLoaded', () => {
  renderOrders();
});