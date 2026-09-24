const products = [
  {
    id: 1,
    name: "Premium Rice 5kg",
    category: "grocery",
    price: 320,
    emoji: "🍚",
    stock: "In stock",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Organic Honey",
    category: "grocery",
    price: 260,
    emoji: "🍯",
    stock: "Popular",
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Face Wash",
    category: "beauty",
    price: 185,
    emoji: "🧴",
    stock: "New",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Hair Oil",
    category: "beauty",
    price: 210,
    emoji: "🫧",
    stock: "Best seller",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Dish Wash Liquid",
    category: "household",
    price: 155,
    emoji: "🧼",
    stock: "In stock",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Toilet Cleaner",
    category: "care",
    price: 175,
    emoji: "🧽",
    stock: "In stock",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    name: "Soap Bundle",
    category: "care",
    price: 140,
    emoji: "🧼",
    stock: "Popular",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    name: "Baby Care Kit",
    category: "care",
    price: 450,
    emoji: "👶",
    stock: "New",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    name: "Detergent Powder",
    category: "household",
    price: 205,
    emoji: "🧴",
    stock: "In stock",
    image: "https://images.unsplash.com/photo-1602407294553-6ac3b9c0ef0e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    name: "Toothpaste",
    category: "beauty",
    price: 120,
    emoji: "🪥",
    stock: "Daily use",
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 11,
    name: "Masala Mix",
    category: "grocery",
    price: 95,
    emoji: "🌶️",
    stock: "In stock",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 12,
    name: "Soap & Lotion Set",
    category: "beauty",
    price: 330,
    emoji: "🫧",
    stock: "Popular",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
  }
];

let cart = JSON.parse(localStorage.getItem("ghPremierCart")) || [];

const productGrid = document.getElementById("productGrid");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const subtotalEl = document.getElementById("subtotal");
const totalPriceEl = document.getElementById("totalPrice");
const cartPanel = document.getElementById("cartPanel");
const checkoutModal = document.getElementById("checkoutModal");
const dashboardModal = document.getElementById("dashboardModal");
const toast = document.getElementById("toast");
const orderSearch = document.getElementById("orderSearch");

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

function saveCart() {
  localStorage.setItem("ghPremierCart", JSON.stringify(cart));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 1800);
}

function addToCart(productId) {
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  saveCart();
  renderCart();
  showToast("Added to cart");
}

function updateQuantity(productId, change) {
  const item = cart.find((cartItem) => cartItem.id === productId);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter((cartItem) => cartItem.id !== productId);
  }

  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  renderCart();
}

