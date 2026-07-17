// ================================
// FINORA CAPITAL
// script.js
// ================================


// -------------------------------
// AOS Animation
// -------------------------------

AOS.init({

    duration:1000,

    once:true,

    offset:100

});


// -------------------------------
// Mobile Menu
// -------------------------------

const menuBtn=document.querySelector(".menu-btn");

const navLinks=document.querySelector(".nav-links");

menuBtn.addEventListener("click",()=>{

    navLinks.classList.toggle("show");

});


// -------------------------------
// Counter Animation
// -------------------------------

const counters=document.querySelectorAll(".count");

const speed=200;

counters.forEach(counter=>{

    const animate=()=>{

        const target=+counter.getAttribute("data-target");

        const count=+counter.innerText;

        const increment=target/speed;

        if(count<target){

            counter.innerText=Math.ceil(count+increment);

            setTimeout(animate,10);

        }

        else{

            counter.innerText=target;

        }

    };

    animate();

});


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

const sections=document.querySelectorAll("section");

const navItems=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop=section.offsetTop-150;

        const sectionHeight=section.clientHeight;

        if(pageYOffset>=sectionTop){

            current=section.getAttribute("id");

        }

    });

    navItems.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});


// -------------------------------
// Hero Image Floating Animation
// -------------------------------

const heroImage=document.querySelector(".hero-image img");

let direction=1;

setInterval(()=>{

    heroImage.style.transform=`translateY(${direction*10}px)`;

    direction*=-1;

},2000);


// -------------------------------
// Contact Form Demo
// -------------------------------

const form=document.querySelector("form");

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    alert("Thank you! Your message has been sent successfully.");

    form.reset();

});


// -------------------------------
// Fade-in Cards on Hover
// -------------------------------

const cards=document.querySelectorAll(".card");

cards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-12px) scale(1.03)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0) scale(1)";

    });

});


// ================================
// END OF FILE
// ================================