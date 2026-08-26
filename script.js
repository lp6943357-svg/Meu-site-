"use strict";

/* =====================================================
   CONFIGURAÇÃO SUPABASE
===================================================== */

const SUPABASE_URL =
    "https://kuhdbyjejwhsmaunvupf.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_Hnrie3sbRLN_0YUgjCqzw_Kd2wcori";

let supabaseClient = null;

if (
    window.supabase &&
    typeof window.supabase.createClient === "function"
) {
    supabaseClient = window.supabase.createClient(
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

const servicesGrid =
    document.getElementById("servicesGrid");

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

const whatsappButton =
    document.getElementById("whatsappButton");


/* =====================================================
   ANO AUTOMÁTICO
===================================================== */

if (year) {
    year.textContent =
        new Date().getFullYear();
}


/* =====================================================
   SERVIÇOS
===================================================== */

const services = [

    {
        number: "01",
        name: "Corte masculino",
        description:
            "Corte personalizado de acordo com seu estilo, formato de rosto e preferência.",
        price: "R$ 60"
    },

    {
        number: "02",
        name: "Corte + Barba",
        description:
            "O combo completo para renovar o visual com acabamento profissional.",
        price: "R$ 90",
        featured: true
    },

    {
        number: "03",
        name: "Barba premium",
        description:
            "Modelagem, toalha quente e acabamento para deixar sua barba impecável.",
        price: "R$ 45"
    }

];


function renderServices() {

    if (!servicesGrid) {
        return;
    }

    servicesGrid.innerHTML = "";

    services.forEach(function (service) {

        const card =
            document.createElement("article");

        card.className =
            "service-card";

        if (service.featured) {
            card.classList.add("featured");
        }

        card.innerHTML = `

            <div class="service-number">
                ${service.number}
            </div>

            <h3>
                ${service.name}
            </h3>

            <p>
                ${service.description}
            </p>

            <strong>
                ${service.price}
            </strong>

        `;

        servicesGrid.appendChild(card);

    });
}

renderServices();


/* =====================================================
   HEADER AO ROLAR
===================================================== */

function updateHeader() {

    if (!header) {
        return;
    }

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }
}


window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);

updateHeader();


/* =====================================================
   MENU MOBILE
===================================================== */

function openMenu() {

    if (!navigation) {
        return;
    }

    navigation.classList.add("active");

    if (menuButton) {

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        menuButton.setAttribute(
            "aria-label",
            "Fechar menu"
        );

    }
}


function closeMenu() {

    if (!navigation) {
        return;
    }

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


function toggleMenu() {

    if (!navigation) {
        return;
    }

    const isOpen =
        navigation.classList.contains("active");

    if (isOpen) {

        closeMenu();

    } else {

        openMenu();

    }
}


/* =====================================================
   BOTÃO DOS 3 TRACINHOS
===================================================== */

if (menuButton) {

    menuButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            toggleMenu();

        }
    );

}


/* =====================================================
   LINKS DO MENU
===================================================== */

if (navigation) {

    navigation
        .querySelectorAll("a")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMenu();

                }
            );

        });

}


/* =====================================================
   FECHAR MENU AO REDIMENSIONAR
===================================================== */

window.addEventListener(
    "resize",
    function () {

        if (window.innerWidth > 850) {

            closeMenu();

        }

    }
);


/* =====================================================
   LINKS INTERNOS
===================================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

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

                closeMenu();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =====================================================
   WHATSAPP
===================================================== */

if (whatsappButton) {

    const whatsappNumber =
        "5531900000000";

    const whatsappMessage =
        "Olá! Gostaria de agendar um horário na barbearia.";

    whatsappButton.href =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(
            whatsappMessage
        );

}


/* =====================================================
   MODAL DE AVALIAÇÃO
===================================================== */

function openReviewModal() {

    if (!reviewModal) {
        return;
    }

    reviewModal.classList.add("active");

    reviewModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "review-open"
    );

    setTimeout(
        function () {

            if (reviewName) {
                reviewName.focus();
            }

        },
        250
    );

}


