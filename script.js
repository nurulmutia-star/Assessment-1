"use strict";

// NOIRE CAFE - INTERACTIVE FEATURES

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const STORAGE = {
    theme: "noire_theme",
    favorites: "noire_favorites",
    orders: "noire_orders",
    rewards: "noire_rewards",
    reviews: "noire_reviews",
    cart: "noire_cart",
    promo: "noire_promo",
    rewardActive: "noire_reward_active"
};

function readStorage(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
    } catch {
        return fallback;
    }
}

function saveStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        showToast("Penyimpanan browser penuh atau tidak tersedia.");
    }
}

function formatRupiah(value) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(value);
}

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}

function safeImage(url) {
    try {
        const parsed = new URL(url);
        return parsed.protocol === "https:" ? parsed.href : "";
    } catch {
        return "";
    }
}

let activeFilter = "Semua";
let selectedRating = 5;
let favorites = readStorage(STORAGE.favorites, []);
let orders = readStorage(STORAGE.orders, []);
let rewardStamps = readStorage(STORAGE.rewards, 0);
let reviews = readStorage(STORAGE.reviews, []);
let cart = readStorage(STORAGE.cart, []);
let promoCode = readStorage(STORAGE.promo, "");
let rewardActive = readStorage(STORAGE.rewardActive, false);
let toastTimer;

// Validate saved data
if (!Array.isArray(favorites)) favorites = [];
if (!Array.isArray(orders)) orders = [];
if (!Array.isArray(reviews)) reviews = [];
if (!Array.isArray(cart)) cart = [];

rewardStamps = Math.max(0, Math.min(5, Number(rewardStamps) || 0));

const foodImages = {
    "burger": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=85",
    "chicken-burger": "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=700&q=85",
    "mushroom-pasta": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=85",
    "spicy-chicken-rice": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=700&q=85",
    "beef-teriyaki": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=85",
    "chicken-katsu": "https://images.unsplash.com/photo-1633478062482-790e3f2e7c8f?auto=format&fit=crop&w=700&q=85",
    "pizza": "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=85",
    "carbonara": "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=700&q=85",
    "fish-chips": "https://images.unsplash.com/photo-1579208030886-b937da0925dc?auto=format&fit=crop&w=700&q=85",
    "french-fries": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=85",
    "chicken-salad": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=85",
    "quesadilla": "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=700&q=85",
    "croissant": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=85",
    "chocolate-croissant": "https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=700&q=85",
    "cinnamon-roll": "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=700&q=85",
    "blueberry-cheesecake": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=85",
    "cheese-toast": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=85",
    "donut": "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=700&q=85",
    "spanish-latte": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=85",
    "matcha-latte": "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=700&q=85",
    "strawberry-milk": "https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=700&q=85",
    "iced-chocolate": "https://images.unsplash.com/photo-1542990253-0bccd828d307?auto=format&fit=crop&w=700&q=85",
    "peach-tea": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=700&q=85",
    "caramel-macchiato": "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=700&q=85",
    "lemon-mojito": "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=700&q=85",
    "berry-smoothie": "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=700&q=85",
    "iced-americano": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=85",
    "vanilla-milkshake": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=85"
};

// THEME: DARK MODE / LIGHT MODE

function applyTheme(theme) {
    const isDark = theme === "dark";

    document.body.classList.toggle("dark-mode", isDark);

    $("#themeIcon").textContent = isDark ? "☀" : "☾";
    $("#themeLabel").textContent = isDark ? "Light mode" : "Dark mode";

    $("#themeToggle").setAttribute(
        "aria-label",
        isDark ? "Aktifkan light mode" : "Aktifkan dark mode"
    );

    document.querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", isDark ? "#17191f" : "#fbf5ee");

    saveStorage(STORAGE.theme, theme);
}

applyTheme(readStorage(STORAGE.theme, "light"));

$("#themeToggle").addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-mode");
    applyTheme(isDark ? "light" : "dark");
});

// MENU AND IMAGE RENDERING

function getMenu(id) {
    return menuData.find(item => Number(item.id) === Number(id));
}

