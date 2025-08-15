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
        'DSCF2917_edited.jpg': { location: 'The Seine river, Paris', date: 'August \'24', alt: 'The seine river' },
        'DSCF4803_brighter.jpg': { location: 'Kanchenjungha from Darjeeling', date: 'January \'23', alt: 'Stars' },
        'DSCF9299.JPG': { location: 'Aquarium, Toronto', date: 'June \'22', alt: 'Finding Nemo' },
        'DSCF9781-02.jpeg': { location: 'Streets of Montreal', date: 'July \'22', alt: 'Streets of Montreal' },
        'DSCF9589-01~2.jpeg': { location: 'Niagara Falls', date: 'June \'22', alt: 'Niagara Falls' },
        'DSCF8829.JPG': { location: 'Stone building, Quebec City', date: 'June \'22', alt: 'Stone building' },
        'image-01 2.jpeg': { location: 'Walk beside St. Lawrence, Montreal', date: 'July \'22', alt: 'Walk beside St. Lawrence, Montreal' },
        'DSCF8281-01.jpeg': { location: 'Stone buildings, Quebec City', date: 'June \'22', alt: 'Stone buildings, Quebec City' },
        'DSCF9241.JPG': { location: 'Aquarium, Toronto', date: 'June \'22', alt: 'Aquarium in Toronto' },
        'DSCF8295.JPG': { location: 'Intersection in Quebec City', date: 'June \'22', alt: 'Intersection in Quebec City' },
        'DSCF9352.JPG': { location: 'Child admiring Jellyfish', date: 'June \'22', alt: 'Child admiring Jellyfish' },
        'DSCF8364.JPG': { location: 'Looking at Le Château Frontenac', date: 'June \'22', alt: 'Looking at Le Château Frontenac' },
        'DSCF8358.JPG': { location: 'Looking at Le Château Frontenac', date: 'June \'22', alt: 'Looking at Le Château Frontenac' },
        'DSCF7375.JPG': { location: 'Montreal Skyline', date: 'June \'22', alt: 'Montreal Skyline' },
        'DSCF8064.JPG': { location: 'View from a bridge', date: 'June \'22', alt: 'View from a bridge' },
        'DSCF8067-01-01.jpeg': { location: 'Cars after rain', date: 'June \'22', alt: 'Cars after rain' },
        'DSCF7591.jpg': { location: 'Skyline from a distance', date: 'June \'22', alt: 'Skyline from a distance' },
        'DSCF2714~2.JPG': { location: 'Louvre', date: 'August \'22', alt: 'Louvre' },
        'DSCF7267-01.jpeg': { location: 'Looking down at the city', date: 'June \'22', alt: 'Looking down at the city' },
        'DSCF4488~2.JPG': { location: 'Ghats in Varanasi', date: 'December \'24', alt: 'Ghats in Varanasi' },
        'DSCF2856~2.JPG': { location: 'Seine River, Paris', date: 'August \'24', alt: 'Seine River, Paris' },
        'DSCF4560~2.JPG': { location: 'Burning Ghat, Varanasi', date: 'December \'24', alt: 'Burning Ghat, Varanasi' },
        'DSCF7197.JPG': { location: 'Silhouette', date: 'June \'22', alt: 'Silhouette' },
        'DSCF3027.JPG': { location: 'Eiffel tower at night', date: 'August \'24', alt: 'Eiffel tower at night' },
        'DSCF0946-01.jpeg': { location: 'Birds', date: 'July \'24', alt: 'Birds' },
        'DSCF2391-EFFECTS.jpg': { location: 'The Taj, Mumbai', date: 'May \'24', alt: 'The Taj, Mumbai' },
        'DSCF0848-01.jpeg': { location: 'A projection', date: 'June \'22', alt: 'A projection' },
        'DSCF0945-01.jpeg': { location: 'Birds', date: 'July \'25', alt: 'Birds' },
        'DSCF1006-01~2.jpeg': { location: 'Adventure', date: 'July \'22', alt: 'Stream in valley' },
        'DSCF2494.JPG': { location: 'A church in Bandra', date: 'May \'24', alt: 'A church in Bandra' },
        'DSCF0751.JPG': { location: 'Cobweb in leaves', date: 'June \'22', alt: 'Cobweb in leaves' },
        'DSC_0016.JPG': { location: 'Skyline at noon', date: 'May \'22', alt: 'Skyline at noon' },
        '1000323333-02.jpeg': { location: 'Concert by Rojer Waters', date: 'July \'22', alt: 'Concert by Rojer Waters' },
        'DSCF0739.JPG': { location: 'Sunflower', date: 'June \'22', alt: 'Sunflower' },
        'DSCF0644.JPG': { location: 'Purple flower', date: 'June \'22', alt: 'Purple flower' },
        '20241214_210314~2.jpg': { location: 'Concert, Bryan Adams', date: 'December \'24', alt: 'Concert, Bryan Adams' }
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