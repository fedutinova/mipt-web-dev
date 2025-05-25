const PRODUCT_API = 'http://localhost:8001/api/v1/products';

async function loadCatalog() {
  const wrap = document.querySelector('.products');
  if (!wrap) return;

  try {
    const res = await fetch(PRODUCT_API);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const products = await res.json();

    wrap.innerHTML = '';
    products.forEach(p => wrap.insertAdjacentHTML('beforeend', cardHtml(p)));
  } catch (err) {
    console.error(err);
    wrap.innerHTML = '<p style="padding:20px">Не удалось загрузить каталог 😔</p>';
  }
}

function cardHtml(p) {
  return `
    <div class="product" data-id="${p.id}">
      <img class="product-img"
           src="${p.image_url ?? 'img/no-photo.png'}"
           alt="${p.name}">
      <div class="product-info">
          <div class="product-title">${p.name}</div>
          <div style="color:#7f8c8d;">${p.description ?? ''}</div>
          <div class="product-price">
              ${Number(p.price).toLocaleString('ru-RU')} ₽
          </div>
          <a href="order.html?id=${p.id}" class="btn order-btn">Заказать</a>
      </div>
    </div>`;
}

document.addEventListener('DOMContentLoaded', loadCatalog);
