// ==========================================
// CONFIGURACIÓN DE FIREBASE
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyBvoQzxgooJoTfy-btBeAg2ewYn7UtvwvM",
    authDomain: "crm-jerseys.firebaseapp.com",
    projectId: "crm-jerseys",
    storageBucket: "crm-jerseys.firebasestorage.app",
    messagingSenderId: "440958213680",
    appId: "1:440958213680:web:59495b525481d45b9697f5",
    measurementId: "G-WDL002P4X6"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ==========================================

const INITIAL_TEAMS = [
    { id: 'USA', name: 'Estados Unidos', stock: 0 },
    { id: 'CAN', name: 'Canadá', stock: 0 },
    { id: 'MEX', name: 'México', stock: 0 },
    { id: 'ARG', name: 'Argentina', stock: 0 },
    { id: 'BRA', name: 'Brasil', stock: 0 },
    { id: 'FRA', name: 'Francia', stock: 0 },
    { id: 'ENG', name: 'Inglaterra', stock: 0 },
    { id: 'ESP', name: 'España', stock: 0 },
    { id: 'GER', name: 'Alemania', stock: 0 },
    { id: 'POR', name: 'Portugal', stock: 0 },
    { id: 'NED', name: 'Países Bajos', stock: 0 },
    { id: 'ITA', name: 'Italia', stock: 0 },
    { id: 'BEL', name: 'Bélgica', stock: 0 },
    { id: 'URU', name: 'Uruguay', stock: 0 },
    { id: 'COL', name: 'Colombia', stock: 0 },
    { id: 'CRO', name: 'Croacia', stock: 0 },
    { id: 'MAR', name: 'Marruecos', stock: 0 },
    { id: 'SEN', name: 'Senegal', stock: 0 },
    { id: 'JPN', name: 'Japón', stock: 0 },
    { id: 'KOR', name: 'Corea del Sur', stock: 0 },
    { id: 'AUS', name: 'Australia', stock: 0 },
    { id: 'IRN', name: 'Irán', stock: 0 },
    { id: 'KSA', name: 'Arabia Saudita', stock: 0 },
    { id: 'QAT', name: 'Qatar', stock: 0 },
    { id: 'ECU', name: 'Ecuador', stock: 0 },
    { id: 'PER', name: 'Perú', stock: 0 },
    { id: 'CHI', name: 'Chile', stock: 0 },
    { id: 'CIV', name: 'Costa de Marfil', stock: 0 },
    { id: 'NGA', name: 'Nigeria', stock: 0 },
    { id: 'EGY', name: 'Egipto', stock: 0 },
    { id: 'ALG', name: 'Argelia', stock: 0 },
    { id: 'MLI', name: 'Malí', stock: 0 },
    { id: 'RSA', name: 'Sudáfrica', stock: 0 },
    { id: 'TUN', name: 'Túnez', stock: 0 },
    { id: 'GHA', name: 'Ghana', stock: 0 },
    { id: 'SWE', name: 'Suecia', stock: 0 },
    { id: 'SUI', name: 'Suiza', stock: 0 },
    { id: 'DEN', name: 'Dinamarca', stock: 0 },
    { id: 'SRB', name: 'Serbia', stock: 0 },
    { id: 'POL', name: 'Polonia', stock: 0 },
    { id: 'WAL', name: 'Gales', stock: 0 },
    { id: 'SCO', name: 'Escocia', stock: 0 },
    { id: 'UKR', name: 'Ucrania', stock: 0 },
    { id: 'TUR', name: 'Turquía', stock: 0 },
    { id: 'HUN', name: 'Hungría', stock: 0 },
    { id: 'AUT', name: 'Austria', stock: 0 },
    { id: 'CZE', name: 'Rep. Checa', stock: 0 },
    { id: 'ROU', name: 'Rumania', stock: 0 },
    { id: 'CPV', name: 'Cabo Verde', stock: 0 }
];

// App State
let inventory = [];
let sales = [];
let selectedProductsForSale = [];
let editedSelectedProductsForSale = [];
let currentCalendarDate = new Date();

