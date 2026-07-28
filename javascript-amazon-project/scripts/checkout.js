const cart = JSON.parse(localStorage.getItem('amazonShoppingCart')) || [];
const placedOrders = JSON.parse(localStorage.getItem('placedAmazonOrders')) || [];

let cartSize = 0;
cartSize = cart.reduce((total,prod)=> total + prod.quantity, 0);

let checkoutHTML = "";

function disp(){

  if(cart.length == 0){
    document.querySelector('.js-main').innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:200px; gap:10px;">
        <p>There are no items in Cart</p>
        <a href="../amazon.html">Go back to home page</a>
      </div>
    `
    return;
  }
  
  checkoutHTML = "";
  cart.forEach((prod,index) => {
    checkoutHTML+=`
        <div class="cart-item-container">
            <div class="delivery-date js-delivery-date-${index}">
              Delivery date: ${getDeliveryDate(6)}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${prod.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${prod.name}
                </div>
                <div class="product-price">
                  $${(prod.price/100).toFixed(2)}
                </div>
                <div class="product-quantity js-qty-container-${index}">
                  <span>
                    Quantity: <span class="quantity-label">${prod.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link-${index}" onclick="updateQty(${index})">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary" onclick="del(${index})">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    value = "0"
                    name="delivery-option-${index}">
                  <div>
                    <div class="delivery-option-date">
                      ${getDeliveryDate(6)}
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    value = "499"
                    name="delivery-option-${index}">
                  <div>
                    <div class="delivery-option-date">
                      ${getDeliveryDate(4)}
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    value = "999"
                    name="delivery-option-${index}">
                  <div>
                    <div class="delivery-option-date">
                      ${getDeliveryDate(2)}
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `
  });
  document.querySelector('.js-order-summary').innerHTML = checkoutHTML;
  
  cart.forEach((prod,index) => {
  const radios = document.querySelectorAll(`input[name="delivery-option-${index}"]`);
  
    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        updateDeliveryDate(index, Number(radio.value));
        calcTotalCost();
      });
    });
  });
}
disp();

//calc costs
let totalCartCost = 0;
function calcTotalCost(){
  let itemsCost = 0;
  let itemsShipping = 0;
  let totalQTY = 0;

  cart.forEach((prod,index)=>{
    itemsCost += prod.price * prod.quantity;
    itemsShipping += Number(getSelectedDelivery(index));
    totalQTY += prod.quantity;
  })

  document.querySelector('.js-total-items-qty').innerHTML = `Items (${totalQTY})`;
  document.querySelector('.js-checkout-header-middle-section').innerHTML = `${totalQTY} items`;
  document.querySelector('.js-itemscost-summary').innerHTML = `$${(itemsCost/100).toFixed(2)}`;
  document.querySelector('.js-itemsshipping-summary').innerHTML = `$${(itemsShipping/100).toFixed(2)}`;
  document.querySelector('.js-totalbeforetax').innerHTML = `$${((itemsCost + itemsShipping)/100).toFixed(2)}`;
  document.querySelector('.js-total-tax').innerHTML = `$${((itemsCost + itemsShipping)/1000).toFixed(2)}`

  totalCartCost = itemsCost + itemsShipping + (itemsCost + itemsShipping)/10;
  document.querySelector('.js-payment-summary-money').innerHTML = `$${((totalCartCost)/100).toFixed(2)}`;
}
calcTotalCost();

//deleting items
function del(ind){
    cart.splice(ind,1);
    localStorage.setItem('amazonShoppingCart',JSON.stringify(cart));
    disp();
    calcTotalCost();
}

function getSelectedDelivery(index){
  const selected = document.querySelector(`input[name="delivery-option-${index}"]:checked`);
  return selected.value;
}


//updating qty of items 
function updateQty(ind){
  const container = document.querySelector(`.js-qty-container-${ind}`);

  container.innerHTML = `
    <span>
      Quantity:
      <input id="updatingQty-${ind}" type="number" min="1" max="10" value="${cart[ind].quantity}">
    </span>
    <button onclick="saveQty(${ind})">Save</button>
    <button onclick="disp()">Cancel</button>
  `;

}

function saveQty(ind){
  const input = document.getElementById(`updatingQty-${ind}`);
  const newQty = Number(input.value);

  if (isNaN(newQty) || newQty < 1 || newQty > 10){
    alert("Invalid Quantity");
    return;
  }

  cart[ind].quantity = newQty;

  localStorage.setItem('amazonShoppingCart', JSON.stringify(cart));

  disp();
  calcTotalCost();
}


// delivery dates
function getDeliveryDate(daysToAdd){
  const date = new Date();
  let added = 0;

  while (added < daysToAdd) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();

    if (day !== 0 && day !== 6) { // skip Sunday(0) & Saturday(6)
      added++;
    }
  }

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
}

// raw delivery dates
function getRawDeliveryDate(daysToAdd){
  const date = new Date();
  let added = 0;

  while (added < daysToAdd) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();

    if (day !== 0 && day !== 6) { // skip Sunday(0) & Saturday(6)
      added++;
    }
  }

  return date.toISOString();
}

//Date at top update
function updateDeliveryDate(index, value){
  let days = 6;

  if (value === 499) days = 4;
  if (value === 999) days = 2;

  const dateEl = document.querySelector(`.js-delivery-date-${index}`);
  dateEl.innerHTML = `Delivery date: ${getDeliveryDate(days)}`;
}

// Place Order
document.querySelector('.js-place-order-button').addEventListener('click',placeOrder);

function placeOrder(){
  if(cart.length == 0){
    alert('The Cart is empty!');
    return;
  }

  let items = [];

  for(let i = 0; i < cart.length; i++){
    const shippingCost = Number(getSelectedDelivery(i));

    let days = 6;
    if (shippingCost === 499) days = 4;
    if (shippingCost === 999) days = 2;

    items.push({
      name: cart[i].name,
      image: cart[i].image,
      quantity: cart[i].quantity,
      deliveryDate: getDeliveryDate(days),
      rawDeliveryDate : getRawDeliveryDate(days)
    });
  }

  let orderItem = {
    dateOrdered: new Date().toISOString(),
    totalCost: totalCartCost,
    orderID: crypto.randomUUID(),
    orderItems: items
  };

  placedOrders.unshift(orderItem);
  localStorage.setItem('placedAmazonOrders', JSON.stringify(placedOrders));

  cart.length = 0;
  localStorage.setItem('amazonShoppingCart', JSON.stringify(cart));

  calcTotalCost();

  document.querySelector('.js-main').innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:200px; gap:10px;">
        <p>All Items were ordered successfully!</p>
        <a href="../amazon.html">Go back to home page</a>
      </div>
    `
}