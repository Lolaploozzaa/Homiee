/* ==========================================================
   HOME — Birthday Website
   script.js (Part 1)
========================================================== */

const loader = document.getElementById("loader");
const beginButton = document.getElementById("beginButton");
const confettiButton = document.getElementById("confettiButton");
const music = document.getElementById("backgroundMusic");
const hero = document.getElementById("hero");

/* ==========================================================
   Loader
========================================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.classList.add("loader-hidden");

    }, 2600);

});


/* ==========================================================
   Smooth Scroll
========================================================== */

beginButton.addEventListener("click", () => {

    const chapter = document.querySelector(".chapter");

    chapter.scrollIntoView({

        behavior: "smooth"

    });

});


/* ==========================================================
   Music
========================================================== */

let musicStarted = false;

beginButton.addEventListener("click", () => {

    if (!musicStarted) {

        music.play().catch(() => {});

        musicStarted = true;

    }

});


/* ==========================================================
   Fade on Scroll
========================================================== */

const animatedItems = document.querySelectorAll(
`
.chapter,
.polaroid,
.timeline-item,
.song,
.letter,
.ending-content
`
);

animatedItems.forEach(item => {

    item.classList.add("fade-up");

});

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: .15

});

animatedItems.forEach(item => {

    observer.observe(item);

});


/* ==========================================================
   Hero Parallax
========================================================== */

window.addEventListener("mousemove",(e)=>{

    const x=(e.clientX/window.innerWidth-.5)*18;

    const y=(e.clientY/window.innerHeight-.5)*18;

    hero.querySelector(".hero-content").style.transform=

        `translate(${x}px,${y}px)`;

});


/* ==========================================================
   Confetti Canvas Setup
========================================================== */

const canvas=document.getElementById("confettiCanvas");

const ctx=canvas.getContext("2d");

function resizeCanvas(){

    canvas.width=window.innerWidth;

    canvas.height=window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize",resizeCanvas);

let particles=[];

function createConfetti(){

    particles=[];

    for(let i=0;i<220;i++){

        particles.push({

            x:Math.random()*canvas.width,

            y:Math.random()*canvas.height-canvas.height,

            r:Math.random()*6+3,

            dx:(Math.random()-.5)*4,

            dy:Math.random()*5+3,

            rot:Math.random()*360,

            dr:(Math.random()-.5)*12,

            color:`hsl(${Math.random()*360},90%,65%)`

        });

    }

}
/* ==========================================================
   CONFETTI ANIMATION
========================================================== */

let animationRunning = false;

function drawConfetti() {

    if (!animationRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {

        ctx.save();

        ctx.translate(p.x, p.y);

        ctx.rotate(p.rot * Math.PI / 180);

        ctx.fillStyle = p.color;

        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.8);

        ctx.restore();

        p.x += p.dx;
        p.y += p.dy;
        p.rot += p.dr;

        if (p.y > canvas.height + 30) {

            p.y = -20;
            p.x = Math.random() * canvas.width;

        }

    });

    requestAnimationFrame(drawConfetti);

}


/* ==========================================================
   CELEBRATE BUTTON
========================================================== */

confettiButton.addEventListener("click", () => {

    createConfetti();

    animationRunning = true;

    drawConfetti();

});


/* ==========================================================
   TYPEWRITER EFFECT
========================================================== */

const finalQuote = document.querySelector(".final-quote");

if (finalQuote) {

    const originalText = finalQuote.textContent;

    finalQuote.textContent = "";

    let i = 0;

    const revealQuote = () => {

        if (i < originalText.length) {

            finalQuote.textContent += originalText.charAt(i);

            i++;

            setTimeout(revealQuote, 55);

        }

    };

    const quoteObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                revealQuote();

                quoteObserver.disconnect();

            }

        });

    }, {

        threshold: 0.6

    });

    quoteObserver.observe(finalQuote);

}


/* ==========================================================
   HERO FADE
========================================================== */

window.addEventListener("scroll", () => {

    const offset = window.scrollY;

    hero.style.opacity = Math.max(1 - offset / 650, 0);

});


/* ==========================================================
   POLAROID TILT
========================================================== */

document.querySelectorAll(".polaroid").forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 10;

        const rotateX = ((y / rect.height) - 0.5) * -10;

        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             scale(1.05)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* ==========================================================
   MUSIC BUTTON LABEL
========================================================== */

beginButton.addEventListener("click", () => {

    beginButton.textContent = "Enjoy the memories ❤️";

});


/* ==========================================================
   END
========================================================== */

console.log("HOME website loaded successfully ❤️");