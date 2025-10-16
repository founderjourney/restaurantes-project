// Gestor Principal del Restaurante
class RestaurantManager {
    constructor() {
        this.menu = JSON.parse(localStorage.getItem('restaurantMenu')) || {
            entrantes: [],
            principales: [],
            postres: [],
            bebidas: []
        };
        this.mainLinks = JSON.parse(localStorage.getItem('restaurantMainLinks')) || [];
        this.contactInfo = JSON.parse(localStorage.getItem('restaurantContact')) || {
            address: 'Calle Principal #123, Centro Histórico',
            phone: '+1 234 567 8900',
            email: 'contacto@labuenamesa.com',
            hours: 'Lun-Dom: 12:00 - 22:00'
        };
        this.socialLinks = JSON.parse(localStorage.getItem('restaurantSocial')) || {};
        this.reservations = JSON.parse(localStorage.getItem('restaurantReservations')) || [];
        this.currentTheme = localStorage.getItem('restaurantTheme') || 'dark';
        this.init();
    }

    init() {
        this.loadInitialData();
        this.renderMenu();
        this.renderMainLinks();
        this.renderContactInfo();
        this.loadSocialLinks();
        this.applyTheme();
        this.bindEvents();
    }

    loadInitialData() {
        // Datos iniciales del menú si no existen
        if (Object.values(this.menu).every(category => category.length === 0)) {
            this.menu = {
                entrantes: [
                    { name: 'Bruschetta Mediterránea', price: 8.50, description: 'Pan tostado con tomate, albahaca y mozzarella fresca' },
                    { name: 'Carpaccio de Res', price: 12.90, description: 'Finas láminas de res con rúcula, parmesano y vinagreta' }
                ],
                principales: [
                    { name: 'Paella Valenciana', price: 18.50, description: 'Arroz con pollo, conejo, verduras y azafrán auténtico' },
                    { name: 'Salmón a la Plancha', price: 22.00, description: 'Salmón fresco con verduras asadas y salsa de eneldo' },
                    { name: 'Risotto de Setas', price: 16.50, description: 'Arroz cremoso con setas variadas y queso parmesano' }
                ],
                postres: [
                    { name: 'Tiramisú Casero', price: 6.50, description: 'Postre italiano tradicional con café y mascarpone' },
                    { name: 'Tarta de Chocolate', price: 7.20, description: 'Intenso chocolate belga con helado de vainilla' }
                ],
                bebidas: [
                    { name: 'Vino Tinto Reserva', price: 4.50, description: 'Copa de vino tinto de la casa' },
                    { name: 'Agua Mineral', price: 2.50, description: 'Agua mineral natural con o sin gas' },
                    { name: 'Café Espresso', price: 2.80, description: 'Café espresso italiano auténtico' }
                ]
            };
            this.saveMenu();
        }

        // Enlaces principales iniciales
        if (this.mainLinks.length === 0) {
            this.mainLinks = [
                { title: 'Hacer Reserva', url: '#reserva', icon: '📅', subtitle: 'Mesa para 2-8 personas' },
                { title: 'Ver Menú Completo', url: '#menu', icon: '📋', subtitle: 'Carta digital actualizada' },
                { title: 'Pedidos a Domicilio', url: '#delivery', icon: '🚚', subtitle: 'Entrega en 30-45 min' },
                { title: 'Eventos Especiales', url: '#eventos', icon: '🎉', subtitle: 'Celebraciones y banquetes' }
            ];
            this.saveMainLinks();
        }
    }

    renderMenu() {
        const container = document.getElementById('menuContainer');
        if (!container) return;

        const categoryNames = {
            entrantes: { icon: '🥗', name: 'Entrantes' },
            principales: { icon: '🍖', name: 'Principales' },
            postres: { icon: '🍰', name: 'Postres' },
            bebidas: { icon: '🥤', name: 'Bebidas' }
        };

        container.innerHTML = Object.entries(this.menu).map(([key, items]) => {
            const category = categoryNames[key];
            return `
                <div class="menu-category" onclick="showCategoryMenu('${key}')">
                    <span class="menu-category-icon">${category.icon}</span>
                    <div class="menu-category-name">${category.name}</div>
                    <div class="menu-category-count">${items.length} platos</div>
                </div>
            `;
        }).join('');
    }