function imageUrl(menu) {
    return safeImage(foodImages[menu.foto]) ||
        "https://placehold.co/700x800/dcecf5/4a3028?text=NOIRE+CAFE";
}

function renderMenu() {
    const keyword = $("#searchInput").value.trim().toLowerCase();

    const filtered = menuData.filter(menu => {
        const categoryMatch =
            activeFilter === "Semua" ||
            (activeFilter === "Favorit" && favorites.includes(menu.id)) ||
            (activeFilter === "BestSeller" && menu.bestSeller) ||
            menu.kategori === activeFilter;

        const keywordMatch =
            `${menu.nama} ${menu.deskripsi} ${menu.kategori}`
                .toLowerCase()
                .includes(keyword);

        return categoryMatch && keywordMatch;
    });

    $("#menuGrid").innerHTML = filtered.map(menu => {
        const isFavorite = favorites.includes(menu.id);

        return `
            <article class="menu-card">
                <div class="menu-photo">
                    <img
                        src="${imageUrl(menu)}"
                        alt="${escapeHTML(menu.nama)}"
                        loading="lazy"
                        onerror="this.onerror=null;this.src='https://placehold.co/700x800/dcecf5/4a3028?text=NOIRE'"
                    >

                    <span class="category-label">
                        ${menu.kategori === "Bakery"
                            ? "Bakery & sweets"
                            : escapeHTML(menu.kategori)}
                    </span>

                    ${menu.bestSeller
                        ? '<span class="best-seller-label">★ Best seller</span>'
                        : ""}

                    <button
                        class="favorite-btn ${isFavorite ? "is-favorite" : ""}"
                        type="button"
                        data-favorite="${menu.id}"
                        aria-label="${isFavorite ? "Hapus dari favorit" : "Tambah ke favorit"}"
                    >${isFavorite ? "♥" : "♡"}</button>

                    <button
                        class="quick-add"
                        type="button"
                        data-add="${menu.id}"
                        aria-label="Tambah ${escapeHTML(menu.nama)}"
                    >+</button>
                </div>

                <div class="menu-info">
                    <div class="menu-title-row">
                        <h3 class="menu-title">${escapeHTML(menu.nama)}</h3>
                        <span class="menu-price">${formatRupiah(menu.harga)}</span>
                    </div>

                    <div class="menu-rating">
                        ★ ${Number(menu.rating).toFixed(1)}
                        <span>· NOIRÉ pick</span>
                    </div>

                    <p class="menu-description">
                        ${escapeHTML(menu.deskripsi)}
                    </p>
                </div>
            </article>
        `;
    }).join("");

    $("#emptyState").hidden = filtered.length > 0;
}

$("#menuGrid").addEventListener("click", event => {
    const addButton = event.target.closest("[data-add]");
    const favoriteButton = event.target.closest("[data-favorite]");

    if (addButton) addToCart(Number(addButton.dataset.add));

    if (favoriteButton) {
        const id = Number(favoriteButton.dataset.favorite);

        favorites = favorites.includes(id)
            ? favorites.filter(favoriteId => favoriteId !== id)
            : [...favorites, id];

        saveStorage(STORAGE.favorites, favorites);
        renderMenu();

        showToast(
            favorites.includes(id)
                ? "Menu ditambahkan ke favorit ♡"
                : "Menu dihapus dari favorit"
        );
    }
});

$("#searchInput").addEventListener("input", renderMenu);

$$(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
        activeFilter = button.dataset.filter;

        $$(".filter-btn").forEach(item => {
            item.classList.toggle("active", item === button);
        });

        renderMenu();
    });
});

// PROMO BUNDLES

const promoBundles = [
    {
        id: "bundle-coffee",
        name: "Coffee & Croissant",
        description: "Iced Spanish Latte + Butter Croissant.",
        icon: "☕",
        badge: "COZY COMBO",
        items: [19, 13],
        price: 39000
    },
    {
        id: "bundle-sweet",
        name: "Sweet Little Break",
        description: "Iced Chocolate + Classic Donut.",
        icon: "🍩",
        badge: "SWEET DEAL",
        items: [22, 18],
        price: 39000
    },
    {
        id: "bundle-meal",
        name: "Comfort Meal",
        description: "Classic Beef Burger + Iced Americano.",
        icon: "🍔",
        badge: "BEST VALUE",
        items: [1, 27],
        price: 55000
    }
];

