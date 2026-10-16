<?php
// NOIRE CAFE - PHP OOP FOOD ORDERING WEBSITE

class Menu
{
    private $id;
    private $nama;
    private $harga;
    protected $kategori;
    protected $deskripsi;
    protected $foto;
    protected $rating;
    protected $bestSeller;

    public function __construct(
        $id,
        $nama,
        $harga,
        $kategori,
        $deskripsi,
        $foto,
        $rating = 4.8,
        $bestSeller = false
    ) {
        $this->id = $id;
        $this->nama = $nama;
        $this->harga = $harga;
        $this->kategori = $kategori;
        $this->deskripsi = $deskripsi;
        $this->foto = $foto;
        $this->rating = $rating;
        $this->bestSeller = $bestSeller;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getNama()
    {
        return $this->nama;
    }

    public function getHarga()
    {
        return $this->harga;
    }

    public function setHarga($harga)
    {
        if ($harga >= 0) {
            $this->harga = $harga;
        }
    }

    public function displayInfo()
    {
        return [
            'id' => $this->id,
            'nama' => $this->nama,
            'harga' => $this->harga,
            'kategori' => $this->kategori,
            'deskripsi' => $this->deskripsi,
            'foto' => $this->foto,
            'rating' => $this->rating,
            'bestSeller' => $this->bestSeller
        ];
    }
}

class Makanan extends Menu
{
    public function displayInfo()
    {
        $data = parent::displayInfo();
        $data['jenis'] = 'Makanan';
        return $data;
    }
}

class Minuman extends Menu
{
    public function displayInfo()
    {
        $data = parent::displayInfo();
        $data['jenis'] = 'Minuman';
        return $data;
    }
}

// Daftar menu NOIRE
$menuList = [
    new Makanan(1, 'Classic Beef Burger', 42000, 'Makanan', 'Beef patty juicy, cheddar, selada, dan saus house special.', 'burger', 4.9, true),
    new Makanan(2, 'Crispy Chicken Burger', 36000, 'Makanan', 'Ayam crispy renyah dengan creamy mayo dan selada segar.', 'chicken-burger', 4.8, false),
    new Makanan(3, 'Truffle Mushroom Pasta', 48000, 'Makanan', 'Pasta creamy dengan jamur dan taburan parmesan.', 'mushroom-pasta', 4.9, true),
    new Makanan(4, 'Spicy Chicken Rice', 33000, 'Makanan', 'Nasi hangat dengan ayam pedas gurih dan wijen.', 'spicy-chicken-rice', 4.7, false),
    new Makanan(5, 'Beef Teriyaki Bowl', 39000, 'Makanan', 'Irisan sapi saus teriyaki, nasi, dan sayuran pilihan.', 'beef-teriyaki', 4.8, false),
    new Makanan(6, 'Chicken Katsu Curry', 40000, 'Makanan', 'Chicken katsu renyah disajikan dengan kari Jepang.', 'chicken-katsu', 4.8, true),
    new Makanan(7, 'Margherita Pizza', 45000, 'Makanan', 'Pizza dengan mozzarella, tomat, dan basil.', 'pizza', 4.7, false),
    new Makanan(8, 'Creamy Carbonara', 46000, 'Makanan', 'Spaghetti creamy dengan smoked beef dan keju.', 'carbonara', 4.9, true),
    new Makanan(9, 'Fish and Chips', 43000, 'Makanan', 'Ikan goreng tepung dengan kentang dan saus tartar.', 'fish-chips', 4.6, false),
    new Makanan(10, 'Loaded French Fries', 24000, 'Makanan', 'Kentang goreng dengan saus keju dan parsley.', 'french-fries', 4.7, false),
    new Makanan(11, 'Chicken Caesar Salad', 32000, 'Makanan', 'Selada segar, ayam panggang, crouton, dan dressing Caesar.', 'chicken-salad', 4.6, false),
    new Makanan(12, 'Chicken Quesadilla', 35000, 'Makanan', 'Tortilla panggang isi ayam, paprika, dan keju leleh.', 'quesadilla', 4.7, false),

    new Makanan(13, 'Butter Croissant', 18000, 'Bakery', 'Croissant renyah berlapis dengan aroma butter.', 'croissant', 4.9, true),
    new Makanan(14, 'Chocolate Croissant', 22000, 'Bakery', 'Pastry flaky dengan isian cokelat yang lumer.', 'chocolate-croissant', 4.8, true),
    new Makanan(15, 'Cinnamon Roll', 24000, 'Bakery', 'Roti gulung kayu manis dengan glaze manis.', 'cinnamon-roll', 4.8, false),
    new Makanan(16, 'Blueberry Cheesecake', 32000, 'Bakery', 'Cheesecake lembut dengan topping blueberry.', 'blueberry-cheesecake', 4.9, true),
    new Makanan(17, 'Garlic Cheese Toast', 25000, 'Bakery', 'Roti panggang gurih dengan garlic butter dan keju.', 'cheese-toast', 4.7, false),
    new Makanan(18, 'Classic Donut', 16000, 'Bakery', 'Donat empuk dengan glaze manis sederhana.', 'donut', 4.6, false),

    new Minuman(19, 'Iced Spanish Latte', 28000, 'Minuman', 'Espresso dan susu dengan rasa manis yang lembut.', 'spanish-latte', 4.9, true),
    new Minuman(20, 'Iced Matcha Latte', 30000, 'Minuman', 'Matcha earthy dengan susu creamy dan es.', 'matcha-latte', 4.8, true),
    new Minuman(21, 'Strawberry Milk', 26000, 'Minuman', 'Susu segar dengan rasa stroberi yang fruity.', 'strawberry-milk', 4.7, false),
    new Minuman(22, 'Iced Chocolate', 28000, 'Minuman', 'Cokelat dingin yang creamy dan rich.', 'iced-chocolate', 4.8, false),
    new Minuman(23, 'Peach Iced Tea', 22000, 'Minuman', 'Teh dingin dengan rasa peach yang segar.', 'peach-tea', 4.7, false),
    new Minuman(24, 'Caramel Macchiato', 30000, 'Minuman', 'Kopi susu dengan vanilla dan drizzle karamel.', 'caramel-macchiato', 4.9, true),
    new Minuman(25, 'Lemon Mojito', 24000, 'Minuman', 'Lemon, mint, soda, dan es yang menyegarkan.', 'lemon-mojito', 4.6, false),
    new Minuman(26, 'Berry Smoothie', 29000, 'Minuman', 'Smoothie berry dengan tekstur lembut dan segar.', 'berry-smoothie', 4.8, false),
    new Minuman(27, 'Iced Americano', 22000, 'Minuman', 'Espresso dengan air dan es, simpel dan bold.', 'iced-americano', 4.7, false),
    new Minuman(28, 'Vanilla Milkshake', 30000, 'Minuman', 'Milkshake vanilla creamy dengan whipped cream.', 'vanilla-milkshake', 4.8, false)
];

$menuData = [];

foreach ($menuList as $menu) {
    $menuData[] = $menu->displayInfo();
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#fbf5ee">

    <title>NOIRÉ Café — Coffee, Bites & Bakery</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://images.unsplash.com">

    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="style.css">

    <script>
        const menuData = <?php
            echo json_encode(
                $menuData,
                JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
            );
        ?>;
    </script>

    <script src="script.js" defer></script>
</head>

<body>

<header class="topbar">
    <a href="#" class="brand">
        <span class="brand-mark">N</span>
        <span class="brand-name">
            NOIRÉ
            <small>CAFÉ · COFFEE · BAKERY</small>
        </span>
    </a>

    <nav class="nav-links">
        <a href="#menu">Our Menu</a>
        <a href="#promos">Special Offers</a>
        <a href="#rewards">Rewards</a>
    </nav>

    <div class="header-actions">
        <button class="theme-toggle" id="themeToggle" type="button" aria-label="Ganti tema">
            <span id="themeIcon">☾</span>
            <span id="themeLabel">Dark mode</span>
        </button>

        <button class="cart-button" id="openCart" type="button">
            <span>My order</span>
            <span class="cart-count" id="cartCount">0</span>
        </button>
    </div>
</header>

<main>

    <!-- HERO -->
    <section class="hero" id="about">
        <div class="hero-copy">
            <div class="hero-pill">
                <span>✦</span>
                YOUR NEW LITTLE HAPPY PLACE
            </div>

            <h1>
                A little sip,<br>
                a little <em>sweetness.</em>
            </h1>

            <p class="hero-description">
                Coffee, comfort food, and freshly baked treats.
                Sudut kecil buat nemenin cerita, tugas, atau
                sekadar me-time kamu.
            </p>

            <a href="#menu" class="primary-button">
                Explore our menu <span>↗</span>
            </a>

            <div class="hero-perks">
                <span>♡ Made with care</span>
                <span>✳ Fresh every day</span>
            </div>
        </div>

        <div class="hero-art">
            <div class="shape shape-blue"></div>
            <div class="shape shape-pink"></div>

            <img
                class="hero-main-image"
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=85"
                alt="Suasana café yang nyaman"
            >

            <div class="hero-sticker">
                <span>GOOD</span>
                <strong>MOOD</strong>
                <span>ONLY ☻</span>
            </div>

            <div class="hero-caption">
                <span class="caption-icon">☕</span>
                <div>
                    <strong>Take a little break.</strong>
                    <small>You deserve something lovely.</small>
                </div>
            </div>
        </div>

        <div class="hero-bottom">
            <span>COFFEE · BITES · BAKERY</span>
            <span>MADE FOR YOUR LITTLE MOMENTS ↓</span>
        </div>
    </section>

    <!-- PROMO -->
    <section class="promo-section" id="promos">
        <div class="section-heading">
            <div>
                <p class="eyebrow">LITTLE TREATS, BETTER DEALS</p>
                <h2>Something <em>special.</em></h2>
            </div>

            <p class="section-subtitle">
                Paket hemat buat nemenin hari kamu.
                Pilih paketnya dan langsung tambahkan ke pesanan.
            </p>
        </div>

        <div class="promo-grid" id="promoGrid"></div>
    </section>

    <!-- MENU -->
    <section class="menu-section" id="menu">
        <div class="section-heading">
            <div>
                <p class="eyebrow">A MENU FULL OF LITTLE JOYS</p>
                <h2>
                    Pick your kind<br>
                    of <em>happy.</em>
                </h2>
            </div>

            <p class="section-subtitle">
                Dari kopi favorit sampai pastry hangat dan
                comfort food, ada sesuatu buat setiap mood kamu.
            </p>
        </div>


        <?php
        $totalMenu = count($menuList);
        $totalMakanan = 0;
        $totalMinuman = 0;
        $totalBestSeller = 0;

        foreach ($menuList as $menu) {
            $data = $menu->displayInfo();

            if ($data['kategori'] === 'Makanan' ||
                $data['kategori'] === 'Bakery') {
                $totalMakanan++;
            }

            if ($data['kategori'] === 'Minuman') {
                $totalMinuman++;
            }

            if ($data['bestSeller']) {
                $totalBestSeller++;
            }
        }

        echo '
        <div class="stats-grid">

            <div class="stat-card">
                <div class="stat-top">
                    <span>TOTAL MENU</span>
                    <span class="stat-icon">▦</span>
                </div>
                <h3>' . $totalMenu . '</h3>
                <p>Semua menu NOIRÉ Café</p>
            </div>

            <div class="stat-card">
                <div class="stat-top">
                    <span>MAKANAN & BAKERY</span>
                    <span class="stat-icon">♨</span>
                </div>
                <h3>' . $totalMakanan . '</h3>
                <p>Menu makanan dan pastry</p>
            </div>

            <div class="stat-card">
                <div class="stat-top">
                    <span>MINUMAN</span>
                    <span class="stat-icon">☕</span>
                </div>
                <h3>' . $totalMinuman . '</h3>
                <p>Kopi dan minuman favorit</p>
            </div>

            <div class="stat-card">
                <div class="stat-top">
                    <span>BEST SELLER</span>
                    <span class="stat-icon">★</span>
                </div>
                <h3>' . $totalBestSeller . '</h3>
                <p>Menu unggulan NOIRÉ</p>
            </div>

        </div>';
        ?>

        <div class="menu-toolbar">
            <div class="filter-tabs">
                <button class="filter-btn active" data-filter="Semua" type="button">
                    All treats
                </button>

                <button class="filter-btn" data-filter="Makanan" type="button">
                    Comfort food
                </button>

                <button class="filter-btn" data-filter="Bakery" type="button">
                    Bakery & sweets
                </button>

                <button class="filter-btn" data-filter="Minuman" type="button">
                    Drinks
                </button>

                <button class="filter-btn" data-filter="Favorit" type="button">
                    ♡ Favorites
                </button>

                <button class="filter-btn" data-filter="BestSeller" type="button">
                    ★ Best seller
                </button>
            </div>

            <label class="search-box">
                <span>⌕</span>
                <input
                    type="search"
                    id="searchInput"
                    placeholder="Cari menu favorit..."
                    aria-label="Cari menu"
                >
            </label>
        </div>

       <div class="menu-grid" id="menuGrid"></div>

        <p class="empty-state" id="emptyState" hidden>
            Menu yang kamu cari belum ketemu. Coba kata kunci lain, yaa.
        </p>
    </section>

    <!-- REWARDS -->
    <section class="rewards-section" id="rewards">
        <div class="rewards-card">
            <div class="rewards-copy">
                <p class="eyebrow">A LITTLE THANK YOU FROM US</p>
                <h2>NOIRÉ <em>Rewards.</em></h2>

                <p>
                    Setiap pesanan demo yang selesai akan menambah
                    stamp kamu. Kumpulkan 5 stamp untuk membuka
                    reward diskon 20% pada satu pesanan berikutnya.
                </p>

                <div class="reward-progress">
                    <div class="reward-progress-label">
                        <span>Your stamps</span>
                        <strong id="rewardCount">0 / 5</strong>
                    </div>

                    <div class="reward-track">
                        <div class="reward-fill" id="rewardFill"></div>
                    </div>
                </div>

                <p class="reward-status" id="rewardStatus">
                    Pesan sesuatu yang kamu suka untuk mulai mengumpulkan stamp ♡
                </p>

                <button class="reward-button" id="useRewardButton" type="button" hidden>
                    Use my 20% reward
                </button>
            </div>

            <div class="stamp-card">
                <span class="stamp-heading">LITTLE MOMENTS CLUB</span>
                <div class="stamp-grid" id="stampGrid"></div>
                <span class="stamp-footer">THANK YOU FOR BEING HERE ♡</span>
            </div>
        </div>
    </section>

    <!-- REVIEWS -->
    <section class="reviews-section" id="reviews">
        <div class="section-heading">
            <div>
                <p class="eyebrow">YOUR WORDS MATTER</p>
                <h2>Love notes <em>for NOIRÉ.</em></h2>
            </div>

            <p class="section-subtitle">
                Sudah mencoba menu kami? Bagikan rating dan
                ceritamu lewat ulasan singkat.
            </p>
        </div>

        <div class="reviews-layout">
            <form class="review-form" id="reviewForm">
                <label for="reviewName">Nama kamu</label>
                <input id="reviewName" name="name" maxlength="40" required placeholder="Tulis nama kamu">

                <label for="reviewMenu">Menu yang dicoba</label>
                <select id="reviewMenu" name="menu" required></select>

                <label>Rating kamu</label>
                <div class="star-picker" id="starPicker" role="group" aria-label="Pilih rating">
                    <button type="button" data-rating="1" aria-label="1 bintang">★</button>
                    <button type="button" data-rating="2" aria-label="2 bintang">★</button>
                    <button type="button" data-rating="3" aria-label="3 bintang">★</button>
                    <button type="button" data-rating="4" aria-label="4 bintang">★</button>
                    <button type="button" data-rating="5" aria-label="5 bintang">★</button>
                </div>

                <label for="reviewText">Ulasan kamu</label>
                <textarea id="reviewText" name="review" rows="4" maxlength="300" required placeholder="Ceritain pengalaman kamu..."></textarea>

                <button class="primary-button review-submit" type="submit">
                    Share your love note <span>↗</span>
                </button>
            </form>

            <div class="review-list-wrap">
                <div class="review-summary">
                    <div class="review-average" id="reviewAverage">—</div>
                    <div>
                        <div class="review-stars">★★★★★</div>
                        <p id="reviewTotal">Belum ada ulasan pelanggan</p>
                    </div>
                </div>

                <div class="review-list" id="reviewList"></div>
            </div>
        </div>
    </section>

    <!-- LITTLE REMINDER -->
    <section class="love-note">
        <div class="love-doodle">♡</div>
        <p class="eyebrow">A SOFT REMINDER</p>

        <h2>
            You deserve a pause<br>
            and something <em>sweet.</em>
        </h2>

        <p>Slow down, take a sip, enjoy the little things.</p>

        <a href="#menu" class="text-link">
            Find your treat <span>↗</span>
        </a>
    </section>

</main>

<footer>
    <a href="#" class="footer-brand">NOIRÉ<span>♥</span></a>
    <p>Your cozy corner for coffee, bites & bakery.</p>
    <span>© 2026 NOIRÉ CAFÉ</span>
</footer>

<!-- CART DRAWER -->
<div class="drawer-backdrop" id="drawerBackdrop"></div>

<aside class="cart-drawer" id="cartDrawer" aria-label="Keranjang pesanan" aria-hidden="true">
    <div class="drawer-header">
        <div>
            <p class="eyebrow">A LITTLE SOMETHING FOR YOU</p>
            <h2>Your <em>order.</em></h2>
        </div>

        <button class="close-drawer" id="closeCart" type="button" aria-label="Tutup keranjang">×</button>
    </div>

    <div class="cart-items" id="cartItems"></div>

    <div class="cart-empty" id="cartEmpty">
        <span>♡</span>
        <h3>Belum ada treat nih.</h3>
        <p>Yuk, pilih kopi, makanan, atau bakery favorit kamu.</p>
    </div>

    <div class="cart-footer">
        <div class="cart-promo">
            <label for="promoCode">Punya kode promo?</label>

            <div class="promo-input-row">
                <input id="promoCode" type="text" maxlength="20" placeholder="Contoh: NOIRE10">
                <button id="applyPromoButton" type="button">Apply</button>
            </div>

            <p class="promo-message" id="promoMessage">
                Gunakan kode NOIRE10 untuk diskon 10% (simulasi).
            </p>
        </div>

        <div class="checkout-summary">
            <div class="total-row">
                <span>Subtotal</span>
                <strong id="cartSubtotal">Rp0</strong>
            </div>

            <div class="total-row discount-row" id="discountRow" hidden>
                <span>Diskon</span>
                <strong id="discountAmount">-Rp0</strong>
            </div>

            <div class="total-row grand-total">
                <span>Total order</span>
                <strong id="cartTotal">Rp0</strong>
            </div>
        </div>

        <button class="checkout-button" id="checkoutButton" type="button">
            Continue to checkout <span>↗</span>
        </button>

        <p class="demo-note">
            Pemesanan dan pembayaran hanya simulasi untuk tugas.
        </p>
    </div>
</aside>

<!-- CHECKOUT MODAL -->
<div class="modal-backdrop" id="checkoutBackdrop">
    <section class="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkoutTitle">
        <div class="modal-heading">
            <div>
                <p class="eyebrow">ALMOST YOURS</p>
                <h2 id="checkoutTitle">Let's make it <em>official.</em></h2>
            </div>

            <button class="close-modal" id="closeCheckout" type="button" aria-label="Tutup checkout">×</button>
        </div>

        <form id="checkoutForm">
            <label for="customerName">Nama pelanggan</label>
            <input id="customerName" name="customerName" maxlength="60" required placeholder="Nama kamu">

            <label for="customerPhone">Nomor telepon (opsional)</label>
            <input id="customerPhone" name="customerPhone" type="tel" maxlength="20" placeholder="08xxxxxxxxxx">

            <label for="orderType">Tipe pesanan</label>
            <select id="orderType" name="orderType" required>
                <option value="Dine-in">Dine-in</option>
                <option value="Takeaway">Takeaway</option>
            </select>

            <label for="paymentMethod">Metode pembayaran simulasi</label>
            <select id="paymentMethod" name="paymentMethod" required>
                <option value="QRIS (simulasi)">QRIS (simulasi)</option>
                <option value="Cash (simulasi)">Cash (simulasi)</option>
                <option value="E-wallet (simulasi)">E-wallet (simulasi)</option>
            </select>

            <label for="orderNote">Catatan pesanan (opsional)</label>
            <textarea id="orderNote" name="orderNote" rows="3" maxlength="250" placeholder="Contoh: less sugar, no ice..."></textarea>

            <div class="checkout-final-total">
                <span>Total pembayaran</span>
                <strong id="checkoutTotal">Rp0</strong>
            </div>

            <button class="checkout-button" type="submit">
                Confirm demo order <span>♡</span>
            </button>

            <p class="demo-note">
                Tidak ada uang sungguhan yang diproses.
            </p>
        </form>
    </section>
</div>

<!-- RECEIPT MODAL -->
<div class="modal-backdrop" id="receiptBackdrop">
    <section class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receiptTitle">
        <div class="receipt-top">
            <span class="receipt-heart">♡</span>
            <p class="eyebrow">THANK YOU FOR CHOOSING US</p>
            <h2 id="receiptTitle">Your little <em>receipt.</em></h2>
            <p class="receipt-intro">Pesanan demo kamu berhasil dibuat!</p>
        </div>

        <div class="receipt-content" id="receiptContent"></div>

        <div class="receipt-actions">
            <button class="primary-button" id="printReceipt" type="button">
                Print receipt <span>↗</span>
            </button>

            <button class="secondary-button" id="closeReceipt" type="button">
                Back to NOIRÉ
            </button>
        </div>
    </section>
</div>

<!-- ORDER HISTORY MODAL -->
<div class="modal-backdrop" id="historyBackdrop">
    <section class="history-modal" role="dialog" aria-modal="true" aria-labelledby="historyTitle">
        <div class="modal-heading">
            <div>
                <p class="eyebrow">YOUR LITTLE MEMORIES</p>
                <h2 id="historyTitle">Order <em>history.</em></h2>
            </div>

            <button class="close-modal" id="closeHistory" type="button" aria-label="Tutup riwayat">×</button>
        </div>

        <div id="historyList" class="history-list"></div>

        <button class="secondary-button full-button" id="clearHistory" type="button">
            Clear order history
        </button>
    </section>
</div>

<!-- HISTORY SHORTCUT -->
<button class="history-shortcut" id="openHistory" type="button" aria-label="Lihat riwayat pesanan">
    <span>◷</span>
    <span>My history</span>
</button>

<div class="toast" id="toast" role="status"></div>

</body>
</html>
