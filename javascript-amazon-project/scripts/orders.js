const cart = JSON.parse(localStorage.getItem('amazonShoppingCart')) || [];
const placedOrders = JSON.parse(localStorage.getItem('placedAmazonOrders')) || [];

const products = JSON.parse(localStorage.getItem('amazonProducts')) || [];

let cartSize = cart.reduce((total,prod)=> total+  prod.quantity, 0);
document.querySelector('.js-cart-quantity').innerHTML=`${cartSize}`;


// placedOrders.length = 0;
//   localStorage.setItem('placedAmazonOrders', JSON.stringify(placedOrders));

function dispOrders(){
    if(placedOrders.length == 0){
    document.querySelector('.js-main').innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:200px; gap:10px;">
        <p>NO orders placed yet!</p>
        <a href="amazon.html">Go back to home page</a>
        <p>OR</p>
        <a href="checkout.html">Go back to checkout page</a>
      </div>
    `
    return;
  }
    let orderHTML = "";
    placedOrders.forEach((prod,index)=> {
        let itemsPerOrder = "";
        prod.orderItems.forEach((item,i) => {
            itemsPerOrder += `
                <div class="product-image-container">
                    <img src="${item.image}">
                    </div>

                    <div class="product-details">
                    <div class="product-name">
                        ${item.name}
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: ${item.deliveryDate}
                    </div>
                    <div class="product-quantity">
                        Quantity: ${item.quantity}
                    </div>
                    <button class="buy-again-button button-primary" onclick = "buyItAgain('${item.name}',${item.quantity})">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                    </div>

                    <div class="product-actions">
                        <button class="track-package-button button-secondary" onclick = "buildTrackPage(${index},${i})">
                        Track package
                        </button>
                    </a>
                </div>

            `
        });

        orderHTML += `
            <div class="order-container">
          
                <div class="order-header">
                    <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${new Date(prod.dateOrdered).toLocaleDateString()}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${(prod.totalCost/100).toFixed(2)}</div>
                    </div>
                    </div>

                    <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${prod.orderID}</div>
                    </div>
                </div>

                <div class="order-details-grid">
                ${itemsPerOrder}
                </div>
                </div>
        `
    });
    document.querySelector('.js-orders-grid').innerHTML = orderHTML;
}
dispOrders();

let trackingHTML = [];
function buildTrackPage(index, i){
    const selected = {
    order: index,
    item: i
  };

  localStorage.setItem('trackingItem', JSON.stringify(selected));
  window.location.href = "tracking.html";
}

function buyItAgain(prod,qty){

    let n = qty;

    const ind = products.findIndex((i)=> i.name === prod)
    const existItem = cart.find((p)=>p.name === products[ind].name);

    if(existItem){
      if(existItem.quantity + n > 10){
        alert(`Only 10 of these can be ordered per user!`);
        let added = 10 - existItem.quantity;
        existItem.quantity = 10;
        cartSize += added;
      }
      else{
        existItem.quantity+=n;
        cartSize+=n;
      }
    }
    else{
      let item = {
        image : products[ind].image,
        name: products[ind].name,
        price: products[ind].price,
        quantity: n  
      }
    cart.push(item);
    cartSize += n;
    }

    localStorage.setItem('amazonShoppingCart',JSON.stringify(cart));
    document.querySelector('.js-cart-quantity').innerHTML=`${cartSize}`;
    alert('Added to Cart!');
}