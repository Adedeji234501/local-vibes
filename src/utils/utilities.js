export function alertMessage(message, scroll = true) {
    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.innerText = message;
    alert.addEventListener('click', () => alert.remove());
    const main = document.getElementById('mainContent');
    main.prepend(alert);
    if (scroll) window.scrollTo(0, 0);
}


export async function loadHeaderFooter() {
    const header = await fetch('../partials/header.html').then(res => res.text());
    const footer = await fetch('../partials/footer.html').then(res => res.text());

    document.getElementById('main-header').innerHTML = header;
    document.getElementById('main-footer').innerHTML = footer;
}