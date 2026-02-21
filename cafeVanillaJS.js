"use strict";

const errorMessage = document.querySelector("#error_message");

const getSelectedProduct = src => {
    let selected = [];
    if (src == "images/biscotti.jpg") {
        selected = ["biscotti", 1.95, "Biscotti"];
    } else if (src == "images/cappuccino.jpg") {
        selected = ["cappuccino", 3.45, "Cappuccino"];
    } else if (src == "images/coffee.jpg") {
        selected = ["drip", 1.75, "Drip coffee"];
    } else if (src == "images/espresso.jpg") {
        selected = ["espresso", 1.95, "Espresso"];
    } else if (src == "images/latte.jpg") {
        selected = ["latte", 2.95, "Latte"];
    } else if (src == "images/scone.jpg") {
        selected = ["scone", 2.95, "Scone"];
    }
    return selected;
};

const placeOrder= () => {
    const orderSelect = document.querySelector("#order"); // Checking if the select element has any options/text, if not show error
        errorMessage.textContent = ""; // Clear previous errors
        if (orderSelect.innerHTML.trim() === "") {
            errorMessage.textContent = "Please add at least one item to your order.";
        } else {
            document.querySelector("#order_form").submit();
        }
}; 

// Replaces $(document).ready()
document.addEventListener("DOMContentLoaded", () => {
    let total = 0;
    const orderSelect = document.querySelector("#order");
    const totalDisplay = document.querySelector("#total");
   
    // Select all images inside uls
    const images = document.querySelectorAll("ul img");

    images.forEach(img => {
        const oldURL = img.getAttribute("src");
        const newURL = img.getAttribute("id");

        // Preload rollover image
        const rolloverImage = new Image();
        rolloverImage.src = newURL;

        // Mouseover event (Hover start)
        img.addEventListener("mouseenter", () => {
            img.src = newURL;
        });

        // Mouseout event (Hover end)
        img.addEventListener("mouseleave", () => {
            img.src = oldURL;
        });

        // Click event for images
        img.addEventListener("click", evt => {
            evt.preventDefault();
            const selected = getSelectedProduct(oldURL);
            // total cost update
            if (selected.length > 0) {
                //   total cost calculation
                total += selected[1];
                
                // Update order HTML
                //  Puts a hyphen between product name and price and displays it in select box
                const optionHtml = `<option value="${selected[0]}">$${selected[1]} - ${selected[2]}</option>`;
                //  Price-Name of items added to order select box one per line
                orderSelect.innerHTML += optionHtml;

                // Update total text after adding item
                totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
            }
        });
    });

    // Place Order button
    document.querySelector("#place_order").addEventListener("click", () => {
       placeOrder(); 
    });

    // Clear Order button 
    document.querySelector("#clear_order").addEventListener("click", () => {
        total = 0;
        orderSelect.innerHTML = "";
        totalDisplay.textContent = "";
        errorMessage.textContent = ""; // Clear errors on reset
    });
});

