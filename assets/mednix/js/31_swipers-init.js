(function ($) {
    "use strict";

    function htslider() {
        const defaults = {
            slidesPerView: 3,
            spaceBetween: 30
        };

        initSwipers(defaults);
    }

    function initSwipers(defaults = {}, selector = ".swiper") {
        if (typeof Swiper === "undefined") {
            console.error("Swiper is not loaded.");
            return;
        }

        const swipers = document.querySelectorAll(selector);
        swipers.forEach((swiper) => {
            if (swiper.classList.contains("swiper-initialized")) return;

            let optionsData = {};
            try {
                optionsData = swiper.dataset.swiper
                    ? JSON.parse(swiper.dataset.swiper)
                    : {};
            } catch (error) {
                console.warn("Invalid JSON in data-swiper:", error, swiper.dataset.swiper);
            }

            const options = {
                ...defaults,
                ...optionsData
            };

            new Swiper(swiper, options);
            swiper.classList.add("swiper-initialized");
        });
    }

    $(document).ready(htslider);

    $(window).on("elementor/frontend/init", function () {
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/banner-slider.default",
            htslider
        );
        
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/ht-service.default",
            htslider
        );
        
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/ht-case.default",
            htslider
        );
        
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/post-slider.default",
            htslider
        );
        
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/our-team.default",
            htslider
        );
        
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/ht-testimonial-slider.default",
            htslider
        );
    });

})(jQuery);
