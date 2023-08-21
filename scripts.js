(function() {
  var a, b = function(a, b) {
      return function() {
          return a.apply(b, arguments)
      }
  }, c = [].slice;
  a = function() {
      function a(a) {
          null == a && (a = document),
          this.isRepeatVisit = b(this.isRepeatVisit, this),
          this.track = b(this.track, this),
          this._trackProduct = b(this._trackProduct, this),
          this._trackVisit = b(this._trackVisit, this),
          this.setBaseUrl = b(this.setBaseUrl, this),
          this.handle = b(this.handle, this),
          this.process = b(this.process, this),
          this.scope = a,
          this.process()
      }
      return a.prototype.interval = 1e3,
      a.prototype.cookieName = "visited",
      a.prototype.process = function() {
          return "undefined" != typeof _bcaq && null !== _bcaq && _bcaq.length > 0 ? (this.handle(_bcaq.shift()),
          this.process()) : this.timer = setTimeout(this.process, this.interval)
      }
      ,
      a.prototype.handle = function(a) {
          var b, d;
          return null != a && null != a.length && a.length > 0 ? (b = a[0],
          d = 2 <= a.length ? c.call(a, 1) : [],
          "_setUrl" === b ? (this.setBaseUrl(d[0]),
          !0) : null != this.baseUrl && null != this[b] ? (this[b](d),
          !0) : !1) : !1
      }
      ,
      a.prototype.setBaseUrl = function(a) {
          return this.baseUrl = "//" + a + "/web_services"
      }
      ,
      a.prototype._trackVisit = function(a) {
          return null == a && (a = []),
          a.length > 0 && !this.isRepeatVisit() ? this.track("log_stats.gif", {
              account_id: a[0],
              referrer: document.referrer
          }) : void 0
      }
      ,
      a.prototype._trackProduct = function(a) {
          return null == a && (a = []),
          2 === a.length ? this.track("log_product_view.gif", {
              product_id: a[0],
              account_id: a[1]
          }) : void 0
      }
      ,
      a.prototype.track = function(a, b) {
          var c;
          return null == a && (a = ""),
          c = document.createElement("img"),
          c.src = "" + this.baseUrl + "/" + a + "?" + this.serialize(b),
          c
      }
      ,
      a.prototype.serialize = function(a) {
          var b, c, d;
          c = "";
          for (b in a)
              d = a[b],
              c += "" + b + "=" + d + "&";
          return c
      }
      ,
      a.prototype.isRepeatVisit = function() {
          var a, b, c, d, e, f, g;
          for (b = this.scope.cookie.split(";"),
          e = 0,
          f = b.length; f > e; e++)
              if (a = b[e],
              g = a.split("="),
              c = g[0],
              d = g[1],
              c.trim() === this.cookieName)
                  return !0;
          return this.scope.cookie = "" + this.cookieName + "=true;path=/",
          !1
      }
      ,
      a
  }(),
  window.BigCartelTracker = a,
  window.bca = new a(document)
}
).call(this);

function initMap() {
// The location of the first shop
const uluru = { lat: 52.1903252, lng: 20.9054124 };
// The map, centered at the first shop
const map = new google.maps.Map(document.getElementById("map"), {
  zoom: 4,
  center: uluru,
});
// The marker, positioned at Shop
const marker = new google.maps.Marker({
  position: uluru,
  map: map,
});
// The second marker, positioned at a different location
const location2 = { lat: 52.1929492, lng: 20.9042147 };
const marker2 = new google.maps.Marker({
  position: location2,
  map: map,
});
}

const filterButtons = document.querySelectorAll('.filter-button');
const productItems = document.querySelectorAll('.product-item');

if (filterButtons.length > 0 && productItems.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filterValue = button.getAttribute('data-filter');
      productItems.forEach((item) => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
      filterButtons.forEach((button) => {
        button.classList.remove('active');
      });
      button.classList.add('active');
    });
  });
}


filterButtons.forEach((button) => {
button.addEventListener('click', () => {
  const filterValue = button.getAttribute('data-filter');
  productItems.forEach((item) => {
    if (filterValue === 'all' || item.classList.contains(filterValue)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
  filterButtons.forEach((button) => {
    button.classList.remove('active');
  });
  button.classList.add('active');
});
});

let basket = [];

function addProduct(name) {
let basket = JSON.parse(localStorage.getItem("basket")) || [];
basket.push(name);
localStorage.setItem("basket", JSON.stringify(basket));
document.querySelector(".cart-count").textContent = basket.length;
displayBasket();
}


function removeFromBasket(product) {
const index = basket.indexOf(product);
if (index > -1) {
  basket.splice(index, 1);
  alert(`Removed ${product} from basket`);
} else {
  alert(`${product} is not in the basket`);
}
}

function displayBasket() {
const basketList = document.getElementById("basket-list");
basketList.innerHTML = "";

basket.forEach(product => {
  const li = document.createElement("li");
  li.innerHTML = `${product} <button onclick="removeFromBasket('${product}')">Remove</button>`;
  basketList.appendChild(li);
});
}

function purchase() {
const name = document.getElementById("name-input").value;
const address = document.getElementById("address-input").value;

if (basket.length === 0) {
  alert("Your basket is empty. Please add some products to purchase.");
} else if (!name || !address) {
  alert("Please fill in your name and address to proceed.");
} else {
  alert(`Thank you for your purchase, ${name}! Your products will be delivered to ${address}.`);
  basket = [];
  displayBasket();
}
}

// Getting all the "Remove" buttons
var removeButtons = document.querySelectorAll("a[id^='remove-item']");

// Looping through each "Remove" button and adding click event listener
removeButtons.forEach(function(button) {
  button.addEventListener("click", function(event) {
    event.preventDefault(); // Preventing default link behavior
    var row = this.closest("tr"); // Getting the parent row of the clicked button
    row.remove(); // Removing the row from the table
    updateCartTotal(); // Updating the total price of the cart
  });
});

// Function for updating the total price of the cart
function updateCartTotal() {
  var totalPrice = 0; // Initialize total price to 0
  var priceElements = document.querySelectorAll("td:nth-child(3)"); // Getting all price elements in the table
  priceElements.forEach(function(element) {
    var price = parseFloat(element.textContent.replace("£", "")); // Getting the price value and remove the "£" symbol
    totalPrice += price; // Adding the price to the total price
  });
  // Updating the total price in the DOM
  document.getElementById("cart-total").textContent = "Total: £" + totalPrice.toFixed(2);
}

window.onload = function() {
  const buyButton = document.getElementById('buy-button');
  buyButton.addEventListener('click', function() {
    alert('Well done, you have successfully purchased the products');
  });
};


// Getting all the buttons
const buttons = document.querySelectorAll('.add-to-cart-btn');

// Adding an event listener to each button
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    // Getting the product id and quantity
    const productId = button.getAttribute('data-product-id');
    const quantityInput = document.querySelector(`#quantity-${productId}`);
    const quantity = parseInt(quantityInput.value);

    // Getting the current basket
    const basketString = localStorage.getItem('basket');
    const basket = basketString ? JSON.parse(basketString) : {};

    // Updating the quantity of the corresponding product in the basket
    basket[productId] = (basket[productId] || 0) + quantity;

    // Saving the updated basket
    localStorage.setItem('basket', JSON.stringify(basket));

    // Updating the quantity label
    const quantityLabel = document.querySelector(`#quantity-label-${productId}`);
    const totalQuantity = basket[productId] || 0;
    quantityLabel.textContent = `${totalQuantity} in basket`;
  });
});


