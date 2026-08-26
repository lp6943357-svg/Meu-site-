"use strict";

/* =====================================================
   CONFIGURAÇÃO DA BARBEARIA
   =====================================================

   PARA CRIAR UM NOVO CLIENTE:

   1. Faça uma cópia deste projeto.
   2. Altere SOMENTE este bloco.
   3. Publique a nova versão.

===================================================== */

const BARBERSHOP = {

    /* Nome */
    name: "PRIME",

    /* Nome usado no rodapé */
    fullName: "Prime Barber",

    /* WhatsApp SOMENTE com números */
    whatsapp: "5531900000000",

    /* Instagram */
    instagram: "https://www.instagram.com/",
    instagramUser: "@primebarber",

    /* Endereço */
    address: "Rua Exemplo, 123",
    city: "Centro — Belo Horizonte/MG",

    /* Horário */
    openingHours:
        "Terça a sábado<br>09:00 — 20:00",

    /* Estatísticas */
    experience: "5+",
    clients: "2k+",

    /* Textos */
    heroText:
        "Cortes precisos, barba impecável e uma experiência feita para quem valoriza cada detalhe.",

    aboutTitle:
        "Mais que um corte.<br>Uma experiência.",

    aboutText1:
        "A Prime nasceu para unir técnica, estilo e atendimento em um único lugar.",

    aboutText2:
        "Nossa equipe trabalha para entender exatamente o que você procura e entregar um resultado que combine com você.",


    /* Serviços */
    services: [

        {
            name: "Corte masculino",

            description:
                "Corte personalizado de acordo com seu estilo, formato de rosto e preferência.",

            price: "R$ 60",

            featured: false
        },

        {
            name: "Corte + Barba",

            description:
                "O combo completo para renovar o visual com acabamento profissional.",

            price: "R$ 90",

            featured: true
        },

        {
            name: "Barba premium",

            description:
                "Modelagem, toalha quente e acabamento para deixar sua barba impecável.",

            price: "R$ 45",

            featured: false
        }

    ]

};


/* =====================================================
   SUPABASE
===================================================== */

const SUPABASE_URL =
    "https://kuhdbyjejwhsmaunvupf.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_Hnrie3sbRLN_0YUgjQcqzw_Kd2wcori";

let supabaseClient = null;

if (
    window.supabase &&
    typeof window.supabase.createClient === "function"
) {

    supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_KEY
        );

}


/* =====================================================
   ELEMENTOS
===================================================== */

const header =
    document.getElementById("header");

const menuButton =
    document.getElementById("menuButton");

const navigation =
    document.getElementById("navigation");

const year =
    document.getElementById("year");

const logo =
    document.getElementById("logo");

const footerLogo =
    document.getElementById("footerLogo");

const footerName =
    document.getElementById("footerName");

const heroText =
    document.getElementById("heroText");

const aboutLogo =
    document.getElementById("aboutLogo");

const aboutTitle =
    document.getElementById("aboutTitle");

const aboutText1 =
    document.getElementById("aboutText1");

const aboutText2 =
    document.getElementById("aboutText2");

const experience =
    document.getElementById("experience");

const clients =
    document.getElementById("clients");

const servicesGrid =
    document.getElementById("servicesGrid");

const whatsappButton =
    document.getElementById("whatsappButton");

const instagramLink =
    document.getElementById("instagramLink");

const address =
    document.getElementById("address");

const openingHours =
    document.getElementById("openingHours");

const contactBusinessName =
    document.getElementById(
        "contactBusinessName"
    );

const phone =
    document.getElementById("phone");

const reviewModal =
    document.getElementById("reviewModal");

const openReview =
    document.getElementById("openReview");

const closeReview =
    document.getElementById("closeReview");

const reviewForm =
    document.getElementById("reviewForm");

const reviewName =
    document.getElementById("reviewName");

const reviewRating =
    document.getElementById("reviewRating");

const reviewComment =
    document.getElementById("reviewComment");

const reviewMessage =
    document.getElementById("reviewMessage");

const submitReview =
    document.getElementById("submitReview");

const reviewsList =
    document.getElementById("reviewsList");

const averageRating =
    document.getElementById("averageRating");


/* =====================================================
   APLICAÇÃO DA CONFIGURAÇÃO
===================================================== */