function renderPromos() {
    $("#promoGrid").innerHTML = promoBundles.map(bundle => `
        <article class="promo-card">
            <span class="promo-tag">${bundle.badge}</span>
            <span class="promo-icon">${bundle.icon}</span>
            <h3>${escapeHTML(bundle.name)}</h3>
            <p>${escapeHTML(bundle.description)}</p>
            <span class="promo-price">${formatRupiah(bundle.price)}</span>

            <button
                class="promo-add"
                type="button"
                data-bundle="${bundle.id}"
            >Add combo +</button>
        </article>
    `).join("");
}

$("#promoGrid").addEventListener("click", event => {
    const button = event.target.closest("[data-bundle]");
    if (!button) return;

    const bundle = promoBundles.find(item => item.id === button.dataset.bundle);
    if (!bundle) return;

    const [firstId, secondId] = bundle.items;

    addToCart(firstId, 1, true);
    addToCart(secondId, 1, true);

    cart.push({
        id: bundle.id,
        nama: bundle.name,
        harga: bundle.price,
        quantity: 1,
        isBundle: true,
        bundleItems: bundle.items
    });

    saveStorage(STORAGE.cart, cart);
    renderCart();
    showToast(`${bundle.name} ditambahkan ♡`);
});

// CART

function addToCart(id, quantity = 1, silent = false) {
    const menu = getMenu(id);
    if (!menu) return;

    const existing = cart.find(item => !item.isBundle && item.id === menu.id);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            id: menu.id,
            nama: menu.nama,
            harga: menu.harga,
            quantity
        });
    }

    saveStorage(STORAGE.cart, cart);
    renderCart();

    if (!silent) showToast(`${menu.nama} ditambahkan ♡`);
}

function changeQuantity(id, amount) {
    const item = cart.find(item => item.id === id);
    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(cartItem => cartItem !== item);
    }

    saveStorage(STORAGE.cart, cart);
    renderCart();
}

function removeCartItem(id) {
    cart = cart.filter(item => item.id !== id);
    saveStorage(STORAGE.cart, cart);
    renderCart();
}

function getSubtotal() {
    return cart.reduce((total, item) => {
        return total + item.harga * item.quantity;
    }, 0);
}

function getDiscount(subtotal) {
    let discount = 0;

    if (promoCode === "NOIRE10" && subtotal > 0) {
        discount = Math.round(subtotal * 0.10);
    }

    if (rewardActive && rewardStamps >= 5 && subtotal > 0) {
        discount = Math.max(discount, Math.round(subtotal * 0.20));
    }

    return Math.min(discount, subtotal);
}

function getTotal() {
    const subtotal = getSubtotal();
    return Math.max(0, subtotal - getDiscount(subtotal));
}

