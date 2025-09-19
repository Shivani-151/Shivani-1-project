const categories = ["All", "Electronics", "Clothing", "Books", "Toys"];
const products = [{
        id: 1,
        name: "Wireless Earbuds",
        category: "Electronics",
        img: "https://via.placeholder.com/200x150?text=Earbuds",
        description: "Noise-cancelling, long battery life.",
        price: 999
    },
    {
        id: 2,
        name: "Smartphone",
        category: "Electronics",
        img: "https://via.placeholder.com/200x150?text=Phone",
        description: "Fast processor, stunning display.",
        price: 14999
    },
    {
        id: 3,
        name: "T-shirt",
        category: "Clothing",
        img: "https://via.placeholder.com/200x150?text=T-shirt",
        description: "Cotton, available in all sizes.",
        price: 399
    },
    {
        id: 4,
        name: "Adventure Novel",
        category: "Books",
        img: "https://via.placeholder.com/200x150?text=Book",
        description: "Thrilling story, must-read!",
        price: 199
    },
    {
        id: 5,
        name: "Action Figure",
        category: "Toys",
        img: "https://via.placeholder.com/200x150?text=Toy",
        description: "Kids’ favorite character.",
        price: 299
    },
];

let cart = [];
let filteredProducts = [...products];

const categoriesContainer = document.getElementById("categories");
const productsContainer = document.getElementById("products");
const searchBar = document.getElementById("searchBar");
const sortSelect = document.getElementById("sortSelect");
const modal = document.getElementById("productModal");
const modalContent = document.getElementById("modalContent");
const cartCount = document.getElementById("cart-count");

function updateCartCount() {
    cartCount.innerText = cart.length;
}

function renderCategories() {
    categories.forEach(cat => {
        const btn = document.createElement("div");
        btn.className = "category";
        btn.innerText = cat;
        btn.onclick = () => {
            filterByCategory(cat);
        };
        categoriesContainer.appendChild(btn);
    });
}

function filterByCategory(category) {
    filteredProducts = category === "All" ? [...products] : products.filter(p => p.category === category);
    renderProducts();
}

function renderProducts() {
    productsContainer.innerHTML = "";
    const sorted = sortProducts(filteredProducts);
    sorted.forEach(prod => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
      <img src="${prod.img}" alt="${prod.name}" />
      <h3>${prod.name}</h3>
      <p>₹${prod.price}</p>
      <button onclick="openModal(${prod.id})">View</button>
    `;
        productsContainer.appendChild(card);
    });
}

function sortProducts(list) {
    const val = sortSelect.value;
    if (val === "asc") return [...list].sort((a, b) => a.price - b.price);
    if (val === "desc") return [...list].sort((a, b) => b.price - a.price);
    return list;
}

function openModal(id) {
    const p = products.find(pr => pr.id === id);
    modal.style.display = "flex";
    modalContent.innerHTML = `
    <h2>${p.name}</h2>
    <img src="${p.img}" alt="${p.name}" style="width: 100%; max-width: 300px;" />
    <p>${p.description}</p>
    <p><strong>₹${p.price}</strong></p>
    <button onclick="addToCart(${p.id})">Add to Cart</button><br/><br/>
    <button onclick="closeModal()">Close</button>
  `;
}

function closeModal() {
    modal.style.display = "none";
}

function addToCart(id) {
    const p = products.find(pr => pr.id === id);
    cart.push(p);
    alert(`${p.name} added to cart!`);
    updateCartCount();
}

window.onclick = function(event) {
    if (event.target === modal) closeModal();
};

searchBar.addEventListener("input", () => {
    const keyword = searchBar.value.toLowerCase();
    filteredProducts = products.filter(p => p.name.toLowerCase().includes(keyword));
    renderProducts();
});

sortSelect.addEventListener("change", renderProducts);

// Initialize
renderCategories();
renderProducts();
updateCartCount();