import { fetchEvents } from '../api/eventAPI.js';
import { toggleFavorite } from './Favorite.js';

export async function renderEventDetails(eventId) {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = '<p>Loading event details...</p>';

    const events = await fetchEvents();
    const event = events.find(e => e.id === eventId);

    if (!event) {
        mainContent.innerHTML = '<p>Event not found.</p>';
        return;
    }

    const favorites = JSON.parse(localStorage.getItem('favoriteEvents')) || [];
    const isFavorite = favorites.includes(event.id);

    mainContent.innerHTML = `
        <h2>${event.name}</h2>
        <img src="${event.image}" alt="${event.name}" />
        <p>${event.description}</p>
        <p><strong>Date:</strong> ${new Date(event.date).toLocaleString()}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Price:</strong> ${event.price}</p>
        <button onclick="toggleFavorite('${event.id}')">
            ${isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
        <a href="${event.url}" target="_blank">More Information</a>
    `;
}
