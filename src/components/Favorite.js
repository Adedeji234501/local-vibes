import { fetchEvents } from '../api/eventAPI.js';


export function saveFavorite(eventId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(eventId)) {
        favorites.push(eventId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Event added to favorites!');
    } else {
        alert('Event is already in favorites!');
    }
}

export function removeFavorite(eventId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(id => id !== eventId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Event removed from favorites!');
}

export async function renderFavorites() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = '<h2>Favorite Events</h2><div id="favoriteList"></div>';
    
    const events = await fetchEvents();
    const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteList = document.getElementById('favoriteList');
    
    const favoriteEvents = events.filter(event => favoriteIds.includes(event.id));
    
    if (favoriteEvents.length === 0) {
        favoriteList.innerHTML = '<p>No favorite events saved.</p>';
        return;
    }

    favoriteEvents.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.classList.add('favorite-event');
        eventItem.innerHTML = `
            <h3>${event.name}</h3>
            <p>${event.description}</p>
            <button onclick="removeFavorite('${event.id}')">Remove from Favorites</button>
        `;
        favoriteList.appendChild(eventItem);
    });
}
