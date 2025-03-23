document.addEventListener("DOMContentLoaded", function() {
    // Check if user is logged in
    let userEmail = localStorage.getItem("user_email");
    if (userEmail) {
        document.getElementById("user-email").innerText = userEmail;
    }

    // Add to Cart functionality
    let cart = [];
    document.querySelectorAll(".add-to-cart").forEach((button, index) => {
        button.addEventListener("click", () => {
            let productName = document.querySelectorAll(".product-card h4")[index].innerText;
            cart.push(productName);
            alert(productName + " added to cart!");
            localStorage.setItem("cart", JSON.stringify(cart));
        });
    });

    // Wishlist Functionality
    document.querySelectorAll(".add-to-wishlist").forEach((button, index) => {
        button.addEventListener("click", () => {
            button.style.color = "red"; // Change icon color when added to wishlist
            alert("Added to Wishlist!");
        });
    });

    // Sign out button
    document.querySelector(".signout-btn").addEventListener("click", () => {
        localStorage.removeItem("user_email");
        window.location.href = "login.html";
    });
});
