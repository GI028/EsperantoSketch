$.get("components/navbar.html")
.then((data) => {
    $("body").prepend(data);
})
.then(()=>$.get("components/footer.html"))
.then((data) => {
    $('body').append(data);
})
.then(()=>$(document).ready(MyApp))
.catch((error) => {
    $(document).ready(()=>$('body').html('<h1 class="txt-center" >Something went wrong</h1>'));
    // $('.body').html('<h1>Something went wrong</h1>');
});

function MyApp(){
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
    const toTopButton = $('.floating-action-btn.scroll-top');

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

        if(currentScroll > 300)
            toTopButton.removeClass('hidden');
        else
            toTopButton.addClass('hidden');

    });
    
    window.addEventListener('scrollend', () => {
        scrolling = false;
    });

    try {
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
    } catch (error) {
        //do something
    }

    let overlay = $('.overlay');
    if(overlay.length === 0){
        $('body').prepend(`
            <div class="overlay hidden">
                <div>
                    <button class="close">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                    <div class="content">
                    </div>
                </div>
            </div>
        `);
        overlay = $('.overlay');
    }

    $(".dropdown-btn").click(function(e){
        e.preventDefault();
        const screenWidth = parseInt($( document ).width());        
        if(screenWidth < 768){
            const dropdown = $(this).next();
            const container = overlay.find('.content')
            overlay.removeClass('hidden');
            container.html('');
            container.append(dropdown.clone());
        }
    });
    $(".overlay .close").click(function(e){
        $(this).parent().parent().addClass('hidden');
    })
    $(".overlay").click(function(e){
        if(e.target == this)
            $(this).addClass('hidden');
    });

    try {
        const selectizeInstances = $('.selectize-select').selectize({
            plugins: ['remove_button', 'clear_button'],
            normalize: true ,
            closeAfterSelect:true,
            searchField: ["text", "value"],
        }).map(function(){
            return this.selectize;
        }).toArray();


        selectizeInstances.forEach(function(instance){
            instance.on('focus', function () {
                selectizeInstances.forEach(function(otherInstance) {
                    if (otherInstance !== instance) {
                        otherInstance.blur();
                    }
                });
            });
        })
    } catch (error) {
    }

    $('.scroll-top').on('click',function(e){
        e.preventDefault()
        $('html,body').scrollTop(0);
        if(window.location.hash.length!=0)
            window.history.pushState("", document.title, window.location.pathname); 
    })
}