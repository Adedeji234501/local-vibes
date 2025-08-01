import { renderHome } from './components/Home.js';  // Import Home component
import { renderCalendar } from './components/CalendarView.js';
import { renderFavorites } from './components/Favorite.js';
import { renderSearch } from './components/Search.js';
import { renderEventDetails } from './components/EventDetails.js';
import { loadHeaderFooter } from './utils/utilities.js';

loadHeaderFooter();

  // Function to handle navigation and load the correct view based on the hash
function loadView() {
    const hash = window.location.hash || '#homeLink';
    mainContent.innerHTML = ''; // Clear current view

    if (hash === '#homeLink') {
        renderHome();
    } else if (hash === '#calendar') {
        renderCalendar();
    } else if (hash === '#favorites') {
        renderFavorites();
    } else if (hash === '#search') {
        renderSearch();
    } else if (hash.startsWith('#event/')) {
        const eventId = hash.split('/')[1];
        renderEventDetails(eventId);
    } else {
        mainContent.innerHTML = '<p>Page not found.</p>';
    }
}

// Listen for hash changes to update the view
window.addEventListener('hashchange', loadView);
window.addEventListener('DOMContentLoaded', loadView);
