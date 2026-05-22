document.addEventListener('DOMContentLoaded', () => {
    const bookingForms = Array.from(document.querySelectorAll('form[action="booking_form.php"]'));
    const contactForms = Array.from(document.querySelectorAll('form[action="contact_form.php"]'));

    bookingForms.forEach(form => form.addEventListener('submit', handleBookingSubmit));
    contactForms.forEach(form => form.addEventListener('submit', handleContactSubmit));
});

function getStoredArray(key) {
    try {
        return JSON.parse(localStorage.getItem(key) || '[]');
    } catch (error) {
        console.warn(`Ошибка при чтении ${key} из localStorage`, error);
        return [];
    }
}

function saveStoredArray(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getNextId(items) {
    return items.length ? Math.max(...items.map(item => item.id || 0)) + 1 : 1;
}

function getSelectText(form, name) {
    const select = form.querySelector(`[name="${name}"]`);
    if (!select) return '';
    return select.options[select.selectedIndex]?.text?.trim() || select.value.trim();
}

function handleBookingSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const destination = getSelectText(form, 'destination');
    const departDate = form.querySelector('[name="depart-date"]')?.value?.trim() || '';
    const returnDate = form.querySelector('[name="return-date"]')?.value?.trim() || '';
    const duration = getSelectText(form, 'duration');

    if (!destination || destination.toLowerCase().includes('destination')) {
        alert('Выберите направление.');
        return;
    }

    if (!departDate || !returnDate || !duration || duration.toLowerCase().includes('duration')) {
        alert('Заполните все поля бронирования.');
        return;
    }

    const bookings = getStoredArray('bookings');
    bookings.push({
        id: getNextId(bookings),
        destination,
        departDate,
        returnDate,
        duration,
        status: 'new',
        createdAt: new Date().toISOString()
    });

    saveStoredArray('bookings', bookings);
    alert('Бронирование отправлено. Спасибо!');
    form.reset();
}

function handleContactSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.querySelector('[name="name"]')?.value?.trim() || '';
    const email = form.querySelector('[name="email"]')?.value?.trim() || '';
    const subject = form.querySelector('[name="subject"]')?.value?.trim() || '';
    const message = form.querySelector('[name="message"]')?.value?.trim() || '';

    if (!name || !email || !subject || !message) {
        alert('Пожалуйста, заполните все поля формы.');
        return;
    }

    const contacts = getStoredArray('contacts');
    contacts.push({
        id: getNextId(contacts),
        name,
        email,
        subject,
        message,
        createdAt: new Date().toISOString()
    });

    saveStoredArray('contacts', contacts);
    alert('Сообщение отправлено. Спасибо!');
    form.reset();
}
