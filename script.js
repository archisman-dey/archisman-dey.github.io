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
    
    // Photo data - all photos from the photos/ directory
    const photos = [
        {
            src: 'photos/DSCF2917_edited.jpg',
            location: 'Mountain View',
            date: 'December 2023',
            alt: 'Mountain landscape'
        },
        {
            src: 'photos/DSCF4803_brighter.jpg',
            location: 'City Streets',
            date: 'January 2024',
            alt: 'Urban photography'
        },
        {
            src: 'photos/DSCF9299.JPG',
            location: 'Nature Trail',
            date: 'February 2024',
            alt: 'Natural landscape'
        },
        {
            src: 'photos/DSCF9781-02.jpeg',
            location: 'Coastal View',
            date: 'March 2024',
            alt: 'Ocean scenery'
        },
        {
            src: 'photos/DSCF9589-01~2.jpeg',
            location: 'Forest Path',
            date: 'March 2024',
            alt: 'Woodland scene'
        },
        {
            src: 'photos/DSCF8829.JPG',
            location: 'Mountain Peak',
            date: 'April 2024',
            alt: 'Mountain vista'
        },
        {
            src: 'photos/image-01 2.jpeg',
            location: 'Urban Architecture',
            date: 'April 2024',
            alt: 'City buildings'
        },
        {
            src: 'photos/DSCF8281-01.jpeg',
            location: 'Riverside',
            date: 'May 2024',
            alt: 'River landscape'
        },
        {
            src: 'photos/DSCF9241.JPG',
            location: 'Sunset Point',
            date: 'May 2024',
            alt: 'Sunset view'
        },
        {
            src: 'photos/DSCF8295.JPG',
            location: 'Valley View',
            date: 'June 2024',
            alt: 'Valley scenery'
        },
        {
            src: 'photos/DSCF9352.JPG',
            location: 'Lakeside',
            date: 'June 2024',
            alt: 'Lake view'
        },
        {
            src: 'photos/DSCF8364.JPG',
            location: 'Meadow',
            date: 'July 2024',
            alt: 'Open field'
        },
        {
            src: 'photos/DSCF8358.JPG',
            location: 'Hilltop',
            date: 'July 2024',
            alt: 'Hill landscape'
        },
        {
            src: 'photos/DSCF7375.JPG',
            location: 'Desert View',
            date: 'August 2024',
            alt: 'Desert scene'
        },
        {
            src: 'photos/DSCF8064.JPG',
            location: 'Canyon',
            date: 'August 2024',
            alt: 'Canyon view'
        },
        {
            src: 'photos/DSCF8067-01-01.jpeg',
            location: 'Mountain Lake',
            date: 'September 2024',
            alt: 'Alpine lake'
        },
        {
            src: 'photos/DSCF7591.jpg',
            location: 'Forest Edge',
            date: 'September 2024',
            alt: 'Forest boundary'
        },
        {
            src: 'photos/DSCF2714~2.JPG',
            location: 'Coastal Cliffs',
            date: 'October 2024',
            alt: 'Cliff view'
        },
        {
            src: 'photos/DSCF7267-01.jpeg',
            location: 'Mountain Stream',
            date: 'October 2024',
            alt: 'Stream in mountains'
        },
        {
            src: 'photos/DSCF4488~2.JPG',
            location: 'Valley Floor',
            date: 'November 2024',
            alt: 'Valley landscape'
        },
        {
            src: 'photos/DSCF2856~2.JPG',
            location: 'Alpine Meadow',
            date: 'November 2024',
            alt: 'High altitude meadow'
        },
        {
            src: 'photos/DSCF4560~2.JPG',
            location: 'Riverside Path',
            date: 'December 2024',
            alt: 'River trail'
        },
        {
            src: 'photos/DSCF7197.JPG',
            location: 'Mountain Pass',
            date: 'December 2024',
            alt: 'Mountain pass view'
        },
        {
            src: 'photos/DSCF3027.JPG',
            location: 'Lakeside Trail',
            date: 'January 2025',
            alt: 'Lake trail'
        },
        {
            src: 'photos/DSCF0946-01.jpeg',
            location: 'Mountain Vista',
            date: 'January 2025',
            alt: 'Mountain panorama'
        },
        {
            src: 'photos/DSCF2391-EFFECTS.jpg',
            location: 'Sunset Ridge',
            date: 'February 2025',
            alt: 'Sunset on ridge'
        },
        {
            src: 'photos/DSCF0848-01.jpeg',
            location: 'Alpine Lake',
            date: 'February 2025',
            alt: 'High altitude lake'
        },
        {
            src: 'photos/DSCF0945-01.jpeg',
            location: 'Mountain Peak',
            date: 'March 2025',
            alt: 'Peak view'
        },
        {
            src: 'photos/DSCF1006-01~2.jpeg',
            location: 'Valley Stream',
            date: 'March 2025',
            alt: 'Stream in valley'
        },
        {
            src: 'photos/DSCF2494.JPG',
            location: 'Forest Clearing',
            date: 'April 2025',
            alt: 'Forest opening'
        },
        {
            src: 'photos/DSCF0751.JPG',
            location: 'Mountain Ridge',
            date: 'April 2025',
            alt: 'Ridge view'
        },
        {
            src: 'photos/DSC_0016.JPG',
            location: 'Coastal Bay',
            date: 'May 2025',
            alt: 'Bay view'
        },
        {
            src: 'photos/1000323333-02.jpeg',
            location: 'Mountain Lake',
            date: 'May 2025',
            alt: 'Mountain lake'
        },
        {
            src: 'photos/DSCF0739.JPG',
            location: 'Alpine Valley',
            date: 'June 2025',
            alt: 'Alpine valley'
        },
        {
            src: 'photos/DSCF0644.JPG',
            location: 'Mountain Stream',
            date: 'June 2025',
            alt: 'Mountain stream'
        },
        {
            src: 'photos/20241214_210314~2.jpg',
            location: 'Sunset View',
            date: 'December 2024',
            alt: 'Sunset landscape'
        }
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