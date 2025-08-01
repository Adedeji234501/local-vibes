import { fetchEvents } from '../api/eventAPI.js';

export async function renderSearch() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <h2>Search Events</h2>
        <input type="text" id="searchInput" placeholder="Search for events..." />
        <div id="searchResults"></div>
    `;

    document.getElementById('searchInput').addEventListener('input', searchEvents);
}

async function searchEvents() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const events = await fetchEvents();
    const searchResults = document.getElementById('searchResults');

    const filteredEvents = events.filter(event =>
        event.name.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.category.toLowerCase().includes(query)
    );

    searchResults.innerHTML = '';
    
    if (filteredEvents.length === 0) {
        searchResults.innerHTML = '<p>No events found.</p>';
        return;
    }

    filteredEvents.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.classList.add('search-item');
        eventItem.innerHTML = `
            <h3>${event.name}</h3>
            <p>${event.description}</p>
            <a href="#event/${event.id}">View Details</a>
        `;
        searchResults.appendChild(eventItem);
    });
}
