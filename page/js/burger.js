document.addEventListener('DOMContentLoaded', function() {
        const burger = document.querySelector('.burger-menu');
        const mobileNav = document.querySelector('.mobile-nav');
        if (burger && mobileNav) {
            burger.addEventListener('click', function(e) {
                e.stopPropagation();
                burger.classList.toggle('active');
                mobileNav.classList.toggle('active');
            });
            document.querySelectorAll('.mobile-nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    burger.classList.remove('active');
                    mobileNav.classList.remove('active');
                });
            });
        }
    });