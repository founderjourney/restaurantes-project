# 🍽️ Restaurante La Buena Mesa - Landing Page Digital

Una landing page completa y funcional para restaurantes, inspirada en el proyecto linktree pero especializada para el sector gastronómico.

## ✨ Características Principales

### 🏠 Landing Page
- **Header atractivo** con logo, nombre y descripción del restaurante
- **Menú rápido visual** con categorías (Entrantes, Principales, Postres, Bebidas)
- **Enlaces principales** para reservas, menú completo, delivery y eventos
- **Información de contacto** completa (dirección, teléfono, horarios)
- **Redes sociales** integradas (Instagram, Facebook, WhatsApp, Email)

### 📱 Funcionalidades Digitales
- **Código QR** automático para compartir el menú
- **Diseño responsive** optimizado para móviles
- **Tema claro/oscuro** intercambiable
- **Navegación intuitiva** estilo app móvil

### ⚙️ Panel de Administración Completo

#### 🍽️ Gestión de Menú
- Agregar/eliminar platos por categorías
- Gestión de precios y descripciones
- Vista previa del menú digital
- Contador automático de platos por categoría

#### 🔗 Enlaces Personalizables
- Crear enlaces principales personalizados
- Configurar iconos y descripciones
- Enlaces para reservas, delivery, eventos especiales

#### 📞 Gestión de Contacto
- Actualizar dirección, teléfono, email
- Configurar horarios de atención
- Integración con redes sociales
- WhatsApp automático para reservas

#### 📅 Sistema de Reservas
- Dashboard con estadísticas
- Contador de reservas diarias/semanales
- Lista de reservas recientes
- Exportación de datos

### 🛠️ Características Técnicas
- **Almacenamiento local** - Todos los datos se guardan en el navegador
- **Exportación/Importación** de datos en formato JSON
- **PWA Ready** - Funciona como aplicación móvil
- **Sin dependencias** - JavaScript puro, no requiere frameworks

## 🚀 Cómo Usar

### Instalación
1. Descargar todos los archivos (`index.html`, `style.css`, `script.js`)
2. Abrir `index.html` en cualquier navegador
3. ¡Listo! La página funciona sin servidor

### Configuración Inicial
1. **Acceder al panel**: Clic en "⚙️ Administrar"
2. **Configurar menú**: Pestaña "🍽️ Menú" - Agregar platos por categorías
3. **Personalizar enlaces**: Pestaña "🔗 Enlaces" - Agregar enlaces de reservas, delivery, etc.
4. **Actualizar contacto**: Pestaña "📞 Contacto" - Información del restaurante y redes sociales

### Funciones Rápidas
- **📱 QR**: Genera código QR del menú para imprimir en mesas
- **📅 Reservas**: Ver estadísticas y gestionar reservas
- **🌓 Tema**: Cambiar entre tema claro y oscuro
- **📤 Exportar**: Respaldar todos los datos
- **📥 Importar**: Restaurar desde backup

## 🎨 Personalización

### Colores y Temas
El archivo `style.css` incluye variables CSS para fácil personalización:

```css
:root {
    --primary-color: #D4A574;        /* Dorado elegante */
    --secondary-color: #8B4513;      /* Marrón cálido */
    --accent-color: #228B22;         /* Verde fresco */
    --background: #1a1612;           /* Café oscuro */
}
```

### Contenido Inicial
El JavaScript incluye datos de ejemplo que se pueden modificar en `script.js`:
- Menú de muestra con platos típicos
- Enlaces principales predefinidos
- Información de contacto de ejemplo

## 📱 Características Móviles

- **Diseño responsive** optimizado para pantallas pequeñas
- **Gestos táctiles** para navegación
- **Prevención de zoom** no deseado
- **Botones grandes** para fácil uso
- **Navegación por pestañas** en el panel admin

## 🔧 Estructura de Archivos

```
restaurantes-projects/
├── index.html          # Página principal
├── style.css           # Estilos y diseño responsive
├── script.js           # Funcionalidad completa
└── README.md           # Esta documentación
```

## 💾 Almacenamiento de Datos

Los datos se guardan automáticamente en localStorage:
- `restaurantMenu` - Menú completo por categorías
- `restaurantMainLinks` - Enlaces principales
- `restaurantContact` - Información de contacto
- `restaurantSocial` - Redes sociales
- `restaurantReservations` - Datos de reservas
- `restaurantTheme` - Preferencia de tema
- `restaurantAnalytics` - Estadísticas de clics

## 🌟 Casos de Uso

### Para Restaurantes Pequeños
- Landing page económica sin costos de desarrollo
- Menú digital actualizable sin programador
- Sistema de reservas básico
- Presencia digital profesional

### Para Eventos y Catering
- Menús específicos por evento
- Enlaces a formularios de cotización
- Información de contacto especializada
- Portfolio de servicios

### Para Food Trucks
- Ubicación y horarios variables
- Menú compacto y visual
- Enlaces a redes sociales
- Sistema de pedidos por WhatsApp

## 🔮 Extensiones Futuras

### Integraciones Posibles
- **Sistemas de reservas** externos (OpenTable, Resy)
- **Plataformas de delivery** (Uber Eats, DoorDash)
- **Pasarelas de pago** para pedidos online
- **Google Analytics** para estadísticas avanzadas
- **APIs de mapas** para ubicación

### Funcionalidades Avanzadas
- **Múltiples idiomas** para turistas
- **Promociones y descuentos** automáticos
- **Sistema de fidelización** de clientes
- **Integración con POS** para inventario en tiempo real
- **Notificaciones push** para ofertas especiales

## 📄 Licencia

Proyecto de código abierto. Libre para usar, modificar y distribuir.

---

**¿Necesitas ayuda?** Este proyecto está diseñado para ser simple y funcional. Todos los archivos están comentados para fácil personalización.