// DOM Elements
const navButtons = document.querySelectorAll('.nav-btn');
const views = document.querySelectorAll('.view');
const inventoryContainer = document.getElementById('inventory-container');
const inventorySearch = document.getElementById('inventory-search');
const calendarGrid = document.getElementById('calendar-grid');
const currentWeekLabel = document.getElementById('current-week-label');
const selectedProductsList = document.getElementById('selected-products-list');
const newSaleForm = document.getElementById('new-sale-form');
const historyTbody = document.getElementById('history-tbody');
const modalOverlay = document.getElementById('modal-overlay');

// Selection Grids
const channelBtns = document.querySelectorAll('#sales-channel-grid .selection-btn');
const paymentBtns = document.querySelectorAll('#payment-method-grid .selection-btn');
const channelInput = document.getElementById('sales-channel');
const paymentInput = document.getElementById('payment-method');

// Autocomplete DOM Elements (New Sale)
const saleProductSearch = document.getElementById('sale-product-search');
const saleProductResults = document.getElementById('sale-product-results');
const selectedProductId = document.getElementById('selected-product-id');

// Custom Name DOM Elements (New Sale)
const enableCustomNameCheckbox = document.getElementById('enable-custom-name');
const productCustomNameInput = document.getElementById('product-custom-name');
const productSizeSelect = document.getElementById('product-size');
const productTypeSelect = document.getElementById('product-type');
const addProductBtn = document.getElementById('add-product-btn');

// Edit Order Modal Elements
const deliveryDetailsView = document.getElementById('delivery-details-view');
const deliveryDetailsEditForm = document.getElementById('delivery-details-edit-form');
const editOrderBtn = document.getElementById('edit-order-btn');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const editSelectedProductsList = document.getElementById('edit-selected-products-list');

// Autocomplete DOM Elements (Edit Modal)
const editSaleProductSearch = document.getElementById('edit-sale-product-search');
const editSaleProductResults = document.getElementById('edit-sale-product-results');
const editSelectedProductId = document.getElementById('edit-selected-product-id');

// Custom Name DOM Elements (Edit Modal)
const editEnableCustomNameCheckbox = document.getElementById('edit-enable-custom-name');
const editProductCustomNameInput = document.getElementById('edit-product-custom-name');
const editProductSizeSelect = document.getElementById('edit-product-size');
const editProductTypeSelect = document.getElementById('edit-product-type');
const editAddProductBtn = document.getElementById('edit-add-product-btn');

// Pedidos View Lists
const pendingOrdersList = document.getElementById('pending-orders-list');
const completedOrdersList = document.getElementById('completed-orders-list');

// Initialization
async function init() {
    setupNavigation();
    setupSelectionGrids();
    setupModals();
    setupEventListeners();
    setupAutocompleteSearch();

    if (firebaseConfig.apiKey === "PON_TU_API_KEY_AQUI") {
        alert("¡Aviso! Aún no has configurado los códigos de Firebase en app.js. La base de datos no funcionará hasta que pegues tu configuración.");
        return;
    }

    await loadData();
}

// Data Management (Firestore)
async function loadData() {
    try {
        const inventorySnapshot = await db.collection('inventory').get();
        if (inventorySnapshot.empty) {
            console.log("Inventario vacío, inyectando datos iniciales...");
            const batch = db.batch();
            INITIAL_TEAMS.forEach(team => {
                const docRef = db.collection('inventory').doc(team.id);
                batch.set(docRef, team);
            });
            await batch.commit();
            
            const newSnapshot = await db.collection('inventory').get();
            inventory = newSnapshot.docs.map(doc => doc.data());
        } else {
            inventory = inventorySnapshot.docs.map(doc => doc.data());
        }

        const salesSnapshot = await db.collection('sales').get();
        sales = salesSnapshot.docs.map(doc => {
            const data = doc.data();
            if (data.acquired === undefined) {
                data.acquired = false;
                db.collection('sales').doc(doc.id).update({ acquired: false });
            }
            return { id: doc.id, ...data };
        });

        renderInventory();
        renderCalendar();
        renderHistory();
        renderOrders();

    } catch (error) {
        console.error("Error cargando base de datos:", error);
        alert("Error de conexión a la base de datos de Firebase. Revisa la configuración y la consola.");
    }
}

