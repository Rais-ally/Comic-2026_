
/* ================= LOADING ================= */
window.addEventListener("load", () => {
    const loader = document.getElementById("loading");
    if(loader){
        setTimeout(() => {
            loader.classList.add("fade-out");
            setTimeout(() => loader.style.display = "none", 800);
        }, 4000);
    }
});

/* ================= MENU HAMBURGER ================= */
const sideMenu = document.getElementById("sideMenu");
const hamburger = document.querySelector(".hamburger");

function toggleMenu() {
  sideMenu.classList.toggle("active");
  hamburger.classList.toggle("open");
}

// Close menu when click outside
document.addEventListener("click", (e) => {
  if (!sideMenu.contains(e.target) && !hamburger.contains(e.target)) {
    sideMenu.classList.remove("active");
    hamburger.classList.remove("open");
  }
});

// Close menu with ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    sideMenu.classList.remove("active");
    hamburger.classList.remove("open");
  }
});

// Handle link click
document.querySelectorAll(".side-menu a").forEach(link => {
    link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        sideMenu.classList.remove("active");
        hamburger.classList.remove("open");

        if (href && href.includes(".html")) {
            e.preventDefault();
            const loader = document.getElementById("loading");
            if(loader){
                loader.style.display = "flex";
                loader.style.opacity = "1";
                loader.style.transform = "scale(1)";
            }
            setTimeout(() => { window.location.href = href; }, 900);
        }
    });
});

/* ================= SCROLL REVEAL ================= */
const reveals = document.querySelectorAll(".reveal");
function revealOnScroll() {
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const revealTop = el.getBoundingClientRect().top;
    if (revealTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // inisialisasi

/* ================= CURSOR GLOW ================= */
const cursor = document.getElementById("cursorGlow");
if(cursor){
    document.addEventListener("mousemove", (e) => {
        requestAnimationFrame(() => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        });
    });
}

/* ================= HERO PARALLAX ================= */
document.addEventListener("mousemove", (e) => {
  const hero = document.querySelector(".hero");
  if(hero){
      const x = (window.innerWidth / 2 - e.clientX) / 50;
      const y = (window.innerHeight / 2 - e.clientY) / 50;
      hero.style.transform = `translate(${x}px, ${y}px)`;
  }
});

/* ================= CLICK SOUND ================= */
const sound = document.getElementById("clickSound");
document.querySelectorAll("a, button").forEach(btn => {
  btn.addEventListener("click", () => {
    if(sound){
        sound.currentTime = 0;
        sound.play();
    }
  });
});

const targetDate = new Date('September 1, 2026 00:00:00').getTime();

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const countdownTotal = document.getElementById('countdown-total');

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
        countdownTotal.textContent = "Pendaftaran COMIC 2026 Telah Berakhir!";
        daysEl.textContent = hoursEl.textContent = minutesEl.textContent = secondsEl.textContent = "00";
        return;
    }

    const days = Math.floor(distance / (1000*60*60*24));
    const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
    const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((distance % (1000*60)) / 1000);

    countdownTotal.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Update boxes
    animateBox(daysEl, days);
    animateBox(hoursEl, hours);
    animateBox(minutesEl, minutes);
    animateBox(secondsEl, seconds);
}

// Animasi “pop” setiap kali angka berubah
function animateBox(el, value) {
    if(el.textContent != value) {
        el.textContent = value < 10 ? "0"+value : value;
        el.parentElement.classList.add('pop');
        setTimeout(() => el.parentElement.classList.remove('pop'), 200);
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

