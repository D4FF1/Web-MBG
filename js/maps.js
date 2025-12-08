// Data lokasi sekolah MBG - DIPERBAIKI
const schoolLocations = [
    {
        id: 1,
        name: "SDN 01 Menteng",
        address: "Jl. Besuki No. 5, Menteng, Jakarta Pusat",
        city: "Jakarta",
        province: "jakarta",
        latitude: -6.195492,
        longitude: 106.837122,
        status: "active",
        capacity: 150,
        schedule: "Senin-Jumat, 12:00-13:00",
        coordinator: "Budi Santoso (0812-3456-7890)",
        features: ["wifi", "parking", "accessible", "toilet"],
        googleMapsLink: "https://maps.google.com/?q=SDN+01+Menteng+Jakarta"
    },
    {
        id: 2,
        name: "SDN 123 Cijerah",
        address: "Jl. Cijerah Indah No. 45, Bandung Kulon",
        city: "Bandung",
        province: "jabar",
        latitude: -6.917464,
        longitude: 107.619125,
        status: "active",
        capacity: 200,
        schedule: "Senin, Rabu, Jumat, 11:30-12:30",
        coordinator: "Siti Rahayu (0813-4567-8901)",
        features: ["parking", "toilet", "first-aid"],
        googleMapsLink: "https://maps.google.com/?q=SDN+123+Cijerah+Bandung"
    },
    {
        id: 3,
        name: "SDN Kalisari II",
        address: "Jl. Raya Kalisari No. 88, Mulyorejo, Surabaya",
        city: "Surabaya",
        province: "jatim",
        latitude: -7.245972,
        longitude: 112.738067,
        status: "active",
        capacity: 180,
        schedule: "Selasa-Kamis, 12:00-13:00",
        coordinator: "Agus Setiawan (0814-5678-9012)",
        features: ["wifi", "parking", "accessible", "toilet", "first-aid"],
        googleMapsLink: "https://maps.google.com/?q=SDN+Kalisari+II+Surabaya"
    },
    {
        id: 4,
        name: "SD Muhammadiyah 1 Yogyakarta",
        address: "Jl. KH. Ahmad Dahlan No. 40, Yogyakarta",
        city: "Yogyakarta",
        province: "yogyakarta",
        latitude: -7.79558,
        longitude: 110.36949,
        status: "active",
        capacity: 120,
        schedule: "Senin-Kamis, 11:30-12:30",
        coordinator: "Rina Wulandari (0815-6789-0123)",
        features: ["wifi", "parking", "toilet"],
        googleMapsLink: "https://maps.google.com/?q=SD+Muhammadiyah+1+Yogyakarta"
    },
    {
        id: 5,
        name: "SDN 060925 Medan",
        address: "Jl. Gatot Subroto No. 5, Medan",
        city: "Medan",
        province: "sumut",
        latitude: 3.595195,
        longitude: 98.672226,
        status: "active",
        capacity: 160,
        schedule: "Senin-Jumat, 12:00-13:00",
        coordinator: "Dedi Supriyadi (0816-7890-1234)",
        features: ["parking", "accessible", "toilet", "first-aid"],
        googleMapsLink: "https://maps.google.com/?q=SDN+060925+Medan"
    },
    {
        id: 6,
        name: "SDN 2 Mamajang",
        address: "Jl. Sultan Hasanuddin No. 10, Makassar",
        city: "Makassar",
        province: "sulsel",
        latitude: -5.147665,
        longitude: 119.432731,
        status: "active",
        capacity: 140,
        schedule: "Senin, Rabu, Jumat, 11:00-12:00",
        coordinator: "Andi Malawat (0817-8901-2345)",
        features: ["wifi", "parking", "toilet"],
        googleMapsLink: "https://maps.google.com/?q=SDN+2+Mamajang+Makassar"
    },
    {
        id: 7,
        name: "SDN 01 Sudirman",
        address: "Jl. Jend. Sudirman No. 25, Jakarta Selatan",
        city: "Jakarta",
        province: "jakarta",
        latitude: -6.225013,
        longitude: 106.803230,
        status: "active",
        capacity: 180,
        schedule: "Senin-Jumat, 11:30-12:30",
        coordinator: "Ahmad Rifai (0818-9012-3456)",
        features: ["wifi", "parking", "accessible", "toilet", "first-aid"],
        googleMapsLink: "https://maps.google.com/?q=SDN+01+Sudirman+Jakarta"
    },
    {
        id: 8,
        name: "SDN 101 Tarogong",
        address: "Jl. Raya Tarogong No. 45, Garut",
        city: "Garut",
        province: "jabar",
        latitude: -7.203083,
        longitude: 107.908699,
        status: "coming",
        capacity: 130,
        schedule: "Akan Datang",
        coordinator: "Maya Sari (0819-0123-4567)",
        features: ["parking", "toilet"],
        googleMapsLink: "https://maps.google.com/?q=SDN+101+Tarogong+Garut"
    }
];

