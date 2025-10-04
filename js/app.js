// js/app.js
class TechStore {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        this.init();
    }

    init() {
        this.loadProducts();
        this.renderProducts();
        this.setupEventListeners();
        this.updateCartCount();
        this.updateWishlistCount();
        this.setupScrollEffects();
        this.updateStats();
    }

    loadProducts() {
        this.products = products;
        this.filteredProducts = [...this.products];
    }

    renderProducts() {
        const grid = document.getElementById('productsGrid');
        grid.innerHTML = '';

        if (this.filteredProducts.length === 0) {
            grid.innerHTML = `
                <div class="no-products">
                    <h3>😔 Товары не найдены</h3>
                    <p>Попробуйте изменить параметры фильтрации</p>
                    <button class="btn btn-primary" onclick="techStore.resetFilters()">Сбросить фильтры</button>
                </div>
            `;
            return;
        }

        this.filteredProducts.forEach(product => {
            const productElement = this.createProductCard(product);
            grid.appendChild(productElement);
        });
    }

    createProductCard(product) {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
            ${this.getProductBadges(product)}
            <img src="${product.image}" alt="${product.name}" class="product-card__image" 
                 onerror="this.src='https://via.placeholder.com/300x400/CCCCCC/666666?text=Изображение+готовится'; this.onerror=null;">
            <h3 class="product-card__title">${product.name}</h3>
            <div class="product-card__price">
                ${this.getPriceHTML(product)}
            </div>
            <div class="product-card__features">
                ${this.getFeaturesHTML(product)}
            </div>
            <div class="product-card__rating">
                <div class="rating-stars">${this.getStarsHTML(product.rating)}</div>
                <span class="rating-value">${product.rating}</span>
            </div>
            <div class="product-card__actions">
                <button class="btn-add-cart" onclick="techStore.addToCart(${product.id})" 
                    ${!product.inStock ? 'disabled' : ''}>
                    ${product.inStock ? '🛒 В корзину' : 'Нет в наличии'}
                </button>
                <button class="btn-wishlist" onclick="techStore.toggleWishlist(${product.id})">
                    ${this.isInWishlist(product.id) ? '❤️' : '🤍'}
                </button>
            </div>
        `;
        return div;
    }

    getProductBadges(product) {
        let badges = '';
        if (product.isNew) badges += `<span class="badge new">NEW</span>`;
        if (product.isSale) badges += `<span class="badge sale">SALE</span>`;
        if (!product.inStock) badges += `<span class="badge out">НЕТ В НАЛИЧИИ</span>`;
        return badges ? `<div class="product-badges">${badges}</div>` : '';
    }

    getPriceHTML(product) {
        if (product.oldPrice) {
            const discount = Math.round((1 - product.price / product.oldPrice) * 100);
            return `
                <span class="price-current">${product.price.toLocaleString()} ₽</span>
                <span class="price-old">${product.oldPrice.toLocaleString()} ₽</span>
                <span class="price-discount">-${discount}%</span>
            `;
        }
        return `<span class="price-current">${product.price.toLocaleString()} ₽</span>`;
    }

    getFeaturesHTML(product) {
        const features = product.features;
        let featuresHTML = '';
        
        if (features.memory) featuresHTML += `💾 ${features.memory}<br>`;
        if (features.color) featuresHTML += `🎨 ${features.color}<br>`;
        if (features.screen) featuresHTML += `📱 ${features.screen}<br>`;
        if (features.camera) featuresHTML += `📸 ${features.camera}<br>`;
        if (features.battery) featuresHTML += `🔋 ${features.battery}`;
        
        return featuresHTML || 'Характеристики не указаны';
    }

    getStarsHTML(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        let stars = '★'.repeat(fullStars);
        if (halfStar) stars += '½';
        stars += '☆'.repeat(5 - fullStars - (halfStar ? 1 : 0));
        return stars;
    }

    setupEventListeners() {
        // Фильтры
        const filterElements = ['categoryFilter', 'brandFilter', 'sortSelect', 'stockFilter', 
                               'priceMin', 'priceMax', 'resetFilters'];
        
        filterElements.forEach(element => {
            const el = document.getElementById(element);
            if (el) {
                if (element === 'resetFilters') {
                    el.addEventListener('click', () => this.resetFilters());
                } else {
                    el.addEventListener('change', () => this.applyFilters());
                    el.addEventListener('input', () => this.applyFilters());
                }
            }
        });

        // Поиск
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchProducts(e.target.value);
        });

        // Корзина
        document.getElementById('cartButton').addEventListener('click', () => {
            this.openCart();
        });

        document.getElementById('closeCart').addEventListener('click', () => {
            this.closeCart();
        });

        document.getElementById('clearCart').addEventListener('click', () => {
            this.clearCart();
        });

        document.getElementById('checkout').addEventListener('click', () => {
            this.checkout();
        });

        // Избранное
        document.getElementById('wishlistButton').addEventListener('click', () => {
            this.openWishlist();
        });
    }

    applyFilters() {
        const category = document.getElementById('categoryFilter').value;
        const brand = document.getElementById('brandFilter').value;
        const sort = document.getElementById('sortSelect').value;
        const priceMin = parseInt(document.getElementById('priceMin').value) || 0;
        const priceMax = parseInt(document.getElementById('priceMax').value) || Infinity;
        const inStockOnly = document.getElementById('stockFilter').checked;

        this.filteredProducts = this.products.filter(product => {
            const categoryMatch = category === 'all' || product.category === category;
            const brandMatch = brand === 'all' || product.brand === brand;
            const priceMatch = product.price >= priceMin && product.price <= priceMax;
            const stockMatch = !inStockOnly || product.inStock;
            
            return categoryMatch && brandMatch && priceMatch && stockMatch;
        });

        this.sortProducts(sort);
        this.renderProducts();
    }

    sortProducts(sortType) {
        switch(sortType) {
            case 'price_asc':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price_desc':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                this.filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                this.filteredProducts.sort((a, b) => b.id - a.id);
                break;
            default:
                break;
        }
    }

    searchProducts(query) {
        if (query.length < 1) {
            this.filteredProducts = [...this.products];
        } else {
            this.filteredProducts = this.products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.brand.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase()) ||
                Object.values(product.features).some(value => 
                    value.toString().toLowerCase().includes(query.toLowerCase())
                )
            );
        }
        this.applyFilters();
    }

    resetFilters() {
        document.getElementById('categoryFilter').value = 'all';
        document.getElementById('brandFilter').value = 'all';
        document.getElementById('sortSelect').value = 'default';
        document.getElementById('priceMin').value = '';
        document.getElementById('priceMax').value = '';
        document.getElementById('stockFilter').checked = false;
        
        this.filteredProducts = [...this.products];
        this.renderProducts();
        this.showNotification('Фильтры сброшены');
    }

    // Корзина
    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.showNotification(`🎉 ${product.name} добавлен в корзину!`);
        
        // Анимация добавления в корзину
        this.animateAddToCart(productId);
    }

    animateAddToCart(productId) {
        const productCard = document.querySelector(`[onclick="techStore.addToCart(${productId})"]`);
        if (productCard) {
            productCard.style.transform = 'scale(0.9)';
            setTimeout(() => {
                productCard.style.transform = 'scale(1)';
            }, 300);
        }
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
        this.showNotification('Товар удален из корзины');
    }

    updateQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.saveCart();
                this.updateCartCount();
                this.renderCart();
            }
        }
    }

    openCart() {
        this.renderCart();
        document.getElementById('cartModal').style.display = 'block';
    }

    closeCart() {
        document.getElementById('cartModal').style.display = 'none';
    }

    renderCart() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');

        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <h3>🛒 Корзина пуста</h3>
                    <p>Добавьте товары из каталога</p>
                    <button class="btn btn-primary" onclick="techStore.closeCart(); scrollToCatalog()">
                        Перейти к покупкам
                    </button>
                </div>
            `;
            cartTotal.textContent = '0';
            return;
        }

        cartItems.innerHTML = this.cart.map((item, index) => `
            <div class="cart-item" style="animation-delay: ${index * 0.1}s">
                <div class="cart-item__info">
                    <img src="${item.image}" alt="${item.name}" class="cart-item__image"
                         onerror="this.src='https://via.placeholder.com/100x100/CCCCCC/666666?text=Нет+фото'; this.onerror=null;">
                    <div class="cart-item__details">
                        <div class="cart-item__name">${item.name}</div>
                        <div class="cart-item__price">${item.price.toLocaleString()} ₽</div>
                    </div>
                </div>
                <div class="cart-item__actions">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="techStore.updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="techStore.updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="techStore.removeFromCart(${item.id})">
                        🗑️ Удалить
                    </button>
                </div>
            </div>
        `).join('');

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toLocaleString();
    }

    clearCart() {
        if (this.cart.length === 0) return;
        
        if (confirm('Очистить всю корзину?')) {
            this.cart = [];
            this.saveCart();
            this.updateCartCount();
            this.renderCart();
            this.showNotification('Корзина очищена');
        }
    }

    checkout() {
        if (this.cart.length === 0) {
            this.showNotification('Корзина пуста!', 'error');
            return;
        }

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Имитация процесса оформления заказа
        this.showNotification('🔄 Оформляем заказ...', 'info');
        
        setTimeout(() => {
            this.showNotification(`✅ Заказ оформлен! Сумма: ${total.toLocaleString()} ₽\nСпасибо за покупку!`, 'success');
            this.clearCart();
            this.closeCart();
        }, 2000);
    }

    // Избранное
    toggleWishlist(productId) {
        const index = this.wishlist.findIndex(id => id === productId);
        
        if (index > -1) {
            this.wishlist.splice(index, 1);
            this.showNotification('Удалено из избранного');
        } else {
            this.wishlist.push(productId);
            this.showNotification('❤️ Добавлено в избранное');
        }
        
        this.saveWishlist();
        this.updateWishlistCount();
        this.renderProducts();
    }

    isInWishlist(productId) {
        return this.wishlist.includes(productId);
    }

    openWishlist() {
        const wishlistProducts = this.products.filter(p => this.wishlist.includes(p.id));
        
        if (wishlistProducts.length === 0) {
            this.showNotification('В избранном пока пусто', 'info');
            return;
        }

        this.showNotification(`В избранном: ${wishlistProducts.length} товаров`, 'info');
    }

    // Статистика
    updateStats() {
        document.getElementById('productsCount').textContent = this.products.length;
        document.getElementById('categoriesCount').textContent = categories.length - 1; // minus 'all'
    }

    // Вспомогательные методы
    updateCartCount() {
        const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelector('.cart-count').textContent = count;
    }

    updateWishlistCount() {
        const count = this.wishlist.length;
        document.querySelector('.wishlist-count').textContent = count;
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }

    showNotification(message, type = 'success') {
        // Удаляем старые уведомления
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()" style="background:none; border:none; color:white; cursor:pointer; margin-left: 10px;">✕</button>
        `;
        
        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 4000);
    }

    setupScrollEffects() {
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Глобальные функции
function scrollToCatalog() {
    document.getElementById('catalog').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Инициализация приложения
const techStore = new TechStore();

// Обработчики событий
window.addEventListener('click', (e) => {
    const modal = document.getElementById('cartModal');
    if (e.target === modal) {
        techStore.closeCart();
    }
});

// Кнопка "Наверх"
window.addEventListener('scroll', () => {
    const scrollBtn = document.getElementById('scrollToTop');
    if (!scrollBtn) return;
    
    if (window.scrollY > 500) {
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }
});

// Добавляем кнопку "Наверх" в DOM
document.addEventListener('DOMContentLoaded', () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scrollToTop';
    scrollBtn.innerHTML = '↑';
    scrollBtn.onclick = scrollToTop;
    document.body.appendChild(scrollBtn);
});