"use strict";

/* =========================
   SUPABASE
========================= */

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


/* =========================
   ELEMENTOS
========================= */

const header =
    document.getElementById("header");

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

const starButtons =
    document.querySelectorAll(
        "#starPicker button"
    );


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

    setTimeout(() => {

        if (reviewName) {
            reviewName.focus();
        }

    }, 150);
}


function closeReviewModal() {

    if (!reviewModal) return;

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


/* =========================
   ESTRELAS
========================= */

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
                            starRating <=
                                rating
                        );
                    }
                );
            }
        );
    }
);


/* =========================
   ESCAPAR HTML
========================= */

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


/* =========================
   CARREGAR AVALIAÇÕES
========================= */

async function loadReviews() {

    if (!supabaseClient) {

        console.error(
            "Supabase não foi inicializado."
        );

        return;
    }

    const {
        data,
        error
    } =
        await supabaseClient
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

    renderReviews(
        data || []
    );
}


/* =========================
   RENDERIZAR AVALIAÇÕES
========================= */

function renderReviews(
    reviews
) {

    if (!reviewsList) return;

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
                "★".repeat(
                    rating
                ) +
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


/* =========================
   MÉDIA
========================= */

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
            ) =>
                sum +
                Number(
                    review.rating
                ),
            0
        );

    const average =
        total /
        reviews.length;

    averageRating.textContent =
        average.toFixed(1);
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

                if (reviewMessage) {

                    reviewMessage.textContent =
                        "Digite seu nome.";
                }

                return;
            }


            if (
                rating < 1 ||
                rating > 5
            ) {

                if (reviewMessage) {

                    reviewMessage.textContent =
                        "Escolha uma nota de 1 a 5 estrelas.";
                }

                return;
            }


            if (!comment) {

                if (reviewMessage) {

                    reviewMessage.textContent =
                        "Digite um comentário.";
                }

                return;
            }


            if (!supabaseClient) {

                if (reviewMessage) {

                    reviewMessage.textContent =
                        "O sistema de avaliações ainda não foi conectado ao Supabase.";
                }

                return;
            }


            if (submitReview) {

                submitReview.disabled =
                    true;

                submitReview.textContent =
                    "Enviando...";
            }


            if (reviewMessage) {

                reviewMessage.textContent =
                    "";
            }


            try {

                const {
                    error
                } =
                    await supabaseClient
                        .from("reviews")
                        .insert({
                            name: name,
                            rating: rating,
                            comment: comment
                        });


                if (error) {

                    throw error;
                }


                if (reviewMessage) {

                    reviewMessage.textContent =
                        "⭐ Avaliação enviada com sucesso!";
                }


                reviewForm.reset();


                if (reviewRating) {

                    reviewRating.value =
                        "0";
                }


                starButtons.forEach(
                    (star) => {

                        star.classList.remove(
                            "selected"
                        );
                    }
                );


                await loadReviews();


                setTimeout(
                    () => {

                        closeReviewModal();

                    },
                    1200
                );


            } catch (error) {

                console.error(
                    "Erro ao enviar avaliação:",
                    error
                );


                if (reviewMessage) {

                    reviewMessage.textContent =
                        "Não foi possível enviar. Tente novamente.";
                }

            } finally {

                if (submitReview) {

                    submitReview.disabled =
                        false;

                    submitReview.textContent =
                        "Enviar avaliação";
                }
            }
        }
    );
}


/* =========================
   INICIAR
========================= */

loadReviews();