    renderMainLinks() {
        const container = document.getElementById('mainLinksContainer');
        if (!container) return;

        container.innerHTML = this.mainLinks.map((link, index) => `
            <a href="${link.url}" class="main-link" onclick="trackLinkClick('${link.title}')">
                <div class="main-link-content">
                    <div class="main-link-icon">${link.icon}</div>
                    <div class="main-link-text">
                        <div class="main-link-title">${link.title}</div>
                        <div class="main-link-subtitle">${link.subtitle || ''}</div>
                    </div>
                </div>
            </a>
        `).join('');
    }

    renderContactInfo() {
        // Actualizar información de contacto en la página
        const addressElement = document.querySelector('.contact-item:nth-child(1) span:last-child');
        const phoneElement = document.querySelector('.contact-item:nth-child(2) span:last-child');
        const hoursElement = document.querySelector('.contact-item:nth-child(3) span:last-child');

        if (addressElement) addressElement.textContent = this.contactInfo.address;
        if (phoneElement) phoneElement.textContent = this.contactInfo.phone;
        if (hoursElement) hoursElement.textContent = this.contactInfo.hours;

        // Actualizar campo de teléfono específico
        const phoneDisplay = document.getElementById('phone-display');
        if (phoneDisplay) phoneDisplay.textContent = this.contactInfo.phone;
    }

    // Gestión del Menú
    addMenuItem() {
        const name = document.getElementById('dishName').value.trim();
        const price = parseFloat(document.getElementById('dishPrice').value);
        const category = document.getElementById('dishCategory').value;
        const description = document.getElementById('dishDescription').value.trim();

        if (!name || !price || !category) {
            alert('Por favor, completa todos los campos obligatorios');
            return;
        }

        const newItem = {
            id: Date.now(),
            name,
            price,
            description,
            createdAt: new Date().toISOString()
        };

        this.menu[category].push(newItem);
        this.saveMenu();
        this.renderMenu();
        this.renderCurrentMenu();
        this.clearMenuForm();
        this.showSuccessMessage('Plato agregado exitosamente');
    }

    removeMenuItem(category, id) {
        this.menu[category] = this.menu[category].filter(item => item.id !== id);
        this.saveMenu();
        this.renderMenu();
        this.renderCurrentMenu();
    }

    clearMenuForm() {
        document.getElementById('dishName').value = '';
        document.getElementById('dishPrice').value = '';
        document.getElementById('dishDescription').value = '';
    }

    renderCurrentMenu() {
        const container = document.getElementById('currentMenu');
        if (!container) return;

        const categoryNames = {
            entrantes: 'Entrantes',
            principales: 'Principales',
            postres: 'Postres',
            bebidas: 'Bebidas'
        };

        let html = '';
        Object.entries(this.menu).forEach(([category, items]) => {
            if (items.length > 0) {
                html += `<h6 style="color: var(--primary-color); margin: 1rem 0 0.5rem 0;">${categoryNames[category]}</h6>`;
                items.forEach(item => {
                    html += `
                        <div class="menu-item">
                            <div class="item-info">
                                <div class="item-title">${item.name}</div>
                                <div class="item-subtitle">${item.description}</div>
                            </div>
                            <div class="item-price">$${item.price.toFixed(2)}</div>
                            <button class="delete-btn" onclick="restaurantManager.removeMenuItem('${category}', ${item.id})">✕</button>
                        </div>
                    `;
                });
            }
        });

        container.innerHTML = html || '<p style="color: var(--text-muted); text-align: center;">No hay platos agregados</p>';
    }

    // Gestión de Enlaces Principales
    addMainLink() {
        const title = document.getElementById('linkTitle').value.trim();
        const url = document.getElementById('linkUrl').value.trim();
        const icon = document.getElementById('linkIcon').value.trim();

        if (!title || !url || !icon) {
            alert('Por favor, completa todos los campos');
            return;
        }

        const newLink = {
            id: Date.now(),
            title,
            url,
            icon,
            subtitle: '',
            clicks: 0,
            createdAt: new Date().toISOString()
        };

        this.mainLinks.push(newLink);
        this.saveMainLinks();
        this.renderMainLinks();
        this.renderCurrentLinks();
        this.clearLinksForm();
        this.showSuccessMessage('Enlace agregado exitosamente');
    }

    removeMainLink(id) {
        this.mainLinks = this.mainLinks.filter(link => link.id !== id);
        this.saveMainLinks();
        this.renderMainLinks();
        this.renderCurrentLinks();
    }

    clearLinksForm() {
        document.getElementById('linkTitle').value = '';
        document.getElementById('linkUrl').value = '';
        document.getElementById('linkIcon').value = '';
    }