// Navigation
function setupNavigation() {
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            navButtons.forEach(b => b.classList.remove('active'));
            views.forEach(v => v.classList.remove('active', 'hidden'));
            views.forEach(v => v.classList.add('hidden'));
            
            e.currentTarget.classList.add('active');
            const targetId = e.currentTarget.getAttribute('data-target');
            document.getElementById(targetId).classList.remove('hidden');
            document.getElementById(targetId).classList.add('active');
            
            if (targetId === 'dashboard-view') renderCalendar();
            if (targetId === 'orders-view') renderOrders();
            if (targetId === 'inventory-view') renderInventory();
            if (targetId === 'history-view') renderHistory();
        });
    });
}

// Selection Grids Logic
function setupSelectionGrids() {
    channelBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            channelBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            channelInput.value = btn.getAttribute('data-value');
        });
    });

    paymentBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            paymentBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            paymentInput.value = btn.getAttribute('data-value');
        });
    });
}

// Modals Setup
function setupModals() {
    document.querySelectorAll('.close-modal-btn').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    document.getElementById('open-add-product-modal').addEventListener('click', () => {
        openModal('add-product-modal');
    });

    document.getElementById('save-new-product-btn').addEventListener('click', async () => {
        const nameInput = document.getElementById('new-product-name');
        const name = nameInput.value.trim();
        if (name) {
            const id = 'PROD-' + Math.random().toString(36).substr(2, 6).toUpperCase();
            const newItem = { id, name, stock: 0 };
            
            try {
                await db.collection('inventory').doc(id).set(newItem);
                inventory.push(newItem);
                renderInventory();
                closeModal();
                nameInput.value = '';
            } catch (error) {
                console.error("Error guardando producto:", error);
            }
        }
    });
}

function openModal(modalId) {
    modalOverlay.classList.remove('hidden');
    document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    document.getElementById(modalId).classList.remove('hidden');
}

function closeModal() {
    modalOverlay.classList.add('hidden');
    deliveryDetailsView.classList.remove('hidden');
    deliveryDetailsEditForm.classList.add('hidden');
    document.getElementById('delivery-modal-title').textContent = "Detalles de Entrega";
    document.getElementById('delivery-modal-footer').classList.remove('hidden');
}

// Autocomplete Search Implementation
function setupAutocompleteSearch() {
    // New Sale Search
    saleProductSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (!query) {
            saleProductResults.innerHTML = '';
            saleProductResults.classList.add('hidden');
            return;
        }

        const matches = inventory.filter(item => item.name.toLowerCase().includes(query));
        renderSearchResults(matches, saleProductResults, (selected) => {
            saleProductSearch.value = `${selected.name} (${selected.stock > 0 ? 'Disp: ' + selected.stock : 'Sin inventario'})`;
            selectedProductId.value = selected.id;
            saleProductResults.innerHTML = '';
            saleProductResults.classList.add('hidden');
        });
    });

    // Edit Modal Search
    editSaleProductSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (!query) {
            editSaleProductResults.innerHTML = '';
            editSaleProductResults.classList.add('hidden');
            return;
        }

        const matches = inventory.filter(item => item.name.toLowerCase().includes(query));
        renderSearchResults(matches, editSaleProductResults, (selected) => {
            editSaleProductSearch.value = `${selected.name} (${selected.stock > 0 ? 'Disp: ' + selected.stock : 'Sin inventario'})`;
            editSelectedProductId.value = selected.id;
            editSaleProductResults.innerHTML = '';
            editSaleProductResults.classList.add('hidden');
        });
    });

    // Hide dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!saleProductSearch.contains(e.target) && !saleProductResults.contains(e.target)) {
            saleProductResults.classList.add('hidden');
        }
        if (!editSaleProductSearch.contains(e.target) && !editSaleProductResults.contains(e.target)) {
            editSaleProductResults.classList.add('hidden');
        }
    });
}

function renderSearchResults(matches, container, onSelectCallback) {
    container.innerHTML = '';
    if (matches.length === 0) {
        container.innerHTML = '<div style="padding: 0.8rem; font-size: 0.9rem; color: var(--text-muted);">No se encontraron coincidencias</div>';
        container.classList.remove('hidden');
        return;
    }

    container.classList.remove('hidden');
    matches.forEach(item => {
        const div = document.createElement('div');
        div.className = 'search-result-item';
        
        const isStock = item.stock > 0;
        div.innerHTML = `
            <span>${item.name}</span>
            <span class="stock-tag ${isStock ? 'in-stock' : 'out-stock'}">
                ${isStock ? 'Stock: ' + item.stock : 'Sin inventario'}
            </span>
        `;
        
        div.addEventListener('click', () => onSelectCallback(item));
        container.appendChild(div);
    });
}

