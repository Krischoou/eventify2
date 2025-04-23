document.addEventListener('DOMContentLoaded', function () {
  const products = Array.from(document.querySelectorAll('.product'));
  const productContainer = document.querySelector('.shop-products');
  const categoryButtons = document.querySelectorAll('.category-btn');
  const minPriceInput = document.getElementById('minPrice');
  const maxPriceInput = document.getElementById('maxPrice');
  const priceFilterBtn = document.querySelector('.price-filter button');
  const sortSelect = document.getElementById('sort-select');

  let currentCategory = 'all';

  function filterAndSortProducts() {
    let filtered = products;

    // Филтриране по категория
    if (currentCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.getAttribute('data-category') === currentCategory
      );
    }

    // Филтриране по цена
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

    filtered = filtered.filter(product => {
      const price = parseFloat(product.getAttribute('data-price'));
      return price >= minPrice && price <= maxPrice;
    });

    // Сортиране
    const sortValue = sortSelect.value;

    if (sortValue === 'price-asc') {
      filtered.sort((a, b) => parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price')));
    } else if (sortValue === 'price-desc') {
      filtered.sort((a, b) => parseFloat(b.getAttribute('data-price')) - parseFloat(a.getAttribute('data-price')));
    } else if (sortValue === 'popular') {
      filtered.sort((a, b) => (parseInt(b.getAttribute('data-popular')) || 0) - (parseInt(a.getAttribute('data-popular')) || 0));
    } else if (sortValue === 'discount') {
      filtered.sort((a, b) => (parseInt(b.getAttribute('data-discount')) || 0) - (parseInt(a.getAttribute('data-discount')) || 0));
    }

    // Показване
    productContainer.innerHTML = '';
    filtered.forEach(p => productContainer.appendChild(p));
  }

  // Категории
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      filterAndSortProducts();
    });
  });

  // Сортиране
  sortSelect.addEventListener('change', filterAndSortProducts);

  // Филтриране по цена
  priceFilterBtn.addEventListener('click', filterAndSortProducts);

  // Стартово показване
  filterAndSortProducts();
});


document.addEventListener("DOMContentLoaded", function () {
  const buyButtons = document.querySelectorAll(".buy-btn");

  buyButtons.forEach(button => {
    button.addEventListener("click", () => {
      const productElement = button.closest(".product");
      const title = productElement.querySelector("h4").innerText;
      const priceText = productElement.querySelector("p").innerText;
      const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
      const image = productElement.querySelector("img")?.getAttribute("src") || "";

      const product = {
        title,
        price,
        image,
        quantity: 1
      };

      // Взимаме текущата количка от localStorage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Проверяваме дали вече го има
      const existingProduct = cart.find(p => p.title === product.title);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push(product);
      }

      // Запазваме обратно
      localStorage.setItem("cart", JSON.stringify(cart));

      // Показваме съобщение
      alert(`Добавено в количката: ${title}`);
    });
  });
});

