  // Product Data
  const products = [
    { 
        id: 1, 
        name: 'Organic Apples', 
        price: 299, 
        image: 'Assets/apples.avif',
        category: 'fruits',
        weight: '1 kg',
        rating: 4.5,
        badge: 'Organic'
    },
    { 
        id: 2, 
        name: 'Fresh Bread', 
        price: 49, 
        image: 'Assets/bread.avif',
        category: 'bakery',
        weight: '400g',
        rating: 4.8,
        badge: 'Fresh Range'
    },
    { 
        id: 3, 
        name: 'Fresh Orange', 
        price: 259, 
        image: 'Assets/orange.avif',
        category: 'fruits',
        weight: '1 kg',
        rating: 4.7,
        badge: 'Organic'
    },
    { 
        id: 4, 
        name: 'Farm Eggs', 
        price: 99, 
        image: 'Assets/eggs.avif',
        category: 'dairy',
        weight: '12 pcs',
        rating: 4.6,
        badge: 'Organic'
    },
    { 
        id: 5, 
        name: 'Organic Bananas', 
        price: 49, 
        image: 'Assets/bananas.avif',
        category: 'fruits',
        weight: '1 kg',
        rating: 4.4,
        badge: 'Organic'
    },
    { 
        id: 6, 
        name: 'Fresh Cheese', 
        price: 199, 
        image: 'Assets/cheese.avif',
        category: 'dairy',
        weight: '200g',
        rating: 4.9,
        badge: 'Fresh Range'
    },
    { 
        id: 7, 
        name: 'Fresh Tomato', 
        price: 99, 
        image: 'Assets/tomato.avif',
        category: 'vegetables',
        weight: '1 kg',
        rating: 4.6,
        badge: 'Organic'
    },
    {
        id: 8,
        name: 'Fresh Pineapple',
        price: 69,
        image: 'Assets/pineapple.avif',
        category: 'fruits',
        weigth: '1 kg',
        rating: 4.7,
        badge: 'Organic'
    },
    {
        id: 9,
        name: 'Fresh Strawberry',
        price: 369,
        image: 'Assets/strawbery.avif',
        category: 'fruits',
        weigth: '1 kg',
        rating: 4.9,
        badge: 'Organic'
    },
    {
        id: 10,
        name: 'Fresh Redish',
        price: 49,
        image: 'Assets/redish.avif',
        category: 'vegetables',
        weigth: '1 kg',
        rating: 4.3,
        badge: 'Organic'
    },
    {
        id: 11,
        name: 'Fresh Brocoli',
        price: 75,
        image: 'Assets/brocoli.avif',
        category: 'vegetables',
        weigth: '1 kg',
        rating: 4.8,
        badge: 'Organic'
    }
    // Add more products as needed
];


// Group products by category
function groupProductsByCategory(products) {
    return products.reduce((acc, product) => {
         if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    },{});
}

// Render product card
function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <div class="product-image-wrapper">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <img src="${product.image}" alt="${product.name}" class="product-image">
        </div>
        <div class="product-details">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-meta">
                <span class="product-weight">${product.weight}</span>
                <span class="product-rating">
                    ${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 ? '½' : ''}
                    <span style="color: #666">${product.rating}</span>
                </span>
            </div>
            <div class="product-price">₹${product.price.toFixed(2)}</div>
            <button class="add-to-cart" data-id="${product.id}">
                Add to Cart <i class="fas fa-shopping-cart"></i>
            </button>
        </div>
    `;
    
    return card;
}

 // Render products by category
 function renderProductsByCategory(category = 'all') {
    const container = document.querySelector('.categories-container');
    container.innerHTML = '';

    if (category === 'all') {
        const groupedProducts = groupProductsByCategory(products);
        Object.entries(groupedProducts).forEach(([categoryName, categoryProducts]) => {
            renderCategorySection(categoryName, categoryProducts);
        });
    } else {
        const filteredProducts = products.filter(product => product.category === category);
        renderCategorySection(category, filteredProducts);
    }
}

// Render category section
function renderCategorySection(category, products) {
    const section = document.createElement('div');
    section.className = 'category-section';
    
    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
    
    section.innerHTML = `
        <div class="category-header">
            <h2 class="category-title">${categoryTitle}</h2>
            <p class="category-description">${products.length} items available</p>
        </div>
        <div class="product-grid"></div>
    `;

    const productGrid = section.querySelector('.product-grid');
    products.forEach((product, index) => {
        const card = createProductCard(product, index);
        productGrid.appendChild(card);
    });

    document.querySelector('.categories-container').appendChild(section);
    
    // Trigger animations
    setTimeout(() => {
        section.classList.add('visible');
        section.querySelectorAll('.product-card').forEach(card => {
            card.classList.add('visible');
        });
    }, 100);
}

// Category button click handlers
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // Render products for selected category
        renderProductsByCategory(button.dataset.category);
    });
});



// Cart array to store added items
let cart = [];

// Function to show specific section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Close cart sidebar
    document.getElementById('cart-sidebar').classList.remove('open');

    // If order section is shown, update order summary
    if (sectionId === 'order') {
        updateOrderSummary();
    }
}


// Render Products in Product Grid
function renderProducts(filteredProducts = products) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    filteredProducts.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card', 'fade-in');
        productCard.style.animationDelay = `${index * 0.1}s`;
        productCard.innerHTML = `
            <div class="product-image-wrapper">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-details">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-meta">
                    <span class="product-weight">${product.weight}</span>
                    <span class="product-rating">
                        ${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 ? '½' : ''}
                        <span style="color: #666">${product.rating}</span>
                    </span>
                </div>
                <div class="product-price">₹${product.price.toFixed(2)}</div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });

    // Add event listeners to Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}