// Personalization toggling
enableCustomNameCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        productCustomNameInput.classList.remove('hidden');
    } else {
        productCustomNameInput.classList.add('hidden');
        productCustomNameInput.value = '';
    }
});

editEnableCustomNameCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        editProductCustomNameInput.classList.remove('hidden');
    } else {
        editProductCustomNameInput.classList.add('hidden');
        editProductCustomNameInput.value = '';
    }
});

// Inventory Logic
function renderInventory(searchTerm = '') {
    inventoryContainer.innerHTML = '';
    
    const filtered = inventory.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = `inventory-item ${item.stock === 0 ? 'out-of-stock' : ''}`;
        
        div.innerHTML = `
            <div class="item-info">
                <h4>${item.name}</h4>
                ${item.stock <= 0 
                    ? `<p class="danger-text">Stock: ${item.stock} (FALTA CONSEGUIR)</p>` 
                    : `<p>En Stock</p>`}
            </div>
            <div class="stock-controls">
                <button class="stock-btn minus" onclick="updateStock('${item.id}', -1)">-</button>
                <div class="stock-value" id="stock-val-${item.id}" onclick="editStock('${item.id}')">${item.stock}</div>
                <button class="stock-btn plus" onclick="updateStock('${item.id}', 1)">+</button>
            </div>
        `;
        inventoryContainer.appendChild(div);
    });
}

window.updateStock = async function(id, change) {
    const item = inventory.find(i => i.id === id);
    if (item) {
        item.stock += change;
        renderInventory(inventorySearch.value);
        
        try {
            await db.collection('inventory').doc(id).update({ stock: item.stock });
        } catch (error) {
            console.error("Error actualizando stock:", error);
        }
    }
}

window.editStock = function(id) {
    const item = inventory.find(i => i.id === id);
    if (!item) return;

    const valContainer = document.getElementById(`stock-val-${id}`);
    
    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'stock-input';
    input.value = item.stock;
    
    valContainer.innerHTML = '';
    valContainer.appendChild(input);
    input.focus();

    const saveEdit = async () => {
        const newVal = parseInt(input.value);
        if (!isNaN(newVal) && newVal !== item.stock) {
            item.stock = newVal;
            try {
                await db.collection('inventory').doc(id).update({ stock: item.stock });
            } catch (error) {
                console.error("Error actualizando stock manualmente:", error);
            }
        }
        renderInventory(inventorySearch.value);
    };

    input.addEventListener('blur', saveEdit);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            input.blur();
        }
    });
}

