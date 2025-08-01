import { fetchEvents } from '../api/eventAPI.js';

export async function renderHome() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = '<h2>Welcome to Local Vibes - Lagos</h2><p>Discover exciting events and attractions in Lagos!</p><div id="eventList"></div>';

    const events = await fetchEvents();
    const eventList = document.getElementById('eventList');
    
    if (events.length === 0) {
        eventList.innerHTML = '<p>No events found for Lagos.</p>';
        return;
    }

    events.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.classList.add('event-item');
        eventItem.innerHTML = `
            <img src="${event.image}" alt="${event.name}" style="width: 150px; height: auto;">
            <h3>${event.name}</h3>
            <p>${event.description}</p>
            <p><strong>Date:</strong> ${new Date(event.date).toLocaleString()}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Price:</strong> ${event.price}</p>
            <a href="${event.url}" target="_blank">More Details</a>
        `;
        eventList.appendChild(eventItem);
    });
}