    renderCurrentLinks() {
        const container = document.getElementById('currentLinks');
        if (!container) return;

        if (this.mainLinks.length === 0) {
            container.innerHTML = '<p style="color: var(--text-muted); text-align: center;">No hay enlaces agregados</p>';
            return;
        }

        container.innerHTML = this.mainLinks.map(link => `
            <div class="link-item">
                <div class="item-info">
                    <div class="item-title">${link.icon} ${link.title}</div>
                    <div class="item-subtitle">${link.url}</div>
                </div>
                <button class="delete-btn" onclick="restaurantManager.removeMainLink(${link.id})">✕</button>
            </div>
        `).join('');
    }

    // Gestión de Contacto
    updateContactInfo() {
        const address = document.getElementById('restaurantAddress').value.trim();
        const phone = document.getElementById('restaurantPhone').value.trim();
        const email = document.getElementById('restaurantEmail').value.trim();
        const hours = document.getElementById('restaurantHours').value.trim();

        if (address) this.contactInfo.address = address;
        if (phone) this.contactInfo.phone = phone;
        if (email) this.contactInfo.email = email;
        if (hours) this.contactInfo.hours = hours;

        this.saveContactInfo();
        this.renderContactInfo();
        this.showSuccessMessage('Información de contacto actualizada');
    }

    updateSocialLinks() {
        const instagram = document.getElementById('instagramConfig').value.trim();
        const facebook = document.getElementById('facebookConfig').value.trim();
        const whatsapp = document.getElementById('whatsappConfig').value.trim();

        if (instagram) this.socialLinks.instagram = instagram;
        if (facebook) this.socialLinks.facebook = facebook;
        if (whatsapp) this.socialLinks.whatsapp = `https://wa.me/${whatsapp.replace(/\D/g, '')}`;

        this.saveSocialLinks();
        this.loadSocialLinks();
        this.showSuccessMessage('Redes sociales actualizadas');
    }

    loadSocialLinks() {
        // Actualizar enlaces de redes sociales
        const instagramLink = document.getElementById('instagram-link');
        const facebookLink = document.getElementById('facebook-link');
        const whatsappLink = document.getElementById('whatsapp-link');
        const emailLink = document.getElementById('email-link');

        if (instagramLink && this.socialLinks.instagram) {
            instagramLink.href = this.socialLinks.instagram;
        }
        if (facebookLink && this.socialLinks.facebook) {
            facebookLink.href = this.socialLinks.facebook;
        }
        if (whatsappLink && this.socialLinks.whatsapp) {
            whatsappLink.href = this.socialLinks.whatsapp;
        }
        if (emailLink && this.contactInfo.email) {
            emailLink.href = `mailto:${this.contactInfo.email}`;
        }
    }

    // Gestión de Reservas
    showReservations() {
        this.switchTab('reservations');
        toggleAdminPanel();
        this.renderReservations();
    }

    renderReservations() {
        // Actualizar estadísticas de reservas
        const today = new Date().toDateString();
        const thisWeek = this.getThisWeekDates();

        const todayReservations = this.reservations.filter(r =>
            new Date(r.date).toDateString() === today
        ).length;

        const weekReservations = this.reservations.filter(r =>
            thisWeek.includes(new Date(r.date).toDateString())
        ).length;

        const todayElement = document.getElementById('todayReservations');
        const weekElement = document.getElementById('weekReservations');

        if (todayElement) todayElement.textContent = todayReservations;
        if (weekElement) weekElement.textContent = weekReservations;

        // Renderizar lista de reservas recientes
        this.renderReservationsList();
    }

    renderReservationsList() {
        const container = document.getElementById('reservationsList');
        if (!container) return;

        const recentReservations = this.reservations
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 10);

        if (recentReservations.length === 0) {
            container.innerHTML = '<p style="color: var(--text-muted); text-align: center;">No hay reservas registradas</p>';
            return;
        }

