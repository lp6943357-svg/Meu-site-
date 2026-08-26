"use strict";

/* =========================
   ELEMENTOS
========================= */

const header = document.getElementById("header");
const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");
const year = document.getElementById("year");


/* =========================
   ANO AUTOMÁTICO
========================= */

if (year) {
    year.textContent = new Date().getFullYear();
}


/* =========================
   HEADER AO ROLAR
========================= */

function updateHeader() {
    if (!header) return;

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", updateHeader, {
    passive: true
});

updateHeader();


/* =========================
   MENU MOBILE
========================= */

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        const isOpen =
            navigation.classList.toggle("active");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Fechar menu"
                : "Abrir menu"
        );
    });


    const navigationLinks =
        navigation.querySelectorAll("a");

    navigationLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navigation.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Abrir menu"
            );
        });

    });
}


/* =========================
   FECHAR MENU AO REDIMENSIONAR
========================= */

window.addEventListener("resize", () => {

    if (
        window.innerWidth > 850 &&
        navigation
    ) {

        navigation.classList.remove("active");

        if (menuButton) {

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Abrir menu"
            );
        }
    }
});


/* =========================
   LINKS INTERNOS
========================= */

const internalLinks =
    document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});