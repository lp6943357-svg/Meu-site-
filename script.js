// ========================================
// PRIME BARBER — SCRIPT
// ========================================

const SUPABASE_URL =
    "https://kuhdbyjejwhsmaunvupf.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_Hnrie3sbRLN_0YUgjQcqzw_Kd2wcori";


// ========================================
// ANO DO RODAPÉ
// ========================================

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


// ========================================
// MENU MOBILE
// ========================================

const menuButton =
    document.getElementById("menuButton");

const navigation =
    document.getElementById("navigation");


if (menuButton && navigation) {

    menuButton.addEventListener("click", function () {

        navigation.classList.toggle("active");

        const isOpen =
            navigation.classList.contains("active");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    navigation
        .querySelectorAll("a")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navigation.classList.remove(
                        "active"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

}


// ========================================
// HEADER AO ROLAR
// ========================================

const header =
    document.getElementById("header");


window.addEventListener("scroll", function () {

    if (!header) return;

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


// ========================================
// SISTEMA DE AVALIAÇÕES
// ========================================

const testimonialsSection =
    document.getElementById("depoimentos");


if (testimonialsSection) {

    const heading =
        testimonialsSection.querySelector(
            ".section-heading"
        );

    const testimonialsGrid =
        testimonialsSection.querySelector(
            ".testimonials-grid"
        );


    // ------------------------------------
    // BOTÃO AVALIAR
    // ------------------------------------

    const reviewButton =
        document.createElement("button");

    reviewButton.type = "button";

    reviewButton.className =
        "button review-button";

    reviewButton.textContent =
        "⭐ Avaliar atendimento";


    if (heading) {

        heading.appendChild(reviewButton);

    }


    // ------------------------------------
    // MODAL
    // ------------------------------------

    const modal =
        document.createElement("div");

    modal.className =
        "review-modal";


    modal.innerHTML = `

        <div class="review-modal-content">

            <button
                type="button"
                class="review-close"
                aria-label="Fechar"
            >
                ×
            </button>

            <p class="eyebrow">
                SUA OPINIÃO
            </p>

            <h2>
                Como foi sua experiência?
            </h2>

            <form id="reviewForm">

                <label>
                    Seu nome

                    <input
                        id="reviewName"
                        type="text"
                        maxlength="80"
                        placeholder="Digite seu nome"
                        required
                    >
                </label>


                <label>
                    Sua avaliação

                    <div
                        class="star-picker"
                        id="starPicker"
                    >

                        <button
                            type="button"
                            data-rating="1"
                        >★</button>

                        <button
                            type="button"
                            data-rating="2"
                        >★</button>

                        <button
                            type="button"
                            data-rating="3"
                        >★</button>

                        <button
                            type="button"
                            data-rating="4"
                        >★</button>

                        <button
                            type="button"
                            data-rating="5"
                        >★</button>

                    </div>

                </label>


                <input
                    id="reviewRating"
                    type="hidden"
                    value="5"
                >


                <label>
                    Seu comentário

                    <textarea
                        id="reviewComment"
                        maxlength="500"
                        rows="5"
                        placeholder="Conte como foi sua experiência..."
                        required
                    ></textarea>

                </label>


                <button
                    id="submitReview"
                    type="submit"
                    class="button"
                >
                    Enviar avaliação
                </button>

            </form>

        </div>
    `;


    document.body.appendChild(modal);


    // ------------------------------------
    // ABRIR / FECHAR
    // ------------------------------------

    reviewButton.addEventListener(
        "click",
        function () {

            modal.classList.add("active");

        }
    );


    const closeButton =
        modal.querySelector(".review-close");


    closeButton.addEventListener(
        "click",
        function () {

            modal.classList.remove("active");

        }
    );


    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {

                modal.classList.remove(
                    "active"
                );

            }

        }
    );


    // ------------------------------------
    // ESTRELAS
    // ------------------------------------

    const starButtons =
        modal.querySelectorAll(
            ".star-picker button"
        );


    const ratingInput =
        modal.querySelector(
            "#reviewRating"
        );


    function setRating(rating) {

        ratingInput.value = rating;

        starButtons.forEach(
            function (star) {

                const value =
                    Number(
                        star.dataset.rating
                    );

                if (value <= rating) {

                    star.classList.add(
                        "selected"
                    );

                } else {

                    star.classList.remove(
                        "selected"
                    );

                }

            }
        );

    }


    starButtons.forEach(
        function (star) {

            star.addEventListener(
                "click",
                function () {

                    setRating(
                        Number(
                            star.dataset.rating
                        )
                    );

                }
            );

        }
    );


    setRating(5);


    // ====================================
    // ENVIAR AVALIAÇÃO
    // ====================================

    const form =
        modal.querySelector(
            "#reviewForm"
        );


    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const name =
                modal.querySelector(
                    "#reviewName"
                ).value.trim();


            const comment =
                modal.querySelector(
                    "#reviewComment"
                ).value.trim();


            const rating =
                Number(
                    ratingInput.value
                );


            if (
                !name ||
                !comment ||
                rating < 1 ||
                rating > 5
            ) {

                alert(
                    "Preencha todos os campos."
                );

                return;

            }


            const submitButton =
                modal.querySelector(
                    "#submitReview"
                );


            submitButton.disabled = true;

            submitButton.textContent =
                "Enviando...";


            try {

                const response =
                    await fetch(
                        `${SUPABASE_URL}/rest/v1/reviews`,
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                "apikey":
                                    SUPABASE_KEY,

                                "Authorization":
                                    `Bearer ${SUPABASE_KEY}`,

                                "Prefer":
                                    "return=representation"

                            },

                            body: JSON.stringify({

                                name: name,

                                rating: rating,

                                comment: comment

                            })

                        }
                    );


                if (!response.ok) {

                    const error =
                        await response.text();

                    console.error(error);

                    throw new Error(
                        "Erro ao salvar avaliação."
                    );

                }


                alert(
                    "Avaliação enviada com sucesso! ⭐"
                );


                form.reset();

                setRating(5);

                modal.classList.remove(
                    "active"
                );


                await loadReviews();


            } catch (error) {

                console.error(error);

                alert(
                    "Erro ao enviar avaliação. Tente novamente."
                );

            } finally {

                submitButton.disabled = false;

                submitButton.textContent =
                    "Enviar avaliação";

            }

        }
    );


    // ====================================
    // CARREGAR AVALIAÇÕES
    // ====================================

    async function loadReviews() {

        try {

            const response =
                await fetch(
                    `${SUPABASE_URL}/rest/v1/reviews?select=id,name,rating,comment,created_at&order=created_at.desc`,
                    {

                        headers: {

                            "apikey":
                                SUPABASE_KEY,

                            "Authorization":
                                `Bearer ${SUPABASE_KEY}`

                        }

                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Erro ao carregar avaliações."
                );

            }


            const reviews =
                await response.json();


            if (!testimonialsGrid) {
                return;
            }


            // Limpa os depoimentos antigos

            testimonialsGrid.innerHTML = "";


            // Nenhuma avaliação

            if (reviews.length === 0) {

                testimonialsGrid.innerHTML = `

                    <article class="testimonial">

                        <div class="stars">
                            ☆☆☆☆☆
                        </div>

                        <p>
                            Ainda não temos avaliações.
                            Seja o primeiro!
                        </p>

                        <strong>
                            Prime Barber
                        </strong>

                    </article>

                `;

                return;

            }


            // Criar cards

            reviews.forEach(
                function (review) {

                    const article =
                        document.createElement(
                            "article"
                        );


                    article.className =
                        "testimonial";


                    const rating =
                        Number(
                            review.rating
                        );


                    const stars =
                        "★".repeat(rating) +
                        "☆".repeat(5 - rating);


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


                    testimonialsGrid.appendChild(
                        article
                    );

                }
            );


        } catch (error) {

            console.error(error);

        }

    }


    // ------------------------------------
    // PROTEÇÃO CONTRA HTML
    // ------------------------------------

    function escapeHTML(text) {

        const element =
            document.createElement("div");

        element.textContent = text;

        return element.innerHTML;

    }


    // Carregar ao abrir o site

    loadReviews();

}


// ========================================
// FIM
// ========================================