function applyBusinessConfig() {

    document.title =
        `${BARBERSHOP.fullName} | Barbearia Premium`;


    if (logo) {

        logo.innerHTML =
            `${escapeHTML(BARBERSHOP.name)}<span>.</span>`;

    }


    if (footerLogo) {

        footerLogo.innerHTML =
            `${escapeHTML(BARBERSHOP.name)}<span>.</span>`;

    }


    if (footerName) {

        footerName.textContent =
            BARBERSHOP.fullName;

    }


    if (aboutLogo) {

        aboutLogo.textContent =
            BARBERSHOP.name;

    }


    if (heroText) {

        heroText.textContent =
            BARBERSHOP.heroText;

    }


    if (aboutTitle) {

        aboutTitle.innerHTML =
            BARBERSHOP.aboutTitle;

    }


    if (aboutText1) {

        aboutText1.textContent =
            BARBERSHOP.aboutText1;

    }


    if (aboutText2) {

        aboutText2.textContent =
            BARBERSHOP.aboutText2;

    }


    if (experience) {

        experience.textContent =
            BARBERSHOP.experience;

    }


    if (clients) {

        clients.textContent =
            BARBERSHOP.clients;

    }


    if (address) {

        address.innerHTML =
            `${escapeHTML(BARBERSHOP.address)}
             <br>
             ${escapeHTML(BARBERSHOP.city)}`;

    }


    if (openingHours) {

        openingHours.innerHTML =
            BARBERSHOP.openingHours;

    }


    if (phone) {

        phone.textContent =
            formatPhone(
                BARBERSHOP.whatsapp
            );

    }


    if (instagramLink) {

        instagramLink.href =
            BARBERSHOP.instagram;

        instagramLink.textContent =
            BARBERSHOP.instagramUser;

    }


    if (contactBusinessName) {

        contactBusinessName.textContent =
            `a ${BARBERSHOP.name}.`;

    }


    if (whatsappButton) {

        whatsappButton.href =
            `https://wa.me/${BARBERSHOP.whatsapp}`;

    }


    renderServices();

}


/* =====================================================
   SERVIÇOS
===================================================== */

function renderServices() {

    if (!servicesGrid) {
        return;
    }

    servicesGrid.innerHTML = "";


    BARBERSHOP.services.forEach(
        (service, index) => {

            const article =
                document.createElement("article");

            article.className =
                "service-card" +
                (
                    service.featured
                        ? " featured"
                        : ""
                );


            article.innerHTML = `

                <div class="service-number">
                    ${String(index + 1).padStart(2, "0")}
                </div>

                <h3>
                    ${escapeHTML(service.name)}
                </h3>

                <p>
                    ${escapeHTML(service.description)}
                </p>

                <strong>
                    ${escapeHTML(service.price)}
                </strong>

            `;


            servicesGrid.appendChild(
                article
            );

        }
    );

}


/* =====================================================
   FORMATAR WHATSAPP
===================================================== */

function formatPhone(number) {

    const digits =
        String(number)
            .replace(/\D/g, "");

    if (digits.length === 13) {

        return (
            `(${digits.slice(2, 4)}) ` +
            `${digits.slice(4, 9)}-` +
            `${digits.slice(9)}`
        );

    }

    if (digits.length === 12) {

        return (
            `(${digits.slice(2, 4)}) ` +
            `${digits.slice(4, 8)}-` +
            `${digits.slice(8)}`
        );

    }

    return number;
}


/* =====================================================
   ANO
===================================================== */

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =====================================================
   HEADER
===================================================== */

function updateHeader() {

    if (!header) {
        return;
    }

    if (window.scrollY > 30) {

        header.classList.add(
            "scrolled"
        );

    } else {

        header.classList.remove(
            "scrolled"
        );

    }

}

window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();


/* =====================================================
   MENU MOBILE
===================================================== */

function closeMobileMenu() {

    if (!navigation) {
        return;
    }

    navigation.classList.remove(
        "active"
    );

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


if (
    menuButton &&
    navigation
) {

    menuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                navigation.classList.toggle(
                    "active"
                );


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

        }
    );


    navigation
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });

}


window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 700
        ) {

            closeMobileMenu();

        }

    }
);


/* =====================================================
   LINKS INTERNOS
===================================================== */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =====================================================
   MODAL
===================================================== */

function openReviewModal() {

    if (!reviewModal) {
        return;
    }

    reviewModal.classList.add(
        "active"
    );

    reviewModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "review-open"
    );


    setTimeout(
        () => {

            if (reviewName) {
                reviewName.focus();
            }

        },
        150
    );

}


function closeReviewModal() {

    if (!reviewModal) {
        return;
    }

    reviewModal.classList.remove(
        "active"
    );

    reviewModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "review-open"
    );

}


