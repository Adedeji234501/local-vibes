const EVENTS_JSON_URL = import.meta.env.VITE_API_URL;

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