// Sales Form Logic
function renderSelectedProducts() {
    selectedProductsList.innerHTML = '';
    selectedProductsForSale.forEach((prod, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${prod.name} (${prod.type} - Talla ${prod.size} - Nombre: ${prod.customName}) x${prod.quantity}</span>
            <button type="button" class="btn-small" onclick="removeProductFromSale(${index})">Quitar</button>
        `;
        selectedProductsList.appendChild(li);
    });
}

window.removeProductFromSale = function(index) {
    selectedProductsForSale.splice(index, 1);
    renderSelectedProducts();
}

function handleAddProductToSale() {
    const selectedId = selectedProductId.value;
    if (!selectedId) {
        alert("Por favor busca y selecciona un país de la lista desplegable.");
        return;
    }
    
    const item = inventory.find(i => i.id === selectedId);
    if (!item) return;

    const size = productSizeSelect.value;
    const type = productTypeSelect.value;
    
    // Parse custom name or S/N
    let customName = "S/N";
    if (enableCustomNameCheckbox.checked) {
        const val = productCustomNameInput.value.trim();
        if (val) customName = val;
    }

    const existing = selectedProductsForSale.find(p => p.id === selectedId && p.size === size && p.type === type && p.customName === customName);
    if (existing) {
        existing.quantity++;
    } else {
        selectedProductsForSale.push({
            id: item.id,
            name: item.name,
            quantity: 1,
            size: size,
            type: type,
            customName: customName
        });
    }
    
    // Clear autocomplete selection input
    saleProductSearch.value = '';
    selectedProductId.value = '';
    
    // Clear custom name checkbox
    enableCustomNameCheckbox.checked = false;
    productCustomNameInput.classList.add('hidden');
    productCustomNameInput.value = '';

    renderSelectedProducts();
}

async function handleSaleSubmit(e) {
    e.preventDefault();
    if (selectedProductsForSale.length === 0) {
        alert("Debes agregar al menos un jersey a la venta.");
        return;
    }

    const sale = {
        customerName: document.getElementById('customer-name').value,
        salesChannel: channelInput.value,
        paymentMethod: paymentInput.value,
        deliveryLocation: document.getElementById('delivery-location').value,
        deliveryDate: document.getElementById('delivery-date').value,
        products: [...selectedProductsForSale],
        cost: document.getElementById('sale-cost').value || 0,
        finalPrice: document.getElementById('final-price').value,
        status: 'Pendiente',
        acquired: false,
        createdAt: new Date().toISOString()
    };

    try {
        const saleRef = await db.collection('sales').add(sale);
        sale.id = saleRef.id;
        sales.push(sale);

        // Deduct from inventory (allows negative stock)
        const batch = db.batch();
        sale.products.forEach(soldProd => {
            const invItem = inventory.find(i => i.id === soldProd.id);
            if (invItem) {
                invItem.stock -= soldProd.quantity;
                const invRef = db.collection('inventory').doc(soldProd.id);
                batch.update(invRef, { stock: invItem.stock });
            }
        });
        await batch.commit();

        newSaleForm.reset();
        
        channelBtns.forEach(b => b.classList.remove('active'));
        channelBtns[0].classList.add('active');
        channelInput.value = channelBtns[0].getAttribute('data-value');

        paymentBtns.forEach(b => b.classList.remove('active'));
        paymentBtns[0].classList.add('active');
        paymentInput.value = paymentBtns[0].getAttribute('data-value');

        selectedProductsForSale = [];
        renderSelectedProducts();
        
        alert("¡Venta registrada con éxito!");
        document.getElementById('nav-orders').click();

    } catch (error) {
        console.error("Error registrando la venta:", error);
        alert("Hubo un error al registrar la venta.");
    }
}

// Weekly Calendar Logic
function getStartOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

function renderCalendar() {
    calendarGrid.innerHTML = '';
    
    const startOfWeek = getStartOfWeek(currentCalendarDate);
    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    currentWeekLabel.textContent = `Semana del ${startOfWeek.getDate()} ${monthNames[startOfWeek.getMonth()]}`;

    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    
    const today = new Date();
    today.setHours(0,0,0,0);

    for (let i = 0; i < 7; i++) {
        const currentDay = new Date(startOfWeek);
        currentDay.setDate(startOfWeek.getDate() + i);
        currentDay.setHours(0,0,0,0);

        const dateString = currentDay.toISOString().split('T')[0];
        
        const dayCol = document.createElement('div');
        dayCol.className = 'day-col' + (currentDay.getTime() === today.getTime() ? ' today' : '');
        
        const daySales = sales.filter(s => s.deliveryDate === dateString && s.status === 'Pendiente');
        
        let blocksHTML = '';
        daySales.forEach(sale => {
            blocksHTML += `
                <div class="delivery-block" onclick="showDeliveryDetails('${sale.id}')">
                    <strong>${sale.customerName}</strong>
                    <span>${sale.deliveryLocation}</span>
                </div>
            `;
        });

        if (daySales.length === 0) {
            blocksHTML = '<p style="color: var(--text-muted); font-size: 0.8rem; text-align: center; margin-top: 1rem;">Sin entregas</p>';
        }

        dayCol.innerHTML = `
            <div class="day-header">
                ${days[i]}
                <span class="date-num">${currentDay.getDate()}</span>
            </div>
            <div class="day-content">
                ${blocksHTML}
            </div>
        `;
        calendarGrid.appendChild(dayCol);
    }
}

document.getElementById('prev-week-btn').addEventListener('click', () => {
    currentCalendarDate.setDate(currentCalendarDate.getDate() - 7);
    renderCalendar();
});

document.getElementById('next-week-btn').addEventListener('click', () => {
    currentCalendarDate.setDate(currentCalendarDate.getDate() + 7);
    renderCalendar();
});

window.showDeliveryDetails = function(id) {
    const sale = sales.find(s => s.id === id);
    if (!sale) return;

    const content = document.getElementById('delivery-details-content');
    const productsList = sale.products.map(p => `<li>${p.name} (${p.type || 'Local'} - Talla ${p.size || 'M'} - Nombre: ${p.customName || 'S/N'}) x${p.quantity}</li>`).join('');

    content.innerHTML = `
        <p><strong>Cliente:</strong> ${sale.customerName}</p>
        <p><strong>Ubicación:</strong> ${sale.deliveryLocation}</p>
        <p><strong>Canal:</strong> ${sale.salesChannel}</p>
        <p><strong>Pago:</strong> ${sale.paymentMethod} ($${sale.finalPrice})</p>
        <hr style="margin: 1rem 0; border: none; border-top: 1px solid var(--border-color);">
        <h4>Productos:</h4>
        <ul style="padding-left: 1.5rem; margin-top: 0.5rem; color: var(--text-muted);">
            ${productsList}
        </ul>
    `;
    
    const markBtn = document.getElementById('mark-delivered-btn');
    markBtn.onclick = async function() {
        try {
            await db.collection('sales').doc(sale.id).update({ status: 'Entregado' });
            sale.status = 'Entregado';
            renderCalendar();
            renderHistory();
            renderOrders();
            closeModal();
        } catch (error) {
            console.error("Error al actualizar la venta:", error);
        }
    };

    editOrderBtn.onclick = function() {
        setupEditForm(sale);
    };

    openModal('delivery-details-modal');
}

// Pedidos View Logic (PENDIENTES & COMPLETADOS columns)
function renderOrders() {
    pendingOrdersList.innerHTML = '';
    completedOrdersList.innerHTML = '';

    const pending = sales.filter(s => s.acquired === false);
    const completed = sales.filter(s => s.acquired === true);

    if (pending.length === 0) {
        pendingOrdersList.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem; text-align: center;">No hay pedidos pendientes.</p>';
    } else {
        pending.forEach(sale => {
            const card = document.createElement('div');
            card.className = 'order-card';
            
            const productsListHTML = sale.products.map(p => `<li>• ${p.name} (${p.type} - Talla ${p.size} - Nombre: ${p.customName || 'S/N'}) x${p.quantity}</li>`).join('');

            card.innerHTML = `
                <div class="order-card-info">
                    <h3>${sale.customerName}</h3>
                    <ul class="order-card-products">
                        ${productsListHTML}
                    </ul>
                    <div class="cost-editor">
                        <span>Costo total: $</span>
                        <input type="number" class="inline-cost-input" value="${sale.cost || 0}" step="0.01" onblur="updateOrderCost('${sale.id}', this.value)">
                    </div>
                </div>
                <div>
                    <label class="checkbox-container">
                        <input type="checkbox" onclick="toggleAcquisition('${sale.id}', true)">
                        <span class="checkbox-custom"></span>
                    </label>
                </div>
            `;
            pendingOrdersList.appendChild(card);
        });
    }

    if (completed.length === 0) {
        completedOrdersList.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem; text-align: center;">No hay pedidos completados.</p>';
    } else {
        completed.forEach(sale => {
            const card = document.createElement('div');
            card.className = 'order-card';
            card.style.cursor = 'pointer';
            card.onclick = (e) => {
                if (e.target.tagName !== 'INPUT' && e.target.className !== 'checkbox-custom') {
                    showDeliveryDetails(sale.id);
                }
            };
            
            const productsListHTML = sale.products.map(p => `<li>• ${p.name} (${p.type} - Talla ${p.size} - Nombre: ${p.customName || 'S/N'}) x${p.quantity}</li>`).join('');

            card.innerHTML = `
                <div class="order-card-info">
                    <h3>${sale.customerName}</h3>
                    <ul class="order-card-products">
                        ${productsListHTML}
                    </ul>
                    <div class="cost-editor">
                        <span>Costo total: $${sale.cost || 0}</span>
                    </div>
                </div>
                <div>
                    <label class="checkbox-container">
                        <input type="checkbox" checked onclick="toggleAcquisition('${sale.id}', false)">
                        <span class="checkbox-custom"></span>
                    </label>
                </div>
            `;
            completedOrdersList.appendChild(card);
        });
    }
}

window.toggleAcquisition = async function(saleId, status) {
    const sale = sales.find(s => s.id === saleId);
    if (sale) {
        sale.acquired = status;
        renderOrders(); // Instant local update

        try {
            // Apply +1 (or quantity) when marked as acquired (status === true), 
            // and subtract when unchecked (status === false)
            const batch = db.batch();
            sale.products.forEach(prod => {
                const invItem = inventory.find(i => i.id === prod.id);
                if (invItem) {
                    if (status === true) {
                        invItem.stock += prod.quantity; // Acquired jersey: added back into stock
                    } else {
                        invItem.stock -= prod.quantity; // Returned to pending: revert stock back
                    }
                    const invRef = db.collection('inventory').doc(prod.id);
                    batch.update(invRef, { stock: invItem.stock });
                }
            });

            const saleRef = db.collection('sales').doc(saleId);
            batch.update(saleRef, { acquired: status });

            await batch.commit();
            renderInventory(); // Refresh stock UI
        } catch (error) {
            console.error("Error al actualizar la adquisición del pedido:", error);
        }
    }
}

window.updateOrderCost = async function(saleId, value) {
    const sale = sales.find(s => s.id === saleId);
    const newCost = parseFloat(value);
    
    if (sale && !isNaN(newCost)) {
        sale.cost = newCost;
        try {
            await db.collection('sales').doc(saleId).update({ cost: newCost });
        } catch (error) {
            console.error("Error al actualizar el costo en Firebase:", error);
        }
    }
}

// Edit Mode Setup Inside Modal
function setupEditForm(sale) {
    deliveryDetailsView.classList.add('hidden');
    deliveryDetailsEditForm.classList.remove('hidden');
    document.getElementById('delivery-modal-title').textContent = "Editar Pedido";
    document.getElementById('delivery-modal-footer').classList.add('hidden');

    document.getElementById('edit-sale-id').value = sale.id;
    document.getElementById('edit-customer-name').value = sale.customerName;
    document.getElementById('edit-sales-channel').value = sale.salesChannel;
    document.getElementById('edit-payment-method').value = sale.paymentMethod;
    document.getElementById('edit-delivery-location').value = sale.deliveryLocation;
    document.getElementById('edit-delivery-date').value = sale.deliveryDate;
    document.getElementById('edit-sale-cost').value = sale.cost || 0;
    document.getElementById('edit-final-price').value = sale.finalPrice;

    // Reset autocomplete selection fields
    editSaleProductSearch.value = '';
    editSelectedProductId.value = '';
    editEnableCustomNameCheckbox.checked = false;
    editProductCustomNameInput.classList.add('hidden');
    editProductCustomNameInput.value = '';

    editedSelectedProductsForSale = JSON.parse(JSON.stringify(sale.products));
    renderEditSelectedProducts();
}

function renderEditSelectedProducts() {
    editSelectedProductsList.innerHTML = '';
    editedSelectedProductsForSale.forEach((prod, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${prod.name} (${prod.type} - Talla ${prod.size} - Nombre: ${prod.customName || 'S/N'}) x${prod.quantity}</span>
            <button type="button" class="btn-small" onclick="removeProductFromEditSale(${index})">Quitar</button>
        `;
        editSelectedProductsList.appendChild(li);
    });
}

