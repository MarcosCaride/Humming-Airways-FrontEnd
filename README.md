This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🚀 Tecnologías Usadas
- HTML5
- CSS3
- JavaScript
- React  versión: 19.0.0
- Next.js versión: 15.1.3
- React Icons

> [!IMPORTANT] ¿Qué es "use client"?
>"use client" es una directiva de Next.js 13+ que permite indicar que un componente debe renderizarse en el cliente (navegador) en lugar de en el servidor.
>💡 ¿Por qué es importante aquí?
>En este componente:

>useState: Maneja los estados formularioReservaVisible, formularioTipoDeViajeVisible y tipoDeViaje.
>useEffect: Manipula el DOM directamente con document.getElementById.

📚 Navbar Component Documentation
⚡ Descripción General
El componente Navbar es parte esencial de la interfaz de usuario de una aplicación React con Next.js. Permite gestionar la navegación principal, la reserva de vuelos y el tipo de viaje, brindando una experiencia interactiva y dinámica.

🧠 Estados Principales
formularioReservaVisible: Controla la visibilidad del formulario de reserva.
formularioTipoDeViajeVisible: Controla la visibilidad de las opciones de tipo de viaje.
tipoDeViaje: Almacena si el viaje es "Ida" o "Ida y Vuelta".

🎯 Lógica Clave en useEffect
El hook useEffect sincroniza los estados con el DOM directamente:

Visibilidad de Formularios:
Muestra u oculta los formularios de reserva y tipo de viaje.
Tipo de Viaje:
Cambia dinámicamente entre las opciones "Ida" y "Ida y Vuelta" al hacer clic en los botones correspondientes.
javascript
Copiar código
useEffect(() => {
    let formulario = document.getElementById('FormularioReserva');
    let formularioTipoDeViaje = document.getElementById('FormularioTipoDeViaje');

    if (formularioReservaVisible) {
        formulario.classList.remove('invisible');
    } else {
        formulario.classList.add('invisible');
    }
}, [formularioReservaVisible]);

¡Claro! Aquí tienes un ejemplo de README.md para tu componente Navbar, explicando la importancia de "use client" y otros puntos clave. 🚀📚

📚 Navbar Component Documentation
⚡ Descripción General
El componente Navbar es parte esencial de la interfaz de usuario de una aplicación React con Next.js. Permite gestionar la navegación principal, la reserva de vuelos y el tipo de viaje, brindando una experiencia interactiva y dinámica.

🛠️ Tecnologías Utilizadas
Next.js
React
CSS
React Icons
🚀 Importancia de "use client"
📝 ¿Qué es "use client"?
"use client" es una directiva de Next.js 13+ que permite indicar que un componente debe renderizarse en el cliente (navegador) en lugar de en el servidor.
De forma predeterminada, los componentes de Next.js son server components. Sin embargo, los componentes que utilizan hooks de React (useState, useEffect, etc.) deben ser explícitamente definidos como client components usando "use client".
💡 ¿Por qué es importante aquí?
En este componente:

useState: Maneja los estados formularioReservaVisible, formularioTipoDeViajeVisible y tipoDeViaje.
useEffect: Manipula el DOM directamente con document.getElementById.
Estas funcionalidades solo funcionan en el lado del cliente, ya que los hooks y la manipulación del DOM no son compatibles con el renderizado en el servidor.

✅ Uso correcto:
javascript
Copiar código
'use client';
import React, { useEffect, useState } from 'react';
🧠 Estados Principales
formularioReservaVisible: Controla la visibilidad del formulario de reserva.
formularioTipoDeViajeVisible: Controla la visibilidad de las opciones de tipo de viaje.
tipoDeViaje: Almacena si el viaje es "Ida" o "Ida y Vuelta".
🎯 Lógica Clave en useEffect
El hook useEffect sincroniza los estados con el DOM directamente:

Visibilidad de Formularios:
Muestra u oculta los formularios de reserva y tipo de viaje.
Tipo de Viaje:
Cambia dinámicamente entre las opciones "Ida" y "Ida y Vuelta" al hacer clic en los botones correspondientes.
javascript
Copiar código
useEffect(() => {
    let formulario = document.getElementById('FormularioReserva');
    let formularioTipoDeViaje = document.getElementById('FormularioTipoDeViaje');

    if (formularioReservaVisible) {
        formulario.classList.remove('invisible');
    } else {
        formulario.classList.add('invisible');
    }
}, [formularioReservaVisible]);

🧑‍💻 Uso del Componente
En cualquier archivo React, importa y utiliza el componente:

javascript
Copiar código
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
    </div>
  );
}

📚 Recursos Adicionales
Documentación oficial de Next.js sobre "use client"
React useState Hook
React useEffect Hook

