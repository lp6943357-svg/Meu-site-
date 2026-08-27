/* =========================================
   PRIME BARBER
   SCRIPT PRINCIPAL
========================================= */

/* CONFIGURAÇÕES — altere somente estes valores quando os dados reais estiverem disponíveis. */
const PRIME_CONFIG = {
  whatsappNumber: "5531999999999",
  whatsappMessage: "Olá! Gostaria de agendar um horário na Prime Barber."
};

/* ELEMENTOS */
const siteHeader = document.getElementById("siteHeader");
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");
const backTop = document.getElementById("backTop");
const whatsappButtons = document.querySelectorAll(".whatsapp-btn");

/* HEADER */
function updateHeader() {
  if (!siteHeader) return;
  siteHeader.classList.toggle("scrolled", window.scrollY > 40);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

/* MENU MOBILE */
function closeMobileMenu() {
  if (!siteHeader || !navToggle) return;

  siteHeader.classList.remove("menu-open");
  navToggle.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Abrir menu");
  document.body.classList.remove("menu-open");
}

if (navToggle && siteHeader) {
  navToggle.addEventListener("click", function () {
    const isOpen = !siteHeader.classList.contains("menu-open");

    siteHeader.classList.toggle("menu-open", isOpen);
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("menu-open", isOpen);
  });
}

if (nav) {
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
  });
}

/* WHATSAPP */
function openWhatsApp() {
  const { whatsappNumber, whatsappMessage } = PRIME_CONFIG;
  if (!whatsappNumber) return;

  const encodedMessage = encodeURIComponent(whatsappMessage);
  const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

whatsappButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    openWhatsApp();
  });
});

/* SCROLL REVEAL */
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    function (entries, observerInstance) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observerInstance.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach(function (element) {
    observer.observe(element);
  });
} else {
  revealElements.forEach(function (element) {
    element.classList.add("in");
  });
}

/* VOLTAR AO TOPO */
function updateBackTop() {
  if (!backTop) return;
  backTop.classList.toggle("show", window.scrollY > 500);
}

window.addEventListener("scroll", updateBackTop, { passive: true });
updateBackTop();

if (backTop) {
  backTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ACESSIBILIDADE: ESC FECHA O MENU */
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

/* FECHAR MENU AO REDIMENSIONAR PARA DESKTOP */
window.addEventListener("resize", function () {
  if (window.innerWidth > 900) {
    closeMobileMenu();
  }
});

/* NAVEGAÇÃO ATIVA POR SEÇÃO */
const navLinks = nav ? Array.from(nav.querySelectorAll('a[href^="#"]')) : [];
const sections = navLinks
  .map(function (link) {
    return document.querySelector(link.getAttribute("href"));
  })
  .filter(Boolean);

function updateActiveNav() {
  if (!navLinks.length || !sections.length) return;

  const marker = window.scrollY + 140;
  let activeId = sections[0].id;

  sections.forEach(function (section) {
    if (section.offsetTop <= marker) {
      activeId = section.id;
    }
  });

  navLinks.forEach(function (link) {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("resize", updateActiveNav);
updateActiveNav();

/* ANO AUTOMÁTICO */
const currentYear = new Date().getFullYear();
const footerText = document.querySelector(".footer-inner p");

if (footerText) {
  footerText.textContent = `© ${currentYear} Prime Barber. Todos os direitos reservados.`;
}

console.log("Prime Barber — site carregado com sucesso.");
