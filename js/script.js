document.addEventListener('DOMContentLoaded', function() {
    var sidebarToggle = document.getElementById('sidebarToggle');
    var sidebar = document.getElementById('sidebar');
    var mainContent = document.getElementById('main-content');
    
    function toggleSidebar() {
        sidebar.classList.toggle('show');
        updateLayout();
    }

    function updateLayout() {
        var viewportWidth = window.innerWidth;
        
        if (viewportWidth < 992) {
            if (sidebar.classList.contains('show')) {
                //mainContent.style.marginTop = sidebar.offsetHeight + 'px';
                mainContent.style.paddingLeft = '0';
            } else {
                mainContent.style.marginTop = '0';
                mainContent.style.paddingLeft = '0';
            }
        } else {
            sidebar.classList.add('show');
            mainContent.style.marginTop = '0';
           ;
        }
    }

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }

    // Chiudi la sidebar quando si fa clic all'esterno di essa
    document.addEventListener('click', function(event) {
        var isClickInsideSidebar = sidebar.contains(event.target);
        var isClickOnToggleButton = sidebarToggle.contains(event.target);

        if (!isClickInsideSidebar && !isClickOnToggleButton && sidebar.classList.contains('show') && window.innerWidth < 992) {
            toggleSidebar();
        }
    });

    // Evidenzia la voce di menu attiva nella sidebar
    var sidebarLinks = document.querySelectorAll('#sidebar .nav-link');
    
    sidebarLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            sidebarLinks.forEach(function(l) {
                l.classList.remove('active');
            });
            this.classList.add('active');
            if (window.innerWidth < 992) {
                toggleSidebar();
            }
        });
    });

    // Gestisci il ridimensionamento della finestra
    var resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateLayout, 250);
        updateLayout();
    });

    // Inizializza il layout
    updateLayout();
});


/// COOKIE ////
document.addEventListener('DOMContentLoaded', () => {
    // Seleziona gli elementi "Read more"
    const readMore = document.querySelectorAll('.cookie-footer .btn-outline-primary:first-of-type, .cookie-body a');
  
    // Aggiungi l'evento click ai link "Read more"
    readMore.forEach(link => {
      link.addEventListener('click', cookieReadMore);
    });
  
    // Funzione per mostrare la cookie banner estesa
    function cookieReadMore() {
      document.querySelector('.cookie-banner').classList.add('cookie-more');
    }
  
    // Aggiungi gli eventi click per chiudere la cookie banner
    const closeBtns = document.querySelectorAll('.cookie-banner .btn-close, .cookie-banner .btn-primary, .cookie-banner .btn-danger');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelector('.cookie-banner').remove();
      });
    });
  
    // Gestisci il toggle della modalità scura
    let darkToggle = document.querySelector('header').classList.contains('navbar-dark');
    const darkModeBtn = document.querySelector('[demon-header="dark-mode"]');
    darkModeBtn.addEventListener('click', () => {
      if (darkToggle) {
        darkToggle = false;
        document.querySelector('header').classList.remove('navbar-dark');
        document.querySelectorAll('header .btn-white').forEach(btn => btn.classList.replace('btn-white', 'btn-primary'));
        document.querySelectorAll('header .btn-outline-white').forEach(btn => btn.classList.replace('btn-outline-white', 'btn-outline-primary'));
        document.querySelectorAll('header .mega-menu .btn-bare').forEach(btn => btn.classList.remove('bare-white'));
      } else {
        darkToggle = true;
        document.querySelector('header').classList.add('navbar-dark');
        document.querySelectorAll('header .btn-primary').forEach(btn => btn.classList.replace('btn-primary', 'btn-white'));
        document.querySelectorAll('header .btn-outline-primary').forEach(btn => btn.classList.replace('btn-outline-primary', 'btn-outline-white'));
        document.querySelectorAll('header .mega-menu .btn-bare').forEach(btn => btn.classList.add('bare-white'));
      }
    });
  
    // Gestisci il toggle della sezione di login
    let loginToggle = document.querySelector('header .demon-unlogged').classList.contains('demon-hide');
    const loginBtn = document.querySelector('[demon-header="login"]');
    loginBtn.addEventListener('click', () => {
      if (loginToggle) {
        loginToggle = false;
        document.querySelector('header .demon-logged').classList.add('demon-hide');
        document.querySelector('header .demon-unlogged').classList.remove('demon-hide');
      } else {
        loginToggle = true;
        document.querySelector('header .demon-logged').classList.remove('demon-hide');
        document.querySelector('header .demon-unlogged').classList.add('demon-hide');
      }
    });
  });