# Alrededor de los EE.UU.

## Descripción del Proyecto

**Alrededor de los EE.UU.** es una aplicación web interactiva que simula el perfil de un usuario en una plataforma de exploración y fotografía. La aplicación permite al usuario:

- **Editar su perfil:** Actualizar nombre y descripción mediante un formulario emergente.
- **Explorar una galería de imágenes:** Visualizar lugares icónicos con títulos descriptivos.
- **Interactuar con las tarjetas de la galería:**
  - Dar "me gusta" (toggle en el botón de like).
  - Eliminar tarjetas de la galería.
- **Agregar nuevos lugares:** A través de un formulario emergente, el usuario puede añadir nuevas tarjetas con imagen y título.
- **Visualizar imágenes en un popup:** Al hacer clic en una tarjeta, se abre una ventana modal que muestra la imagen en formato ampliado junto con su título.

La aplicación está diseñada siguiendo principios de **diseño responsivo** para garantizar una experiencia óptima en dispositivos móviles y de escritorio.

---

## Estructura de Archivos

```bash
.
├── blocks
│   ├── content.css
│   ├── footer.css
│   ├── gallery.css
│   ├── header.css
│   ├── page.css
│   ├── popup.css
│   └── profile.css
├── images
│   ├── gallery
│   ├── popup
│   └── profile
├── pages
│   └── index.css
├── scripts
│   ├── Card.js
│   ├── FormValidator.js
│   ├── index.js
│   └── utils.js
├── vendor
│   ├── fonts
│   └── normalize.css
├── .editorconfig
├── .gitignore
├── .prettierignore
├── index.html
└── README.md
```

- **blocks/**: Contiene los archivos CSS principales, cada uno enfocado en un bloque específico de la interfaz (header, footer, popup, etc.).
- **images/**: Almacena los recursos gráficos del proyecto (subcarpetas: `gallery/`, `popup/`, `profile/`).
- **pages/index.css**: Archivo principal que importa todos los estilos de los bloques y normaliza el CSS.
- **scripts/**:
  - `Card.js`: Clase que modela cada tarjeta de la galería (like, borrar, abrir imagen).
  - `FormValidator.js`: Clase para validar formularios y mostrar/ocultar mensajes de error.
  - `index.js`: Punto de entrada que inicializa el proyecto, configura eventos y renderiza tarjetas iniciales.
  - `utils.js`: Funciones utilitarias (por ejemplo, abrir/cerrar popup de imagen).
- **vendor/**: Contiene archivos de terceros, como `fonts/` y `normalize.css`.
- **index.html**: Documento HTML principal.
- **.editorconfig**, **.gitignore**, **.prettierrc**: Configuraciones del proyecto y del repositorio.
- **README.md**: Este archivo.

---

## Funcionalidades Clave

- **Edición de Perfil:**
  - Abre un popup precargado con los datos actuales del usuario.
  - Actualiza en tiempo real el nombre y la descripción del perfil.
- **Galería de Imágenes:**

  - Renderiza tarjetas basadas en datos iniciales y permite agregar nuevas.
  - Cada tarjeta incluye: imagen, título, botón de "like" (con efecto de activación/desactivación) y botón para eliminar la tarjeta.

- **Validación de Formularios:**

  - Implementación de validación en tiempo real con mensajes de error.
  - Desactivación del botón de envío hasta que los datos sean válidos.

- **Popup para Visualización de Imágenes:**
  - Abre un popup que muestra la imagen seleccionada en un formato ampliado, con cierre mediante clic en el overlay, botón o tecla Escape.

---

## Tecnologías y Técnicas Utilizadas

- **HTML5**
  - Estructura semántica con etiquetas como `<header>`, `<main>`, `<section>`, `<footer>` y `<template>`.
- **CSS3**
  - Diseño responsivo mediante **media queries**.
  - Uso de **Flexbox** y **CSS Grid** para la distribución de elementos.
  - Metodología **BEM** para una organización clara y escalable del CSS.
- **JavaScript (ES6 Modules)**
  - Código modular para separar funcionalidades (tarjetas, validación, utilidades).
  - Manipulación del DOM para popups, edición de perfil, gestión de la galería.
  - Manejo de eventos (`click`, `submit`, `keydown`) para interacciones del usuario.

---

## Despliegue

El proyecto se despliega en **GitHub Pages**, lo que permite un fácil acceso y visualización en línea.

[Visita el proyecto en GitHub Pages](https://bastianrecr.github.io/web_project_around/)

---

## Autor

Sebastian Regules