if (openReview) {

    openReview.addEventListener(
        "click",
        openReviewModal
    );

}


if (closeReview) {

    closeReview.addEventListener(
        "click",
        closeReviewModal
    );

}


if (reviewModal) {

    reviewModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                reviewModal
            ) {

                closeReviewModal();

            }

        }
    );

}


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            reviewModal &&
            reviewModal.classList.contains(
                "active"
            )
        ) {

            closeReviewModal();

        }

    }
);


/* =====================================================
   ESTRELAS
===================================================== */

const starButtons =
    document.querySelectorAll(
        "#starPicker button"
    );


starButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const rating =
                    Number(
                        button.dataset.rating
                    );


                if (reviewRating) {

                    reviewRating.value =
                        String(rating);

                }


                starButtons.forEach(
                    (star) => {

                        const starRating =
                            Number(
                                star.dataset.rating
                            );


                        star.classList.toggle(
                            "selected",
                            starRating <= rating
                        );

                    }
                );

            }
        );

    }
);


/* =====================================================
   ESCAPAR HTML
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =====================================================
   CARREGAR AVALIAÇÕES
===================================================== */

async function loadReviews() {

    if (!supabaseClient) {

        console.error(
            "Supabase não foi inicializado."
        );

        renderReviews([]);

        return;

    }


    const {
        data,
        error
    } = await supabaseClient

        .from("reviews")

        .select(
            "id, name, rating, comment, created_at"
        )

        .order(
            "created_at",
            {
                ascending: false
            }
        );


    if (error) {

        console.error(
            "Erro ao carregar avaliações:",
            error
        );

        renderReviews([]);

        return;

    }


    renderReviews(
        data || []
    );

}


/* =====================================================
   MOSTRAR AVALIAÇÕES
===================================================== */

function renderReviews(
    reviews
) {

    if (!reviewsList) {
        return;
    }


    if (
        !reviews ||
        reviews.length === 0
    ) {

        reviewsList.innerHTML = `

            <p class="no-reviews">
                Ainda não existem avaliações.
                Seja o primeiro a avaliar!
            </p>

        `;


        if (averageRating) {

            averageRating.textContent =
                "0.0";

        }

        return;

    }


    reviewsList.innerHTML = "";


    reviews.forEach(
        (review) => {

            const article =
                document.createElement(
                    "article"
                );


            article.className =
                "testimonial";


            const rating =
                Math.max(
                    1,
                    Math.min(
                        5,
                        Number(
                            review.rating
                        )
                    )
                );


            const stars =
                "★".repeat(rating) +
                "☆".repeat(
                    5 - rating
                );


            const date =
                review.created_at

                    ? new Date(
                        review.created_at
                    ).toLocaleDateString(
                        "pt-BR"
                    )

                    : "";


            article.innerHTML = `

                <div class="stars">
                    ${stars}
                </div>

                <p>
                    “${escapeHTML(
                        review.comment
                    )}”
                </p>

                <strong>
                    ${escapeHTML(
                        review.name
                    )}
                </strong>

                <small>
                    ${date}
                </small>

            `;


            reviewsList.appendChild(
                article
            );

        }
    );


    updateAverage(
        reviews
    );

}


/* =====================================================
   MÉDIA
===================================================== */

function updateAverage(
    reviews
) {

    if (
        !averageRating ||
        !reviews.length
    ) {

        return;

    }


    const total =
        reviews.reduce(
            (
                sum,
                review
            ) => {

                return (
                    sum +
                    Number(
                        review.rating
                    )
                );

            },
            0
        );


    const average =
        total /
        reviews.length;


    averageRating.textContent =
        average.toFixed(1);

}


/* =====================================================
   ENVIAR AVALIAÇÃO
===================================================== */

if (reviewForm) {

    reviewForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const name =
                reviewName
                    ? reviewName.value.trim()
                    : "";


            const rating =
                reviewRating
                    ? Number(
                        reviewRating.value
                    )
                    : 0;


            const comment =
                reviewComment
                    ? reviewComment.value.trim()
                    : "";


            if (!name) {

                showReviewMessage(
                    "Digite seu nome."
                );

                return;

            }


            if (
                rating < 1 ||
                rating > 5
            ) {

                showReviewMessage(
                    "Escolha uma nota de 1 a 5 estrelas."
                );

                return;

            }


            if (!comment) {

                showReviewMessage(
                    "Digite um comentário."
                );

                return;

            }


            if (!supa