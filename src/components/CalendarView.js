import { fetchEvents } from '../api/eventAPI';

export async function renderCalendar() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = '<h2>Events Calendar</h2><div id="calendar"></div>';

    const events = await fetchEvents();
    const calendar = document.getElementById('calendar');

    // Group events by date
    const eventsByDate = events.reduce((acc, event) => {
        const eventDate = new Date(event.date).toLocaleDateString();
        if (!acc[eventDate]) acc[eventDate] = [];
        acc[eventDate].push(event);
        return acc;
    }, {});

    Object.keys(eventsByDate).forEach(date => {
        const dateSection = document.createElement('div');
        dateSection.classList.add('calendar-date');
        dateSection.innerHTML = `<h3>${date}</h3>`;
        
        eventsByDate[date].forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.classList.add('calendar-event');
            eventItem.innerHTML = `
                <a href="#event/${event.id}">${event.name}</a>
            `;
            dateSection.appendChild(eventItem);
        });

        calendar.appendChild(dateSection);

    });
}
