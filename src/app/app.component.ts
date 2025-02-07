import { Component, ChangeDetectorRef, effect, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { filter } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'yassh';
  currentUser: any = null;

  constructor(
    private router: Router,
    public auth: AuthService,
    private changeDetector: ChangeDetectorRef
  ) {
    effect(() => {
      this.currentUser = this.auth.currentUserSignal();
      this.changeDetector.detectChanges();
    });
  }

  showText: boolean = false;

  isRouteActive(route: string): boolean {
    this.showText = true;
    return this.router.isActive(route, true);
  }

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.runAnimations()
    });
    this.runAnimations()
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
  }

  adminOnly(): boolean {
    return this.currentUser?.roles?.admin === true
  }

  logOut() {
    this.auth.logout();
  }

  private runAnimations(): void {
    const currentRoute = this.router.url;
    if (currentRoute === '/' || currentRoute.includes('/home')) {
      this.fullHeight();
      this.sliderMain();
    }
    this.initCounter();
    this.initIntersectionObserverAnimations();
    this.burgerMenu();
    this.mobileMenuOutsideClick();
    this.stickyFunction();
    this.owlCrouselFeatureSlide();
    this.isMobile();
  }

  private fullHeight(): void {
    const setFullHeight = () => {
      const fullHeightElements = document.querySelectorAll('.js-fullheight') as NodeListOf<HTMLElement>;
      fullHeightElements.forEach(el => {
        el.style.height = `${window.innerHeight}px`;
      });
    };
    setFullHeight();
    window.addEventListener('resize', setFullHeight);
  }

  private initCounter(): void {
    const counters = document.querySelectorAll('.js-counter');
  
    if (!counters.length) return;
  
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            ($(entry.target) as any).countTo({
              formatter: (value: number, options: any) => {
                return value.toFixed(options.decimals);
              },
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
  
    counters.forEach(counter => observer.observe(counter));
  }

  private initIntersectionObserverAnimations(): void {
    const elementsToAnimate = document.querySelectorAll('.animate-box');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const effect = el.getAttribute('data-animate-effect');
          if (effect === 'fadeIn') {
            el.classList.add('fadeIn', 'animated');
          } else if (effect === 'fadeInLeft') {
            el.classList.add('fadeInLeft', 'animated');
          } else if (effect === 'fadeInRight') {
            el.classList.add('fadeInRight', 'animated');
          } else {
            el.classList.add('fadeInUp', 'animated');
          }

          observer.unobserve(el);
        }
      });
    }, { threshold: 0.85 });

    elementsToAnimate.forEach(element => {
      observer.observe(element);
    });
  }

  private burgerMenu(): void {
    const burgerMenu = document.querySelector('.js-colorlib-nav-toggle') as HTMLElement;
    const body = document.body;

    if (burgerMenu) {
      burgerMenu.addEventListener('click', event => {
        event.preventDefault();
        if (body.classList.contains('offcanvas')) {
          burgerMenu.classList.remove('active');  
          body.classList.remove('offcanvas');
        } else {
          burgerMenu.classList.add('active');
          body.classList.add('offcanvas');
        }
      });
    }
  }

  private mobileMenuOutsideClick(): void {
    const aside = document.getElementById('colorlib-aside');
    const toggleButton = document.querySelector('.js-colorlib-nav-toggle') as HTMLElement;

    if (aside && toggleButton) {
      document.addEventListener('click', e => {
        if (!aside.contains(e.target as Node) && !toggleButton.contains(e.target as Node)) {
          if (document.body.classList.contains('offcanvas')) {
            document.body.classList.remove('offcanvas');
            toggleButton.classList.remove('active');
          }
        }
      });

      window.addEventListener('scroll', () => {
        if (document.body.classList.contains('offcanvas')) {
          document.body.classList.remove('offcanvas');
          toggleButton.classList.remove('active');
        }
      });
    }
  }

  private sliderMain(): void {
    $('#colorlib-hero .flexslider').flexslider({
      animation: "fade",
      slideshowSpeed: 5000,
      directionNav: true,
      start: function(){
        setTimeout(function(){
          $('.slider-text').removeClass('animated fadeInUp');
          $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
        }, 500);
      },
      before: function(){
        setTimeout(function(){
          $('.slider-text').removeClass('animated fadeInUp');
          $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
        }, 500);
      }
    });
  }

  private stickyFunction(): void {
    const stickyElement = document.getElementById('sticky_item');
    const stickyParent = document.querySelector('.sticky-parent');

    if (stickyElement && stickyParent) {
      const handleResize = () => {
        if (window.innerWidth <= 992) {
          stickyElement.classList.remove('stick-detach');
        } else {
          stickyElement.classList.add('stick-detach');
        }
      };

      handleResize();
      window.addEventListener('resize', handleResize);
    }
  }

  private owlCrouselFeatureSlide(): void {
    const owlCarousel = document.querySelector('.owl-carousel') as any;
    if (owlCarousel) {
      owlCarousel.owlCarousel({
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        autoplay: true,
        loop: true,
        margin: 0,
        nav: true,
        dots: false,
        autoHeight: true,
        items: 1,
        navText: [
          "<i class='icon-arrow-left3 owl-direction'></i>",
          "<i class='icon-arrow-right3 owl-direction'></i>",
        ],
      });
    }
  }

  private isMobile(): boolean {
    return /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);
  }
}