// Variabel global
let map;
let markers = [];
let infoWindow;
let userLocation = null;
let currentLocationMarker = null;
let searchMarker = null;
let filteredLocations = [...schoolLocations];

// Initialize Google Maps
function initMap() {
    console.log("Initializing Google Maps...");
    
    // Default center (Jakarta)
    const defaultCenter = { lat: -6.2088, lng: 106.8456 };
    
    try {
        // Create map
        map = new google.maps.Map(document.getElementById("map"), {
            center: defaultCenter,
            zoom: 6,
            styles: [
                {
                    featureType: "administrative",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#444444" }]
                },
                {
                    featureType: "landscape",
                    elementType: "all",
                    stylers: [{ color: "#f2f2f2" }]
                },
                {
                    featureType: "poi",
                    elementType: "all",
                    stylers: [{ visibility: "off" }]
                },
                {
                    featureType: "road",
                    elementType: "all",
                    stylers: [{ saturation: -100 }, { lightness: 45 }]
                },
                {
                    featureType: "road.highway",
                    elementType: "all",
                    stylers: [{ visibility: "simplified" }]
                },
                {
                    featureType: "road.arterial",
                    elementType: "labels.icon",
                    stylers: [{ visibility: "off" }]
                },
                {
                    featureType: "transit",
                    elementType: "all",
                    stylers: [{ visibility: "off" }]
                },
                {
                    featureType: "water",
                    elementType: "all",
                    stylers: [{ color: "#c7d2fe" }, { visibility: "on" }]
                }
            ],
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false
        });

        // Initialize InfoWindow
        infoWindow = new google.maps.InfoWindow({
            maxWidth: 300
        });

        // Create markers for all locations
        createMarkers();
        
        // Initialize location cards
        renderLocationCards(filteredLocations);
        
        // Setup event listeners
        setupEventListeners();
        
        // Try to get user's location
        getUserLocation();
        
        console.log("Google Maps initialized successfully!");
        
    } catch (error) {
        console.error("Error initializing Google Maps:", error);
        document.getElementById('map').innerHTML = `
            <div class="no-results-message" style="height: 100%; display: flex; align-items: center; justify-content: center;">
                <div>
                    <i class="fas fa-exclamation-triangle"></i>
                    <h4>Google Maps Tidak Dapat Dimuat</h4>
                    <p>Silakan periksa koneksi internet Anda.</p>
                </div>
            </div>
        `;
    }
}

// Create markers on map
function createMarkers(locations = schoolLocations) {
    console.log(`Creating ${locations.length} markers...`);
    
    // Clear existing markers
    markers.forEach(marker => {
        if (marker.setMap) {
            marker.setMap(null);
        }
    });
    markers = [];

    locations.forEach(location => {
        try {
            const marker = new google.maps.Marker({
                position: { lat: location.latitude, lng: location.longitude },
                map: map,
                title: location.name,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: location.status === "active" ? "#4f46e5" : "#9ca3af",
                    fillOpacity: 1,
                    strokeColor: "#ffffff",
                    strokeWeight: 2,
                    scale: 10
                },
                animation: google.maps.Animation.DROP
            });

            // Add click listener
            marker.addListener("click", () => {
                showInfoWindow(marker, location);
                highlightLocationCard(location.id);
            });

            // Add to markers array
            markers.push(marker);
            
        } catch (error) {
            console.error(`Error creating marker for ${location.name}:`, error);
        }
    });

    // Fit bounds to show all markers
    if (locations.length > 0) {
        try {
            const bounds = new google.maps.LatLngBounds();
            locations.forEach(location => {
                bounds.extend({ lat: location.latitude, lng: location.longitude });
            });
            map.fitBounds(bounds);
            
            // If only one location, zoom in more
            if (locations.length === 1) {
                setTimeout(() => {
                    map.setZoom(15);
                }, 500);
            }
        } catch (error) {
            console.error("Error fitting bounds:", error);
        }
    }
}

