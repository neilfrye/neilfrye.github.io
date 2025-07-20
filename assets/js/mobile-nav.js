/**
 * Modern mobile navigation system
 * Provides a professional slide-out menu experience on mobile devices
 */
(function() {
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const $nav = document.querySelector('#site-nav');
    const $toggleBtn = document.querySelector('.mobile-menu-toggle');
    const $mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const $visibleLinks = document.querySelector('.visible-links');
    const $masthead = document.querySelector('.masthead');
    
    // Breakpoints for different device sizes
    const MOBILE_BREAKPOINT = 600;
    const TABLET_BREAKPOINT = 900;
    
    // Check if required elements exist
    if (!$nav || !$toggleBtn || !$mobileOverlay || !$visibleLinks) return;
    
    // Function to set device-specific classes
    function setDeviceClass() {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        document.body.classList.add('mobile-view');
        document.body.classList.remove('tablet-view');
      } else if (window.innerWidth <= TABLET_BREAKPOINT) {
        document.body.classList.add('tablet-view');
        document.body.classList.remove('mobile-view');
      } else {
        document.body.classList.remove('mobile-view', 'tablet-view');
      }
    }
    
    // Function to toggle mobile menu
    function toggleMobileMenu() {
      const isExpanded = $toggleBtn.getAttribute('aria-expanded') === 'true';
      
      if (!isExpanded) {
        // Open menu
        $toggleBtn.setAttribute('aria-expanded', 'true');
        $toggleBtn.classList.add('is-active');
        $mobileOverlay.classList.add('is-visible');
        document.body.classList.add('menu-open');
        
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
      } else {
        // Close menu
        $toggleBtn.setAttribute('aria-expanded', 'false');
        $toggleBtn.classList.remove('is-active');
        $mobileOverlay.classList.remove('is-visible');
        document.body.classList.remove('menu-open');
        
        // Restore scrolling
        document.body.style.overflow = '';
      }
    }
    
    // Toggle menu when button is clicked
    $toggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      toggleMobileMenu();
    });
    
    // Close menu when clicking on a link in mobile view
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-item a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= TABLET_BREAKPOINT) {
          toggleMobileMenu();
        }
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (
        $mobileOverlay.classList.contains('is-visible') && 
        !$nav.contains(e.target)
      ) {
        toggleMobileMenu();
      }
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && $mobileOverlay.classList.contains('is-visible')) {
        toggleMobileMenu();
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
      setDeviceClass();
      
      // Close mobile menu if window is resized to desktop
      if (
        window.innerWidth > TABLET_BREAKPOINT && 
        $mobileOverlay.classList.contains('is-visible')
      ) {
        toggleMobileMenu();
      }
    });
    
    // Handle orientation change
    window.addEventListener('orientationchange', setDeviceClass);
    
    // Add scroll shadow effect to masthead
    if ($masthead) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
          $masthead.classList.add('is-scrolled');
        } else {
          $masthead.classList.remove('is-scrolled');
        }
      });
    }
    
    // Initial setup
    setDeviceClass();
  });
})();
