$(document).ready(function(){
    let navItems = $('.nav-items');
    let button = $('.show-hide');
    let buttonClick=false;

    button.click(function(e){
        buttonClick=true;
        navItems.toggleClass('visible');    
        let buttonClass = navItems.hasClass('visible') ? 'fa-times' : 'fa-bars';
        button.html('<i class="fa '+buttonClass+'"></i>');
        //wait for the trasition
        setTimeout(()=>buttonClick=false,600);
    }); 
    let hideNavItems=()=>{
        navItems.removeClass('visible');
        button.html('<i class="fa fa-bars"></i>');
    }

    const navbar = $('.navbar');
    let scrolling = false;
    let startPosition = 0;
    const navHeight = navbar.outerHeight();
    
    window.addEventListener('scroll', (e) => {
        if(buttonClick) return;
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
            if (scrollIntensity > 100){
                navbar.css('transform',`translateY(${-navHeight}px)`);
                hideNavItems();
            }
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
          disableOnInteraction: false,
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