function renderCart() {
    cart = cart.filter(item =>
        item &&
        typeof item.nama === "string" &&
        Number(item.harga) >= 0 &&
        Number(item.quantity) > 0
    );

    saveStorage(STORAGE.cart, cart);

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = getSubtotal();
    const discount = getDiscount(subtotal);

    $("#cartCount").textContent = totalQuantity;
    $("#cartSubtotal").textContent = formatRupiah(subtotal);
    $("#discountAmount").textContent = "-" + formatRupiah(discount);
    $("#discountRow").hidden = discount <= 0;
    $("#cartTotal").textContent = formatRupiah(subtotal - discount);

    $("#cartEmpty").hidden = cart.length > 0;
    $("#checkoutButton").disabled = cart.length === 0;

    $("#cartItems").innerHTML = cart.map(item => {
        const image = item.isBundle
            ? "https://placehold.co/150x160/f7dce4/4a3028?text=NOIRE+COMBO"
            : imageUrl(getMenu(item.id) || { foto: "" });

        return `
            <div class="cart-row">
                <img
                    src="${image}"
                    alt="${escapeHTML(item.nama)}"
                    onerror="this.onerror=null;this.src='https://placehold.co/150x160/dcecf5/4a3028?text=NOIRE'"
                >

                <div>
                    <h4>${escapeHTML(item.nama)}</h4>
                    <p>${formatRupiah(item.harga * item.quantity)}</p>

                    <div class="quantity-controls">
                        <button
                            type="button"
                            data-quantity="${escapeHTML(item.id)}"
                            data-change="-1"
                            aria-label="Kurangi jumlah"
                        >−</button>

                        <span>${item.quantity}</span>

                        <button
                            type="button"
                            data-quantity="${escapeHTML(item.id)}"
                            data-change="1"
                            aria-label="Tambah jumlah"
                        >+</button>
                    </div>
                </div>

                <button
                    class="remove-item"
                    type="button"
                    data-remove="${escapeHTML(item.id)}"
                    aria-label="Hapus item"
                >×</button>
            </div>
        `;
    }).join("");
}

$("#cartItems").addEventListener("click", event => {
    const quantityButton = event.target.closest("[data-quantity]");
    const removeButton = event.target.closest("[data-remove]");

    if (quantityButton) {
        const rawId = quantityButton.dataset.quantity;
        const id = Number.isNaN(Number(rawId)) ? rawId : Number(rawId);
        changeQuantity(id, Number(quantityButton.dataset.change));
    }

    if (removeButton) {
        const rawId = removeButton.dataset.remove;
        const id = Number.isNaN(Number(rawId)) ? rawId : Number(rawId);
        removeCartItem(id);
    }
});

// CART DRAWER AND MODALS

function openCart() {
    $("#cartDrawer").classList.add("open");
    $("#drawerBackdrop").classList.add("show");
    $("#cartDrawer").setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeCart() {
    $("#cartDrawer").classList.remove("open");
    $("#drawerBackdrop").classList.remove("show");
    $("#cartDrawer").setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

function openModal(selector) {
    $(selector).classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeModal(selector) {
    $(selector).classList.remove("show");

    if (
        !$(".modal-backdrop.show") &&
        !$("#cartDrawer").classList.contains("open")
    ) {
        document.body.style.overflow = "";
    }
}

$("#openCart").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
$("#drawerBackdrop").addEventListener("click", closeCart);

$("#closeCheckout").addEventListener("click", () => closeModal("#checkoutBackdrop"));
$("#closeReceipt").addEventListener("click", () => closeModal("#receiptBackdrop"));
$("#closeHistory").addEventListener("click", () => closeModal("#historyBackdrop"));

$$(".modal-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", event => {
        if (event.target === backdrop) {
            closeModal("#" + backdrop.id);
        }
    });
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeCart();

        $$(".modal-backdrop.show").forEach(modal => {
            closeModal("#" + modal.id);
        });
    }
});

// PROMO CODE

function updatePromoMessage(message) {
    $("#promoMessage").textContent = message;
}

$("#applyPromoButton").addEventListener("click", () => {
    const code = $("#promoCode").value.trim().toUpperCase();

    if (code === "NOIRE10") {
        promoCode = code;
        saveStorage(STORAGE.promo, promoCode);
        updatePromoMessage("Yeay! Diskon 10% berhasil diterapkan ♡");
        renderCart();
        showToast("Kode promo berhasil digunakan!");
    } else if (code === "") {
        promoCode = "";
        saveStorage(STORAGE.promo, promoCode);
        updatePromoMessage("Masukkan kode promo terlebih dahulu.");
        renderCart();
    } else {
        promoCode = "";
        saveStorage(STORAGE.promo, promoCode);
        updatePromoMessage("Kode tidak valid. Coba NOIRE10 ya!");
        renderCart();
    }
});

$("#promoCode").value = promoCode;

if (promoCode === "NOIRE10") {
    updatePromoMessage("Kode NOIRE10 aktif: diskon 10%.");
}

// CHECKOUT

