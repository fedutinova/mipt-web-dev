// Общие функции для всех страниц
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация корзины в localStorage, если ее нет
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    // Обновление счетчика товаров в корзине
    updateCartCounter();
});

// Функция для показа уведомления
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Функция обновления счетчика товаров в корзине
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const counterElements = document.querySelectorAll('.cart-counter');
    
    counterElements.forEach(el => {
        el.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    });
}

// Функция добавления товара в корзину
function addToCart(productId, productName, price, quantity = 1) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
    showNotification('Товар добавлен в корзину');
}

// Функция удаления товара из корзины
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
    location.reload(); // Перезагружаем страницу для обновления списка
}

// Функция изменения количества товара в корзине
function updateCartItemQuantity(productId, newQuantity) {
    if (newQuantity < 1) return;
    
    const cart = JSON.parse(localStorage.getItem('cart'));
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCounter();
        updateCartTotal(); // Обновляем общую сумму
    }
}

// Функция расчета общей суммы в корзине
function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Обновляем на странице корзины
    const totalElement = document.querySelector('.cart-total');
    if (totalElement) {
        totalElement.textContent = `${total.toLocaleString()} ₽`;
    }
    
    return total;
}

// Функция для показа модального окна
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Функция для закрытия модального окна
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
};
