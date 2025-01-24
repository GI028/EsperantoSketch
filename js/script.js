$(document).ready(function(){
    $('.show-hide').click(function(e){
        let navItems = $('.nav-items');
        navItems.toggleClass('visible');        
        let buttonClass = navItems.hasClass('visible') ? 'fa-times' : 'fa-bars';
        $(e.currentTarget).html('<i class="fa '+buttonClass+'"></i>');
    });

    const navbar = $('.navbar');
    const navHeight = navbar.outerHeight();
    let scrolling = false;
    let startPosition = 0;
    
    window.addEventListener('scroll', (e) => {
        let currentScroll = window.scrollY;

        if(!scrolling){
            scrolling = true;
            startPosition = currentScroll;
        }

        if(currentScroll<navHeight){
            navbar.css('transition-duration','0s');
            navbar.css('transform',`translateY(${-currentScroll}px)`);
        }
        else {
            navbar.css('transition-duration','');
            let scrollIntensity = currentScroll - startPosition;
            if (scrollIntensity > 100)
                navbar.css('transform',`translateY(${-navHeight}px)`);
            else if(scrollIntensity < -100)
                navbar.css('transform','translateY(0px)');
        }
    });
    
    window.addEventListener('scrollend', () => {
        scrolling = false;
    });

    const swiper = new Swiper('.swiper', {
        loop: false,
        slidesPerView:3,
        spaceBetween:15,
        centeredSlides:true,
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 30,
            slideShadows: true,
        },
        breakpoints: {
            // when window width is >= 480px
            0: {
                slidesPerView: 1,
                initialSlide: 0,
            },
            480: {
                slidesPerView: 2,
                initialSlide: 1,
            },
            768: { 
                slidesPerView: 3,
                initialSlide: 1,
            },
            1000: {
                slidesPerView: 5,
                initialSlide: 2,
            }
          },
        initialSlide: 2,
        autoplay: {
          delay: 3000,
          disableOnInteraction: true,
        },
        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets:true,
            dynamicMainBullets:2
        },
        mousewheel:{
            enabled:true,
            forceToAxis:true,
        },
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
});