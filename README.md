
# CourierSync – Feature 3: Gestión de Clientes (Frontend)

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-blue?style=for-the-badge&logo=tailwind-css)
![Build Status](https://img.shields.io/github/actions/workflow/status/Nicolas-carmona16/courier-sync-feature3-frontend/ci-cd.yml?style=for-the-badge&label=Build)

</div>

## 📌 Descripción General
Este repositorio contiene únicamente el **frontend** de la Feature 3 – Gestión de Clientes del sistema CourierSync.

CourierSync es un sistema web orientado a domicilios (restaurantes, retail y pedidos rápidos) para optimizar la toma, seguimiento y entrega de pedidos, mejorando la eficiencia operativa y la experiencia de los clientes. La Feature 3 centraliza la información de los usuarios finales y ofrece herramientas para personalizar servicios, agilizar la comunicación y fortalecer la relación con los clientes frecuentes.

## 🛠️ Tecnologías Utilizadas

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)

## 📁 Estructura del Proyecto

```
├── app/           # Páginas y componentes principales
├── public/        # Archivos estáticos
├── package.json   # Dependencias y scripts
├── next.config.ts # Configuración de Next.js
└── ...
```

---

## 🎯 Objetivos del Proyecto
- Centralizar la información de clientes y sus direcciones de entrega en un módulo único y seguro.
- Facilitar el registro y actualización de perfiles para pedidos recurrentes de domicilios.
- Permitir la consulta del historial de pedidos/domicilios por cliente.
- Implementar notificaciones personalizadas (promociones y estado del pedido).
- Medir la satisfacción del cliente en la experiencia de domicilios mediante dashboards interactivos.
- Garantizar accesibilidad y cumplimiento de estándares de seguridad.

## 📦 Alcance
**Incluye:**
- CRUD de clientes (registro y actualización).
- Historial de pedidos de domicilios asociado a cada cliente.
- Notificaciones de promociones y estado de pedido.
- Dashboard de satisfacción y métricas de experiencia.

**No incluye:**
- Asignación y ruteo de repartidores en tiempo real (Feature 1).
- Optimización avanzada de rutas (Feature 2).
- Gestión de inventario de tiendas/socios (Feature 4).
- Facturación y pagos (Feature 5).

## 👥 Roles y Stakeholders
- **Product Owner:** Responsable de definir la visión y priorizar el backlog.
- **Scrum Master:** Facilita la metodología Scrum, elimina impedimentos y asegura la correcta gestión del equipo.
- **Development Team:** Encargado del desarrollo técnico (backend, frontend, base de datos).
- **Stakeholders externos:** Área académica y equipos transversales de Calidad, Seguridad y DevOps.

## 📊 Valor para el Cliente
La Gestión de Clientes aporta un valor estratégico al sistema CourierSync al permitir la integración de perfiles de clientes, lo que facilita la personalización de servicios y una comunicación más efectiva con los usuarios. El impacto esperado es una mayor satisfacción y retención de clientes, fortaleciendo la relación empresa–cliente y generando confianza en la prestación del servicio.

---

## 🚀 Instalación y Ejecución del Frontend

1. **Clona el repositorio:**
	```bash
	git clone https://github.com/Nicolas-carmona16/courier-sync-feature3-frontend.git
	```

2. **Instala las dependencias:**
	```bash
	npm install
	```

3. **Ejecuta la aplicación en modo desarrollo:**
	```bash
	npm run dev
	```

4. Abre tu navegador en [http://localhost:3000](http://localhost:3000) para ver la aplicación.

---


