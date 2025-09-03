const tournaments = [
    {
        id: 1,
        name: "Valorant Champions Qualifications",
        game: "Valorant",
        type: "fps",
        date: "2025-11-15",
        time: "14:00 EST",
        location: "Online",
        prize: "10,000",
        status: "upcoming",
        registrationLink: "https://wa.me/254720060752?text=I%27m+registering+for+Valorant+Champions+Qualifications"
    },
    {
        id: 2,
        name: "Call of Duty Mobile Vanguard series",
        game: "Call of Duty Mobile",
        type: "fps",
        date: "2025-11-20",
        time: "16:00 EST",
        location: "Online",
        prize: "7,500",
        status: "upcoming",
        registrationLink: "https://wa.me/254720060752?text=I%27m+registering+for+Call+of+Duty+Mobile+Showdown"
    },
    {
        id: 3,
        name: "FIFA 25 Ultimate Cup",
        game: "FIFA 25",
        type: "sports",
        date: "2025-11-22",
        time: "18:00 EST",
        location: "Nairobi LAN Center",
        prize: "5,000",
        status: "upcoming",
        registrationLink: "https://wa.me/254720060752?text=I%27m+registering+for+FIFA+25+Ultimate+Cup"
    },
    {
        id: 4,
        name: "Clash Royale Battle Fest",
        game: "Clash Royale",
        type: "strategy",
        date: "2025-11-25",
        time: "15:00 EST",
        location: "Online",
        prize: "3,000",
        status: "upcoming",
        registrationLink: "https://wa.me/254720060752?text=I%27m+registering+for+Clash+Royale+Battle+Fest"
    },
    {
        id: 5,
        name: "8 Ball Pool Masters",
        game: "8 Ball Pool",
        type: "casual",
        date: "2025-11-28",
        time: "20:00 EST",
        location: "Online",
        prize: "2,500",
        status: "upcoming",
        registrationLink: "https://wa.me/254720060752?text=I%27m+registering+for+8+Ball+Pool+Masters"
    },
    {
        id: 6,
        name: "Online Chess Open",
        game: "Chess",
        type: "strategy",
        date: "2025-12-01",
        time: "17:00 EST",
        location: "Online",
        prize: "4,000",
        status: "upcoming",
        registrationLink: "https://wa.me/254720060752?text=I%27m+registering+for+Online+Chess+Open"
    },
    {
        id: 7,
        name: "Fortnite Battle Royale Clash",
        game: "Fortnite",
        type: "battle-royale",
        date: "2025-12-05",
        time: "19:00 EST",
        location: "Online",
        prize: "8,000",
        status: "upcoming",
        registrationLink: "https://wa.me/254720060752?text=I%27m+registering+for+Fortnite+Battle+Royale+Clash"
    },
    {
        id: 8,
        name: "PUBG Mobile Hyper-Strike",
        game: "PUBG Mobile",
        type: "battle-royale",
        date: "2025-12-08",
        time: "21:00 EST",
        location: "Online",
        prize: "6,500",
        status: "upcoming",
        registrationLink: "https://wa.me/254720060752?text=I%27m+registering+for+PUBG+Mobile+Elite+Cup"
    },
    {
        id: 9,
        name: "Brawl Stars Clash Arena",
        game: "Brawl Stars",
        type: "action",
        date: "2025-12-10",
        time: "13:00 EST",
        location: "Online",
        prize: "2,000",
        status: "upcoming",
        registrationLink: "https://wa.me/254720060752?text=I%27m+registering+for+Brawl+Stars+Clash+Arena"
    },
    {
        id: 10,
        name: "League of Legends Rift Cup",
        game: "League of Legends",
        type: "moba",
        date: "2025-12-15",
        time: "22:00 EST",
        location: "Online",
        prize: "12,000",
        status: "upcoming",
        registrationLink: "https://wa.me/254720060752?text=I%27m+registering+for+League+of+Legends+Rift+Cup"
    }
];


// Function to render tournament cards
function renderTournaments(tournamentsToRender) {
    const container = document.getElementById('tournamentContainer');
    
    if (tournamentsToRender.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-trophy"></i>
                <h3>No tournaments found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = tournamentsToRender.map(tournament => `
        <div class="tournament-card" data-type="${tournament.type}" data-status="${tournament.status}">
            <div class="card-header">
                <h2>${tournament.name}</h2>
                <span class="game-type">${tournament.game}</span>
            </div>
            <div class="card-body">
                <div class="info-row">
                    <i class="fas fa-calendar-alt"></i>
                    <span>${tournament.date} at ${tournament.time}</span>
                </div>
                <div class="info-row">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${tournament.location}</span>
                </div>
                <div class="info-row">
                    <i class="fas fa-award"></i>
                    <span>Prize Pool: <strong>${tournament.prize}</strong></span>
                </div>
            </div>
            <div class="card-footer">
                <span class="prize">${tournament.status === 'ongoing' ? 'Ongoing' : 'Registration Open'}</span>
                <a href="${tournament.registrationLink}" class="register-btn">${tournament.status === 'ongoing' ? 'Watch Now' : 'Register'}</a>
            </div>
        </div>
    `).join('');
}

// Initial render
renderTournaments(tournaments);

// Filter functionality
const filters = document.querySelectorAll('.filter');
const searchInput = document.getElementById('searchInput');

function filterTournaments() {
    const activeFilter = document.querySelector('.filter.active')?.dataset.filter || 'all';
    const searchTerm = searchInput.value.toLowerCase();
    
    const filteredTournaments = tournaments.filter(tournament => {
        const matchesFilter = activeFilter === 'all' || 
                            tournament.type === activeFilter || 
                            tournament.status === activeFilter;
        
        const matchesSearch = tournament.name.toLowerCase().includes(searchTerm) ||
                            tournament.game.toLowerCase().includes(searchTerm);
        
        return matchesFilter && matchesSearch;
    });
    
    renderTournaments(filteredTournaments);
}

// Set up event listeners
filters.forEach(button => {
    button.addEventListener('click', () => {
        filters.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterTournaments();
    });
});

searchInput.addEventListener('input', filterTournaments);

// Set 'All' as active filter initially
document.querySelector('[data-filter="all"]').classList.add('active');
