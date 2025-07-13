document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const sidebar = document.getElementById('sidebar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const photoGallery = document.getElementById('photoGallery');
    
    // State
    let isSidebarExpanded = false;
    let photosLoaded = false;
    
    // Photo data with metadata
    const photoMetadata = {
        'DSCF2917_edited.jpg': { location: 'Mountain View', date: 'December 2023', alt: 'Mountain landscape' },
        'DSCF4803_brighter.jpg': { location: 'City Streets', date: 'January 2024', alt: 'Urban photography' },
        'DSCF9299.JPG': { location: 'Nature Trail', date: 'February 2024', alt: 'Natural landscape' },
        'DSCF9781-02.jpeg': { location: 'Coastal View', date: 'March 2024', alt: 'Ocean scenery' },
        'DSCF9589-01~2.jpeg': { location: 'Forest Path', date: 'March 2024', alt: 'Woodland scene' },
        'DSCF8829.JPG': { location: 'Mountain Peak', date: 'April 2024', alt: 'Mountain vista' },
        'image-01 2.jpeg': { location: 'Urban Architecture', date: 'April 2024', alt: 'City buildings' },
        'DSCF8281-01.jpeg': { location: 'Riverside', date: 'May 2024', alt: 'River landscape' },
        'DSCF9241.JPG': { location: 'Sunset Point', date: 'May 2024', alt: 'Sunset view' },
        'DSCF8295.JPG': { location: 'Valley View', date: 'June 2024', alt: 'Valley scenery' },
        'DSCF9352.JPG': { location: 'Lakeside', date: 'June 2024', alt: 'Lake view' },
        'DSCF8364.JPG': { location: 'Meadow', date: 'July 2024', alt: 'Open field' },
        'DSCF8358.JPG': { location: 'Hilltop', date: 'July 2024', alt: 'Hill landscape' },
        'DSCF7375.JPG': { location: 'Desert View', date: 'August 2024', alt: 'Desert scene' },
        'DSCF8064.JPG': { location: 'Canyon', date: 'August 2024', alt: 'Canyon view' },
        'DSCF8067-01-01.jpeg': { location: 'Mountain Lake', date: 'September 2024', alt: 'Alpine lake' },
        'DSCF7591.jpg': { location: 'Forest Edge', date: 'September 2024', alt: 'Forest boundary' },
        'DSCF2714~2.JPG': { location: 'Coastal Cliffs', date: 'October 2024', alt: 'Cliff view' },
        'DSCF7267-01.jpeg': { location: 'Mountain Stream', date: 'October 2024', alt: 'Stream in mountains' },
        'DSCF4488~2.JPG': { location: 'Valley Floor', date: 'November 2024', alt: 'Valley landscape' },
        'DSCF2856~2.JPG': { location: 'Alpine Meadow', date: 'November 2024', alt: 'High altitude meadow' },
        'DSCF4560~2.JPG': { location: 'Riverside Path', date: 'December 2024', alt: 'River trail' },
        'DSCF7197.JPG': { location: 'Mountain Pass', date: 'December 2024', alt: 'Mountain pass view' },
        'DSCF3027.JPG': { location: 'Lakeside Trail', date: 'January 2025', alt: 'Lake trail' },
        'DSCF0946-01.jpeg': { location: 'Mountain Vista', date: 'January 2025', alt: 'Mountain panorama' },
        'DSCF2391-EFFECTS.jpg': { location: 'Sunset Ridge', date: 'February 2025', alt: 'Sunset on ridge' },
        'DSCF0848-01.jpeg': { location: 'Alpine Lake', date: 'February 2025', alt: 'High altitude lake' },
        'DSCF0945-01.jpeg': { location: 'Mountain Peak', date: 'March 2025', alt: 'Peak view' },
        'DSCF1006-01~2.jpeg': { location: 'Valley Stream', date: 'March 2025', alt: 'Stream in valley' },
        'DSCF2494.JPG': { location: 'Forest Clearing', date: 'April 2025', alt: 'Forest opening' },
        'DSCF0751.JPG': { location: 'Mountain Ridge', date: 'April 2025', alt: 'Ridge view' },
        'DSC_0016.JPG': { location: 'Coastal Bay', date: 'May 2025', alt: 'Bay view' },
        '1000323333-02.jpeg': { location: 'Mountain Lake', date: 'May 2025', alt: 'Mountain lake' },
        'DSCF0739.JPG': { location: 'Alpine Valley', date: 'June 2025', alt: 'Alpine valley' },
        'DSCF0644.JPG': { location: 'Mountain Stream', date: 'June 2025', alt: 'Mountain stream' },
        '20241214_210314~2.jpg': { location: 'Sunset View', date: 'December 2024', alt: 'Sunset landscape' }
    };

    // Utility Functions
    const isMobile = () => window.innerWidth <= 768;
    
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Sidebar Management
    const initializeSidebar = () => {
        if (isMobile()) {
            sidebar.classList.remove('expanded');
            isSidebarExpanded = false;
        }
    };

    const toggleSidebar = () => {
        if (isMobile()) {
            isSidebarExpanded = !isSidebarExpanded;
            sidebar.classList.toggle('expanded', isSidebarExpanded);
        }
    };

    // Navigation
    const handleNavigation = (event) => {
        event.preventDefault();
        
        const targetSection = event.target.getAttribute('data-section');
        if (!targetSection) return;
        
        // Update active nav link
        navLinks.forEach(link => link.classList.remove('active'));
        event.target.classList.add('active');
        
        // Update active content section
        contentSections.forEach(section => section.classList.remove('active'));
        
        const targetContentSection = document.getElementById(targetSection);
        if (targetContentSection) {
            targetContentSection.classList.add('active');
        }
        
        // Initialize photo gallery if navigating to photography section
        if (targetSection === 'photography' && !photosLoaded) {
            setTimeout(initPhotoGallery, 100);
        }
        
        // Collapse sidebar on mobile after navigation
        if (isMobile()) {
            sidebar.classList.remove('expanded');
            isSidebarExpanded = false;
        }
    };

    // Window resize handler
    const handleResize = () => {
        if (isMobile()) {
            if (isSidebarExpanded) {
                sidebar.classList.remove('expanded');
                isSidebarExpanded = false;
            }
        } else {
            sidebar.classList.remove('expanded');
        }
    };

    // Hash navigation
    const handleHashNavigation = () => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const targetLink = document.querySelector(`[data-section="${hash}"]`);
            if (targetLink) {
                navLinks.forEach(link => link.classList.remove('active'));
                targetLink.classList.add('active');
                
                contentSections.forEach(section => section.classList.remove('active'));
                
                const targetContentSection = document.getElementById(hash);
                if (targetContentSection) {
                    targetContentSection.classList.add('active');
                }
            }
        }
    };

    // Photo Gallery Functions
    const createPhotoElement = (photo) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        
        const img = new Image();
        img.onload = function() {
            if (this.width > this.height) {
                photoItem.classList.add('landscape');
            }
        };
        img.onerror = function() {
            console.warn(`Failed to load image: ${photo.src}`);
            photoItem.classList.add('error');
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
    };

    const setupLazyLoading = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const photoItem = entry.target;
                    const img = photoItem.querySelector('img');
                    
                    if (img && !img.classList.contains('loaded')) {
                        img.onload = function() {
                            img.classList.add('loaded');
                            photoItem.classList.add('loaded');
                        };
                        
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
        
        document.querySelectorAll('.photo-item').forEach(item => {
            observer.observe(item);
        });
    };

    const initPhotoGallery = () => {
        if (!photoGallery || photosLoaded) return;
        
        // Clear existing content
        photoGallery.innerHTML = '';
        
        // Create photos array with metadata
        const photos = Object.entries(photoMetadata).map(([filename, metadata]) => ({
            src: `photos/${filename}`,
            ...metadata
        }));
        
        // Randomize photos
        const shuffledPhotos = shuffleArray(photos);
        
        // Add photos to gallery
        shuffledPhotos.forEach(photo => {
            const photoElement = createPhotoElement(photo);
            photoGallery.appendChild(photoElement);
        });
        
        // Setup lazy loading
        setupLazyLoading();
        
        photosLoaded = true;
    };

    // Event Listeners
    mobileToggle.addEventListener('click', toggleSidebar);
    
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
        // Update URL hash
        link.addEventListener('click', function(event) {
            const section = this.getAttribute('data-section');
            if (section) {
                window.location.hash = section;
            }
        });
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

    // Initialize
    initializeSidebar();
    handleHashNavigation();
    
    // Initialize photo gallery if photography section is active on page load
    setTimeout(() => {
        const photographySection = document.getElementById('photography');
        if (photographySection && photographySection.classList.contains('active')) {
            initPhotoGallery();
        }
    }, 100);
}); 