// Add item to cart
function addToCart(event) {
    const productId = parseInt(event.target.dataset.id);
    const product = products.find(p => p.id === productId);

    const existingCartItem = cart.find(item => item.id === productId);
    if (existingCartItem) {
        existingCartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    openCart();
}


// Search Products
function searchProducts(query) {
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );
    renderProducts(filteredProducts);
}

// Event Listeners

// Search Bar
document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    searchProducts(query);
});

document.getElementById('search-input').addEventListener('input', (e) => {
    const query = e.target.value;
    searchProducts(query);
});

// Remove specific item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Clear entire cart
function clearCart() {
    cart = [];
    updateCart();
}

// Update cart display
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    // Clear existing cart items
    cartItems.innerHTML = '';
    
    // Calculate total and render cart items
    let total = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <div class="cart-item-actions">
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-item-btn" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    // Update total and cart count
    cartTotal.textContent = `Total: ₹${total.toFixed(2)}`;
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Add remove item event listeners
    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.currentTarget.dataset.id);
            removeFromCart(productId);
        });
    });
}

// Open cart sidebar
function openCart() {
    document.getElementById('cart-sidebar').classList.add('open');
}

// Close cart sidebar
function closeCart() {
    document.getElementById('cart-sidebar').classList.remove('open');
}

// Event Listeners

// Navigation
document.getElementById('home-nav').addEventListener('click', () => showSection('home'));
document.getElementById('products-nav').addEventListener('click', () => showSection('products'));
//Add new navigation event listener for contact section
document.getElementById('contact-nav').addEventListener('click', () => showSection('contact'));

// Cart Controls
document.getElementById('continue-shopping-btn').addEventListener('click', () => showSection('products'));
document.getElementById('clear-cart-btn').addEventListener('click', clearCart);

// Home return button in cart
document.getElementById('home-return-btn').addEventListener('click', () => {
    showSection('home');
    document.getElementById('cart-sidebar').classList.remove('open');
});

// Cart Icon
document.querySelector('.cart-icon').addEventListener('click', openCart);

// Initial render
renderProducts();


// Add contact form submission handler
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
});





// Update Order Summary
function updateOrderSummary() {
    const orderSummary = document.getElementById('order-summary');
    const orderTotal = document.getElementById('order-total');

    // Clear existing order summary
    orderSummary.innerHTML = '';

    // Calculate total and render order items
    let total = 0;
    cart.forEach(item => {
        const orderItem = document.createElement('li');
        orderItem.innerHTML = 
            `<span>${item.name} x ${item.quantity}</span>
            <span>₹${(item.price * item.quantity).toFixed(2)}</span>`;
        orderSummary.appendChild(orderItem);
        total += item.price * item.quantity;
    });

    // Update order total
    orderTotal.textContent = `Total: ₹${total.toFixed(2)}`;
}


// Delivery Form Submission
document.getElementById('delivery-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const notes = document.getElementById('notes').value;

    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to your cart before placing an order.');
        return;
    }

    // Simulate order placement
    alert(`Order placed successfully!\n\nName: ${name}\nAddress: ${address}\nPhone: ${phone}\nNotes: ${notes}\n\nTotal: ₹${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}`);
    clearCart();
    showSection('home');
});


// add new scroll animation handler
function handleScrollAnimation(){
    const elements = document.querySelectorAll('.scroll-animation');
    elements.forEach(element =>{
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);

        if(isVisible){
            element.classList.add('active');
        }
    });
}

// Initializes scroll animations
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimation();
    // Add scroll event listener with debounce
    let timeout;
    window.addEventListener('scroll', () => {
        if(timeout){
            window.cancelAnimationFrame(timeout);
        }
        timeout = window.requestAnimationFrame(() => {
            handleScrollAnimation();
        });
    });
});

// Add stagger effect to service cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.3}s`;
    });
});





// Hamburger Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navContainer = document.querySelector('.nav-container');
const navLinks = document.querySelectorAll('.nav-links a');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navContainer.classList.toggle('active');
});

// Close menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navContainer.classList.remove('active');
    });
});


// Ensure proper scrolling behavior on mobile
        document.addEventListener('DOMContentLoaded', () => {
            // Enable touch scrolling on iOS
            document.addEventListener('touchmove', (e) => {
                e.stopPropagation();
            }, { passive: true });

            // Fix menu scrolling issues
            const navContainer = document.querySelector('.nav-container');
            navContainer.addEventListener('touchmove', (e) => {
                e.stopPropagation();
            }, { passive: true });

            // Fix cart sidebar scrolling
            const cartSidebar = document.querySelector('.cart-sidebar');
            cartSidebar.addEventListener('touchmove', (e) => {
                e.stopPropagation();
            }, { passive: true });

            // Improve mobile menu behavior
            const menuToggle = document.querySelector('.menu-toggle');
            menuToggle.addEventListener('click', () => {
                document.body.style.overflow = 
                    navContainer.classList.contains('active') ? 'auto' : 'hidden';
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navContainer.contains(e.target) && !menuToggle.contains(e.target)) {
                    menuToggle.classList.remove('active');
                    navContainer.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });

            // Optimize scroll performance
            let scrollTimeout;
            window.addEventListener('scroll', () => {
                if (scrollTimeout) {
                    window.cancelAnimationFrame(scrollTimeout);
                }
                scrollTimeout = window.requestAnimationFrame(() => {
                    handleScrollAnimation();
                });
            }, { passive: true });
        });


// Prevent body scroll when menu is open
menuToggle.addEventListener('click', () => {
    document.body.style.overflow = navContainer.classList.contains('active') ? 'hidden' : 'auto';
});
