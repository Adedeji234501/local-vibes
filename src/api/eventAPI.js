
//const apiKey = 'HZ4T72HOR6R4ORXD6THM';
//const API_URL = 'https://www.eventbriteapi.com/v3/events/search/?location.address=Lagos&location.within=10km&token={apiKey}';
const EVENTS_JSON_URL = '/events.json';

export async function fetchEvents() {
    try {
        const response = await fetch(EVENTS_JSON_URL);
        if (!response.ok) throw new Error('Failed to fetch local event data');
        const events = await response.json();
        return events;
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
}