// Show InfoWindow
function showInfoWindow(marker, location) {
    try {
        const content = `
            <div class="info-window">
                <h3>${location.name}</h3>
                <span class="info-status">${location.status === "active" ? "Aktif" : "Akan Datang"}</span>
                <p><i class="fas fa-map-marker-alt"></i> ${location.address}</p>
                <p><i class="fas fa-clock"></i> ${location.schedule}</p>
                <p><i class="fas fa-users"></i> Kapasitas: ${location.capacity} anak/hari</p>
                <p><i class="fas fa-user-check"></i> ${location.coordinator}</p>
                <div class="info-actions">
                    <a href="${location.googleMapsLink}" target="_blank" class="btn-info btn-info-primary">
                        <i class="fas fa-directions"></i> Petunjuk Arah
                    </a>
                    <a href="tel:${location.coordinator.match(/\d+/g)?.join('') || ''}" class="btn-info btn-info-secondary">
                        <i class="fas fa-phone"></i> Hubungi
                    </a>
                </div>
            </div>
        `;

        infoWindow.setContent(content);
        infoWindow.open(map, marker);
        
    } catch (error) {
        console.error("Error showing info window:", error);
    }
}

// Highlight location card when marker is clicked
function highlightLocationCard(locationId) {
    try {
        // Remove active class from all cards
        document.querySelectorAll('.location-card').forEach(card => {
            card.classList.remove('active');
        });

        // Add active class to matching card
        const card = document.querySelector(`[data-id="${locationId}"]`);
        if (card) {
            card.classList.add('active');
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    } catch (error) {
        console.error("Error highlighting card:", error);
    }
}

// Render location cards
function renderLocationCards(locations) {
    const container = document.getElementById('locationCardsContainer');
    const noResultsMessage = document.getElementById('noResultsMessage');
    
    if (locations.length === 0) {
        container.innerHTML = '';
        noResultsMessage.style.display = 'block';
        return;
    }
    
    noResultsMessage.style.display = 'none';
    
    const cardsHTML = locations.map(location => {
        // Format phone number for tel link
        const phoneNumber = location.coordinator.match(/\d+/g)?.join('') || '';
        
        return `
        <div class="location-card" data-id="${location.id}" data-province="${location.province}" data-status="${location.status}">
            <div class="location-card-header">
                <div class="location-icon">
                    <i class="fas fa-school"></i>
                </div>
                <div class="location-title">
                    <h3>${location.name}</h3>
                    <span class="location-status ${location.status}">
                        ${location.status === "active" ? "Aktif" : "Akan Datang"}
                    </span>
                </div>
                <div class="location-distance">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${location.city}</span>
                </div>
            </div>
            <div class="location-card-body">
                <div class="location-info">
                    <div class="info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <div>
                            <h4>Alamat</h4>
                            <p>${location.address}</p>
                        </div>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-clock"></i>
                        <div>
                            <h4>Jadwal Distribusi</h4>
                            <p>${location.schedule}</p>
                        </div>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-users"></i>
                        <div>
                            <h4>Kapasitas</h4>
                            <p>${location.capacity} anak per hari</p>
                        </div>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-user-check"></i>
                        <div>
                            <h4>Koordinator</h4>
                            <p>${location.coordinator}</p>
                        </div>
                    </div>
                </div>
                <div class="location-features">
                    ${location.features.includes("wifi") ? '<span class="feature-tag"><i class="fas fa-wifi"></i> Free WiFi</span>' : ''}
                    ${location.features.includes("parking") ? '<span class="feature-tag"><i class="fas fa-parking"></i> Parkir</span>' : ''}
                    ${location.features.includes("accessible") ? '<span class="feature-tag"><i class="fas fa-wheelchair"></i> Aksesibel</span>' : ''}
                    ${location.features.includes("toilet") ? '<span class="feature-tag"><i class="fas fa-restroom"></i> Toilet</span>' : ''}
                    ${location.features.includes("first-aid") ? '<span class="feature-tag"><i class="fas fa-first-aid"></i> P3K</span>' : ''}
                </div>
                <div class="location-actions">
                    <a href="${location.googleMapsLink}" target="_blank" class="btn-location btn-location-primary">
                        <i class="fas fa-directions"></i> Petunjuk Arah
                    </a>
                    <a href="tel:${phoneNumber}" class="btn-location btn-location-secondary">
                        <i class="fas fa-phone"></i> Hubungi
                    </a>
                </div>
            </div>
        </div>
    `}).join('');
    
    container.innerHTML = cardsHTML;
    
    // Add click listeners to cards
    document.querySelectorAll('.location-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on links
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            const locationId = parseInt(card.dataset.id);
            const location = locations.find(loc => loc.id === locationId);
            
            if (location) {
                try {
                    // Center map on location
                    map.setCenter({ lat: location.latitude, lng: location.longitude });
                    map.setZoom(15);
                    
                    // Show InfoWindow
                    const marker = markers.find(m => {
                        try {
                            return m.getPosition().lat() === location.latitude && 
                                   m.getPosition().lng() === location.longitude;
                        } catch {
                            return false;
                        }
                    });
                    
                    if (marker) {
                        showInfoWindow(marker, location);
                    }
                    
                    // Highlight card
                    highlightLocationCard(locationId);
                    
                } catch (error) {
                    console.error("Error centering map:", error);
                }
            }
        });
    });
}

