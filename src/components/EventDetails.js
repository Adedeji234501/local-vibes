import { fetchEvents } from '../api/eventAPI.js';
import { saveFavorite, removeFavorite } from './Favorite.js';


export async function renderEventDetails(eventId) {
    const mainContent = document.getElementById('mainContent');
    const events = await fetchEvents();
    const event = events.find(e => e.id === eventId);
    
    if (!event) {
        mainContent.innerHTML = '<p>Event not found.</p>';
        return;
    }

    // Check if the event is already in favorites
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.includes(event.id);

    mainContent.innerHTML = `
        <h2>${event.name}</h2>
        <img src="${event.image}" alt="${event.name}" style="width: 100%; max-width: 400px;">
        <p><strong>Date:</strong> ${new Date(event.date).toLocaleString()}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Price:</strong> ${event.price}</p>
        <p><strong>Category:</strong> ${event.category}</p>
        <p>${event.description}</p>
        <button id="favoriteButton">${isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</button>
    `;

    // Attach event listener to the favorite button
    const favoriteButton = document.getElementById('favoriteButton');
    favoriteButton.addEventListener('click', () => {
        if (isFavorite) {
            removeFavorite(event.id);
            favoriteButton.textContent = 'Add to Favorites';
        } else {
            saveFavorite(event.id);
            favoriteButton.textContent = 'Remove from Favorites';
        }
    });
}

