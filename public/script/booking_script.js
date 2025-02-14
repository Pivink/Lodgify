document.addEventListener("DOMContentLoaded", function () {
    const checkIn = document.getElementById("checkIn");
    const checkOut = document.getElementById("checkOut");
    const numNights = document.getElementById("numNights");
    const totalPrice = document.getElementById("totalPrice");
    const bookNowBtn = document.getElementById("bookNowBtn");
    const pricePerNight = document.getElementById("pricePerNight");
    const price = document.getElementById("price").value;

    function calculateTotalPrice() {
        const checkInDate = new Date(checkIn.value);
        const checkOutDate = new Date(checkOut.value);

        if (checkInDate && checkOutDate && checkOutDate > checkInDate) {
            const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
            numNights.textContent = nights;
            totalPrice.textContent = "₹" + (nights * price).toLocaleString();
            pricePerNight.value = nights * price;
            console.log(pricePerNight.value );
            bookNowBtn.disabled = false;
        } else {
            numNights.textContent = "0";
            totalPrice.textContent = "₹0";
            bookNowBtn.disabled = true;
        }
    }

    checkIn.addEventListener("change", calculateTotalPrice);
    checkOut.addEventListener("change", calculateTotalPrice)
});

document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".star-input");
    const ratingInput = document.querySelector("input[name='rating']");
    
    stars.forEach((star, index) => {
        star.addEventListener("click", function () {
            const selectedRating = index + 1;
            ratingInput.value = selectedRating; // Set hidden input value

            // Update star colors
            stars.forEach((s, i) => {
                s.style.color = i < selectedRating ? "#ff385c" : "#ddd"; 
            });
        });

        // Hover effect: Temporary color change
        star.addEventListener("mouseover", function () {
            stars.forEach((s, i) => {
                s.style.color = i <= index ? "#ff385c" : "#ddd";
            });
        });

        // Reset on mouseout to reflect actual selection
        star.addEventListener("mouseout", function () {
            const selectedRating = ratingInput.value;
            stars.forEach((s, i) => {
                s.style.color = i < selectedRating ? "#ff385c" : "#ddd";
            });
        });
    });
});