function closeReviewModal() {

    if (!reviewModal) {
        return;
    }

    reviewModal.classList.remove("active");

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
        function (event) {

            if (
                event.target ===
                reviewModal
            ) {

                closeReviewModal();

            }

        }
    );

}


/* =====================================================
   ESC FECHA MODAL
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            reviewModal &&
            reviewModal.classList.contains("active")
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


starButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const rating =
                Number(
                    button.dataset.rating
                );

            if (reviewRating) {

                reviewRating.value =
                    String(rating);

            }

            starButtons.forEach(
                function (star) {

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

        return;
    }

    try {

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
            throw error;
        }

        renderReviews(
            data || []
        );

    } catch (error) {

        console.error(
            "Erro ao carregar avaliações:",
            error
        );

    }

}


/* =====================================================
   MOSTRAR AVALIAÇÕES
===================================================== */

function renderReviews(reviews) {

    if (!reviewsList) {
        return;
    }

    if (
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


    reviews.forEach(function (review) {

        const article =
            document.createElement(
                "article"
            );

        article.className =
            "testimonial";


        let rating =
            Number(review.rating);

        if (!Number.isFinite(rating)) {
            rating = 1;
        }

        rating =
            Math.max(
                1,
                Math.min(
                    5,
                    Math.round(rating)
                )
            );


        const stars =
            "★".repeat(rating) +
            "☆".repeat(5 - rating);


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

    });


    updateAverage(
        reviews
    );

}


/* =====================================================
   CALCULAR MÉDIA
===================================================== */

function updateAverage(reviews) {

    if (
        !averageRating ||
        reviews.length === 0
    ) {

        return;
    }


    const validRatings =
        reviews
            .map(function (review) {

                return Number(
                    review.rating
                );

            })
            .filter(function (rating) {

                return (
                    Number.isFinite(rating) &&
                    rating >= 1 &&
                    rating <= 5
                );

            });


    if (
        validRatings.length === 0
    ) {

        averageRating.textContent =
            "0.0";

        return;
    }


    const total =
        validRatings.reduce(
            function (
                sum,
                rating
            ) {

                return sum + rating;

            },
            0
        );


    const average =
        total /
        validRatings.length;


    averageRating.textContent =
        average.toFixed(1);

}


/* =====================================================
   ENVIAR AVALIAÇÃO
===================================================== */

if (reviewForm) {

    reviewForm.addEventListener(
        "submit",
        async function (event) {

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


            /* VALIDAÇÃO DO NOME */

            if (!name) {

                if (reviewMessage) {

                    reviewMessage.textContent =
                        "Digite seu nome.";

                }

                if (reviewName) {
                    reviewName.focus();
                }

                return;
            }


            /* VALIDAÇÃO DA NOTA */

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


            /* VALIDAÇÃO DO COMENTÁRIO */

            if (!comment) {

                if (reviewMessage) {

                    reviewMessage.textContent =
                        "Digite um comentário.";

                }

                if (reviewComment) {
                    reviewComment.focus();
                }

                return;
            }


            /* SUPABASE */

            if (!supabaseClient) {

                if (reviewMessage) {

                    reviewMessage.textContent =
                        "Sistema de avaliações indisponível.";

                }

                return;
            }


            /* BOTÃO ENVIANDO */

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

                            name:
                                name,

                            rating:
                                rating,

                            comment:
                                comment

                        });


                if (error) {
                    throw error;
                }


                /* SUCESSO */

                if (reviewMessage) {

                    reviewMessage.textContent =
                        "⭐ Avaliação enviada com sucesso!";

                }


                /* LIMPAR FORMULÁRIO */

                reviewForm.reset();


                if (reviewRating) {

                    reviewRating.value =
                        "0";

                }


                starButtons.forEach(
                    function (star) {

                        star.classList.remove(
                            "selected"
                        );

                    }
                );


                /* ATUALIZAR AVALIAÇÕES */

                await loadReviews();


                /* FECHAR MODAL */

                setTimeout(
                    function () {

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


/* =====================================================
   INICIAR
===================================================== */

loadReviews();