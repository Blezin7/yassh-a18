import { Component, Inject, ChangeDetectorRef, effect, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
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
    @Inject(DOCUMENT) private document: Document,
    private changeDetector: ChangeDetectorRef
  ) {
    effect(() => {
      this.currentUser = this.auth.currentUserSignal();
      this.changeDetector.detectChanges();
    });
  }

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.runAnimations();
    });
    this.runAnimations();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  adminOnly(): boolean {
    return this.currentUser?.roles?.admin === true;
  }

  logOut() {
    this.auth.logout();
  }

  private runAnimations(): void {
    setTimeout(() => {
      const currentRoute = this.router.url;
      if (currentRoute === '/' || currentRoute.includes('home')) {
        this.fullHeight();
        this.sliderMain();
      }
      this.counter();
      this.contentAnimations();
      this.burgerMenu();
      this.mobileMenuOutsideClick();
      this.stickyFunction();
      this.owlCrouselFeatureSlide();
    }, 100);
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
  

  private counter(): void {
    const counterElements = document.querySelectorAll('.js-counter') as NodeListOf<HTMLElement>;
    counterElements.forEach(el => {
      const countTo = parseInt(el.getAttribute('data-count-to') || '0', 10);
      let currentValue = 0;

      const interval = setInterval(() => {
        currentValue += Math.ceil(countTo / 100);
        if (currentValue >= countTo) {
          currentValue = countTo;
          clearInterval(interval);
        }
        el.textContent = currentValue.toString();
      }, 30);
    });
  }

  private contentAnimations(): void {
    const elements = document.querySelectorAll('.animate-box') as NodeListOf<HTMLElement>;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const effect = entry.target.getAttribute('data-animate-effect') || 'fadeInUp';
            entry.target.classList.add(effect, 'animated');
          }
        });
      },
      { threshold: 0.85 }
    );

    elements.forEach(el => observer.observe(el));
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
