const products = [
    {
        image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
        name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
        rating: {
            stars: 4.5,
            reviews: 87
        },
        price: 1090
    },
    {
        image: 'images/products/intermediate-composite-basketball.jpg',
        name: 'Intermediate Size Basketball',
        rating: {
            stars: 4.0,
            reviews: 127
        },
        price: 2095
    },
    {
        image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
        name: 'Adults Plain Cotton T-Shirt - 2 Pack',
        rating: {
            stars: 4.5,
            reviews: 56
        },
        price: 799
    }
     
]

let productHTML = "";

products.forEach((prod,index)=>{
    productHTML +=`
       <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${prod.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${prod.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${(prod.rating.stars)*10}.png">
            <div class="product-rating-count link-primary">
              ${prod.rating.reviews}
            </div>
          </div>

          <div class="product-price">
            $${(prod.price/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select id="ID${index}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button" onclick="addToCart(${index})">
            Add to Cart
          </button>
        </div> 
    `
});

document.querySelector('.js-products-grid').innerHTML = productHTML;


///ADD to cart btn
// document.querySelectorAll('.js-add-to-cart-button').addEventListener('click', addToCart(ind));

///////Cart
const cart = [];

function addToCart(ind){
    let n = document.getElementById(`ID${ind}`).value;
    let item = {
        name: products[ind].name,
        price: products[ind].price,
        quantity: n
    }
    cart.push(item);
    console.log(cart);
}