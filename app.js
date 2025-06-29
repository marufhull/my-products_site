
// Fetch products from JSON file
fetch('products.json')
  .then(res => res.json())
  .then(products => {
    const productsContainer = document.getElementById("products");
    let cartItems = [];

    // Render product cards
    products.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" class="product-image">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-price">${p.price}</p>
        <p class="product-unit">${p.unit}</p>
        <input type="number" class="product-qty" placeholder="Qty">
        <button class="add-to-cart">Add to Cart</button>
      `;
      productsContainer.appendChild(card);
    });

    // Add to cart logic
    setTimeout(() => {
      document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", function () {
          const productCard = this.closest(".product-card");
          const name = productCard.querySelector(".product-name").textContent.trim();
          const price = parseFloat(productCard.querySelector(".product-price").textContent);
          const qtyInput = productCard.querySelector(".product-qty");
          const quantity = parseInt(qtyInput.value);
          if (!quantity || quantity <= 0) return;

          const existing = cartItems.find(i => i.name === name);
          if (existing) {
            existing.quantity += quantity;
          } else {
            cartItems.push({ name, price, quantity });
          }

          qtyInput.value = "";
          updatePurchaseSummary();
        });
      });
    }, 100);

    // Summary logic
    function updatePurchaseSummary() {
      const summaryBody = document.getElementById("summary-body");
      const grandTotalEl = document.getElementById("grand-total");
      summaryBody.innerHTML = "";
      let total = 0;

      cartItems.forEach(item => {
        const row = document.createElement("tr");
        const subtotal = item.price * item.quantity;
        total += subtotal;
        row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>${item.price}</td>
          <td>${subtotal}</td>
        `;
        summaryBody.appendChild(row);
      });

      grandTotalEl.textContent = total.toFixed(2);
      document.getElementById("summary").textContent = "🛒 : " + total.toFixed(2) + " BDT";
    }
  });
const productsContainer = document.getElementById("products");
let cartItems = [];

// Render product cards
products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" class="product-image" style="width: 100%; height: auto;">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-price">${p.price}</p>
        <p class="product-unit">${p.unit}</p>
        <input type="number" class="product-qty" placeholder="Qty" min="1" />
        <button class="add-to-cart">Add to Cart</button>
    `;
    productsContainer.appendChild(card);
});

// Summary logic
function updatePurchaseSummary() {
    const summaryBody = document.getElementById("summary-body");
    const grandTotalEl = document.getElementById("grand-total");
    summaryBody.innerHTML = "";
    let total = 0;
    cartItems.forEach(item => {
        const row = document.createElement("tr");
        const subtotal = item.price * item.quantity;
        total += subtotal;
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td>${subtotal}</td>
        `;
        summaryBody.appendChild(row);
    });
    grandTotalEl.textContent = total.toFixed(2);
    document.getElementById("summary").textContent = "🧾 : " + total.toFixed(2) + " BDT";
}

// Attach Add to Cart handlers
setTimeout(() => {
    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", function () {
            const productCard = this.closest(".product-card");
            const name = productCard.querySelector(".product-name").textContent.trim();
            const price = parseFloat(productCard.querySelector(".product-price").textContent);
            const qtyInput = productCard.querySelector(".product-qty");
            const quantity = parseInt(qtyInput.value);
            if (!quantity || quantity <= 0) return;

            const existing = cartItems.find(i => i.name === name);
            if (existing) {
                existing.quantity += quantity;
            } else {
                cartItems.push({ name, price, quantity });
            }

            qtyInput.value = "";
            updatePurchaseSummary();
        });
    });
}, 100);



function takeScreenshot() {
    html2canvas(document.body).then(function(canvas) {
        var link = document.createElement("a");
        link.download = "screenshot.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}
