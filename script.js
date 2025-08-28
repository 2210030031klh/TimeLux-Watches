function addToCart(name, price, img) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price, img });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart!");
}

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContainer = document.getElementById("cart-items");
  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += Number(item.price);

    cartContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <p>${item.name} - $${item.price}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  });

  // Add total at bottom
  cartContainer.innerHTML += `
    <div class="cart-total">
      <h3>Total: $${total.toFixed(2)}</h3>
    </div>
  `;
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let total = cart.reduce((sum, item) => sum + Number(item.price), 0);
  alert("Your total is $" + total.toFixed(2) + ". Proceeding to checkout...");

  localStorage.removeItem("cart");
  loadCart();
}

window.onload = loadCart;
