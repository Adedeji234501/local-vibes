import { fetchEvents } from '../api/eventAPI.js';

const FAVORITES_KEY = 'favoriteEvents';

function getFavorites() {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

function saveFavorites(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function toggleFavorite(eventId) {
    const favorites = getFavorites();
    const eventIndex = favorites.indexOf(eventId);
    
    if (eventIndex === -1) {
        favorites.push(eventId);
    } else {
        favorites.splice(eventIndex, 1);
    }

    saveFavorites(favorites);
}

export async function renderFavorites() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = '<h2>Your Favorites</h2><div id="favoritesList"></div>';
    
    const events = await fetchEvents();
    const favorites = getFavorites();
    const favoritesList = document.getElementById('favoritesList');

    const favoriteEvents = events.filter(event => favorites.includes(event.id));

    if (favoriteEvents.length === 0) {
        favoritesList.innerHTML = '<p>No favorite events found.</p>';
        return;
    }

    favoriteEvents.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.classList.add('favorite-item');
        eventItem.innerHTML = `
            <h3>${event.name}</h3>
            <p>${event.description}</p>
            <button onclick="toggleFavorite('${event.id}')">Remove from Favorites</button>
        `;
        favoritesList.appendChild(eventItem);
    });
}