function openCheckout() {
    if (!cart.length) {
        showToast("Keranjang kamu masih kosong ♡");
        return;
    }

    $("#checkoutTotal").textContent = formatRupiah(getTotal());
    closeCart();
    openModal("#checkoutBackdrop");
}

$("#checkoutButton").addEventListener("click", openCheckout);

$("#checkoutForm").addEventListener("submit", event => {
    event.preventDefault();

    if (!cart.length) {
        closeModal("#checkoutBackdrop");
        showToast("Tambahkan menu ke keranjang dulu ya.");
        return;
    }

    const form = new FormData(event.currentTarget);

    const customerName = String(form.get("customerName") || "").trim();
    const phone = String(form.get("customerPhone") || "").trim();

    if (!customerName) {
        showToast("Nama pelanggan wajib diisi.");
        return;
    }

    const subtotal = getSubtotal();
    const discount = getDiscount(subtotal);
    const total = subtotal - discount;

    const order = {
        id: "NR-" + Date.now().toString().slice(-8),
        date: new Date().toISOString(),
        customerName,
        phone,
        type: String(form.get("orderType")),
        payment: String(form.get("paymentMethod")),
        note: String(form.get("orderNote") || "").trim(),
        items: cart.map(item => ({ ...item })),
        subtotal,
        discount,
        total,
        promo: promoCode,
        rewardUsed: rewardActive && rewardStamps >= 5
    };

    orders.unshift(order);
    saveStorage(STORAGE.orders, orders);

    // Reward hanya dihitung untuk pesanan yang diselesaikan.
    if (order.rewardUsed) {
        rewardStamps = 0;
        rewardActive = false;
        saveStorage(STORAGE.rewards, rewardStamps);
        saveStorage(STORAGE.rewardActive, rewardActive);
    } else {
        rewardStamps = Math.min(5, rewardStamps + 1);
        saveStorage(STORAGE.rewards, rewardStamps);
    }

    cart = [];
    promoCode = "";

    saveStorage(STORAGE.cart, cart);
    saveStorage(STORAGE.promo, promoCode);

    $("#promoCode").value = "";
    updatePromoMessage("Gunakan kode NOIRE10 untuk diskon 10% (simulasi).");

    event.currentTarget.reset();

    renderCart();
    renderRewards();
    renderHistory();

    closeModal("#checkoutBackdrop");
    showReceipt(order);
    showToast("Pesanan demo berhasil dibuat ♡");
});

function showReceipt(order) {
    const date = new Date(order.date);

    const dateText = date.toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short"
    });

    $("#receiptContent").innerHTML = `
        <div class="receipt-meta">
            <div>
                <span>Order number</span>
                <strong>${escapeHTML(order.id)}</strong>
            </div>

            <div>
                <span>Date</span>
                <strong>${escapeHTML(dateText)}</strong>
            </div>

            <div>
                <span>Customer</span>
                <strong>${escapeHTML(order.customerName)}</strong>
            </div>

            <div>
                <span>Order type</span>
                <strong>${escapeHTML(order.type)}</strong>
            </div>

            <div>
                <span>Payment method</span>
                <strong>${escapeHTML(order.payment)}</strong>
            </div>

            <div>
                <span>Phone</span>
                <strong>${escapeHTML(order.phone || "-")}</strong>
            </div>
        </div>

        <div class="receipt-items">
            ${order.items.map(item => `
                <div class="receipt-line">
                    <span>${escapeHTML(item.nama)} × ${item.quantity}</span>
                    <span>${formatRupiah(item.harga * item.quantity)}</span>
                </div>
            `).join("")}
        </div>

        <div class="receipt-line">
            <span>Subtotal</span>
            <span>${formatRupiah(order.subtotal)}</span>
        </div>

        ${order.discount > 0 ? `
            <div class="receipt-line">
                <span>Discount</span>
                <span>-${formatRupiah(order.discount)}</span>
            </div>
        ` : ""}

        <div class="receipt-total">
            <span>TOTAL</span>
            <span>${formatRupiah(order.total)}</span>
        </div>

        ${order.note ? `
            <p class="receipt-note">
                <strong>Order note:</strong>
                ${escapeHTML(order.note)}
            </p>
        ` : ""}

        <p class="receipt-note">
            This is a demo receipt from NOIRÉ Café.
            No real payment was processed.
        </p>
    `;

    openModal("#receiptBackdrop");
}

