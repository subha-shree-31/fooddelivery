// Display restaurants on the home page
if (document.getElementById("restaurantList")) {
  const container = document.getElementById("restaurantList");

  restaurants.forEach(res => {
    const div = document.createElement("div");
    div.className = "restaurant";
    div.innerHTML = `
      <img src="${res.image}" alt="${res.name}" class="restaurant-img">
      <div class="card-body">
        <h3>${res.name}</h3>
        <p>${res.description}</p>
        <button onclick="window.location.href='restaurant.html?rid=${res.id}'">
          View Menu
        </button>
      </div>
    `;
    container.appendChild(div);
  });
}

// Display menu for selected restaurant
const params = new URLSearchParams(window.location.search);
const rid = params.get("rid") || "1";

if (document.getElementById("menuItems")) {
  const restaurant = restaurants.find(r => r.id == rid);

  if (restaurant) {
    document.getElementById("restaurantName").innerText = restaurant.name;
    const menuList = document.getElementById("menuItems");

    restaurant.menu.forEach(item => {
      const div = document.createElement("div");
      div.className = "menu-item";
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="menu-img">
        <div class="card-body">
          <h3>${item.name}</h3>
          <p class="price">₹${item.price}</p>
          <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
        </div>
      `;
      menuList.appendChild(div);
    });
  }
}

let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  displayCart();
}

function displayCart() {
  const list = document.getElementById("cartItems");
  const total = document.getElementById("cartTotal");
  if (!list) return;

  list.innerHTML = "";
  let sum = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    list.appendChild(li);
    sum += item.price;
  });

  total.textContent = `Total: ₹${sum}`;
}

function placeOrder() {
  if (cart.length === 0) {
    alert("Please add your favourite food to the cart!");
  } else {
    document.getElementById("orderModal").style.display = "flex";
  }
}

function confirmOrder() {
  cart = [];
  displayCart();
  closeModalSilently();
  document.getElementById("successModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("orderModal").style.display = "none";
}

function closeModalSilently() {
  document.getElementById("orderModal").style.display = "none";
}

function closeSuccessModal() {
  document.getElementById("successModal").style.display = "none";
}

function goHome() {
  window.location.href = "index.html";
}
