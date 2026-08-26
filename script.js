const SUPABASE_URL = "https://kuhdbyjejwhsmaunvupf.supabase.co";
const SUPABASE_KEY = "sb_publishable_Hnrie3sbRLN_0YUgjQcqzw_Kd2wcori";

const CONFIG = {
  whatsappNumber: "5531999999999",
  whatsappMessage: "Olá! Vim pelo site e gostaria de saber mais sobre os serviços."
};

// ------------------------------
// WHATSAPP
// ------------------------------
const whatsappUrl =
  `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;

document.querySelectorAll(".whatsapp-link").forEach(link => {
  link.href = whatsappUrl;
});

// ------------------------------
// MENU MOBILE
// ------------------------------
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// ------------------------------
// MODAL DE AVALIAÇÃO
// ------------------------------
const modal = document.querySelector("#reviewModal");
const openReview = document.querySelector("#openReview");
const closeReview = document.querySelector("#closeReview");
const reviewForm = document.querySelector("#reviewForm");
const ratingInput = document.querySelector("#reviewRating");

const starButtons = [
  ...document.querySelectorAll(".star-picker button")
];

function setRating(value) {
  ratingInput.value = value;

  starButtons.forEach(button => {
    button.classList.toggle(
      "active",
      Number(button.dataset.rating) <= value
    );
  });
}

setRating(5);

starButtons.forEach(button => {
  button.addEventListener("click", () => {
    setRating(Number(button.dataset.rating));
  });
});

function showModal() {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function hideModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

openReview?.addEventListener("click", showModal);
closeReview?.addEventListener("click", hideModal);

modal?.addEventListener("click", event => {
  if (event.target === modal) {
    hideModal();
  }
});

// ------------------------------
// SUPABASE
// ------------------------------

async function getReviews() {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/reviews?select=id,name,rating,comment,created_at&order=created_at.desc`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    }
  );

  if (!response.ok) {
    throw new Error("Não foi possível carregar as avaliações.");
  }

  return await response.json();
}

async function createReview(review) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/reviews`,
    {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify(review)
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error(error);
    throw new Error("Não foi possível enviar sua avaliação.");
  }

  return await response.json();
}

// ------------------------------
// SEGURANÇA CONTRA HTML
// ------------------------------

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[character]));
}

// ------------------------------
// ESTRELAS
// ------------------------------

function stars(rating) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

// ------------------------------
// RENDERIZAR AVALIAÇÕES
// ------------------------------

function renderReviews(reviews) {
  const list = document.querySelector("#reviewsList");

  const averageElement =
    document.querySelector("#averageRating");

  const averageStarsElement =
    document.querySelector("#averageStars");

  const countElement =
    document.querySelector("#reviewCount");

  const count = reviews.length;

  countElement.textContent =
    `${count} ${count === 1 ? "avaliação" : "avaliações"}`;

  if (count === 0) {
    averageElement.textContent = "0,0";
    averageStarsElement.textContent = "☆☆☆☆☆";

    list.innerHTML = `
      <article class="review empty-review">
        <div class="review-stars">☆☆☆☆☆</div>
        <p>Ainda não temos avaliações. Seja o primeiro!</p>
      </article>
    `;

    [1, 2, 3, 4, 5].forEach(number => {
      document.querySelector(`#bar${number}`).style.width = "0%";
    });

    return;
  }

  const total = reviews.reduce(
    (sum, review) => sum + Number(review.rating),
    0
  );

  const average = total / count;

  averageElement.textContent =
    average.toFixed(1).replace(".", ",");

  averageStarsElement.textContent =
    stars(Math.round(average));

  // Barras de distribuição
  [1, 2, 3, 4, 5].forEach(number => {
    const amount = reviews.filter(
      review => Number(review.rating) === number
    ).length;

    const percentage = (amount / count) * 100;

    document.querySelector(`#bar${number}`)
      .style.width = `${percentage}%`;
  });

  // Cards das avaliações
  list.innerHTML = reviews.map(review => {
    const date = new Date(review.created_at)
      .toLocaleDateString("pt-BR");

    return `
      <article class="review">
        <div class="review-stars">
          ${stars(Number(review.rating))}
        </div>

        <p>
          ${escapeHtml(review.comment)}
        </p>

        <small>
          <strong>${escapeHtml(review.name)}</strong>
          · ${date}
        </small>
      </article>
    `;
  }).join("");
}

// ------------------------------
// CARREGAR AVALIAÇÕES
// ------------------------------

async function loadReviews() {
  try {
    const reviews = await getReviews();

    renderReviews(reviews);

  } catch (error) {
    console.error(error);

    document.querySelector("#reviewsList").innerHTML = `
      <article class="review empty-review">
        <p>
          Não foi possível carregar as avaliações agora.
        </p>
      </article>
    `;
  }
}

// ------------------------------
// ENVIAR AVALIAÇÃO
// ------------------------------

reviewForm?.addEventListener("submit", async event => {
  event.preventDefault();

  const name =
    document.querySelector("#reviewName").value.trim();

  const comment =
    document.querySelector("#reviewText").value.trim();

  const rating =
    Number(ratingInput.value);

  if (!name || !comment || rating < 1 || rating > 5) {
    alert("Preencha seu nome, comentário e escolha uma nota.");
    return;
  }

  const submitButton =
    reviewForm.querySelector("button[type='submit']");

  submitButton.disabled = true;
  submitButton.textContent = "Enviando...";

  try {

    await createReview({
      name: name,
      rating: rating,
      comment: comment
    });

    reviewForm.reset();
    setRating(5);

    hideModal();

    alert("Obrigado pela avaliação! ⭐");

    await loadReviews();

  } catch (error) {

    console.error(error);

    alert(
      "Não foi possível enviar sua avaliação. Tente novamente."
    );

  } finally {

    submitButton.disabled = false;
    submitButton.textContent = "Enviar avaliação";
  }
});

// ------------------------------
// INICIALIZAÇÃO
// ------------------------------

loadReviews();