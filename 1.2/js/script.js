// MENÚ PARA CELULARES Y TABLETS
const botonMenu = document.querySelector('.boton-menu');
const navegacion = document.querySelector('.navegacion');

if (botonMenu && navegacion) {
    botonMenu.addEventListener('click', () => {
        const estaAbierto = navegacion.classList.toggle('abierto');
        botonMenu.setAttribute('aria-expanded', String(estaAbierto));
        botonMenu.setAttribute('aria-label', estaAbierto ? 'Cerrar menú' : 'Abrir menú');
    });

    // Al elegir una sección, cerramos el menú móvil.
    navegacion.querySelectorAll('a').forEach((enlace) => {
        enlace.addEventListener('click', () => {
            navegacion.classList.remove('abierto');
            botonMenu.setAttribute('aria-expanded', 'false');
            botonMenu.setAttribute('aria-label', 'Abrir menú');
        });
    });
}

// CARRUSEL DE FOTOGRAFÍAS
document.addEventListener("DOMContentLoaded", () => {
    const carrusel = document.querySelector(".carrusel");
    if (!carrusel) return;

    const pista = carrusel.querySelector(".carrusel-pista");
    const diapositivas = Array.from(
        carrusel.querySelectorAll(".diapositiva")
    );
    const botonAnterior = carrusel.querySelector(".flecha.izquierda");
    const botonSiguiente = carrusel.querySelector(".flecha.derecha");
    const indicadores = Array.from(
        document.querySelectorAll(".indicadores .indicador")
    );

    if (
        !pista ||
        diapositivas.length === 0 ||
        !botonAnterior ||
        !botonSiguiente
    ) {
        console.error("No se encontraron todos los elementos del carrusel.");
        return;
    }

    let indiceActual = 0;

    // Actualiza la posición, la diapositiva activa y los indicadores.
    function mostrarDiapositiva(indice) {
        indiceActual =
            (indice + diapositivas.length) % diapositivas.length;

        pista.style.transform = `translateX(-${indiceActual * 100}%)`;

        diapositivas.forEach((diapositiva, posicion) => {
            diapositiva.classList.toggle(
                "activa",
                posicion === indiceActual
            );
            diapositiva.setAttribute(
                "aria-hidden",
                String(posicion !== indiceActual)
            );
        });

        indicadores.forEach((indicador, posicion) => {
            const estaActivo = posicion === indiceActual;
            indicador.classList.toggle("activo", estaActivo);
            indicador.setAttribute("aria-current", String(estaActivo));
        });
    }

    botonSiguiente.addEventListener("click", () => {
        mostrarDiapositiva(indiceActual + 1);
    });

    botonAnterior.addEventListener("click", () => {
        mostrarDiapositiva(indiceActual - 1);
    });

    // Permite elegir directamente una fotografía desde los puntos.
    indicadores.forEach((indicador, posicion) => {
        indicador.addEventListener("click", () => {
            mostrarDiapositiva(posicion);
        });
    });

    // Si hay menos indicadores que fotos, creamos los que faltan.
    // Si hay indicadores de más, los quitamos.
    const contenedorIndicadores = document.querySelector(".indicadores");

    if (contenedorIndicadores) {
        while (contenedorIndicadores.querySelectorAll(".indicador").length < diapositivas.length) {
            const posicion = contenedorIndicadores.querySelectorAll(".indicador").length;
            const indicador = document.createElement("button");
            indicador.className = "indicador";
            indicador.type = "button";
            indicador.setAttribute("aria-label", `Mostrar foto ${posicion + 1}`);
            indicador.setAttribute("aria-current", "false");
            indicador.addEventListener("click", () => {
                mostrarDiapositiva(posicion);
            });
            contenedorIndicadores.appendChild(indicador);
            indicadores.push(indicador);
        }

        while (contenedorIndicadores.querySelectorAll(".indicador").length > diapositivas.length) {
            contenedorIndicadores.lastElementChild.remove();
        }
    }

    mostrarDiapositiva(0);

    // CAMBIO AUTOMÁTICO CADA 2 SEGUNDOS
    setInterval(() => {
        mostrarDiapositiva(indiceActual + 1);
    }, 2000);
});
