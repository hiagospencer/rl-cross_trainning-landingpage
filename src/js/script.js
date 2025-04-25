const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const carouselImages = document.querySelectorAll(".carousel-image");
const thumbnails = document.querySelectorAll(".thumbnail");
  const track = document.getElementById("carouselTrack");

  let imageWidth = carouselImages[0].offsetWidth + 20;

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = link.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: "smooth",
    });
  });
});

function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("show");
}

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href").slice(1) === entry.target.id) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  {
    threshold: 0.6, // A seção precisa estar 60% visível para ser considerada ativa
  }
);

sections.forEach((section) => observer.observe(section));

carouselImages.forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.src;
    });
  });

  function closeModal() {
    modal.style.display = "none";
  }

  // Fechar com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Fechar clicando fora da imagem
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  function scrollToImage(index) {
    track.scrollTo({
      left: index * imageWidth,
      behavior: "smooth",
    });

    // Atualiza thumbnail ativa
    thumbnails.forEach((t) => t.classList.remove("active-thumb"));
    thumbnails[index].classList.add("active-thumb");
  }

  // Clique na miniatura
  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const index = parseInt(thumb.dataset.index);
      scrollToImage(index);
    });
  });

  window.addEventListener("resize", () => {
    imageWidth = carouselImages[0].offsetWidth + 20;
  });

  const sendToWhatSapp = () => {
    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const errorMensagem = document.getElementById("#errorMensagem");

    const numeroDestino = "+5584987137129";
    const mensagem =
      "Olá, gostaria de fazer parte da família RL Cross Training!";

    const url =
      "https://wa.me/" +
      numeroDestino +
      "?text=" +
      mensagem +
      "%0a%0a" +
      "Nome: " +
      nome +
      "%0a" +
      "Sobrenome: " +
      sobrenome +
      "%0a" +
      "Email: " +
      email +
      "%0a" +
      "Telefone: " +
      telefone +
      "%0a";

    if (nome === "" || sobrenome === "" || email === "" || telefone === "") {
      errorMensagem.setAttribute("class", "error");
    } else {
      window.open(url, "_blank").focus();
    }
  };
