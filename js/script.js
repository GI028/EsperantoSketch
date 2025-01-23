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
        let currentScroll = window.pageYOffset;

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

});