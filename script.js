
"use strict";

/* ---------- 1. CONFIGURACIÓN Y DATOS ---------- */


const CONFIG = {
  whatsapp: "573000000000", // Número con indicativo de país, sin + ni espacios
  whatsappMessage: "Hola Beauty Glow, quiero información sobre sus productos.",
  shipping: 12000,          // Costo de envío (COP)
  freeShippingFrom: 150000, // Envío gratis desde este subtotal (COP)
  storageKey: "beautyglow_cart"
};

const photo = (id, width = 600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=75`;

const FALLBACK_IMG = "data:image/svg+xml;utf8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
  '<stop offset="0" stop-color="#f9d3de"/><stop offset="1" stop-color="#d9c3ee"/></linearGradient></defs>' +
  '<rect width="400" height="400" fill="url(#g)"/><path d="M200 120l16 48 48 16-48 16-16 48-16-48-48-16 48-16z" fill="#fff" opacity=".8"/>' +
  '<text x="200" y="320" text-anchor="middle" font-family="Georgia" font-size="22" fill="#1e1e22">BEAUTY GLOW</text></svg>');


const TONES = {
  skin: [
    { name: "Tono 1", label: "Claro",       color: "#f6dcc6" },
    { name: "Tono 2", label: "Medio claro", color: "#e8bf9c" },
    { name: "Tono 3", label: "Medio",       color: "#c99366" },
    { name: "Tono 4", label: "Oscuro",      color: "#8a5a3c" }
  ],
  lip: [
    { name: "Nude", label: "", color: "#c9987f" },
    { name: "Rosa", label: "", color: "#e86f95" },
    { name: "Rojo", label: "", color: "#c8283c" },
    { name: "Vino", label: "", color: "#6e1b36" }
  ]
};


const PRODUCTS = [
  { id: 1,  name: "Base líquida de cobertura completa", desc: "Acabado uniforme y natural que dura todo el día.", price: 68000, img: photo("1583209814683-c023dd293cc6"), toneType: "skin" },
  { id: 2,  name: "Polvo compacto", desc: "Matifica y sella el maquillaje sin endurecer la piel.", price: 42000, img: photo("1515688594390-b649af70d282"), toneType: "skin" },
  { id: 3,  name: "Corrector de ojeras", desc: "Cubre ojeras e imperfecciones con textura cremosa.", price: 35000, img: photo("1631730486572-226d1f595b68"), toneType: null },
  { id: 4,  name: "Rubor en polvo", desc: "Color suave y modulable para un efecto de mejillas sonrosadas.", price: 38000, img: photo("1757990939518-61d786ea1684"), toneType: null },
  { id: 5,  name: "Iluminador facial", desc: "Brillo delicado para resaltar pómulos y arco de cupido.", price: 45000, img: photo("1522335789203-aabd1fc54bc9"), toneType: null },
  { id: 6,  name: "Labial mate", desc: "Color intenso de larga duración y acabado aterciopelado.", price: 32000, img: photo("1626895872564-b691b6877b83"), toneType: "lip" },
  { id: 7,  name: "Labial líquido", desc: "Pigmento de alto impacto que no se transfiere.", price: 36000, img: photo("1760860992755-c432351d47e9"), toneType: "lip" },
  { id: 8,  name: "Brillo labial", desc: "Hidratación y luminosidad con un toque rosado.", price: 24000, img: photo("1635263282145-253319c75fd4"), toneType: null },
  { id: 9,  name: "Paleta de sombras", desc: "Ocho tonos neutros y rosados, fáciles de difuminar.", price: 79000, img: photo("1487412912498-0447578fcca8"), toneType: null },
  { id: 10, name: "Máscara de pestañas", desc: "Volumen y longitud sin grumos ni transferencia.", price: 33000, img: photo("1758738880203-8968fb4eda82"), toneType: null },
  { id: 11, name: "Delineador de ojos", desc: "Trazo preciso y resistente al agua.", price: 28000, img: photo("1622336889416-8d790ad807d7"), toneType: null },
  { id: 12, name: "Gel para cejas", desc: "Define, peina y fija las cejas todo el día.", price: 26000, img: photo("1512496015851-a90fb38ba796"), toneType: null },
  { id: 13, name: "Primer facial", desc: "Prepara la piel y prolonga la duración del maquillaje.", price: 49000, img: photo("1598528738936-c50861cc75a9"), toneType: null },
  { id: 14, name: "Fijador de maquillaje", desc: "Bruma ligera que sella el maquillaje por horas.", price: 44000, img: photo("1580870069867-74c57ee1bb07"), toneType: null },
  { id: 15, name: "Brochas de maquillaje", desc: "Set de cuatro brochas suaves para rostro y ojos.", price: 85000, img: photo("1596462502278-27bfdc403348"), toneType: null }
];


const PAYMENT_METHODS = [
  { id: "nequi", name: "Nequi", color: "#a0227a", logo: "N",
    steps: ["Confirma tu pedido eligiendo Nequi.", "Te enviaremos por WhatsApp o correo el número para realizar el pago.", "Envía el comprobante y despachamos tu pedido."] },
  { id: "daviplata", name: "Daviplata", color: "#e0202e", logo: "D",
    steps: ["Confirma tu pedido eligiendo Daviplata.", "Te enviaremos por WhatsApp o correo el número para realizar el pago.", "Envía el comprobante y despachamos tu pedido."] },
  { id: "debito", name: "Tarjeta débito", color: "#4a6fa5", icon: "card",
    steps: ["Confirma tu pedido eligiendo tarjeta débito.", "Te enviaremos un enlace de pago seguro por WhatsApp o correo.", "Al confirmarse el pago, despachamos tu pedido."] },
  { id: "credito", name: "Tarjeta de crédito", color: "#6b4fa0", icon: "card",
    steps: ["Confirma tu pedido eligiendo tarjeta de crédito.", "Te enviaremos un enlace de pago seguro y podrás elegir las cuotas.", "Al confirmarse el pago, despachamos tu pedido."] },
  { id: "transferencia", name: "Transferencia bancaria", color: "#3f8f6b", icon: "bank",
    steps: ["Confirma tu pedido eligiendo transferencia bancaria.", "Te enviaremos por WhatsApp o correo los datos de la cuenta.", "Envía el comprobante y despachamos tu pedido."] }
];

const ICONS = {
  card: '<svg class="icon" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 15h3"/></svg>',
  bank: '<svg class="icon" viewBox="0 0 24 24"><path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/></svg>'
};

/* ---------- 2. UTILIDADES ---------- */

const $  = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const formatCOP = (value) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(value);


function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Busca un producto por id
const getProduct = (id) => PRODUCTS.find((p) => p.id === id);

// Busca los datos de un tono (para mostrar su color en el carrito)
function getToneColor(toneType, toneName) {
  const list = TONES[toneType] || [];
  const found = list.find((t) => t.name === toneName);
  return found ? found.color : "#ddd";
}

// Mensaje emergente
let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

/* ---------- 3. ESTADO Y CARRITO ---------- */



let cart = loadCart();

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CONFIG.storageKey));
    if (!Array.isArray(saved)) return [];
    // Solo conservamos líneas cuyo producto exista y con cantidad válida
    return saved.filter((i) => getProduct(i.id) && Number.isInteger(i.qty) && i.qty > 0);
  } catch (error) {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(CONFIG.storageKey, JSON.stringify(cart));
  } catch (error) {
    /* Si localStorage no está disponible, el carrito sigue funcionando en memoria */
  }
}

function addToCart(productId, tone = null, toneLabel = "") {
  const key = tone ? `${productId}-${tone}` : String(productId);
  const existing = cart.find((i) => i.key === key);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ key, id: productId, tone, toneLabel, qty: 1 });
  }
  saveCart();
  renderCart();
  bumpCounter();
}

function changeQty(key, delta) {
  const item = cart.find((i) => i.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter((i) => i.key !== key);
  saveCart();
  renderCart();
}

function removeFromCart(key) {
  cart = cart.filter((i) => i.key !== key);
  saveCart();
  renderCart();
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

const cartCount    = () => cart.reduce((sum, i) => sum + i.qty, 0);
const cartSubtotal = () => cart.reduce((sum, i) => sum + getProduct(i.id).price * i.qty, 0);
const shippingCost = () => (cart.length === 0 || cartSubtotal() >= CONFIG.freeShippingFrom ? 0 : CONFIG.shipping);

function bumpCounter() {
  const badge = $("#cartCount");
  badge.classList.add("bump");
  setTimeout(() => badge.classList.remove("bump"), 250);
}

/* ---------- 4. CATÁLOGO Y BUSCADOR ---------- */

function renderProducts(list) {
  const grid = $("#productGrid");
  grid.innerHTML = list.map((p) => `
    <article class="card reveal visible">
      <div class="card__img"><img src="${p.img}" alt="${escapeHTML(p.name)}" loading="lazy" width="400" height="400"></div>
      <div class="card__body">
        ${p.toneType ? '<span class="card__badge">Elige tu tono</span>' : ""}
        <h3>${escapeHTML(p.name)}</h3>
        <p class="card__desc">${escapeHTML(p.desc)}</p>
        <div class="card__foot">
          <span class="card__price">${formatCOP(p.price)}</span>
          <button class="btn btn--primary" data-buy="${p.id}">Comprar</button>
        </div>
      </div>
    </article>`).join("");
}

const normalize = (text) => text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

function filterProducts() {
  const input = $("#searchInput");
  const query = normalize(input.value);
  $("#searchClear").hidden = input.value === "";

  const results = PRODUCTS.filter((p) => normalize(p.name).includes(query));
  renderProducts(results);

  $("#noResults").hidden = results.length > 0;
  $("#resultsInfo").textContent = query
    ? `${results.length} resultado(s) para "${input.value.trim()}"`
    : "";
}

function clearSearch() {
  $("#searchInput").value = "";
  filterProducts();
  $("#searchInput").focus();
}


function handleBuy(productId) {
  const product = getProduct(productId);
  if (product.toneType) {
    openToneModal(product);
  } else {
    addToCart(product.id);
    showToast(`${product.name} agregado al carrito`);
  }
}

/* ---------- 5. MODAL DE SELECCIÓN DE TONO ---------- */

let pendingProduct = null; // Producto que espera que se elija el tono
let pendingTone = null;    // Tono elegido
let lastFocused = null;    // Para devolver el foco al cerrar

function openToneModal(product) {
  pendingProduct = product;
  pendingTone = null;
  lastFocused = document.activeElement;

  $("#toneProduct").textContent = product.name;
  $("#toneError").textContent = "";
  $("#toneOptions").innerHTML = TONES[product.toneType].map((t) => `
    <button type="button" class="tone" role="radio" aria-checked="false" data-tone="${t.name}" data-label="${t.label}">
      <span class="tone__swatch" style="background:${t.color}"></span>
      <span class="tone__name">${t.name}${t.label ? `<small>${t.label}</small>` : ""}</span>
    </button>`).join("");

  $("#toneModal").hidden = false;
  $(".tone").focus();
}

function closeToneModal() {
  $("#toneModal").hidden = true;
  pendingProduct = null;
  pendingTone = null;
  if (lastFocused) lastFocused.focus();
}

function selectTone(button) {
  $$(".tone").forEach((b) => {
    b.classList.remove("selected");
    b.setAttribute("aria-checked", "false");
  });
  button.classList.add("selected");
  button.setAttribute("aria-checked", "true");
  pendingTone = { name: button.dataset.tone, label: button.dataset.label };
  $("#toneError").textContent = "";
}

function confirmTone() {
  // El tono es obligatorio: no se continúa sin elegir uno
  if (!pendingTone) {
    $("#toneError").textContent = "Por favor selecciona un tono para continuar.";
    return;
  }
  const product = pendingProduct;
  const tone = pendingTone;
  addToCart(product.id, tone.name, tone.label);
  closeToneModal();
  showToast(`${product.name} (${tone.name}) agregado al carrito`);
}

/* ---------- 6. PANEL DEL CARRITO ---------- */

function renderCart() {
  $("#cartCount").textContent = cartCount();
  $("#cartSubtotal").textContent = formatCOP(cartSubtotal());
  $("#cartEmpty").hidden = cart.length > 0;
  $("#cartItems").hidden = cart.length === 0;
  $("#checkoutBtn").disabled = cart.length === 0;
  $("#clearCart").hidden = cart.length === 0;

  $("#cartItems").innerHTML = cart.map((item) => {
    const p = getProduct(item.id);
    const toneHTML = item.tone
      ? `<span class="cart-item__tone"><i style="background:${getToneColor(p.toneType, item.tone)}"></i>Tono: ${escapeHTML(item.tone)}${item.toneLabel ? " (" + escapeHTML(item.toneLabel) + ")" : ""}</span>`
      : "";
    return `
      <li class="cart-item">
        <img src="${p.img}" alt="${escapeHTML(p.name)}">
        <div>
          <p class="cart-item__name">${escapeHTML(p.name)}</p>
          ${toneHTML}
          <p class="cart-item__price">${formatCOP(p.price * item.qty)}</p>
        </div>
        <div class="cart-item__side">
          <div class="qty">
            <button data-qty="-1" data-key="${item.key}" aria-label="Disminuir cantidad">&minus;</button>
            <span>${item.qty}</span>
            <button data-qty="1" data-key="${item.key}" aria-label="Aumentar cantidad">+</button>
          </div>
          <button class="remove" data-remove="${item.key}">Eliminar</button>
        </div>
      </li>`;
  }).join("");

  // Si el checkout está abierto, mantiene el resumen actualizado
  if (!$("#viewCheckout").hidden) renderSummary();
}

function openCart() {
  $("#overlay").hidden = false;
  $("#cartDrawer").classList.add("open");
  $("#cartDrawer").setAttribute("aria-hidden", "false");
}

function closeCart() {
  $("#overlay").hidden = true;
  $("#cartDrawer").classList.remove("open");
  $("#cartDrawer").setAttribute("aria-hidden", "true");
}

/* ---------- 7. CHECKOUT, VALIDACIONES Y PAGO ---------- */

let selectedPayment = null;

// Cambia entre las tres vistas: "store", "checkout" y "confirm"
function showView(view) {
  $("#viewStore").hidden    = view !== "store";
  $("#viewCheckout").hidden = view !== "checkout";
  $("#viewConfirm").hidden  = view !== "confirm";
  window.scrollTo({ top: 0, behavior: "auto" });
}

function goToCheckout() {
  if (cart.length === 0) {
    showToast("Tu carrito está vacío");
    return;
  }
  closeCart();
  renderPaymentMethods();
  renderSummary();
  showView("checkout");
}

function renderSummary() {
  $("#summaryList").innerHTML = cart.map((item) => {
    const p = getProduct(item.id);
    return `
      <li class="summary__item">
        <img src="${p.img}" alt="">
        <div>${escapeHTML(p.name)}
          <small>${item.tone ? "Tono: " + escapeHTML(item.tone) + " · " : ""}Cantidad: ${item.qty}</small>
        </div>
        <strong>${formatCOP(p.price * item.qty)}</strong>
      </li>`;
  }).join("");

  const shipping = shippingCost();
  $("#sumSubtotal").textContent = formatCOP(cartSubtotal());
  $("#sumShipping").textContent = shipping === 0 ? "Gratis" : formatCOP(shipping);
  $("#sumTotal").textContent = formatCOP(cartSubtotal() + shipping);

  // Si el carrito queda vacío durante el checkout, no se puede confirmar
  $("#confirmOrder").disabled = cart.length === 0;
}

function renderPaymentMethods() {
  $("#payMethods").innerHTML = PAYMENT_METHODS.map((m) => `
    <button type="button" class="pay${selectedPayment === m.id ? " selected" : ""}" role="radio" aria-checked="${selectedPayment === m.id}" data-pay="${m.id}">
      <span class="pay__logo" style="background:${m.color}">${m.logo || ICONS[m.icon]}</span>
      ${m.name}
    </button>`).join("");
  renderPayInfo();
}

function renderPayInfo() {
  const method = PAYMENT_METHODS.find((m) => m.id === selectedPayment);
  if (!method) {
    $("#payInfo").innerHTML = "<p>Selecciona un método de pago para ver las instrucciones.</p>";
    return;
  }
  $("#payInfo").innerHTML = `
    <h4>Pagar con ${method.name}</h4>
    <p>Así será el proceso de pago:</p>
    <ol>${method.steps.map((s) => `<li>${s}</li>`).join("")}</ol>`;
}

function selectPayment(id) {
  selectedPayment = id;
  $("#payError").textContent = "";
  renderPaymentMethods();
}

/* --- Validaciones --- */
// Cada regla devuelve un mensaje de error, o "" si el campo es válido.
const VALIDATORS = {
  fName: (v) => (v.length < 3 || v.split(/\s+/).length < 2) ? "Escribe tu nombre y apellido." : "",
  fEmail: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "Escribe un correo válido (ej: nombre@correo.com).",
  fPhone: (v) => /^3\d{9}$/.test(v.replace(/[\s-]/g, "")) ? "" : "Escribe un celular colombiano de 10 dígitos que empiece por 3.",
  fCity: (v) => v.length < 2 ? "Escribe tu ciudad." : "",
  fNeighborhood: (v) => v.length < 2 ? "Escribe tu barrio." : "",
  fAddress: (v) => v.length < 5 ? "Escribe una dirección de entrega completa." : "",
  cName: (v) => v.length < 2 ? "Escribe tu nombre." : "",
  cEmail: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "Escribe un correo válido.",
  cMessage: (v) => v.length < 10 ? "El mensaje debe tener al menos 10 caracteres." : ""
};

// Valida un campo y muestra u oculta su mensaje de error
function validateField(input) {
  const rule = VALIDATORS[input.id];
  if (!rule) return true;
  const message = rule(input.value.trim());
  const wrapper = input.closest(".field");
  const errorEl = $(`[data-error-for="${input.id}"]`);
  wrapper.classList.toggle("invalid", message !== "");
  input.setAttribute("aria-invalid", message !== "");
  errorEl.textContent = message;
  return message === "";
}

// Valida todos los campos de un formulario; enfoca el primero con error
function validateForm(form) {
  let firstInvalid = null;
  $$("input, textarea", form).forEach((input) => {
    if (!validateField(input) && !firstInvalid) firstInvalid = input;
  });
  if (firstInvalid) firstInvalid.focus();
  return firstInvalid === null;
}

// Validación en vivo: se revisa al salir del campo y se corrige mientras se escribe
function enableLiveValidation(form) {
  $$("input, textarea", form).forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.closest(".field").classList.contains("invalid")) validateField(input);
    });
  });
}

function confirmOrder() {
  if (cart.length === 0) {
    showToast("Tu carrito está vacío");
    return;
  }
  const formOk = validateForm($("#checkoutForm"));
  if (!selectedPayment) {
    $("#payError").textContent = "Selecciona un método de pago.";
    if (formOk) $("#paymentCard").scrollIntoView({ behavior: "smooth", block: "center" });
  }
  if (!formOk || !selectedPayment) {
    showToast("Revisa los datos marcados antes de continuar");
    return;
  }

  // Se arma el pedido. Aquí se conectaría el backend o la pasarela de pago
  // (por ejemplo: fetch("/api/pedidos", {...})).
  const form = $("#checkoutForm");
  const subtotal = cartSubtotal();
  const shipping = shippingCost();
  const order = {
    id: "BG-" + Date.now().toString().slice(-6),
    customer: {
      name: $("#fName").value.trim(),
      email: $("#fEmail").value.trim(),
      phone: $("#fPhone").value.trim()
    },
    address: `${$("#fAddress").value.trim()}, ${$("#fNeighborhood").value.trim()}, ${$("#fCity").value.trim()}`,
    payment: PAYMENT_METHODS.find((m) => m.id === selectedPayment).name,
    items: cart.map((i) => ({ ...i })),
    subtotal, shipping, total: subtotal + shipping
  };

  renderConfirmation(order);
  clearCart();
  form.reset();
  $$(".field.invalid", form).forEach((f) => f.classList.remove("invalid"));
  selectedPayment = null;
  showView("confirm");
}

/* ---------- 8. CONFIRMACIÓN ---------- */

function renderConfirmation(order) {
  $("#confOrderId").textContent = order.id;
  $("#confCustomer").innerHTML = `
    <li><strong>${escapeHTML(order.customer.name)}</strong></li>
    <li>${escapeHTML(order.customer.email)}</li>
    <li>${escapeHTML(order.customer.phone)}</li>`;
  $("#confDelivery").innerHTML = `
    <li><strong>Dirección:</strong> ${escapeHTML(order.address)}</li>
    <li><strong>Método de pago:</strong> ${escapeHTML(order.payment)}</li>`;
  $("#confItems").innerHTML = order.items.map((item) => {
    const p = getProduct(item.id);
    return `
      <li class="summary__item">
        <img src="${p.img}" alt="">
        <div>${escapeHTML(p.name)}
          <small>${item.tone ? "Tono: " + escapeHTML(item.tone) + " · " : ""}Cantidad: ${item.qty}</small>
        </div>
        <strong>${formatCOP(p.price * item.qty)}</strong>
      </li>`;
  }).join("");
  $("#confSubtotal").textContent = formatCOP(order.subtotal);
  $("#confShipping").textContent = order.shipping === 0 ? "Gratis" : formatCOP(order.shipping);
  $("#confTotal").textContent = formatCOP(order.total);
}

/* ---------- 9. NAVEGACIÓN, MENÚ MÓVIL Y CONTACTO ---------- */

function toggleMenu(forceClose = false) {
  const nav = $("#nav");
  const button = $("#hamburger");
  const open = forceClose ? false : !nav.classList.contains("open");
  nav.classList.toggle("open", open);
  button.classList.toggle("open", open);
  button.setAttribute("aria-expanded", open);
  button.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
}

// Los enlaces del menú funcionan también desde el checkout: primero se vuelve a la tienda
function handleNavClick(event) {
  const link = event.target.closest("[data-nav]");
  if (!link) return;
  event.preventDefault();
  toggleMenu(true);
  if ($("#viewStore").hidden) showView("store");
  const target = $(link.getAttribute("href"));
  if (target) target.scrollIntoView({ behavior: "smooth" });
}

// Resalta en el menú la sección visible
function observeSections() {
  if (!("IntersectionObserver" in window)) return;
  const links = $$(".nav__list a");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("#viewStore section[id]").forEach((s) => observer.observe(s));
}

// Animación de entrada al hacer scroll
function observeReveal() {
  const items = $$(".reveal:not(.visible)");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((el) => observer.observe(el));
}

function setupContactLinks() {
  // WhatsApp: se arma el enlace con el número de CONFIG
  const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;
  $("#whatsappBtn").href = url;

  // Redes sociales: mientras no se configuren enlaces reales, se avisa con un mensaje
  $$("[data-social]").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (link.getAttribute("href") === "#") {
        e.preventDefault();
        showToast(`Muy pronto estaremos en ${link.dataset.social}`);
      }
    });
  });
}

function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const note = $("#contactNote");
  if (!validateForm(form)) {
    note.style.color = "var(--danger)";
    note.textContent = "Revisa los campos marcados.";
    return;
  }
  // Sin servidor propio, el mensaje se envía abriendo WhatsApp con el texto ya escrito
  const text = `${CONFIG.whatsappMessage}

Nombre: ${$("#cName").value.trim()}
Correo: ${$("#cEmail").value.trim()}
Mensaje: ${$("#cMessage").value.trim()}`;
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  note.style.color = "var(--ok)";
  note.textContent = "Abriendo WhatsApp para enviar tu mensaje...";
  form.reset();
}

/* ---------- 10. INICIO ---------- */

function init() {
  // Si cualquier imagen falla al cargar, se muestra la imagen de respaldo
  document.addEventListener("error", (e) => {
    const img = e.target;
    if (img.tagName === "IMG" && img.src !== FALLBACK_IMG) img.src = FALLBACK_IMG;
  }, true);

  // Catálogo y carrito
  renderProducts(PRODUCTS);
  renderCart();
  setupContactLinks();

  // Buscador
  $("#searchInput").addEventListener("input", filterProducts);
  $("#searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    $("#productos").scrollIntoView({ behavior: "smooth" });
    if ($("#viewStore").hidden) showView("store");
  });
  $("#searchClear").addEventListener("click", clearSearch);
  $("#noResultsClear").addEventListener("click", clearSearch);

  // Comprar (delegación de eventos sobre el catálogo)
  $("#productGrid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-buy]");
    if (btn) handleBuy(Number(btn.dataset.buy));
  });

  // Modal de tonos
  $("#toneOptions").addEventListener("click", (e) => {
    const btn = e.target.closest(".tone");
    if (btn) selectTone(btn);
  });
  $("#toneConfirm").addEventListener("click", confirmTone);
  $("#toneCancel").addEventListener("click", closeToneModal);
  $("#toneClose").addEventListener("click", closeToneModal);
  $("#toneModal").addEventListener("click", (e) => { if (e.target.id === "toneModal") closeToneModal(); });

  // Carrito
  $("#cartBtn").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  $("#overlay").addEventListener("click", closeCart);
  $("#clearCart").addEventListener("click", clearCart);
  $("#checkoutBtn").addEventListener("click", goToCheckout);
  $("#cartItems").addEventListener("click", (e) => {
    const qtyBtn = e.target.closest("[data-qty]");
    const removeBtn = e.target.closest("[data-remove]");
    if (qtyBtn) changeQty(qtyBtn.dataset.key, Number(qtyBtn.dataset.qty));
    if (removeBtn) removeFromCart(removeBtn.dataset.remove);
  });

  // Checkout
  $("#payMethods").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-pay]");
    if (btn) selectPayment(btn.dataset.pay);
  });
  $("#confirmOrder").addEventListener("click", confirmOrder);
  $("#checkoutForm").addEventListener("submit", (e) => { e.preventDefault(); confirmOrder(); });
  $("#backToStore").addEventListener("click", () => showView("store"));
  $("#backFromConfirm").addEventListener("click", () => {
    showView("store");
    $("#productos").scrollIntoView({ behavior: "smooth" });
  });
  enableLiveValidation($("#checkoutForm"));

  // Contacto
  $("#contactForm").addEventListener("submit", handleContactSubmit);
  enableLiveValidation($("#contactForm"));

  // Navegación
  $("#hamburger").addEventListener("click", () => toggleMenu());
  document.addEventListener("click", handleNavClick);
  window.addEventListener("scroll", () => $("#header").classList.toggle("scrolled", window.scrollY > 10), { passive: true });

  // Tecla Escape cierra modal, carrito y menú
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!$("#toneModal").hidden) closeToneModal();
    closeCart();
    toggleMenu(true);
  });

  observeSections();
  observeReveal();
}

document.addEventListener("DOMContentLoaded", init);
