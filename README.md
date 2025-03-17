# Alrededor de los EE.UU.

## Descripción del Proyecto

**Alrededor de los EE.UU.** es una aplicación web interactiva que simula el perfil de un usuario en una plataforma de exploración y fotografía. La aplicación permite al usuario:

- **Editar su perfil:** Actualizar nombre y descripción mediante un formulario emergente.
- **Explorar una galería de imágenes:** Visualizar lugares icónicos con títulos descriptivos.
- **Interactuar con las tarjetas de la galería:**
  - Dar "me gusta" (toggle en el botón de like).
  - Agregar nuevas imágenes a la galería mediante un formulario.
  - Eliminar imágenes propias.

## Tecnologías Utilizadas

- **HTML5 y CSS3** para la estructura y estilos de la aplicación.
- **JavaScript modular** con una arquitectura basada en clases para mejorar la mantenibilidad.
- **Webpack** para la gestión de módulos y optimización de archivos.
- **BEM** como metodología para la organización de estilos CSS.

## Estructura de Archivos

La estructura del proyecto está organizada de la siguiente manera:

```
web_project_around/
│── .editorconfig          # Configuración del editor
│── .gitignore             # Archivos y carpetas ignoradas por Git
│── .prettierignore        # Configuración para Prettier
│── index.html             # Archivo principal de la aplicación
│── README.md              # Documentación del proyecto
│
├── components/            # Módulos JavaScript organizados en clases
│   ├── Card.js            # Maneja la creación y funcionalidad de cada tarjeta
│   ├── FormValidator.js   # Implementa la validación de formularios
│   ├── Popup.js           # Clase base para popups
│   ├── PopupWithForm.js   # Popup especializado en formularios
│   ├── PopupWithImage.js  # Popup para visualizar imágenes
│   ├── Section.js         # Maneja la renderización de elementos
│   ├── UserInfo.js        # Administra la información del usuario
│
├── page/
│   ├── index.js           # Punto de entrada principal de la aplicación
│
├── styles/                # Archivos CSS organizados con BEM
│   ├── blocks/            # Estilos de bloques individuales
│   │   ├── card.css       # Estilos de las tarjetas
│   │   ├── popup.css      # Estilos de los popups
│   │   ├── form.css       # Estilos de los formularios
│   │   ├── profile.css    # Estilos del perfil de usuario
│   │   ├── page.css       # Estilos generales de la página
│   ├── vendor/            # Archivos de terceros
│   │   ├── normalize.css  # Reset de estilos
│   ├── index.css          # Archivo principal de estilos
│
├── images/                # Imágenes utilizadas en el proyecto
│   ├── avatar.jpg         # Imagen de perfil de usuario
│   ├── places/            # Carpeta con imágenes de los lugares
│
├── utils/                 # Utilidades y funciones auxiliares
│   ├── constants.js       # Variables constantes para el proyecto
│
├── .git/                  # Carpeta del repositorio Git
│
└── package.json           # Dependencias y scripts del proyecto
```

## Instalación y Uso

1. Clona el repositorio:
   ```sh
   git clone https://github.com/bastianrecr/web_project_around/
   ```
2. Accede al directorio del proyecto:
   ```sh
   cd web_project_around
   ```
3. Instala las dependencias:
   ```sh
   npm install
   ```
4. Ejecuta la aplicación en modo desarrollo:
   ```sh
   npm start
   ```

## Demo en Vivo

Puedes ver la aplicación en funcionamiento aquí: [Alrededor de los EE.UU.](https://bastianrecr.github.io/web_project_around/)

## Autor

Sebastian Regules

Este proyecto fue desarrollado como parte del bootcamp de Web Developer de TripleTen con un enfoque modular en JavaScript para mejorar la escalabilidad y organización del código.
