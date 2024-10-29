export function alertMessage(message, scroll = true) {
    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.innerText = message;
    alert.addEventListener('click', () => alert.remove());
    const main = document.getElementById('mainContent');
    main.prepend(alert);
    if (scroll) window.scrollTo(0, 0);
}
