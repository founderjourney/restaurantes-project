// Gestor Principal del Restaurante
class RestaurantManager {
    constructor() {
        // Limpiar datos antiguos si existen categorías viejas
        this.clearOldData();

        this.menu = JSON.parse(localStorage.getItem('restaurantMenu')) || {
            zensai: [],
            sushi: [],
            ramen: [],
            tempura: [],
            donburi: [],
            postres: [],
            bebidas: []
        };
        this.mainLinks = JSON.parse(localStorage.getItem('restaurantMainLinks')) || [];
        this.contactInfo = JSON.parse(localStorage.getItem('restaurantContact')) || {
            address: 'Avenida Japón #88, Distrito Gourmet',
            phone: '+1 234 567 8900',
            email: 'contacto@sakura-restaurant.com',
            hours: 'Mar-Dom: 18:00 - 23:00'
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

    clearOldData() {
        // Verificar si hay datos con categorías antiguas y limpiarlos
        const storedMenu = localStorage.getItem('restaurantMenu');
        if (storedMenu) {
            const menu = JSON.parse(storedMenu);
            if (menu.entrantes || menu.principales) {
                // Limpiar todos los datos antiguos
                localStorage.removeItem('restaurantMenu');
                localStorage.removeItem('restaurantMainLinks');
                localStorage.removeItem('restaurantContact');
                console.log('Datos antiguos limpiados, cargando menú japonés...');
            }
        }
    }

    loadInitialData() {
        // Forzar carga del menú japonés auténtico
        const shouldReload = Object.values(this.menu).every(category => category.length === 0) ||
                           !this.menu.hasOwnProperty('zensai');

        if (shouldReload) {
            this.menu = {
                zensai: [
                    { name: 'Gyoza de Cerdo', price: 12.50, description: 'Empanadillas japonesas rellenas de cerdo y vegetales, servidas con salsa ponzu' },
                    { name: 'Edamame Premium', price: 8.90, description: 'Vainas de soja cocidas al vapor con sal marina y aceite de sésamo' },
                    { name: 'Agedashi Tofu', price: 10.50, description: 'Tofu frito ligero en caldo dashi con jengibre y cebollín' },
                    { name: 'Sunomono', price: 9.90, description: 'Ensalada de pepino japonés marinado en vinagre de arroz' }
                ],
                sushi: [
                    { name: 'Omakase del Chef', price: 85.00, description: 'Selección premium de 12 piezas de sushi y sashimi elegidos por el chef' },
                    { name: 'Sashimi Moriawase', price: 45.00, description: 'Variedad de pescados frescos: atún, salmón, hamachi y uni' },
                    { name: 'California Roll Premium', price: 16.50, description: 'Cangrejo real, aguacate y pepino con masago naranja' },
                    { name: 'Nigiri Set Clásico', price: 32.00, description: '8 piezas de nigiri: atún, salmón, anguila y camarón' },
                    { name: 'Chirashi Bowl', price: 28.50, description: 'Sashimi variado sobre arroz sushi con wasabi y jengibre' }
                ],
                ramen: [
                    { name: 'Tonkotsu Ramen', price: 18.50, description: 'Caldo cremoso de hueso de cerdo, chashu, huevo marinado y menma' },
                    { name: 'Miso Ramen Especial', price: 17.90, description: 'Caldo de miso rojo con cerdo, maíz, brotes de bambú y alga nori' },
                    { name: 'Shio Ramen', price: 16.50, description: 'Caldo claro y delicado con pollo, wonbok y cebollín' },
                    { name: 'Tantanmen', price: 19.50, description: 'Ramen picante estilo japonés con carne molida y pasta de sésamo' }
                ],
                tempura: [
                    { name: 'Tempura Moriawase', price: 24.00, description: 'Selección de vegetales y mariscos en tempura crujiente' },
                    { name: 'Ebi Tempura', price: 22.50, description: 'Langostinos grandes en tempura con salsa tentsuyu' },
                    { name: 'Yasai Tempura', price: 16.90, description: 'Vegetales de temporada: kabocha, berenjena, pimiento shishito' },
                    { name: 'Yakitori Set', price: 18.50, description: 'Brochetas de pollo: muslo, pechuga, corazón con salsa tare' }
                ],
                donburi: [
                    { name: 'Chirashi Premium', price: 35.00, description: 'Bowl de arroz con sashimi premium, ikura y uni' },
                    { name: 'Katsu Don', price: 19.50, description: 'Tonkatsu sobre arroz con huevo batido y salsa dulce' },
                    { name: 'Unagi Don', price: 26.50, description: 'Anguila glaseada sobre arroz con salsa kabayaki' },
                    { name: 'Oyako Don', price: 16.90, description: 'Pollo y huevo sobre arroz con cebolla y salsa dashi' }
                ],
                postres: [
                    { name: 'Mochi Ice Cream', price: 8.50, description: 'Helado envuelto en mochi: matcha, vainilla y fresa' },
                    { name: 'Dorayaki Casero', price: 7.20, description: 'Panqueques japoneses rellenos de pasta de judía dulce' },
                    { name: 'Matcha Cheesecake', price: 9.90, description: 'Cheesecake japonés con té matcha y crema batida' },
                    { name: 'Taiyaki', price: 6.50, description: 'Pastel con forma de pez relleno de anko (pasta de judía)' }
                ],
                bebidas: [
                    { name: 'Sake Junmai Premium', price: 12.50, description: 'Sake premium servido frío o caliente' },
                    { name: 'Té Verde Sencha', price: 4.50, description: 'Té verde japonés tradicional de primera calidad' },
                    { name: 'Matcha Latte', price: 6.80, description: 'Té matcha ceremonial con leche vaporizada' },
                    { name: 'Ramune', price: 4.20, description: 'Refresco japonés tradicional con canica' },
                    { name: 'Asahi Super Dry', price: 5.50, description: 'Cerveza japonesa premium bien fría' }
                ]
            };
            this.saveMenu();
            console.log('Menú japonés cargado exitosamente');
        }

        // Enlaces principales japoneses
        if (this.mainLinks.length === 0) {
            this.mainLinks = [
                { title: 'Reserva Omakase', url: '#omakase', icon: '🍣', subtitle: 'Experiencia culinaria exclusiva' },
                { title: 'Menú Kaiseki', url: '#kaiseki', icon: '🍱', subtitle: 'Cena tradicional japonesa' },
                { title: 'Ceremonia del Té', url: '#tea', icon: '🍵', subtitle: 'Experiencia cultural auténtica' },
                { title: 'Clases de Sushi', url: '#classes', icon: '👨‍🍳', subtitle: 'Aprende con nuestro chef' },
                { title: 'Sake Tasting', url: '#sake', icon: '🍶', subtitle: 'Degustación de sakes premium' }
            ];
            this.saveMainLinks();
            console.log('Enlaces japoneses cargados exitosamente');
        }
    }

    renderMenu() {
        const container = document.getElementById('menuContainer');
        if (!container) {
            console.error('menuContainer no encontrado');
            return;
        }

        console.log('Renderizando menú con categorías:', Object.keys(this.menu));
        console.log('Contenido del menú:', this.menu);

        const categoryNames = {
            zensai: { icon: '🥢', name: 'Zensai' },
            sushi: { icon: '🍣', name: 'Sushi & Sashimi' },
            ramen: { icon: '🍜', name: 'Ramen & Sopas' },
            tempura: { icon: '🍤', name: 'Tempura & Yakitori' },
            donburi: { icon: '🍱', name: 'Donburi & Gohan' },
            postres: { icon: '🍡', name: 'Postres Japoneses' },
            bebidas: { icon: '🍵', name: 'Té & Sake' }
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

        console.log('HTML del menú generado:', container.innerHTML);
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
            zensai: 'Zensai (Entrantes)',
            sushi: 'Sushi & Sashimi',
            ramen: 'Ramen & Sopas',
            tempura: 'Tempura & Yakitori',
            donburi: 'Donburi & Gohan',
            postres: 'Postres Japoneses',
            bebidas: 'Té & Sake'
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
                    <h3>🌸 Código QR del Menú</h3>
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
        zensai: 'Zensai (Entrantes)',
        sushi: 'Sushi & Sashimi',
        ramen: 'Ramen & Sopas',
        tempura: 'Tempura & Yakitori',
        donburi: 'Donburi & Gohan',
        postres: 'Postres Japoneses',
        bebidas: 'Té & Sake'
    };

    const items = restaurantManager.menu[category];

    const modal = document.createElement('div');
    modal.className = 'admin-panel active';
    modal.innerHTML = `
        <div class="admin-content" style="max-width: 500px;">
            <div class="admin-header">
                <h3>🍱 ${categoryNames[category]}</h3>
                <button class="close-btn" onclick="this.closest('.admin-panel').remove()">✕</button>
            </div>
            <div style="padding: 1rem;">
                ${items.length === 0 ?
                    `<p style="color: var(--text-muted); text-align: center;">No hay platos en esta categoría</p>` :
                    items.map(item => `
                        <div class="menu-item" style="margin-bottom: 1rem; padding: 1rem; background: rgba(45, 55, 72, 0.6); border-radius: 10px;">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                <div style="flex: 1;">
                                    <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.3rem;">${item.name}</div>
                                    <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;">${item.description}</div>
                                </div>
                                <div style="font-weight: 600; color: var(--secondary-color); font-size: 1.1rem;">$${item.price.toFixed(2)}</div>
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

// Función para resetear y cargar menú japonés
function resetToJapaneseMenu() {
    localStorage.clear();
    location.reload();
}

// Función de emergencia para cargar menú
function forceLoadJapaneseMenu() {
    if (window.restaurantManager) {
        window.restaurantManager.menu = {
            zensai: [
                { name: 'Gyoza de Cerdo', price: 12.50, description: 'Empanadillas japonesas rellenas de cerdo y vegetales, servidas con salsa ponzu' },
                { name: 'Edamame Premium', price: 8.90, description: 'Vainas de soja cocidas al vapor con sal marina y aceite de sésamo' }
            ],
            sushi: [
                { name: 'Omakase del Chef', price: 85.00, description: 'Selección premium de 12 piezas de sushi y sashimi elegidos por el chef' },
                { name: 'Sashimi Moriawase', price: 45.00, description: 'Variedad de pescados frescos: atún, salmón, hamachi y uni' }
            ],
            ramen: [
                { name: 'Tonkotsu Ramen', price: 18.50, description: 'Caldo cremoso de hueso de cerdo, chashu, huevo marinado y menma' }
            ],
            tempura: [
                { name: 'Tempura Moriawase', price: 24.00, description: 'Selección de vegetales y mariscos en tempura crujiente' }
            ],
            donburi: [
                { name: 'Chirashi Premium', price: 35.00, description: 'Bowl de arroz con sashimi premium, ikura y uni' }
            ],
            postres: [
                { name: 'Mochi Ice Cream', price: 8.50, description: 'Helado envuelto en mochi: matcha, vainilla y fresa' }
            ],
            bebidas: [
                { name: 'Sake Junmai Premium', price: 12.50, description: 'Sake premium servido frío o caliente' }
            ]
        };
        window.restaurantManager.saveMenu();
        window.restaurantManager.renderMenu();
        console.log('Menú japonés forzado');
    }
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
    // Forzar limpieza de datos antiguos en el navegador
    console.log('Inicializando Restaurante Sakura...');

    // Limpiar localStorage si hay datos antiguos
    const oldMenu = localStorage.getItem('restaurantMenu');
    if (oldMenu && oldMenu.includes('entrantes')) {
        localStorage.clear();
        console.log('Datos antiguos eliminados');
    }

    restaurantManager = new RestaurantManager();

    // Forzar renderizado del menú después de un pequeño delay
    setTimeout(() => {
        if (restaurantManager) {
            restaurantManager.renderMenu();
            console.log('Menú renderizado');
        }
    }, 100);
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

// ===== FUNCIONES MOBILE-FIRST =====

// Toggle Mobile Menu
function toggleMobileMenu() {
    const overlay = document.getElementById('mobileMenuOverlay');
    if (overlay) {
        overlay.classList.toggle('active');

        // Prevenir scroll del body cuando menu está abierto
        if (overlay.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Scroll suave a secciones
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Cerrar menu mobile después de navegar
        toggleMobileMenu();
    }
}

// Inicializar WhatsApp Quick Links
document.addEventListener('DOMContentLoaded', function() {
    // Quick WhatsApp en header
    const quickWhatsApp = document.getElementById('quick-whatsapp');
    if (quickWhatsApp) {
        quickWhatsApp.addEventListener('click', function(e) {
            e.preventDefault();
            const phone = document.getElementById('phone-display').textContent;
            const message = encodeURIComponent('¡Hola! Me gustaría hacer una reserva en Sakura');
            window.open(`https://wa.me/${phone.replace(/\D/g, '')}?text=${message}`, '_blank');
        });
    }

    // WhatsApp principal en contacto
    const mainWhatsApp = document.getElementById('main-whatsapp');
    if (mainWhatsApp) {
        mainWhatsApp.addEventListener('click', function(e) {
            e.preventDefault();
            const phone = document.getElementById('phone-display').textContent;
            const message = encodeURIComponent('¡Hola! Tengo una consulta sobre Sakura');
            window.open(`https://wa.me/${phone.replace(/\D/g, '')}?text=${message}`, '_blank');
        });
    }

    // Cerrar mobile menu al hacer click en overlay
    const overlay = document.getElementById('mobileMenuOverlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                toggleMobileMenu();
            }
        });
    }

    // Cerrar mobile menu con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const overlay = document.getElementById('mobileMenuOverlay');
            if (overlay && overlay.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });
});

// Animación para el menu hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const overlay = document.getElementById('mobileMenuOverlay');

    if (menuToggle && overlay) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const spans = menuToggle.querySelectorAll('span');
                    if (overlay.classList.contains('active')) {
                        // Transformar a X
                        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                        spans[1].style.opacity = '0';
                        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                    } else {
                        // Volver a hamburguesa
                        spans[0].style.transform = '';
                        spans[1].style.opacity = '1';
                        spans[2].style.transform = '';
                    }
                }
            });
        });

        observer.observe(overlay, { attributes: true });
    }
});