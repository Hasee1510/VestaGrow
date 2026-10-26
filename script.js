// ================================

// script.js
// ================================


// -------------------------------
// AOS Animation
// -------------------------------

//AOS.init({

    //duration:1000,

    //once:true,

    //offset:100

//});
if (window.AOS) {
    AOS.init({ duration: 1000, once: true, offset: 100 });
}

// -------------------------------
// Mobile Menu
// -------------------------------

const menuBtn=document.querySelector(".menu-btn");

const navLinks=document.querySelector(".nav-links");

menuBtn.addEventListener("click",()=>{

    navLinks.classList.toggle("show");

});
navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("show"));
});


// -------------------------------
// Counter Animation
// -------------------------------

const counters = document.querySelectorAll(".count");

const runCounter = (counter) => {
    const target = +counter.dataset.target;
    const duration = 1500;
    const start = performance.now();

    const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        counter.textContent = Math.floor(progress * target);
        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            counter.textContent = target;
        }
    };
    requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runCounter(entry.target);
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));


// -------------------------------
// FAQ Accordion
// -------------------------------

const faqItems=document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

    const button=item.querySelector("button");

    button.addEventListener("click",()=>{

        faqItems.forEach(faq=>{

            if(faq!==item){

                faq.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});


// -------------------------------
// Navbar Shadow on Scroll
// -------------------------------

const header=document.querySelector(".header");

window.addEventListener("scroll",()=>{

    if(window.scrollY>50){

        header.style.background="#0f172a";

        header.style.boxShadow="0 10px 30px rgba(0,0,0,.15)";

    }

    else{

        header.style.background="rgba(15,23,42,.9)";

        header.style.boxShadow="none";

    }

});


// -------------------------------
// Smooth Scrolling
// -------------------------------

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({

            behavior:"smooth"

        });

    });

});


// -------------------------------
// Active Navigation Link
// -------------------------------

// const sections=document.querySelectorAll("section");

// const navItems=document.querySelectorAll(".nav-links a");

// window.addEventListener("scroll",()=>{

//     let current="";

//     sections.forEach(section=>{

//         const sectionTop=section.offsetTop-150;

//         const sectionHeight=section.clientHeight;

//         if(pageYOffset>=sectionTop){

//             current=section.getAttribute("id");

//         }

//     });

//     navItems.forEach(link=>{

//         link.classList.remove("active");

//         if(link.getAttribute("href")==="#"+current){

//             link.classList.add("active");

//         }

//     });

// });
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 150) {
            current = section.id;
        }
    });
    navItems.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
});

// -------------------------------
// Hero Image Floating Animation
// -------------------------------

// const heroImage=document.querySelector(".hero-image img");

// let direction=1;

// setInterval(()=>{

//     heroImage.style.transform=`translateY(${direction*10}px)`;

//     direction*=-1;

// },2000);


// -------------------------------



// -------------------------------
// Fade-in Cards on Hover
// // -------------------------------

// const cards=document.querySelectorAll(".card");

// cards.forEach(card=>{

//     card.addEventListener("mouseenter",()=>{

//         card.style.transform="translateY(-12px) scale(1.03)";

//     });

//     card.addEventListener("mouseleave",()=>{

//         card.style.transform="translateY(0) scale(1)";

//     });

// });


// ================================
// END OF FILE
// ================================
