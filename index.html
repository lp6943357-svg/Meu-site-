"use strict";

/* =========================
   CONFIGURAÇÃO SUPABASE
========================= */

const SUPABASE_URL =
    "https://kuhdbyjejwhsmaunvupf.supabase.co";

/*
   Use aqui a sua chave PUBLICÁVEL do Supabase.
   Não use a service_role.
*/
const SUPABASE_KEY =
    "COLE_AQUI_SUA_CHAVE_PUBLICAVEL";


let supabaseClient = null;

if (
    window.supabase &&
    SUPABASE_KEY !== "COLE_AQUI_SUA_CHAVE_PUBLICAVEL"
) {
    supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_KEY
        );
}


/* =========================
   ELEMENTOS
========================= */

const header =
    document.getElementById("header");

const menuButton =
    document.getElementById("menuButton");

const navigation =
    document.getElementById("navigation");

const year =
    document.getElementById("year");

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


/* =========================
   ANO
========================= */

if (year) {
    year.textContent =
        new Date().getFullYear();
}


/* =========================
   HEADER
========================= */

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();


/* =========================
   MENU MOBILE
========================= */

if (menuButton && navigation) {

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
                () => {

                    navigation.classList.remove(
                        "active"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuButton.setAttribute(
                        "aria-label",
                        "Abrir menu"
                    );
                }
            );
        });
}


/* =========================
   RESIZE
========================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 850 &&
            navigation
        ) {

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
    }
);


/* =========================
   LINKS INTERNOS
========================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");

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

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        );
    });


/* =========================
   MODAL
========================= */

function openReviewModal() {

    if (!reviewModal) return;

    reviewModal.classList.add("active");

    reviewModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";
}


function closeReviewModal() {

    if (!reviewModal) return;

    reviewModal.classList.remove("active");

    reviewModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";
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
                event.target === reviewModal
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
            reviewModal.classList.contains("active")
        ) {
            closeReviewModal();
        }
    }
);


/* =========================
   ESTRELAS
========================= */

const starButtons =
    document.querySelectorAll(
        "#starPicker button"
    );


starButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const rating =
                Number(
                    button.dataset.rating
                );

            reviewRating.value =
                String(rating);

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
});


/* =========================
   SUPABASE
========================= */

async function loadReviews() {

    if (!supabaseClient) {
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

        return;
    }

    renderReviews(data || []);
}


function renderReviews(reviews) {

    if (!reviewsList) return;

    if (reviews.length === 0) {
        return;
    }

    reviewsList.innerHTML = "";

    reviews.forEach((review) => {

        const article =
            document.createElement("article");

        article.className =
            "testimonial";

        const stars =
            "★".repeat(review.rating) +
            "☆".repeat(5 - review.rating);

        const date =
            new Date(
                review.created_at
            ).toLocaleDateString(
                "pt-BR"
            );

        article.innerHTML = `
            <div class="stars">
                ${stars}
            </div>

            <p>
                “${escapeHTML(review.comment)}”
            </p>

            <strong>
                ${escapeHTML(review.name)}
            </strong>

            <small>
                ${date}
            </small>
        `;

        reviewsList.appendChild(article);
    });


    updateAverage(reviews);
}


/* =========================
   MÉDIA
========================= */

function updateAverage(reviews) {

    if (!averageRating || reviews.length === 0) {
        return;
    }

    const total =
        reviews.reduce(
            (sum, review) =>
                sum + Number(review.rating),
            0
        );

    const average =
        total / reviews.length;

    averageRating.textContent =
        average.toFixed(1);
}


/* =========================
   SEGURANÇA
========================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================
   ENVIAR AVALIAÇÃO
========================= */

if (reviewForm) {

    reviewForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            const name =
                reviewName.value.trim();

            const rating =
                Number(reviewRating.value);

            const comment =
                reviewComment.value.trim();


            if (!name) {

                reviewMessage.textContent =
                    "Digite seu nome.";

                return;
            }


            if (
                rating < 1 ||
                rating > 5
            ) {

                reviewMessage.textContent =
                    "Escolha uma nota de 1 a 5 estrelas.";

                return;
            }


            if (!comment) {

                reviewMessage.textContent =
                    "Digite um comentário.";

                return;
            }


            if (!supabaseClient) {

                reviewMessage.textContent =
                    "Configure a chave do Supabase no script.js.";

                return;
            }


            submitReview.disabled = true;

            submitReview.textContent =
                "Enviando...";

            reviewMessage.textContent =
                "";


            const {
                error
            } = await supabaseClient
                .from("reviews")
                .insert({
                    name: name,
                    rating: rating,
                    comment: comment
                });


            if (error) {

                console.error(
                    "Erro ao enviar avaliação:",
                    error
                );

                reviewMessage.textContent =
                    "Não foi possível enviar. Tente novamente.";

                submitReview.disabled = false;

                submitReview.textContent =
                    "Enviar avaliação";

                return;
            }


            reviewMessage.textContent =
                "⭐ Avaliação enviada com sucesso!";


            reviewForm.reset();

            reviewRating.value =
                "0";

            starButtons.forEach(
                (star) =>
                    star.classList.remove(
                        "selected"
                    )
            );


            submitReview.disabled = false;

            submitReview.textContent =
                "Enviar avaliação";


            await loadReviews();


            setTimeout(
                closeReviewModal,
                1200
            );
        }
    );
}


/* =========================
   INICIAR
========================= */

loadReviews();