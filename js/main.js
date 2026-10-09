
/* ==========================================
   HOTEL CHANDIKHOL
   Frontend JavaScript
   No backend required
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ======================================
       1. MOBILE NAVBAR
    ====================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const menuIcon = document.querySelector(".menu-icon");

    if (menuToggle && navMenu) {

        // Open or close the mobile navigation
        menuToggle.addEventListener("change", function () {
            navMenu.classList.toggle("show", menuToggle.checked);

            if (menuIcon) {
                menuIcon.setAttribute(
                    "aria-expanded",
                    String(menuToggle.checked)
                );
            }
        });

        // Close the menu after selecting a link
        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                menuToggle.checked = false;
                navMenu.classList.remove("show");

                if (menuIcon) {
                    menuIcon.setAttribute("aria-expanded", "false");
                }
            });
        });

        // Close the menu when clicking outside it
        document.addEventListener("click", function (event) {

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            const clickedIcon =
                menuIcon && menuIcon.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedToggle &&
                !clickedIcon
            ) {
                menuToggle.checked = false;
                navMenu.classList.remove("show");

                if (menuIcon) {
                    menuIcon.setAttribute("aria-expanded", "false");
                }
            }
        });

        // Close mobile menu when switching to desktop layout
        window.addEventListener("resize", function () {
            if (window.innerWidth > 900) {
                menuToggle.checked = false;
                navMenu.classList.remove("show");

                if (menuIcon) {
                    menuIcon.setAttribute("aria-expanded", "false");
                }
            }
        });
    }


    /* ======================================
       2. ACTIVE NAVBAR LINK
    ====================================== */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const allNavLinks =
        document.querySelectorAll(".nav-menu a[href]");

    allNavLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href").split("/").pop();

        // Ignore social links and external websites
        if (
            linkPage &&
            !linkPage.startsWith("#") &&
            linkPage === currentPage &&
            !link.hasAttribute("target")
        ) {
            link.classList.add("active");
        } else if (
            linkPage &&
            !linkPage.startsWith("#") &&
            !link.hasAttribute("target")
        ) {
            link.classList.remove("active");
        }

    });


    /* ======================================
       3. SMOOTH SCROLLING
    ====================================== */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement =
                document.querySelector(targetId);

            if (targetElement) {
                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    /* ======================================
       4. SCROLL REVEAL ANIMATIONS
    ====================================== */

    const revealElements = document.querySelectorAll(
        ".section, .menu-category, .menu-item, " +
        ".offer-card, .gallery-item, .about-card, " +
        ".contact-card, .owner-card"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    } else {

        // Fallback for older browsers
        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });

    }


    /* ======================================
       5. FRONTEND-ONLY CONTACT FORM
    ====================================== */

    const contactForm =
        document.querySelector("#contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const nameInput =
                contactForm.querySelector(
                    '[name="name"], [name="fullName"]'
                );

            const emailInput =
                contactForm.querySelector('[name="email"]');

            const phoneInput =
                contactForm.querySelector('[name="phone"]');

            const messageInput =
                contactForm.querySelector('[name="message"]');

            const name =
                nameInput ? nameInput.value.trim() : "";

            const email =
                emailInput ? emailInput.value.trim() : "";

            const phone =
                phoneInput ? phoneInput.value.trim() : "";

            const message =
                messageInput ? messageInput.value.trim() : "";

            if (!name || !email || !message) {
                alert("Please fill in your name, email and message.");
                return;
            }

            if (emailInput && !emailInput.checkValidity()) {
                alert("Please enter a valid email address.");
                emailInput.focus();
                return;
            }

            // This form does not send data to a server.
            alert(
                "Thank you, " + name + "!\n\n" +
                "Your message has been checked in this browser, " +
                "but it has NOT been sent to Hotel Chandikhol.\n\n" +
                "Please contact the hotel directly by phone."
            );

            // Clear the form after displaying the message
            contactForm.reset();

        });

    }


    /* ======================================
       6. CURRENT YEAR IN FOOTER
    ====================================== */

    const yearElements =
        document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    /* ======================================
       7. BACK TO TOP BUTTON
    ====================================== */

    const backToTop =
        document.querySelector(".back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 300) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        });

        backToTop.addEventListener("click", function (event) {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* ======================================
       8. IMAGE LOADING FALLBACK
    ====================================== */

    const images = document.querySelectorAll("img");

    images.forEach(function (img) {

        img.addEventListener("error", function () {

            // Hide an image if its file cannot be loaded
            // so the broken-image icon is not displayed.
            img.classList.add("image-not-found");

        });

    });


    /* ======================================
       9. CONSOLE MESSAGE
    ====================================== */

    console.log(
        "Hotel Chandikhol website loaded successfully!"
    );

});

