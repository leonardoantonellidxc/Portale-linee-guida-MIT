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
                mainContent.style.marginLeft = '0';
            } else {
                mainContent.style.marginTop = '0';
                mainContent.style.marginLeft = '0';
            }
        } else {
            sidebar.classList.add('show');
            mainContent.style.marginTop = '0';
            mainContent.style.marginLeft = '250px';
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