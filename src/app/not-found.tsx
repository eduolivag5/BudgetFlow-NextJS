// app/not-found.tsx
import Link from "next/link";
import React from "react";

export default function Page404() {
  return (
    <div className="flex items-center rounded-lg bg-indigo-500">
      <div className="text-left text-white p-10  bg-opacity-75">
        <h1 className="text-6xl font-extrabold mb-4 text-purple-200">404</h1>
        <p className="text-2xl font-medium text-indigo-100 mb-6">
          ¡Vaya! La página que buscas no existe.
        </p>
        <p className="text-lg text-indigo-200">
          Lo sentimos, pero parece que la ruta que has solicitado no está
          disponible.
        </p>
        <div className="mt-8">
          <Link className="text-lg text-blue-200" href="/">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