window.removeProductFromEditSale = function(index) {
    editedSelectedProductsForSale.splice(index, 1);
    renderEditSelectedProducts();
}

// Add jersey to edit state
editAddProductBtn.addEventListener('click', () => {
    const selectedId = editSelectedProductId.value;
    if (!selectedId) {
        alert("Por favor busca y selecciona un país.");
        return;
    }

    const item = inventory.find(i => i.id === selectedId);
    if (!item) return;

    const size = editProductSizeSelect.value;
    const type = editProductTypeSelect.value;

    let customName = "S/N";
    if (editEnableCustomNameCheckbox.checked) {
        const val = editProductCustomNameInput.value.trim();
        if (val) customName = val;
    }

    const existing = editedSelectedProductsForSale.find(p => p.id === selectedId && p.size === size && p.type === type && p.customName === customName);
    if (existing) {
        existing.quantity++;
    } else {
        editedSelectedProductsForSale.push({
            id: item.id,
            name: item.name,
            quantity: 1,
            size: size,
            type: type,
            customName: customName
        });
    }

    // Reset edit select controls
    editSaleProductSearch.value = '';
    editSelectedProductId.value = '';
    editEnableCustomNameCheckbox.checked = false;
    editProductCustomNameInput.classList.add('hidden');
    editProductCustomNameInput.value = '';

    renderEditSelectedProducts();
});