$("#printReceipt").addEventListener("click", () => window.print());

// NOIRE REWARDS

function renderRewards() {
    $("#rewardCount").textContent = `${rewardStamps} / 5`;
    $("#rewardFill").style.width = `${rewardStamps / 5 * 100}%`;

    $("#stampGrid").innerHTML = Array.from({ length: 5 }, (_, index) => `
        <div class="stamp ${index < rewardStamps ? "filled" : ""}">
            ${index < rewardStamps ? "♥" : "♡"}
        </div>
    `).join("");

    const ready = rewardStamps >= 5;

    $("#useRewardButton").hidden = !ready;
    $("#rewardStatus").textContent = ready
        ? "Reward kamu sudah siap! Aktifkan diskon 20% di keranjang."
        : `Kamu punya ${rewardStamps} dari 5 stamp. Selesaikan pesanan demo untuk mengumpulkan stamp.`;
}

$("#useRewardButton").addEventListener("click", () => {
    if (rewardStamps < 5) return;

    rewardActive = !rewardActive;
    saveStorage(STORAGE.rewardActive, rewardActive);

    renderCart();

    showToast(
        rewardActive
            ? "Reward 20% diaktifkan ♡"
            : "Reward 20% dinonaktifkan"
    );

    $("#useRewardButton").textContent = rewardActive
        ? "Reward activated ✓"
        : "Use my 20% reward";

    $("#useRewardButton").disabled = rewardActive;
});

// REVIEWS AND RATINGS

function populateReviewMenu() {
    $("#reviewMenu").innerHTML = menuData.map(menu => `
        <option value="${menu.id}">${escapeHTML(menu.nama)}</option>
    `).join("");
}

function updateStarPicker() {
    $$("#starPicker button").forEach(button => {
        const rating = Number(button.dataset.rating);
        button.classList.toggle("selected", rating <= selectedRating);
        button.setAttribute("aria-pressed", rating === selectedRating ? "true" : "false");
    });
}

$$("#starPicker button").forEach(button => {
    button.addEventListener("click", () => {
        selectedRating = Number(button.dataset.rating);
        updateStarPicker();
    });
});

$("#reviewForm").addEventListener("submit", event => {
    event.preventDefault();

    const name = $("#reviewName").value.trim();
    const menuId = Number($("#reviewMenu").value);
    const reviewText = $("#reviewText").value.trim();
    const menu = getMenu(menuId);

    if (!name || !reviewText || !menu) {
        showToast("Lengkapi nama, menu, dan ulasan kamu.");
        return;
    }

    reviews.unshift({
        id: Date.now(),
        name,
        menu: menu.nama,
        rating: selectedRating,
        text: reviewText,
        date: new Date().toISOString()
    });

    saveStorage(STORAGE.reviews, reviews);

    event.currentTarget.reset();
    selectedRating = 5;
    updateStarPicker();
    renderReviews();

    showToast("Terima kasih untuk love note kamu ♡");
});

function renderReviews() {
    const count = reviews.length;

    const average = count
        ? reviews.reduce((sum, review) => sum + Number(review.rating), 0) / count
        : 0;

    $("#reviewAverage").textContent = count ? average.toFixed(1) : "—";
    $("#reviewTotal").textContent = count
        ? `${count} ulasan pelanggan`
        : "Belum ada ulasan pelanggan";

    if (!count) {
        $("#reviewList").innerHTML = `
            <div class="no-reviews">
                Belum ada ulasan nih. Jadi yang pertama, yuk! ♡
            </div>
        `;
        return;
    }

    $("#reviewList").innerHTML = reviews.slice(0, 20).map(review => {
        const date = new Date(review.date);

        return `
            <article class="review-item">
                <div class="review-item-top">
                    <div>
                        <h4>${escapeHTML(review.name)}</h4>
                        <small>${escapeHTML(review.menu)} · ${escapeHTML(date.toLocaleDateString("id-ID"))}</small>
                    </div>

                    <span class="review-stars">
                        ${"★".repeat(Math.max(0, Math.min(5, Number(review.rating))))}
                    </span>
                </div>

                <p>${escapeHTML(review.text)}</p>
            </article>
        `;
    }).join("");
}