function renderProducts(filter = "all") {
  productGrid.innerHTML = "";

  const visibleProducts = filter === "all"
    ? products
    : products.filter((product) => product.category === filter);

  visibleProducts.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" />
        <span class="product-flag">${product.stock}</span>
      </div>

      <div class="product-info">
        <div class="product-meta">
          <span class="product-category">${product.category}</span>
          <span class="product-badge">${product.stock}</span>
        </div>

        <h3>${product.name}</h3>

        <div class="product-price">
          <span class="price">${formatCurrency(product.price)}</span>
          <button class="add-btn" data-id="${product.id}">Add</button>
        </div>
      </div>
    `;

    productGrid.appendChild(card);
  });

  document.querySelectorAll(".add-btn").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(Number(btn.dataset.id)));
  });
}

function renderCart() {
  if (!cart.length) {
    cartItems.innerHTML = `
      <div class="empty-state">
        <p>Your cart is empty.</p>
      </div>
    `;
  } else {
    cartItems.innerHTML = "";
    cart.forEach((item) => {
      const product = products.find((p) => p.id === item.id);

      const itemElement = document.createElement("div");
      itemElement.className = "cart-item";

      itemElement.innerHTML = `
        <div class="cart-item-emoji">${product.emoji}</div>
        <div>
          <h4>${product.name}</h4>
          <p class="cart-price">${formatCurrency(product.price)}</p>
          <div class="qty-controls">
            <button data-action="decrease" data-id="${product.id}">-</button>
            <span>${item.quantity}</span>
            <button data-action="increase" data-id="${product.id}">+</button>
          </div>
        </div>
        <button class="remove-btn" data-id="${product.id}" aria-label="Remove item">×</button>
      `;

      cartItems.appendChild(itemElement);
    });

    cartItems.querySelectorAll("[data-action='increase']").forEach((btn) => {
      btn.addEventListener("click", () => updateQuantity(Number(btn.dataset.id), 1));
    });

    cartItems.querySelectorAll("[data-action='decrease']").forEach((btn) => {
      btn.addEventListener("click", () => updateQuantity(Number(btn.dataset.id), -1));
    });

    cartItems.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", () => removeFromCart(Number(btn.dataset.id)));
    });
  }

  const subtotal = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);
    return sum + product.price * item.quantity;
  }, 0);

  const total = subtotal;

  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  subtotalEl.textContent = formatCurrency(subtotal);
  totalPriceEl.textContent = formatCurrency(total);
}

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((el) => el.classList.remove("active"));
    button.classList.add("active");
    renderProducts(button.dataset.filter);
  });
});

document.getElementById("cartToggle").addEventListener("click", () => {
  cartPanel.classList.add("open");
});

document.getElementById("closeCart").addEventListener("click", () => {
  cartPanel.classList.remove("open");
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (!cart.length) {
    showToast("Your cart is empty");
    return;
  }
  checkoutModal.classList.remove("hidden");
});

document.getElementById("closeModal").addEventListener("click", () => {
  checkoutModal.classList.add("hidden");
});

document.getElementById("cancelCheckout").addEventListener("click", () => {
  checkoutModal.classList.add("hidden");
});

document.getElementById("showDashboardBtn")?.addEventListener("click", () => {
  renderOrders();
  dashboardModal.classList.remove("hidden");
});

document.getElementById("closeDashboard").addEventListener("click", () => {
  dashboardModal.classList.add("hidden");
});

function generateOrderId() {
  const date = new Date();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `GH-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}-${random}`;
}

let sentOtp = null;

document.getElementById("sendOtpBtn").addEventListener("click", () => {
  const phone = document.getElementById("phone").value.trim();
  if (!phone || phone.length < 10) {
    showToast("Enter a valid 10-digit phone number");
    return;
  }

  sentOtp = String(Math.floor(100000 + Math.random() * 900000));
  const status = document.getElementById("otpStatus");
  status.textContent = `OTP sent to ${phone}. Demo OTP: ${sentOtp}`;
  showToast("OTP sent successfully");
});

document.getElementById("checkoutForm").addEventListener("submit", (event) => {
  event.preventDefault();

  if (!cart.length) {
    showToast("Cart is empty");
    return;
  }

  const phone = document.getElementById("phone").value.trim();
  const enteredOtp = document.getElementById("otpField").value.trim();

  if (!phone || phone.length < 10) {
    showToast("Enter a valid phone number");
    return;
  }

  if (!sentOtp) {
    showToast("Please send OTP first");
    return;
  }

  if (enteredOtp !== sentOtp) {
    showToast("OTP verification failed");
    return;
  }

  const formData = new FormData(event.target);
  const customer = Object.fromEntries(formData.entries());

  const orderId = generateOrderId();

  const order = {
    id: orderId,
    customerName: customer.name,
    phone: customer.phone,
    area: customer.area,
    address: customer.address,
    payment: customer.payment,
    slot: customer.slot,
    items: cart.map((item) => {
      const product = products.find((p) => p.id === item.id);
      return {
        name: product.name,
        quantity: item.quantity,
        price: product.price
      };
    }),
    total: cart.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.id);
      return sum + product.price * item.quantity;
    }, 0),
    status: "Confirmed",
    date: new Date().toLocaleString()
  };

  let orders = JSON.parse(localStorage.getItem("ghPremierOrders")) || [];
  orders.unshift(order);
  localStorage.setItem("ghPremierOrders", JSON.stringify(orders));

  cart = [];
  saveCart();
  renderCart();
  event.target.reset();
  checkoutModal.classList.add("hidden");
  renderOrders();
  showToast(`Pre-booking confirmed! ID: ${orderId}`);
});

function renderOrders(search = "") {
  const orders = JSON.parse(localStorage.getItem("ghPremierOrders")) || [];
  const filtered = orders.filter((order) => {
    const term = search.toLowerCase();
    if (!term) return true;
    return (
      order.id.toLowerCase().includes(term) ||
      order.phone.toLowerCase().includes(term) ||
      order.customerName.toLowerCase().includes(term)
    );
  });

  const list = document.getElementById("ordersList");

  if (!filtered.length) {
    list.innerHTML = "<p class='empty-state'>No pre-bookings yet.</p>";
    return;
  }

  list.innerHTML = filtered.map((order) => `
    <div class="order-item">
      <div class="order-top">
        <span class="order-id">${order.id}</span>
        <span class="order-status">${order.status}</span>
      </div>
      <div class="order-info">
        <strong>${order.customerName}</strong> • ${order.phone}<br>
        ${order.area} • ${order.slot}<br>
        ${order.address}<br>
        Payment: ${order.payment}<br>
        Total: ${formatCurrency(order.total)}<br>
        Date: ${order.date}
      </div>
    </div>
  `).join("");
}

orderSearch.addEventListener("input", () => {
  renderOrders(orderSearch.value.trim());
});

document.getElementById("closeDashboard").addEventListener("click", () => {
  dashboardModal.classList.add("hidden");
});

document.getElementById("dashboardOpenBtn")?.addEventListener("click", () => {
  renderOrders();
  dashboardModal.classList.remove("hidden");
});

renderProducts();
renderCart();
renderOrders();