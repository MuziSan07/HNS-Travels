/* ===== HNS TRAVELS - MAIN JAVASCRIPT ===== */

$(document).ready(function () {

  /* ===========================
     LOADER
  =========================== */
  setTimeout(function () {
    $('#loader').addClass('hidden');
    $('body').css('overflow', 'auto');
  }, 2500);

  /* ===========================
     CURSOR — Default browser cursor (custom cursor removed)
  =========================== */

  /* ===========================
     NAVIGATION
  =========================== */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 60) {
      $('nav').addClass('scrolled');
      $('#back-to-top').addClass('visible');
    } else {
      $('nav').removeClass('scrolled');
      $('#back-to-top').removeClass('visible');
    }
  });

  // Mobile menu
  $('#hamburger').on('click', function () {
    $('#mobile-menu').toggleClass('open');
    $(this).toggleClass('active');
  });

  $('#mobile-menu a').on('click', function () {
    $('#mobile-menu').removeClass('open');
    $('#hamburger').removeClass('active');
  });

  // Back to top
  $('#back-to-top').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600, 'swing');
  });

  /* ===========================
     SCROLL REVEAL
  =========================== */
  function revealOnScroll() {
    const windowHeight = $(window).height();
    const scrollTop = $(window).scrollTop();

    $('.reveal, .reveal-left, .reveal-right').each(function () {
      const elemTop = $(this).offset().top;
      if (elemTop < scrollTop + windowHeight - 80) {
        $(this).addClass('visible');
      }
    });
  }

  $(window).on('scroll', revealOnScroll);
  revealOnScroll();

  /* ===========================
     HERO PARTICLES
  =========================== */
  function createParticles() {
    const container = document.querySelector('.hero-particles');
    if (!container) return;

    for (let i = 0; i < 25; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = Math.random() * 3 + 1;
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        animation-duration: ${Math.random() * 8 + 6}s;
        animation-delay: ${Math.random() * 8}s;
        opacity: 0;
      `;
      container.appendChild(p);
    }
  }
  createParticles();

  /* ===========================
     TESTIMONIALS SLIDER
  =========================== */
  let currentSlide = 0;
  const slides = $('.testimonial-slide');
  const totalSlides = slides.length;

  function goToSlide(n) {
    slides.removeClass('active');
    $('.slider-dot').removeClass('active');
    currentSlide = (n + totalSlides) % totalSlides;
    slides.eq(currentSlide).addClass('active');
    $('.slider-dot').eq(currentSlide).addClass('active');
  }

  $('#next-slide').on('click', function () { goToSlide(currentSlide + 1); });
  $('#prev-slide').on('click', function () { goToSlide(currentSlide - 1); });

  $('.slider-dot').on('click', function () {
    goToSlide($(this).index());
  });

  // Auto-slide
  setInterval(function () {
    goToSlide(currentSlide + 1);
  }, 5000);

  /* ===========================
     COUNTER ANIMATION
  =========================== */
  function animateCounter($el) {
    const target = parseInt($el.data('target'));
    const duration = 1800;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(function () {
      current += increment;
      if (current >= target) {
        $el.text(target + ($el.data('suffix') || ''));
        clearInterval(timer);
      } else {
        $el.text(Math.floor(current) + ($el.data('suffix') || ''));
      }
    }, 16);
  }

  // Trigger counters when visible
  let countersAnimated = false;
  $(window).on('scroll', function () {
    if (countersAnimated) return;
    const $counters = $('.stat-num[data-target]');
    if ($counters.length === 0) return;
    const firstCounter = $counters.first().offset().top;
    if ($(window).scrollTop() + $(window).height() > firstCounter) {
      countersAnimated = true;
      $counters.each(function () {
        animateCounter($(this));
      });
    }
  });

  /* ===========================
     PARALLAX
  =========================== */
  $(window).on('scroll', function () {
    const scrollY = $(this).scrollTop();

    // Hero parallax
    $('.hero-bg').css('transform', `scale(1.1) translateY(${scrollY * 0.25}px)`);

    // CTA parallax
    const ctaOffset = $('.cta-banner').length ? $('.cta-banner').offset().top : 0;
    const ctaScroll = scrollY - ctaOffset;
    if ($('.cta-banner-bg').length) {
      $('.cta-banner-bg').css('transform', `translateY(${ctaScroll * 0.2}px)`);
    }
  });

  /* ===========================
     NAVBAR ACTIVE LINKS
  =========================== */
  const currentPage = window.location.pathname.split('/').pop();
  $('.nav-links a, .mobile-menu a').each(function () {
    const href = $(this).attr('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      $(this).css('color', '#c8a96e');
    }
  });

  /* ===========================
     SMOOTH PAGE TRANSITIONS
  =========================== */
  $('a[href]').not('[href^="#"]').not('[href^="mailto"]').not('[href^="tel"]').not('[target]').on('click', function (e) {
    const href = $(this).attr('href');
    if (!href || href.startsWith('http')) return;
    e.preventDefault();
    $('body').css({ opacity: 0, transition: 'opacity 0.3s ease' });
    setTimeout(() => { window.location.href = href; }, 300);
  });

  $(window).on('load', function () {
    $('body').css({ opacity: 1, transition: 'opacity 0.5s ease' });
  });

  /* ===========================
     BOOKING FORM (if present)
  =========================== */
  $('#booking-form').on('submit', function (e) {
    e.preventDefault();
    const btn = $(this).find('[type="submit"]');
    btn.html('<span>Sending...</span>');
    setTimeout(function () {
      btn.html('<span>Request Sent! We\'ll Contact You Soon.</span>');
      btn.css('background', '#2d6a4f');
      setTimeout(() => {
        btn.html('<span>Book Your Journey</span>');
        btn.css('background', '');
        $('#booking-form')[0].reset();
      }, 4000);
    }, 1500);
  });

  /* ===========================
     FILTER TABS (Packages/Destinations)
  =========================== */
  $('.filter-tab').on('click', function () {
    const filter = $(this).data('filter');
    $('.filter-tab').removeClass('active');
    $(this).addClass('active');

    if (filter === 'all') {
      $('.filterable').show().css('animation', 'fadeIn 0.4s ease');
    } else {
      $('.filterable').hide();
      $(`.filterable[data-cat="${filter}"]`).show().css('animation', 'fadeIn 0.4s ease');
    }
  });

  /* ===========================
     FAQ ACCORDION
  =========================== */
  $('.faq-question').on('click', function () {
    const $item = $(this).closest('.faq-item');
    const $answer = $item.find('.faq-answer');
    const isOpen = $item.hasClass('open');

    // Close all
    $('.faq-item').removeClass('open').find('.faq-answer').slideUp(300);

    if (!isOpen) {
      $item.addClass('open');
      $answer.slideDown(300);
    }
  });

  /* ===========================
     NEWSLETTER
  =========================== */
  $('#newsletter-form').on('submit', function (e) {
    e.preventDefault();
    const $input = $(this).find('input');
    const $btn = $(this).find('button');
    $btn.text('Subscribed!');
    $btn.css('background', '#2d6a4f');
    $input.val('');
    setTimeout(() => {
      $btn.text('Subscribe');
      $btn.css('background', '');
    }, 3000);
  });

});