cancelEditBtn.addEventListener('click', () => {
    deliveryDetailsView.classList.remove('hidden');
    deliveryDetailsEditForm.classList.add('hidden');
    document.getElementById('delivery-modal-title').textContent = "Detalles de Entrega";
    document.getElementById('delivery-modal-footer').classList.remove('hidden');
});

deliveryDetailsEditForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (editedSelectedProductsForSale.length === 0) {
        alert("Debes agregar al menos un jersey.");
        return;
    }

    const saleId = document.getElementById('edit-sale-id').value;
    const originalSale = sales.find(s => s.id === saleId);
    if (!originalSale) return;

    const updatedSaleData = {
        customerName: document.getElementById('edit-customer-name').value,
        salesChannel: document.getElementById('edit-sales-channel').value,
        paymentMethod: document.getElementById('edit-payment-method').value,
        deliveryLocation: document.getElementById('edit-delivery-location').value,
        deliveryDate: document.getElementById('edit-delivery-date').value,
        products: [...editedSelectedProductsForSale],
        cost: parseFloat(document.getElementById('edit-sale-cost').value) || 0,
        finalPrice: document.getElementById('edit-final-price').value
    };

    try {
        const batch = db.batch();

        // Revert stock of previous items ONLY if the order was not acquired.
        // If it was already acquired, inventory stock changes were resolved duringtoggleAcquisition
        // We revert the stock subtraction of original sales and apply new stock deduction
        originalSale.products.forEach(origProd => {
            const invItem = inventory.find(i => i.id === origProd.id);
            if (invItem) {
                invItem.stock += origProd.quantity;
            }
        });

        updatedSaleData.products.forEach(newProd => {
            const invItem = inventory.find(i => i.id === newProd.id);
            if (invItem) {
                invItem.stock -= newProd.quantity;
            }
        });

        const unionIds = new Set([
            ...originalSale.products.map(p => p.id),
            ...updatedSaleData.products.map(p => p.id)
        ]);

        unionIds.forEach(id => {
            const invItem = inventory.find(i => i.id === id);
            if (invItem) {
                const invRef = db.collection('inventory').doc(id);
                batch.update(invRef, { stock: invItem.stock });
            }
        });

        const saleRef = db.collection('sales').doc(saleId);
        batch.update(saleRef, updatedSaleData);

        await batch.commit();

        Object.assign(originalSale, updatedSaleData);

        renderCalendar();
        renderHistory();
        renderInventory();
        renderOrders();
        closeModal();

        alert("¡Pedido actualizado con éxito!");
    } catch (error) {
        console.error("Error actualizando pedido:", error);
        alert("Ocurrió un error al guardar los cambios en la base de datos.");
    }
});

// History Logic
function renderHistory() {
    historyTbody.innerHTML = '';
    
    if (sales.length === 0) {
        historyTbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No hay ventas registradas.</td></tr>';
        return;
    }

    const sortedSales = [...sales].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    sortedSales.forEach(sale => {
        const tr = document.createElement('tr');
        const dateStr = new Date(sale.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute:'2-digit' });
        
        tr.innerHTML = `
            <td>${dateStr}</td>
            <td>${sale.customerName}</td>
            <td>${sale.salesChannel}</td>
            <td>$${sale.finalPrice}</td>
            <td><span class="status-badge ${sale.status}">${sale.status}</span></td>
        `;
        historyTbody.appendChild(tr);
    });
}

// Event Listeners Setup
function setupEventListeners() {
    inventorySearch.addEventListener('input', (e) => renderInventory(e.target.value));
    addProductBtn.addEventListener('click', handleAddProductToSale);
    newSaleForm.addEventListener('submit', handleSaleSubmit);
}

// Boot
document.addEventListener('DOMContentLoaded', init);
