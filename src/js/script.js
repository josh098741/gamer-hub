// Leaderboard data
const leaderboardData = [
    { id: 1, name: "ProGamer99", game: "valorant", score: 2450, wins: 42, losses: 8, winRate: 84, avatar: "PG" },
    { id: 2, name: "SniperElite", game: "cod", score: 2380, wins: 38, losses: 5, winRate: 88, avatar: "SE" },
    { id: 3, name: "GoalMaster", game: "fifa", score: 2320, wins: 50, losses: 12, winRate: 81, avatar: "GM" },
    { id: 4, name: "TowerDefender", game: "clash-royale", score: 2280, wins: 65, losses: 20, winRate: 76, avatar: "TD" },
    { id: 5, name: "CueMaster", game: "8ball", score: 2250, wins: 48, losses: 7, winRate: 87, avatar: "CM" },
    { id: 6, name: "CheckmateKing", game: "chess", score: 2200, wins: 35, losses: 5, winRate: 88, avatar: "CK" },
    { id: 7, name: "BuildBattle", game: "fortnite", score: 2180, wins: 40, losses: 15, winRate: 73, avatar: "BB" },
    { id: 8, name: "HeadshotHero", game: "valorant", score: 2150, wins: 36, losses: 9, winRate: 80, avatar: "HH" },
    { id: 9, name: "TacticalGamer", game: "cod", score: 2100, wins: 32, losses: 8, winRate: 80, avatar: "TG" },
    { id: 10, name: "VirtualMessi", game: "fifa", score: 2080, wins: 45, losses: 20, winRate: 69, avatar: "VM" },
    { id: 11, name: "CardMaster", game: "clash-royale", score: 2050, wins: 55, losses: 25, winRate: 69, avatar: "CM" },
    { id: 12, name: "PoolShark", game: "8ball", score: 2020, wins: 40, losses: 12, winRate: 77, avatar: "PS" },
    { id: 13, name: "Grandmaster", game: "chess", score: 2000, wins: 30, losses: 10, winRate: 75, avatar: "GM" },
    { id: 14, name: "VictoryRoyale", game: "fortnite", score: 1980, wins: 35, losses: 20, winRate: 64, avatar: "VR" },
    { id: 15, name: "AcePlayer", game: "valorant", score: 1950, wins: 28, losses: 12, winRate: 70, avatar: "AP" },
    { id: 16, name: "QuickScope", game: "cod", score: 1920, wins: 25, losses: 10, winRate: 71, avatar: "QS" },
    { id: 17, name: "SkillMove", game: "fifa", score: 1900, wins: 38, losses: 22, winRate: 63, avatar: "SM" },
    { id: 18, name: "ElixirMaster", game: "clash-royale", score: 1880, wins: 45, losses: 30, winRate: 60, avatar: "EM" },
    { id: 19, name: "BankShot", game: "8ball", score: 1850, wins: 32, losses: 18, winRate: 64, avatar: "BS" },
    { id: 20, name: "PawnStar", game: "chess", score: 1820, wins: 25, losses: 15, winRate: 63, avatar: "PS" },
    { id: 21, name: "NoobSlayer", game: "fortnite", score: 1800, wins: 30, losses: 25, winRate: 55, avatar: "NS" },
    { id: 22, name: "TriggerHappy", game: "valorant", score: 1780, wins: 24, losses: 16, winRate: 60, avatar: "TH" },
    { id: 23, name: "CampingExpert", game: "cod", score: 1750, wins: 20, losses: 15, winRate: 57, avatar: "CE" },
    { id: 24, name: "ThroughBall", game: "fifa", score: 1720, wins: 30, losses: 25, winRate: 55, avatar: "TB" },
    { id: 25, name: "GolemUser", game: "clash-royale", score: 1700, wins: 35, losses: 30, winRate: 54, avatar: "GU" },
    { id: 26, name: "StraightPool", game: "8ball", score: 1680, wins: 25, losses: 20, winRate: 56, avatar: "SP" },
    { id: 27, name: "KnightTime", game: "chess", score: 1650, wins: 20, losses: 15, winRate: 57, avatar: "KT" },
    { id: 28, name: "BuilderPro", game: "fortnite", score: 1620, wins: 25, losses: 25, winRate: 50, avatar: "BP" },
    { id: 29, name: "EcoRound", game: "valorant", score: 1600, wins: 20, losses: 20, winRate: 50, avatar: "ER" },
    { id: 30, name: "NoobTube", game: "cod", score: 1580, wins: 18, losses: 17, winRate: 51, avatar: "NT" }
];

// Pagination settings
const itemsPerPage = 30;
let currentPage = 1;
let filteredData = [...leaderboardData];

// Function to render leaderboard rows
function renderLeaderboard(data, page = 1) {
    const tbody = document.getElementById('leaderboardBody');
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);
    
    if (paginatedData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-state">
                    <i class="fas fa-user-slash"></i>
                    <h3>No players found</h3>
                    <p>Try adjusting your search or filters</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = paginatedData.map((player, index) => {
        const rank = startIndex + index + 1;
        let rankClass = '';
        if (rank === 1) rankClass = 'rank-1';
        else if (rank === 2) rankClass = 'rank-2';
        else if (rank === 3) rankClass = 'rank-3';
        
        return `
            <tr>
                <td class="rank ${rankClass}">${rank}</td>
                <td>
                    <div class="player-info">
                        <div class="avatar">${player.avatar}</div>
                        <div>${player.name}</div>
                    </div>
                </td>
                <td class="score">${player.score}</td>
                <td class="wins">${player.wins}</td>
                <td class="losses">${player.losses}</td>
                <td class="win-rate">${player.winRate}%</td>
            </tr>
        `;
    }).join('');
}

// Function to render pagination buttons
function renderPagination(data) {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginationContainer = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<button class="pagination-button" data-page="${currentPage - 1}">Previous</button>`;
    }
    
    // Page buttons
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHTML += `<button class="pagination-button active" data-page="${i}">${i}</button>`;
        } else {
            paginationHTML += `<button class="pagination-button" data-page="${i}">${i}</button>`;
        }
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<button class="pagination-button" data-page="${currentPage + 1}">Next</button>`;
    }
    
    paginationContainer.innerHTML = paginationHTML;
    
    // Add event listeners to pagination buttons
    document.querySelectorAll('.pagination-button').forEach(button => {
        button.addEventListener('click', () => {
            currentPage = parseInt(button.dataset.page);
            filterLeaderboard();
        });
    });
}

// Filter functionality
const filters = document.querySelectorAll('.filter');
const searchInput = document.getElementById('searchInput');

function filterLeaderboard() {
    const activeFilter = document.querySelector('.filter.active')?.dataset.filter || 'all';
    const searchTerm = searchInput.value.toLowerCase();
    
    filteredData = leaderboardData.filter(player => {
        const matchesFilter = activeFilter === 'all' || player.game === activeFilter;
        const matchesSearch = player.name.toLowerCase().includes(searchTerm);
        
        return matchesFilter && matchesSearch;
    });
    
    // Sort by score (descending)
    filteredData.sort((a, b) => b.score - a.score);
    
    // Reset to first page when filtering
    currentPage = 1;
    
    renderLeaderboard(filteredData, currentPage);
    renderPagination(filteredData);
}

// Set up event listeners
filters.forEach(button => {
    button.addEventListener('click', () => {
        filters.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterLeaderboard();
    });
});

searchInput.addEventListener('input', filterLeaderboard);

// Initial render
filterLeaderboard();