        container.innerHTML = recentReservations.map(reservation => `
            <div class="reservation-item">
                <div class="reservation-name">${reservation.name}</div>
                <div class="reservation-details">
                    ${reservation.date} - ${reservation.time} - ${reservation.guests} personas
                </div>
            </div>
        `).join('');
    }

    getThisWeekDates() {
        const today = new Date();
        const thisWeek = [];
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));

        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            thisWeek.push(date.toDateString());
        }

        return thisWeek;
    }

    // Utilidades
    generateQRCode() {
        const url = window.location.href;
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;

        const modal = document.createElement('div');
        modal.className = 'admin-panel active';
        modal.innerHTML = `
            <div class="admin-content" style="max-width: 350px; text-align: center;">
                <div class="admin-header">
                    <h3>🍽️ Código QR del Menú</h3>
                    <button class="close-btn" onclick="this.closest('.admin-panel').remove()">✕</button>
                </div>
                <div style="padding: 1rem;">
                    <img src="${qrCodeUrl}" alt="Código QR" style="width: 100%; max-width: 250px; border-radius: 15px;">
                    <p style="margin-top: 1rem; color: var(--text-muted); font-size: 0.9rem;">
                        Escanea para acceder al menú digital
                    </p>
                    <button class="btn-primary" onclick="this.closest('.admin-panel').remove()" style="margin-top: 1rem;">
                        Cerrar
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme();
        localStorage.setItem('restaurantTheme', this.currentTheme);
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
    }

    exportAllData() {
        const data = {
            menu: this.menu,
            mainLinks: this.mainLinks,
            contactInfo: this.contactInfo,
            socialLinks: this.socialLinks,
            reservations: this.reservations,
            exportDate: new Date().toISOString()
        };

        this.downloadJSON(data, 'restaurante-backup.json');
        this.showSuccessMessage('Datos exportados exitosamente');
    }

    exportReservations() {
        const data = {
            reservations: this.reservations,
            exportDate: new Date().toISOString()
        };

        this.downloadJSON(data, 'reservas-restaurante.json');
        this.showSuccessMessage('Reservas exportadas exitosamente');
    }

    downloadJSON(data, filename) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target.result);

                        if (data.menu) this.menu = data.menu;
                        if (data.mainLinks) this.mainLinks = data.mainLinks;
                        if (data.contactInfo) this.contactInfo = data.contactInfo;
                        if (data.socialLinks) this.socialLinks = data.socialLinks;
                        if (data.reservations) this.reservations = data.reservations;

                        this.saveAll();
                        this.init();
                        this.showSuccessMessage('Datos importados exitosamente');
                    } catch (error) {
                        alert('Error al importar el archivo. Verifica que sea un archivo JSON válido.');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    showSuccessMessage(message) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--gradient);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: var(--shadow);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        toast.textContent = message;

        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    }

    bindEvents() {
        // Cargar datos del formulario de contacto
        const addressInput = document.getElementById('restaurantAddress');
        const phoneInput = document.getElementById('restaurantPhone');
        const emailInput = document.getElementById('restaurantEmail');
        const hoursInput = document.getElementById('restaurantHours');

        if (addressInput) addressInput.value = this.contactInfo.address;
        if (phoneInput) phoneInput.value = this.contactInfo.phone;
        if (emailInput) emailInput.value = this.contactInfo.email;
        if (hoursInput) hoursInput.value = this.contactInfo.hours;

        // Cargar datos de redes sociales
        const instagramInput = document.getElementById('instagramConfig');
        const facebookInput = document.getElementById('facebookConfig');
        const whatsappInput = document.getElementById('whatsappConfig');

        if (instagramInput && this.socialLinks.instagram) instagramInput.value = this.socialLinks.instagram;
        if (facebookInput && this.socialLinks.facebook) facebookInput.value = this.socialLinks.facebook;
        if (whatsappInput && this.socialLinks.whatsapp) {
            whatsappInput.value = this.socialLinks.whatsapp.replace('https://wa.me/', '');
        }
    }

    switchTab(tabName) {
        // Cambiar tabs en el panel de administración
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        const activeBtn = document.querySelector(`[onclick="switchTab('${tabName}')"]`);
        const activeContent = document.getElementById(`${tabName}-tab`);

        if (activeBtn) activeBtn.classList.add('active');
        if (activeContent) activeContent.classList.add('active');

        // Renderizar contenido específico del tab
        if (tabName === 'menu') {
            this.renderCurrentMenu();
        } else if (tabName === 'links') {
            this.renderCurrentLinks();
        } else if (tabName === 'reservations') {
            this.renderReservations();
        }
    }

    // Métodos de guardado
    saveMenu() {
        localStorage.setItem('restaurantMenu', JSON.stringify(this.menu));
    }

    saveMainLinks() {
        localStorage.setItem('restaurantMainLinks', JSON.stringify(this.mainLinks));
    }

    saveContactInfo() {
        localStorage.setItem('restaurantContact', JSON.stringify(this.contactInfo));
    }

    saveSocialLinks() {
        localStorage.setItem('restaurantSocial', JSON.stringify(this.socialLinks));
    }

    saveReservations() {
        localStorage.setItem('restaurantReservations', JSON.stringify(this.reservations));
    }

    saveAll() {
        this.saveMenu();
        this.saveMainLinks();
        this.saveContactInfo();
        this.saveSocialLinks();
        this.saveReservations();
    }
}

// Funciones globales para la UI
function toggleAdminPanel() {
    const panel = document.getElementById('adminPanel');
    if (panel) {
        panel.classList.toggle('active');
        if (panel.classList.contains('active')) {
            restaurantManager.renderCurrentMenu();
            restaurantManager.renderCurrentLinks();
            restaurantManager.renderReservations();
        }
    }
}

function switchTab(tabName) {
    restaurantManager.switchTab(tabName);
}

function addMenuItem() {
    restaurantManager.addMenuItem();
}

function addMainLink() {
    restaurantManager.addMainLink();
}

function updateContactInfo() {
    restaurantManager.updateContactInfo();
}

function updateSocialLinks() {
    restaurantManager.updateSocialLinks();
}

function exportAllData() {
    restaurantManager.exportAllData();
}

function exportReservations() {
    restaurantManager.exportReservations();
}

function importData() {
    restaurantManager.importData();
}

function showCategoryMenu(category) {
    const categoryNames = {
        entrantes: 'Entrantes',
        principales: 'Platos Principales',
        postres: 'Postres',
        bebidas: 'Bebidas'
    };

    const items = restaurantManager.menu[category];

    const modal = document.createElement('div');
    modal.className = 'admin-panel active';
    modal.innerHTML = `
        <div class="admin-content" style="max-width: 500px;">
            <div class="admin-header">
                <h3>📋 ${categoryNames[category]}</h3>
                <button class="close-btn" onclick="this.closest('.admin-panel').remove()">✕</button>
            </div>
            <div style="padding: 1rem;">
                ${items.length === 0 ?
                    `<p style="color: var(--text-muted); text-align: center;">No hay platos en esta categoría</p>` :
                    items.map(item => `
                        <div class="menu-item" style="margin-bottom: 1rem; padding: 1rem; background: rgba(58, 51, 43, 0.6); border-radius: 10px;">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                <div style="flex: 1;">
                                    <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.3rem;">${item.name}</div>
                                    <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;">${item.description}</div>
                                </div>
                                <div style="font-weight: 600; color: var(--primary-color); font-size: 1.1rem;">$${item.price.toFixed(2)}</div>
                            </div>
                        </div>
                    `).join('')
                }
                <button class="btn-primary" onclick="this.closest('.admin-panel').remove()" style="margin-top: 1rem;">
                    Cerrar
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function trackLinkClick(linkTitle) {
    // Rastrear clics en enlaces para analíticas simples
    const analytics = JSON.parse(localStorage.getItem('restaurantAnalytics')) || {};
    const today = new Date().toDateString();

    if (!analytics[today]) analytics[today] = {};
    if (!analytics[today][linkTitle]) analytics[today][linkTitle] = 0;

    analytics[today][linkTitle]++;
    localStorage.setItem('restaurantAnalytics', JSON.stringify(analytics));
}

// Agregar estilos para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Inicializar la aplicación
let restaurantManager;

document.addEventListener('DOMContentLoaded', function() {
    restaurantManager = new RestaurantManager();
});

// Funciones mejoradas para el panel de administración
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const panel = document.getElementById('adminPanel');
        if (panel && panel.classList.contains('active')) {
            closeAdminPanel();
        }
    }
});

// Cerrar panel tocando el fondo
document.addEventListener('DOMContentLoaded', function() {
    const panel = document.getElementById('adminPanel');
    const content = panel.querySelector('.admin-content');

    panel.addEventListener('click', function(e) {
        if (e.target === panel) {
            closeAdminPanel();
        }
    });

    // Prevenir que se cierre al tocar el contenido
    content.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

function closeAdminPanel() {
    const panel = document.getElementById('adminPanel');
    if (panel) {
        panel.classList.remove('active');
    }
}

// Funciones mejoradas para toggle
function toggleAdminPanel() {
    const panel = document.getElementById('adminPanel');
    if (panel) {
        if (panel.classList.contains('active')) {
            closeAdminPanel();
        } else {
            panel.classList.add('active');
            if (restaurantManager) {
                restaurantManager.renderCurrentMenu();
                restaurantManager.renderCurrentLinks();
                restaurantManager.renderReservations();
            }
        }
    }
}

// Prevenir zoom en móviles al hacer doble tap
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);