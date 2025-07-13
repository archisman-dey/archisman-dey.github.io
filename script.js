document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const mainContent = document.getElementById('mainContent');
    
    let isSidebarExpanded = false;
    
    // Check if we're on mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Initialize sidebar state based on screen size
    function initializeSidebar() {
        if (isMobile()) {
            sidebar.classList.remove('expanded');
            isSidebarExpanded = false;
        }
    }
    
    // Toggle sidebar on mobile
    function toggleSidebar() {
        if (isMobile()) {
            if (isSidebarExpanded) {
                sidebar.classList.remove('expanded');
                isSidebarExpanded = false;
            } else {
                sidebar.classList.add('expanded');
                isSidebarExpanded = true;
            }
        }
    }
    
    // Handle navigation
    function handleNavigation(event) {
        event.preventDefault();
        
        const targetSection = event.target.getAttribute('data-section');
        
        // Update active nav link
        navLinks.forEach(link => link.classList.remove('active'));
        event.target.classList.add('active');
        
        // Update active content section
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        const targetContentSection = document.getElementById(targetSection);
        if (targetContentSection) {
            targetContentSection.classList.add('active');
        }
        
        // On mobile, collapse sidebar after navigation
        if (isMobile()) {
            sidebar.classList.remove('expanded');
            isSidebarExpanded = false;
        }
    }
    
    // Handle window resize
    function handleResize() {
        if (isMobile()) {
            // On mobile, ensure sidebar is collapsed by default
            if (isSidebarExpanded) {
                sidebar.classList.remove('expanded');
                isSidebarExpanded = false;
            }
        } else {
            // On desktop, remove mobile-specific classes
            sidebar.classList.remove('expanded');
        }
    }
    
    // Event listeners
    mobileToggle.addEventListener('click', toggleSidebar);
    
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    window.addEventListener('resize', handleResize);
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (isMobile() && isSidebarExpanded) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnToggle = mobileToggle.contains(event.target);
            
            if (!isClickInsideSidebar && !isClickOnToggle) {
                sidebar.classList.remove('expanded');
                isSidebarExpanded = false;
            }
        }
    });
    
    // Handle hash navigation on page load
    function handleHashNavigation() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const targetLink = document.querySelector(`[data-section="${hash}"]`);
            if (targetLink) {
                // Update active nav link
                navLinks.forEach(link => link.classList.remove('active'));
                targetLink.classList.add('active');
                
                // Update active content section
                contentSections.forEach(section => {
                    section.classList.remove('active');
                });
                
                const targetContentSection = document.getElementById(hash);
                if (targetContentSection) {
                    targetContentSection.classList.add('active');
                }
            }
        }
    }
    
    // Initialize
    initializeSidebar();
    handleHashNavigation();
    
    // Update URL hash when navigating
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const section = this.getAttribute('data-section');
            if (section) {
                window.location.hash = section;
            }
        });
    });
    
    // Photography gallery functionality
    const photoGallery = document.getElementById('photoGallery');
    
    // Photo data - you can add more photos here
    const photos = [
        {
            src: 'photos/DSCF2917_edited.jpg',
            location: 'Mountain View',
            date: 'December 2023',
            alt: 'Mountain landscape'
        },
        {
            src: 'photos/DSCF4803_final_compressed.jpeg',
            location: 'City Streets',
            date: 'January 2024',
            alt: 'Urban photography'
        }
        // Add more photos here as you add them to the photos/ directory
    ];
    
    // Create photo element
    function createPhotoElement(photo) {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        
        // Determine if photo is landscape or portrait
        const img = new Image();
        img.onload = function() {
            if (this.width > this.height) {
                photoItem.classList.add('landscape');
            }
        };
        img.src = photo.src;
        
        photoItem.innerHTML = `
            <div class="polaroid">
                <img src="${photo.src}" alt="${photo.alt}" loading="lazy">
            </div>
            <div class="photo-info">
                <div class="photo-location">${photo.location}</div>
                <div class="photo-date">${photo.date}</div>
            </div>
        `;
        
        return photoItem;
    }
    
    // Lazy loading with Intersection Observer
    function setupLazyLoading() {
        const photoItems = document.querySelectorAll('.photo-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const photoItem = entry.target;
                    const img = photoItem.querySelector('img');
                    
                    // Load the image
                    if (img && !img.classList.contains('loaded')) {
                        img.onload = function() {
                            img.classList.add('loaded');
                            photoItem.classList.add('loaded');
                        };
                        
                        // If image is already cached, trigger load event
                        if (img.complete) {
                            img.classList.add('loaded');
                            photoItem.classList.add('loaded');
                        }
                    }
                    
                    observer.unobserve(photoItem);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        photoItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    // Initialize photo gallery
    function initPhotoGallery() {
        if (photoGallery) {
            // Clear existing content
            photoGallery.innerHTML = '';
            
            // Add photos
            photos.forEach(photo => {
                const photoElement = createPhotoElement(photo);
                photoGallery.appendChild(photoElement);
            });
            
            // Setup lazy loading
            setupLazyLoading();
        }
    }
    
    // Initialize photo gallery when photography section is shown
    function handlePhotographySection() {
        const photographySection = document.getElementById('photography');
        if (photographySection && photographySection.classList.contains('active')) {
            initPhotoGallery();
        }
    }
    
    // Enhanced navigation handler to initialize photo gallery
    const originalHandleNavigation = handleNavigation;
    handleNavigation = function(event) {
        originalHandleNavigation(event);
        
        // Initialize photo gallery if navigating to photography section
        setTimeout(() => {
            handlePhotographySection();
        }, 100);
    };
    
    // Initialize photo gallery on page load if photography section is active
    setTimeout(() => {
        handlePhotographySection();
    }, 100);
}); 