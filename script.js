/* =========================================
   PRIME BARBER
   SCRIPT PRINCIPAL
========================================= */


/* =========================================
   CONFIGURAÇÕES
========================================= */

/*
  IMPORTANTE:

  Troque este número pelo WhatsApp REAL
  da barbearia.

  Formato:
  55 + DDD + número

  Exemplo:
  5531999999999

  NÃO coloque:
  +55
  espaços
  parênteses
  hífens
*/

const whatsappNumber = "5531999999999";

const whatsappMessage =
  "Olá! Gostaria de agendar um horário na Prime Barber.";


/* =========================================
   ELEMENTOS
========================================= */

const siteHeader = document.getElementById("siteHeader");

const navToggle = document.getElementById("navToggle");

const nav = document.getElementById("nav");

const backTop = document.getElementById("backTop");

const whatsappButtons =
  document.querySelectorAll(".whatsapp-btn");


/* =========================================
   HEADER AO ROLAR
========================================= */

function updateHeader() {

  if (!siteHeader) return;

  if (window.scrollY > 40) {

    siteHeader.classList.add("scrolled");

  } else {

    siteHeader.classList.remove("scrolled");

  }

}


window.addEventListener("scroll", updateHeader);

updateHeader();


/* =========================================
   MENU MOBILE
========================================= */

if (navToggle) {

  navToggle.addEventListener("click", function () {

    const isOpen =
      siteHeader.classList.toggle("menu-open");

    navToggle.classList.toggle("open", isOpen);

    navToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    navToggle.setAttribute(
      "aria-label",
      isOpen
        ? "Fechar menu"
        : "Abrir menu"
    );

    document.body.classList.toggle(
      "menu-open",
      isOpen
    );

  });

}


/* =========================================
   FECHAR MENU AO CLICAR EM LINK
========================================= */

if (nav) {

  const navLinks =
    nav.querySelectorAll("a");

  navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

      siteHeader.classList.remove("menu-open");

      navToggle.classList.remove("open");

      navToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      navToggle.setAttribute(
        "aria-label",
        "Abrir menu"
      );

      document.body.classList.remove(
        "menu-open"
      );

    });

  });

}


/* =========================================
   WHATSAPP
========================================= */

function openWhatsApp() {

  const encodedMessage =
    encodeURIComponent(whatsappMessage);

  const url =
    `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );

}


whatsappButtons.forEach(function (button) {

  button.addEventListener(
    "click",
    function (event) {

      event.preventDefault();

      openWhatsApp();

    }
  );

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
  document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

  const observer =
    new IntersectionObserver(
      function (entries, observer) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add("in");

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(function (element) {

    observer.observe(element);

  });

} else {

  revealElements.forEach(function (element) {

    element.classList.add("in");

  });

}


/* =========================================
   VOLTAR AO TOPO
========================================= */

function updateBackTop() {

  if (!backTop) return;

  if (window.scrollY > 500) {

    backTop.classList.add("show");

  } else {

    backTop.classList.remove("show");

  }

}


window.addEventListener(
  "scroll",
  updateBackTop
);


if (backTop) {

  backTop.addEventListener(
    "click",
    function () {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );

}


/* =========================================
   FECHAR MENU COM ESC
========================================= */

document.addEventListener(
  "keydown",
  function (event) {

    if (event.key !== "Escape") return;

    if (
      siteHeader &&
      siteHeader.classList.contains("menu-open")
    ) {

      siteHeader.classList.remove(
        "menu-open"
      );

      navToggle.classList.remove(
        "open"
      );

      navToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      navToggle.setAttribute(
        "aria-label",
        "Abrir menu"
      );

      document.body.classList.remove(
        "menu-open"
      );

    }

  }
);


/* =========================================
   ANO AUTOMÁTICO DO FOOTER
========================================= */

const currentYear =
  new Date().getFullYear();

const footerText =
  document.querySelector(
    ".footer-inner p"
  );


if (footerText) {

  footerText.textContent =
    `© ${currentYear} Prime Barber. Todos os direitos reservados.`;

}


/* =========================================
   LOG DE TESTE
========================================= */

console.log(
  "Prime Barber — site carregado com sucesso."
);