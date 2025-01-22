# Proyecto de Frontend

## Descripción

Este es un proyecto frontend desarrollado con React y TypeScript, diseñado para interactuar con el backend del sistema académico. El sistema permite la gestión de estudiantes, cursos, inscripciones y autenticación de usuarios.

## Tecnologías Utilizadas

- **Framework:** React 18
- **Lenguaje:** TypeScript
- **Diseño:** Tailwind CSS
- **Autenticación:** JWT (JSON Web Tokens)
- **Gestor de Dependencias:** npm
- **Herramienta de Construcción:** Vite

## Requisitos Previos

- Node.js >= 16
- npm >= 7

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/healfuen/front-proyect.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd front-proyect
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto.
   - Agrega la URL base del backend:
     ```env
     VITE_API_URL=http://127.0.0.1:8000/api
     ```

## Scripts Disponibles

- **Iniciar el servidor de desarrollo:**
  ```bash
  npm run dev
  ```
- **Construir el proyecto para producción:**
  ```bash
  npm run build
  ```
- **Previsualizar la versión de producción:**
  ```bash
  npm run preview
  ```

## Estructura del Proyecto

```
.
├── public
├── src
│   ├── api
│   │   └── axios.ts   # Configuración de Axios para las peticiones HTTP
│   ├── components
│   │   ├── Layout.tsx # Componente principal con el menú lateral
│   │   ├── Login.tsx  # Vista de inicio de sesión
│   │   └── Sidebar.tsx
│   ├── context
│   │   └── AuthContext.tsx # Manejo de autenticación con Context API
│   ├── pages
│   │   ├── Home.tsx
│   │   ├── Estudiantes.tsx
│   │   ├── Cursos.tsx
│   │   ├── CursosDisponibles.tsx
│   │   ├── CursosInscritos.tsx
│   │   └── FormularioCurso.tsx
│   ├── App.tsx       # Archivo principal de la aplicación
│   ├── main.tsx      # Punto de entrada
│   └── index.css     # Estilos globales
├── vite.config.ts     # Configuración de Vite
├── package.json
└── tsconfig.json
```

## Funcionalidades Principales

- **Autenticación:**
  - Inicio y cierre de sesión.
  - Registro de nuevos usuarios.
  - Protección de rutas mediante Context API y JWT.
- **Gestín de Estudiantes:**
  - Crear, editar, eliminar y listar estudiantes.
  - Generar reportes de cursos inscritos por estudiante.
- **Gestín de Cursos:**
  - Crear, editar, eliminar y listar cursos.
  - Inscribir estudiantes en cursos.
  - Validación de horarios y cupos disponibles.
- **Reportes:**
  - Previsualizar y descargar reportes en PDF.
  - Exportar información a Excel.

## Variables de Entorno

Asegúrate de configurar las siguientes variables de entorno en tu archivo `.env`:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

## Integración con el Backend

- La URL base para las peticiones al backend está configurada en `VITE_API_URL`.
- Utiliza Axios para manejar las peticiones HTTP.
- JWT se almacena en el `localStorage` del navegador y se envía en los encabezados de las peticiones protegidas.

---

**Autor:** Hector Fuentes Montenegro

