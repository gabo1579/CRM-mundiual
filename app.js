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

// Mock Data for Seeding Database only once
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
let currentCalendarDate = new Date();

// DOM Elements
const navButtons = document.querySelectorAll('.nav-btn');
const views = document.querySelectorAll('.view');
const inventoryContainer = document.getElementById('inventory-container');
const inventorySearch = document.getElementById('inventory-search');
const calendarGrid = document.getElementById('calendar-grid');
const currentWeekLabel = document.getElementById('current-week-label');
const productDropdown = document.getElementById('product-dropdown');
const addProductBtn = document.getElementById('add-product-btn');
const selectedProductsList = document.getElementById('selected-products-list');
const newSaleForm = document.getElementById('new-sale-form');
const historyTbody = document.getElementById('history-tbody');
const modalOverlay = document.getElementById('modal-overlay');

// Selection Grids
const channelBtns = document.querySelectorAll('#sales-channel-grid .selection-btn');
const paymentBtns = document.querySelectorAll('#payment-method-grid .selection-btn');
const channelInput = document.getElementById('sales-channel');
const paymentInput = document.getElementById('payment-method');

// Initialization
async function init() {
    setupNavigation();
    setupSelectionGrids();
    setupModals();
    setupEventListeners();

    if (firebaseConfig.apiKey === "PON_TU_API_KEY_AQUI") {
        alert("¡Aviso! Aún no has configurado los códigos de Firebase en app.js. La base de datos no funcionará hasta que pegues tu configuración.");
        return;
    }

    await loadData();
}

// Data Management (Firestore)
async function loadData() {
    try {
        // Load Inventory
        const inventorySnapshot = await db.collection('inventory').get();
        if (inventorySnapshot.empty) {
            // Seed database
            console.log("Inventario vacío, inyectando datos iniciales...");
            const batch = db.batch();
            INITIAL_TEAMS.forEach(team => {
                const docRef = db.collection('inventory').doc(team.id);
                batch.set(docRef, team);
            });
            await batch.commit();
            
            // Reload
            const newSnapshot = await db.collection('inventory').get();
            inventory = newSnapshot.docs.map(doc => doc.data());
        } else {
            inventory = inventorySnapshot.docs.map(doc => doc.data());
        }

        // Load Sales
        const salesSnapshot = await db.collection('sales').get();
        sales = salesSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

        // Render UI after loading
        renderInventory();
        renderCalendar();
        renderHistory();
        updateProductDropdown();

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
            if (targetId === 'inventory-view') renderInventory();
            if (targetId === 'history-view') renderHistory();
            if (targetId === 'new-sale-view') updateProductDropdown();
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
                updateProductDropdown();
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
}

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
                ${item.stock === 0 
                    ? '<p class="danger-text">SIN INVENTARIO</p>' 
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
        if (item.stock + change < 0) return;
        item.stock += change;
        renderInventory(inventorySearch.value);
        updateProductDropdown();
        
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
    input.min = 0;
    
    valContainer.innerHTML = '';
    valContainer.appendChild(input);
    input.focus();

    const saveEdit = async () => {
        const newVal = parseInt(input.value);
        if (!isNaN(newVal) && newVal >= 0 && newVal !== item.stock) {
            item.stock = newVal;
            try {
                await db.collection('inventory').doc(id).update({ stock: item.stock });
            } catch (error) {
                console.error("Error actualizando stock manualmente:", error);
            }
        }
        renderInventory(inventorySearch.value);
        updateProductDropdown();
    };

    input.addEventListener('blur', saveEdit);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            input.blur();
        }
    });
}

// Sales Form Logic
function updateProductDropdown() {
    productDropdown.innerHTML = '';
    const available = inventory.filter(i => i.stock > 0);
    
    if (available.length === 0) {
        productDropdown.innerHTML = '<option disabled selected>No hay inventario disponible</option>';
        addProductBtn.disabled = true;
        return;
    }
    
    addProductBtn.disabled = false;
    available.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = `${item.name} (Disp: ${item.stock})`;
        productDropdown.appendChild(option);
    });
}

function renderSelectedProducts() {
    selectedProductsList.innerHTML = '';
    selectedProductsForSale.forEach((prod, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${prod.name} (x${prod.quantity})</span>
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
    const selectedId = productDropdown.value;
    if (!selectedId) return;
    
    const item = inventory.find(i => i.id === selectedId);
    if (!item) return;

    const existing = selectedProductsForSale.find(p => p.id === selectedId);
    if (existing) {
        if (existing.quantity < item.stock) {
            existing.quantity++;
        } else {
            alert(`Solo tienes ${item.stock} unidades de ${item.name} en stock.`);
        }
    } else {
        selectedProductsForSale.push({
            id: item.id,
            name: item.name,
            quantity: 1
        });
    }
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
        createdAt: new Date().toISOString()
    };

    try {
        // Guardar la venta en Firestore
        const saleRef = await db.collection('sales').add(sale);
        sale.id = saleRef.id;
        sales.push(sale);

        // Actualizar el inventario en Firestore y localmente
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

        // Reset Form
        newSaleForm.reset();
        
        channelBtns.forEach(b => b.classList.remove('active'));
        channelBtns[0].classList.add('active');
        channelInput.value = channelBtns[0].getAttribute('data-value');

        paymentBtns.forEach(b => b.classList.remove('active'));
        paymentBtns[0].classList.add('active');
        paymentInput.value = paymentBtns[0].getAttribute('data-value');

        selectedProductsForSale = [];
        renderSelectedProducts();
        updateProductDropdown();
        
        alert("¡Venta registrada con éxito!");
        document.getElementById('nav-history').click();

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
    const productsList = sale.products.map(p => `<li>${p.quantity}x ${p.name}</li>`).join('');

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
            closeModal();
        } catch (error) {
            console.error("Error al actualizar la venta:", error);
        }
    };

    openModal('delivery-details-modal');
}

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