// Filter locations
function filterLocations() {
    try {
        const searchTerm = document.getElementById('locationSearch').value.toLowerCase().trim();
        const provinceFilter = document.getElementById('provinceFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;
        
        filteredLocations = schoolLocations.filter(location => {
            // Search filter
            const matchesSearch = !searchTerm || 
                location.name.toLowerCase().includes(searchTerm) ||
                location.address.toLowerCase().includes(searchTerm) ||
                location.city.toLowerCase().includes(searchTerm);
            
            // Province filter
            const matchesProvince = !provinceFilter || location.province === provinceFilter;
            
            // Status filter
            const matchesStatus = !statusFilter || location.status === statusFilter;
            
            return matchesSearch && matchesProvince && matchesStatus;
        });
        
        // Update map markers
        createMarkers(filteredLocations);
        
        // Update cards
        renderLocationCards(filteredLocations);
        
        // Show search marker if search term exists
        if (searchTerm && filteredLocations.length > 0) {
            performLocationSearch(searchTerm);
        } else {
            // Remove search marker
            if (searchMarker) {
                searchMarker.setMap(null);
                searchMarker = null;
            }
        }
        
        // Show notification
        if (searchTerm || provinceFilter || statusFilter) {
            showNotification("info", `Ditemukan ${filteredLocations.length} lokasi`);
        }
        
    } catch (error) {
        console.error("Error filtering locations:", error);
        showNotification("error", "Terjadi kesalahan saat memfilter lokasi");
    }
}

// Perform location search using Google Places
function performLocationSearch(searchTerm) {
    try {
        if (!searchTerm || !window.google || !window.google.maps || !window.google.maps.Geocoder) {
            return;
        }
        
        const geocoder = new google.maps.Geocoder();
        
        geocoder.geocode({ address: searchTerm + ', Indonesia' }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const location = results[0].geometry.location;
                
                // Remove previous search marker
                if (searchMarker) {
                    searchMarker.setMap(null);
                }
                
                // Add new search marker
                searchMarker = new google.maps.Marker({
                    position: location,
                    map: map,
                    title: `Hasil pencarian: ${searchTerm}`,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor: "#10b981",
                        fillOpacity: 1,
                        strokeColor: "#ffffff",
                        strokeWeight: 2,
                        scale: 12
                    },
                    animation: google.maps.Animation.BOUNCE
                });
                
                // Center map on search result
                map.setCenter(location);
                map.setZoom(12);
                
                // Show InfoWindow for search result
                const infoContent = `
                    <div class="info-window">
                        <h3>Hasil Pencarian</h3>
                        <p><i class="fas fa-search"></i> "${searchTerm}"</p>
                        <p>${results[0].formatted_address}</p>
                        <p><i class="fas fa-school"></i> Ditemukan ${filteredLocations.length} lokasi MBG di sekitar sini</p>
                    </div>
                `;
                
                infoWindow.setContent(infoContent);
                infoWindow.open(map, searchMarker);
            }
        });
        
    } catch (error) {
        console.error("Error performing location search:", error);
    }
}

