import Link from "next/link";

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-4xl bg-white bg-opacity-5 backdrop-blur-lg rounded-lg p-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-center text-primary">
          Sobre BudgetFlow
        </h1>
        <p className="text-lg text-gray-200 mb-6 leading-relaxed text-center">
          Bienvenido a <span className="font-semibold text-indigo-400">BudgetFlow</span>, 
          una solución completa para gestionar tus <span className="underline">finanzas</span> e <span className="underline">inversiones</span>. 
          Nuestro objetivo es proporcionarte herramientas para mantener el control de tu economía personal de forma sencilla y eficiente.
        </p>

        <p className="italic text-gray-300 text-center">
            “El control financiero es la clave para alcanzar tus metas.”
          </p>
      </div>

      <footer className="mt-12 text-sm text-gray-300">
        © {new Date().getFullYear()} BudgetFlow. Todos los derechos reservados.
      </footer>
    </div>
  );
}
