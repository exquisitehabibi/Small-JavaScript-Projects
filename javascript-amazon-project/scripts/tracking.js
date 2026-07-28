const data = JSON.parse(localStorage.getItem('trackingItem'));
const placedOrders = JSON.parse(localStorage.getItem('placedAmazonOrders')) || [];
const cart = JSON.parse(localStorage.getItem('amazonShoppingCart')) || [];

let cartSize = cart.reduce((total,prod)=> total+  prod.quantity, 0);
document.querySelector('.js-cart-quantity').innerHTML=`${cartSize}`;

let trackingHTML = "";

function buildTrackPage(index, i){
    let prod = placedOrders[index].orderItems[i];

    trackingHTML = `
        <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${prod.deliveryDate}
        </div>

        <div class="product-info">
          ${prod.name}
        </div>

        <div class="product-info">
          Quantity: ${prod.quantity}
        </div>

        <img class="product-image" src="${prod.image}">`;

    const today = stripTime(new Date());
    const delivery = stripTime(new Date(prod.deliveryDate));
    const orderedDate = stripTime(new Date(placedOrders[index].dateOrdered));
    let progressWidth = 0;

    if (orderedDate.getTime() === today.getTime()) {
      progressWidth = 0;
        trackingHTML += `
            <div class="progress-labels-container">
            <div class="progress-label current-status">Preparing</div>
            <div class="progress-label">Shipped</div>
            <div class="progress-label">Delivered</div>
            </div>
            <div class="progress-bar-container">
            <div class="progress-bar" style="width:${progressWidth}%"></div>
            </div>
        `;
    } 
    else if (orderedDate.getTime() < today.getTime() && today.getTime() < delivery.getTime()) {
      progressWidth = 50;
        trackingHTML += `
            <div class="progress-labels-container">
            <div class="progress-label">Preparing</div>
            <div class="progress-label current-status">Shipped</div>
            <div class="progress-label">Delivered</div>
            </div>
            <div class="progress-bar-container">
            <div class="progress-bar" style="width:${progressWidth}%"></div>
            </div>
        `;
    }
    else {
      progressWidth = 100;
        trackingHTML += `
            <div class="progress-labels-container">
            <div class="progress-label">Preparing</div>
            <div class="progress-label">Shipped</div>
            <div class="progress-label current-status">Delivered</div>
            </div>
            <div class="progress-bar-container">
            <div class="progress-bar" style="width:${progressWidth}%"></div>
            </div>
        `;
    }
}

function stripTime(date){
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

if (!data) {
  document.querySelector('.js-main').innerHTML = "No tracking data";
} else {
  buildTrackPage(data.order, data.item);
  document.querySelector('.js-main').innerHTML = trackingHTML;
}