// Get user's current location
function getUserLocation() {
    try {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    
                    // Add marker for user's location
                    if (currentLocationMarker) {
                        currentLocationMarker.setMap(null);
                    }
                    
                    currentLocationMarker = new google.maps.Marker({
                        position: userLocation,
                        map: map,
                        title: "Lokasi Anda",
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            fillColor: "#3b82f6",
                            fillOpacity: 1,
                            strokeColor: "#ffffff",
                            strokeWeight: 2,
                            scale: 8
                        }
                    });
                    
                    showNotification("success", "Lokasi Anda berhasil dideteksi");
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    showNotification("error", "Tidak dapat mengakses lokasi Anda");
                }
            );
        }
    } catch (error) {
        console.error("Error getting user location:", error);
    }
}

// Setup event listeners
function setupEventListeners() {
    try {
        // Search button
        document.getElementById('searchBtn').addEventListener('click', (e) => {
            e.preventDefault();
            filterLocations();
        });
        
        // Search input (enter key)
        document.getElementById('locationSearch').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                filterLocations();
            }
        });
        
        // Filter changes
        document.getElementById('provinceFilter').addEventListener('change', filterLocations);
        document.getElementById('statusFilter').addEventListener('change', filterLocations);
        
        // Reset filters button
        document.getElementById('resetFilters').addEventListener('click', () => {
            document.getElementById('locationSearch').value = '';
            document.getElementById('provinceFilter').value = '';
            document.getElementById('statusFilter').value = '';
            filterLocations();
            showNotification("info", "Filter telah direset");
        });
        
        // Reset search button
        document.getElementById('resetSearchBtn').addEventListener('click', () => {
            document.getElementById('locationSearch').value = '';
            filterLocations();
            showNotification("info", "Pencarian telah direset");
        });
        
        // Current location button
        document.getElementById('currentLocationBtn').addEventListener('click', () => {
            if (userLocation && map) {
                map.setCenter(userLocation);
                map.setZoom(14);
                showNotification("info", "Map dipindahkan ke lokasi Anda");
            } else {
                getUserLocation();
            }
        });
        
        // Zoom controls
        document.getElementById('zoomInBtn').addEventListener('click', () => {
            if (map) {
                map.setZoom(map.getZoom() + 1);
            }
        });
        
        document.getElementById('zoomOutBtn').addEventListener('click', () => {
            if (map) {
                map.setZoom(map.getZoom() - 1);
            }
        });
        
        console.log("Event listeners setup completed!");
        
    } catch (error) {
        console.error("Error setting up event listeners:", error);
    }
}

// Show notification
function showNotification(type, message) {
    try {
        const notification = document.getElementById('notification');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        notification.classList.add('show');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
        });
        
    } catch (error) {
        console.error("Error showing notification:", error);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, initializing...");
    
    // Initialize Google Maps
    window.initMap = initMap;
    
    // Preloader
    setTimeout(() => {
        document.querySelector('.preloader').classList.add('loaded');
    }, 1000);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Back to top button
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    console.log("Initialization completed!");
});

// Global error handler for Google Maps
window.gm_authFailure = function() {
    console.error("Google Maps authentication failed!");
    document.getElementById('map').innerHTML = `
        <div class="no-results-message" style="height: 100%; display: flex; align-items: center; justify-content: center;">
            <div>
                <i class="fas fa-exclamation-triangle"></i>
                <h4>Google Maps Tidak Tersedia</h4>
                <p>API Key Google Maps tidak valid atau telah mencapai batas penggunaan.</p>
            </div>
        </div>
    `;
};
