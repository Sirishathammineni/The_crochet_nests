document.addEventListener("DOMContentLoaded", function() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let products = JSON.parse(localStorage.getItem("products")) || [];

    let ordersList = document.getElementById("orders-list");
    let productList = document.getElementById("product-list");

    // Load Orders
    function loadOrders() {
        ordersList.innerHTML = "";
        orders.forEach((order, index) => {
            let row = `
                <tr>
                    <td>${order.name}</td>
                    <td>${order.address}</td>
                    <td>${order.paymentMode}</td>
                    <td>₹${order.totalAmount}</td>
                    <td>${order.status || "Pending"}</td>
                    <td>
                        <select onchange="updateOrderStatus(${index}, this.value)">
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </td>
                </tr>
            `;
            ordersList.innerHTML += row;
        });
    }

    // Update Order Status
    window.updateOrderStatus = function(index, status) {
        orders[index].status = status;
        localStorage.setItem("orders", JSON.stringify(orders));
        loadOrders();
    };

    // Add Product
    document.getElementById("add-product-form").addEventListener("submit", function(e) {
        e.preventDefault();
        let productName = document.getElementById("product-name").value;
        let productPrice = document.getElementById("product-price").value;
        products.push({ name: productName, price: productPrice });
        localStorage.setItem("products", JSON.stringify(products));
        loadProducts();
        alert("Product Added!");
    });

    // Load Products
    function loadProducts() {
        productList.innerHTML = "";
        products.forEach((product, index) => {
            productList.innerHTML += <li>${product.name} - ₹${product.price} <button onclick="deleteProduct(${index})">Delete</button></li>;
        });
    }

    // Delete Product
    window.deleteProduct = function(index) {
        products.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(products));
        loadProducts();
    };

    loadOrders();
    loadProducts();
});
