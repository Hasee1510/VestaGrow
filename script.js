// ================================
// WealthGrow Capital - script.js
// ================================

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


// -------------------------------
// AOS Animation
// -------------------------------

if (window.AOS && !prefersReducedMotion) {
    AOS.init({ duration: 1000, once: true, offset: 100 });
} else {
    // If AOS is missing or motion is reduced, make sure content stays visible
    document.querySelectorAll("[data-aos]").forEach(el => el.removeAttribute("data-aos"));
}


// -------------------------------
// Mobile Menu
// -------------------------------

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    const menuIcon = menuBtn.querySelector("i");

    const setMenu = (open) => {
        navLinks.classList.toggle("show", open);
        menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
        if (menuIcon) {
            menuIcon.classList.toggle("fa-bars", !open);
            menuIcon.classList.toggle("fa-xmark", open);
        }
    };

    menuBtn.setAttribute("aria-expanded", "false");

    menuBtn.addEventListener("click", () => {
        setMenu(!navLinks.classList.contains("show"));
    });

    // Keyboard support (Enter / Space)
    menuBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setMenu(!navLinks.classList.contains("show"));
        }
    });

    // Close after choosing a link
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => setMenu(false));
    });

    // Close with Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setMenu(false);
    });

    // Close when clicking outside the menu
    document.addEventListener("click", (e) => {
        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            setMenu(false);
        }
    });
}


// -------------------------------
// Counter Animation
// -------------------------------

const counters = document.querySelectorAll(".count");

const runCounter = (counter) => {
    const target = Number(counter.dataset.target) || 0;

    if (prefersReducedMotion) {
        counter.textContent = target;
        return;
    }

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

if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
} else {
    // Very old browsers: just show final numbers
    counters.forEach(c => { c.textContent = c.dataset.target; });
}


// -------------------------------
// FAQ Accordion
// -------------------------------

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const button = item.querySelector("button");
    if (!button) return;

    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", () => {
        const willOpen = !item.classList.contains("active");

        faqItems.forEach(faq => {
            faq.classList.remove("active");
            const b = faq.querySelector("button");
            if (b) b.setAttribute("aria-expanded", "false");
        });

        if (willOpen) {
            item.classList.add("active");
            button.setAttribute("aria-expanded", "true");
        }
    });
});


// -------------------------------
// Smooth Scrolling
// -------------------------------

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const id = this.getAttribute("href");

        // Ignore empty "#" links and ids that don't exist
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
});


// -------------------------------
// Scroll Effects (header + active nav link)
// -------------------------------

const header = document.querySelector(".header");
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const onScroll = () => {
    // Header background and shadow
    if (header) {
        if (window.scrollY > 50) {
            header.style.background = "#0B1F3A";
            header.style.boxShadow = "0 10px 30px rgba(0,0,0,.15)";
        } else {
            header.style.background = "rgba(11,31,58,.92)";
            header.style.boxShadow = "none";
        }
    }

    // Highlight the current section in the menu
    let current = "";
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 150) {
            current = section.id;
        }
    });

    // At the very bottom of the page, highlight the last section
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2 && sections.length) {
        current = sections[sections.length - 1].id;
    }

    navItems.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll(); // set the correct state on page load


// -------------------------------
// Back-to-top button
// -------------------------------

const toTop = document.querySelector(".to-top");

if (toTop) {
    window.addEventListener("scroll", () => {
        toTop.classList.toggle("show", window.scrollY > 600);
    }, { passive: true });

    toTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
}


// -------------------------------
// Contact form (inline success message)
// -------------------------------

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        btn.disabled = true;
        formStatus.className = "form-status";
        formStatus.textContent = "Sending...";

        try {
            const res = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: { Accept: "application/json" }
            });
            if (!res.ok) throw new Error("Request failed");
            contactForm.reset();
            formStatus.classList.add("success");
            formStatus.textContent = "Thank you! Your message has been sent. We will get back to you soon.";
        } catch (err) {
            formStatus.classList.add("error");
            formStatus.textContent = "Sorry, something went wrong. Please try again or message us on WhatsApp.";
        } finally {
            btn.disabled = false;
        }
    });
}


// ================================
// END OF FILE
// ================================