// ORDER HISTORY

function renderHistory() {
    if (!orders.length) {
        $("#historyList").innerHTML = `
            <div class="no-reviews">
                Belum ada riwayat pesanan.
                Yuk, pilih treat favorit kamu dulu ♡
            </div>
        `;

        $("#clearHistory").disabled = true;
        return;
    }

    $("#clearHistory").disabled = false;

    $("#historyList").innerHTML = orders.map(order => {
        const date = new Date(order.date);

        const itemsSummary = order.items
            .map(item => `${item.nama} × ${item.quantity}`)
            .join(", ");

        return `
            <article class="history-item">
                <div class="history-item-head">
                    <div>
                        <h3>${escapeHTML(order.id)}</h3>
                        <small>${escapeHTML(date.toLocaleString("id-ID"))}</small>
                    </div>

                    <strong>${formatRupiah(order.total)}</strong>
                </div>

                <p>${escapeHTML(itemsSummary)}</p>

                <small>
                    ${escapeHTML(order.customerName)} ·
                    ${escapeHTML(order.type)} ·
                    ${escapeHTML(order.payment)}
                </small>

                <div class="history-item-actions">
                    <button type="button" data-view-order="${escapeHTML(order.id)}">
                        View receipt
                    </button>

                    <button type="button" data-reorder="${escapeHTML(order.id)}">
                        Order again
                    </button>
                </div>
            </article>
        `;
    }).join("");
}

$("#openHistory").addEventListener("click", () => {
    renderHistory();
    openModal("#historyBackdrop");
});

$("#historyList").addEventListener("click", event => {
    const receiptButton = event.target.closest("[data-view-order]");
    const reorderButton = event.target.closest("[data-reorder]");

    if (receiptButton) {
        const order = orders.find(item => item.id === receiptButton.dataset.viewOrder);
        if (order) {
            closeModal("#historyBackdrop");
            showReceipt(order);
        }
    }

    if (reorderButton) {
        const order = orders.find(item => item.id === reorderButton.dataset.reorder);
        if (!order) return;

        order.items.forEach(item => {
            if (item.isBundle) {
                const bundle = promoBundles.find(bundleItem => bundleItem.id === item.id);

                if (bundle) {
                    addToCart(bundle.items[0], item.quantity, true);
                    addToCart(bundle.items[1], item.quantity, true);
                }
            } else if (getMenu(item.id)) {
                addToCart(item.id, item.quantity, true);
            }
        });

        renderCart();
        closeModal("#historyBackdrop");
        openCart();
        showToast("Menu dari pesanan sebelumnya ditambahkan ♡");
    }
});

$("#clearHistory").addEventListener("click", () => {
    if (!orders.length) return;

    const confirmed = confirm(
        "Yakin ingin menghapus semua riwayat pesanan dari browser ini?"
    );

    if (!confirmed) return;

    orders = [];
    saveStorage(STORAGE.orders, orders);
    renderHistory();
    showToast("Riwayat pesanan sudah dihapus.");
});

// TOAST

function showToast(message) {
    $("#toast").textContent = message;
    $("#toast").classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        $("#toast").classList.remove("show");
    }, 2500);
}

// INITIALIZE

populateReviewMenu();
updateStarPicker();
renderMenu();
renderPromos();
renderCart();
renderRewards();
renderReviews();
renderHistory();

if (rewardActive && rewardStamps >= 5) {
    $("#useRewardButton").textContent = "Reward activated ✓";
    $("#useRewardButton").disabled = true;
} else {
    rewardActive = false;
    saveStorage(STORAGE.rewardActive, false);
}
