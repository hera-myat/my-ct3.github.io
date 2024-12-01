// Define cart as an array of objects with product names and prices
const cart = [];

// Define the product details (name and price) for each item
const products = [
    { name: 'HI-542D53484952540A', price: 29.99 },
    { name: 'HI-424F4F4B0A0A', price: 12.99 },
    { name: 'HI-4241470A0A', price: 39.99 },
    { name: 'HI-4245414E49450A0A', price: 25.99 }
];

// Handle Add to Cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Add the product to the cart array with its price
        cart.push(products[index]);
        alert(`${products[index].name} has been added to your cart!`);
    });
});

// Handle View Cart button
document.getElementById('view-cart').addEventListener('click', () => {
    if (cart.length > 0) {
        const cartItemsList = document.getElementById('cart-items-list');
        const totalCostElement = document.getElementById('total-cost');
        
        cartItemsList.innerHTML = ''; // Clear any previous cart items
        let totalCost = 0;

        // Iterate through cart items to display them and calculate total cost
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItemsList.appendChild(li);
            totalCost += item.price;
        });

        // Update total cost display
        totalCostElement.textContent = `Total Cost: $${totalCost.toFixed(2)}`;

        // Display the cart popup
        document.getElementById('cart-popup').style.display = 'flex';
    } else {
        alert('Your cart is empty.');
    }
});

// Handle closing the cart popup
document.getElementById('close-btn').addEventListener('click', () => {
    document.getElementById('cart-popup').style.display = 'none';
});

// Handle closing the cart popup with the DONE button
document.getElementById('done-btn').addEventListener('click', () => {
    document.getElementById('cart-popup').style.display = 'none';
});

// Handle subscription email pop-up
document.getElementById('close-email-popup').addEventListener('click', () => {
    document.getElementById('email-popup').style.display = 'none';
});

document.getElementById('subscribe-btn').addEventListener('click', () => {
    const emailInput = document.getElementById('email-input').value;
    if (emailInput) {
        alert(`Thanks for subscribing with ${emailInput}!`);
        document.getElementById('email-popup').style.display = 'none';
    } else {
        alert('Please enter a valid email address.');
    }
});

// Show the email subscription pop-up when the page loads
window.onload = () => {
    document.getElementById('email-popup').style.display = 'flex';
};