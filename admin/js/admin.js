// Admin Panel JavaScript
// Data Storage using LocalStorage

class AdminPanel {
    constructor() {
        this.currentSection = 'dashboard';
        this.initializeData();
        this.loadData();
        this.loadSettings();
        this.setupEventListeners();
        this.renderUsername();
        this.showSection(this.currentSection);
        this.updateDashboard();
    }

    initializeData() {
        if (!localStorage.getItem('packages')) {
            localStorage.setItem('packages', JSON.stringify([
                {id: 1, name: 'Discover amazing places of the world with us', destination: 'Thailand', duration: '3 days', persons: 2, price: 350, rating: 4.5, reviews: 250, image: '../img/package-1.jpg'},
                {id: 2, name: 'Discover amazing places of the world with us', destination: 'Thailand', duration: '3 days', persons: 2, price: 350, rating: 4.5, reviews: 250, image: '../img/package-2.jpg'},
                {id: 3, name: 'Discover amazing places of the world with us', destination: 'Thailand', duration: '3 days', persons: 2, price: 350, rating: 4.5, reviews: 250, image: '../img/package-3.jpg'}
            ]));
        }

        if (!localStorage.getItem('destinations')) {
            localStorage.setItem('destinations', JSON.stringify([
                {id: 1, name: 'United States', cities: 100, image: '../img/destination-1.jpg'},
                {id: 2, name: 'United Kingdom', cities: 100, image: '../img/destination-2.jpg'},
                {id: 3, name: 'Australia', cities: 100, image: '../img/destination-3.jpg'},
                {id: 4, name: 'India', cities: 100, image: '../img/destination-4.jpg'},
                {id: 5, name: 'South Africa', cities: 100, image: '../img/destination-5.jpg'},
                {id: 6, name: 'Indonesia', cities: 100, image: '../img/destination-6.jpg'}
            ]));
        }

        if (!localStorage.getItem('blog')) {
            localStorage.setItem('blog', JSON.stringify([
                {id: 1, title: 'Dolor justo sea kasd lorem clita justo diam amet', category: 'Tours & Travel', date: '01 Jan', author: 'Admin', image: '../img/blog-1.jpg'},
                {id: 2, title: 'Dolor justo sea kasd lorem clita justo diam amet', category: 'Tours & Travel', date: '01 Jan', author: 'Admin', image: '../img/blog-2.jpg'},
                {id: 3, title: 'Dolor justo sea kasd lorem clita justo diam amet', category: 'Tours & Travel', date: '01 Jan', author: 'Admin', image: '../img/blog-3.jpg'}
            ]));
        }

        if (!localStorage.getItem('guides')) {
            localStorage.setItem('guides', JSON.stringify([
                {id: 1, name: 'Guide Name', designation: 'Designation', image: '../img/team-1.jpg', social: {twitter: '', facebook: '', instagram: '', linkedin: ''}},
                {id: 2, name: 'Guide Name', designation: 'Designation', image: '../img/team-2.jpg', social: {twitter: '', facebook: '', instagram: '', linkedin: ''}},
                {id: 3, name: 'Guide Name', designation: 'Designation', image: '../img/team-3.jpg', social: {twitter: '', facebook: '', instagram: '', linkedin: ''}},
                {id: 4, name: 'Guide Name', designation: 'Designation', image: '../img/team-4.jpg', social: {twitter: '', facebook: '', instagram: '', linkedin: ''}}
            ]));
        }

        if (!localStorage.getItem('testimonials')) {
            localStorage.setItem('testimonials', JSON.stringify([
                {id: 1, name: 'Client Name', profession: 'Profession', text: 'Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam', image: '../img/testimonial-1.jpg'},
                {id: 2, name: 'Client Name', profession: 'Profession', text: 'Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam', image: '../img/testimonial-2.jpg'},
                {id: 3, name: 'Client Name', profession: 'Profession', text: 'Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam', image: '../img/testimonial-3.jpg'}
            ]));
        }

        if (!localStorage.getItem('bookings')) {
            localStorage.setItem('bookings', JSON.stringify([]));
        }

        if (!localStorage.getItem('contacts')) {
            localStorage.setItem('contacts', JSON.stringify([]));
        }

        if (!localStorage.getItem('settings')) {
            localStorage.setItem('settings', JSON.stringify({
                email: 'info@example.com',
                phone: '+012 345 6789',
                address: 'Location, City, Country',
                social: {
                    facebook: '',
                    twitter: '',
                    instagram: '',
                    linkedin: '',
                    youtube: ''
                }
            }));
        }
    }

    loadData() {
        this.packages = JSON.parse(localStorage.getItem('packages') || '[]');
        this.destinations = JSON.parse(localStorage.getItem('destinations') || '[]');
        this.blog = JSON.parse(localStorage.getItem('blog') || '[]');
        this.guides = JSON.parse(localStorage.getItem('guides') || '[]');
        this.testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
        this.bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        this.contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    }

    loadSettings() {
        const settings = JSON.parse(localStorage.getItem('settings') || '{}');
        if (!settings) return;

        document.getElementById('site-email').value = settings.email || '';
        document.getElementById('site-phone').value = settings.phone || '';
        document.getElementById('site-address').value = settings.address || '';
        document.getElementById('social-facebook').value = settings.social?.facebook || '';
        document.getElementById('social-twitter').value = settings.social?.twitter || '';
        document.getElementById('social-instagram').value = settings.social?.instagram || '';
        document.getElementById('social-linkedin').value = settings.social?.linkedin || '';
        document.getElementById('social-youtube').value = settings.social?.youtube || '';
    }

    saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
        this[key] = data;
        this.updateDashboard();
        this.showSection(this.currentSection);
    }

    setupEventListeners() {
        document.querySelectorAll('.menu-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.showSection(section);
                document.querySelectorAll('.menu-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        document.getElementById('settings-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSettings();
        });
    }

    renderUsername() {
        const name = localStorage.getItem('admin_username') || 'Администратор';
        const userLabel = document.getElementById('admin-name');
        if (userLabel) {
            userLabel.textContent = name;
        }
    }

    showSection(sectionId) {
        this.currentSection = sectionId;
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            sectionElement.classList.add('active');
        }

        switch (sectionId) {
            case 'packages':
                this.loadPackages();
                break;
            case 'destinations':
                this.loadDestinations();
                break;
            case 'blog':
                this.loadBlog();
                break;
            case 'guides':
                this.loadGuides();
                break;
            case 'testimonials':
                this.loadTestimonials();
                break;
            case 'bookings':
                this.loadBookings();
                break;
            case 'contacts':
                this.loadContacts();
                break;
            case 'settings':
                this.loadSettings();
                break;
        }
    }

    updateDashboard() {
        document.getElementById('stats-packages').textContent = this.packages.length;
        document.getElementById('stats-destinations').textContent = this.destinations.length;
        document.getElementById('stats-blog').textContent = this.blog.length;
        document.getElementById('stats-bookings').textContent = this.bookings.length;

        const recentBookings = this.bookings.slice(-5).reverse();
        const tbody = document.getElementById('recent-bookings');

        if (recentBookings.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">Нет данных</td></tr>';
        } else {
            tbody.innerHTML = recentBookings.map(booking => `
                <tr>
                    <td>${new Date(booking.createdAt).toLocaleDateString()}</td>
                    <td>${booking.destination}</td>
                    <td>${booking.departDate} - ${booking.returnDate}</td>
                    <td>${booking.duration}</td>
                    <td><span class="badge badge-${booking.status === 'new' ? 'primary' : 'success'}">${booking.status === 'new' ? 'Новое' : 'Обработано'}</span></td>
                </tr>
            `).join('');
        }
    }

    loadPackages() {
        const tbody = document.getElementById('packages-list');
        if (!tbody) return;

        if (this.packages.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted">Нет турпакетов</td></tr>';
            return;
        }

        tbody.innerHTML = this.packages.map(pkg => `
            <tr>
                <td><img src="${pkg.image}" alt="${pkg.name}" style="width: 80px; height: 60px; object-fit: cover; border-radius: 5px;"></td>
                <td>${pkg.name}</td>
                <td>${pkg.destination}</td>
                <td>${pkg.duration}</td>
                <td>$${pkg.price}</td>
                <td>${pkg.rating} ⭐ (${pkg.reviews})</td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-sm btn-info" onclick="admin.editPackage(${pkg.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-danger" onclick="admin.deletePackage(${pkg.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    loadDestinations() {
        const tbody = document.getElementById('destinations-list');
        if (!tbody) return;

        if (this.destinations.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">Нет направлений</td></tr>';
            return;
        }

        tbody.innerHTML = this.destinations.map(dest => `
            <tr>
                <td><img src="${dest.image}" alt="${dest.name}" style="width: 80px; height: 60px; object-fit: cover; border-radius: 5px;"></td>
                <td>${dest.name}</td>
                <td>${dest.cities} городов</td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-sm btn-info" onclick="admin.editDestination(${dest.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-danger" onclick="admin.deleteDestination(${dest.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    loadBlog() {
        const tbody = document.getElementById('blog-list');
        if (!tbody) return;

        if (this.blog.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">Нет статей</td></tr>';
            return;
        }

        tbody.innerHTML = this.blog.map(post => `
            <tr>
                <td><img src="${post.image}" alt="${post.title}" style="width: 80px; height: 60px; object-fit: cover; border-radius: 5px;"></td>
                <td>${post.title}</td>
                <td>${post.category}</td>
                <td>${post.date}</td>
                <td>${post.author}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-sm btn-info" onclick="admin.editBlog(${post.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-danger" onclick="admin.deleteBlog(${post.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    loadGuides() {
        const container = document.getElementById('guides-list');
        if (!container) return;

        if (this.guides.length === 0) {
            container.innerHTML = '<div class="col-12 text-center text-muted">Нет гидов</div>';
            return;
        }

        container.innerHTML = this.guides.map(guide => `
            <div class="col-md-3 mb-4">
                <div class="card">
                    <img src="${guide.image}" class="card-img-top" alt="${guide.name}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${guide.name}</h5>
                        <p class="card-text text-muted">${guide.designation}</p>
                        <div class="table-actions justify-content-center">
                            <button class="btn btn-sm btn-info" onclick="admin.editGuide(${guide.id})"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-sm btn-danger" onclick="admin.deleteGuide(${guide.id})"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadTestimonials() {
        const container = document.getElementById('testimonials-list');
        if (!container) return;

        if (this.testimonials.length === 0) {
            container.innerHTML = '<div class="col-12 text-center text-muted">Нет отзывов</div>';
            return;
        }

        container.innerHTML = this.testimonials.map(test => `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body text-center">
                        <img src="${test.image}" class="rounded-circle mb-3" alt="${test.name}" style="width: 100px; height: 100px; object-fit: cover;">
                        <h5 class="card-title">${test.name}</h5>
                        <p class="text-muted">${test.profession}</p>
                        <p class="card-text">${test.text}</p>
                        <div class="table-actions justify-content-center">
                            <button class="btn btn-sm btn-info" onclick="admin.editTestimonial(${test.id})"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-sm btn-danger" onclick="admin.deleteTestimonial(${test.id})"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadBookings() {
        const tbody = document.getElementById('bookings-list');
        if (!tbody) return;

        if (this.bookings.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted">Нет бронирований</td></tr>';
            return;
        }

        tbody.innerHTML = this.bookings.map(booking => `
            <tr>
                <td>#${booking.id}</td>
                <td>${new Date(booking.createdAt).toLocaleDateString()}</td>
                <td>${booking.destination}</td>
                <td>${booking.departDate}</td>
                <td>${booking.returnDate}</td>
                <td>${booking.duration}</td>
                <td><span class="badge badge-${booking.status === 'new' ? 'primary' : 'success'}">${booking.status === 'new' ? 'Новое' : 'Обработано'}</span></td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-sm btn-success" onclick="admin.markBookingProcessed(${booking.id})"><i class="fas fa-check"></i></button>
                        <button class="btn btn-sm btn-danger" onclick="admin.deleteBooking(${booking.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    loadContacts() {
        const tbody = document.getElementById('contacts-list');
        if (!tbody) return;

        if (this.contacts.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">Нет сообщений</td></tr>';
            return;
        }

        tbody.innerHTML = this.contacts.map(contact => `
            <tr>
                <td>${new Date(contact.createdAt).toLocaleDateString()}</td>
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>${contact.subject}</td>
                <td>${contact.message.substring(0, 50)}...</td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-sm btn-info" onclick="admin.viewContact(${contact.id})"><i class="fas fa-eye"></i></button>
                        <button class="btn btn-sm btn-danger" onclick="admin.deleteContact(${contact.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    getNextId(items) {
        return items.length ? Math.max(...items.map(item => item.id)) + 1 : 1;
    }

    deletePackage(id) {
        if (confirm('Удалить этот турпакет?')) {
            this.packages = this.packages.filter(p => p.id !== id);
            this.saveData('packages', this.packages);
            this.loadPackages();
        }
    }

    deleteDestination(id) {
        if (confirm('Удалить это направление?')) {
            this.destinations = this.destinations.filter(d => d.id !== id);
            this.saveData('destinations', this.destinations);
            this.loadDestinations();
        }
    }

    deleteBlog(id) {
        if (confirm('Удалить эту статью?')) {
            this.blog = this.blog.filter(b => b.id !== id);
            this.saveData('blog', this.blog);
            this.loadBlog();
        }
    }

    deleteGuide(id) {
        if (confirm('Удалить этого гида?')) {
            this.guides = this.guides.filter(g => g.id !== id);
            this.saveData('guides', this.guides);
            this.loadGuides();
        }
    }

    deleteTestimonial(id) {
        if (confirm('Удалить этот отзыв?')) {
            this.testimonials = this.testimonials.filter(t => t.id !== id);
            this.saveData('testimonials', this.testimonials);
            this.loadTestimonials();
        }
    }

    deleteBooking(id) {
        if (confirm('Удалить это бронирование?')) {
            this.bookings = this.bookings.filter(b => b.id !== id);
            this.saveData('bookings', this.bookings);
            this.loadBookings();
        }
    }

    deleteContact(id) {
        if (confirm('Удалить это сообщение?')) {
            this.contacts = this.contacts.filter(c => c.id !== id);
            this.saveData('contacts', this.contacts);
            this.loadContacts();
        }
    }

    markBookingProcessed(id) {
        const booking = this.bookings.find(b => b.id === id);
        if (booking) {
            booking.status = 'processed';
            this.saveData('bookings', this.bookings);
            this.loadBookings();
        }
    }

    saveSettings() {
        const settings = {
            email: document.getElementById('site-email').value,
            phone: document.getElementById('site-phone').value,
            address: document.getElementById('site-address').value,
            social: {
                facebook: document.getElementById('social-facebook').value,
                twitter: document.getElementById('social-twitter').value,
                instagram: document.getElementById('social-instagram').value,
                linkedin: document.getElementById('social-linkedin').value,
                youtube: document.getElementById('social-youtube').value
            }
        };
        localStorage.setItem('settings', JSON.stringify(settings));
        alert('Настройки сохранены!');
    }

    openPackageModal(id = null) {
        const item = id ? this.packages.find(pkg => pkg.id === id) : null;
        const title = item ? 'Редактировать турпакет' : 'Добавить турпакет';
        const formHtml = `
            <form id="admin-form">
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>Название</label>
                        <input type="text" class="form-control" id="name" value="${item?.name || ''}" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Направление</label>
                        <input type="text" class="form-control" id="destination" value="${item?.destination || ''}" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label>Длительность</label>
                        <input type="text" class="form-control" id="duration" value="${item?.duration || ''}" required>
                    </div>
                    <div class="form-group col-md-4">
                        <label>Цена</label>
                        <input type="number" class="form-control" id="price" value="${item?.price || ''}" required>
                    </div>
                    <div class="form-group col-md-4">
                        <label>Число людей</label>
                        <input type="number" class="form-control" id="persons" value="${item?.persons || 2}" min="1" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label>Рейтинг</label>
                        <input type="number" class="form-control" id="rating" value="${item?.rating || 4.5}" step="0.1" min="0" max="5" required>
                    </div>
                    <div class="form-group col-md-4">
                        <label>Отзывов</label>
                        <input type="number" class="form-control" id="reviews" value="${item?.reviews || 0}" min="0" required>
                    </div>
                    <div class="form-group col-md-4">
                        <label>Изображение</label>
                        <input type="text" class="form-control" id="image" value="${item?.image || '../img/package-1.jpg'}" required>
                    </div>
                </div>
            </form>
        `;

        this.openFormModal({
            modalId: 'package-modal',
            title,
            body: formHtml,
            submitText: item ? 'Обновить' : 'Добавить',
            onSubmit: () => {
                const form = document.getElementById('admin-form');
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return false;
                }

                const data = {
                    id: item ? item.id : this.getNextId(this.packages),
                    name: document.getElementById('name').value,
                    destination: document.getElementById('destination').value,
                    duration: document.getElementById('duration').value,
                    price: Number(document.getElementById('price').value),
                    persons: Number(document.getElementById('persons').value),
                    rating: Number(document.getElementById('rating').value),
                    reviews: Number(document.getElementById('reviews').value),
                    image: document.getElementById('image').value
                };

                if (item) {
                    this.packages = this.packages.map(pkg => pkg.id === item.id ? data : pkg);
                } else {
                    this.packages.push(data);
                }

                this.saveData('packages', this.packages);
                this.loadPackages();
                return true;
            }
        });
    }

    openDestinationModal(id = null) {
        const item = id ? this.destinations.find(dest => dest.id === id) : null;
        const title = item ? 'Редактировать направление' : 'Добавить направление';
        const formHtml = `
            <form id="admin-form">
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>Название</label>
                        <input type="text" class="form-control" id="name" value="${item?.name || ''}" required>
                    </div>
                    <div class="form-group col-md-3">
                        <label>Города</label>
                        <input type="number" class="form-control" id="cities" value="${item?.cities || 1}" min="1" required>
                    </div>
                    <div class="form-group col-md-3">
                        <label>Изображение</label>
                        <input type="text" class="form-control" id="image" value="${item?.image || '../img/destination-1.jpg'}" required>
                    </div>
                </div>
            </form>
        `;

        this.openFormModal({
            modalId: 'destination-modal',
            title,
            body: formHtml,
            submitText: item ? 'Обновить' : 'Добавить',
            onSubmit: () => {
                const form = document.getElementById('admin-form');
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return false;
                }

                const data = {
                    id: item ? item.id : this.getNextId(this.destinations),
                    name: document.getElementById('name').value,
                    cities: Number(document.getElementById('cities').value),
                    image: document.getElementById('image').value
                };

                if (item) {
                    this.destinations = this.destinations.map(dest => dest.id === item.id ? data : dest);
                } else {
                    this.destinations.push(data);
                }

                this.saveData('destinations', this.destinations);
                this.loadDestinations();
                return true;
            }
        });
    }

    openBlogModal(id = null) {
        const item = id ? this.blog.find(post => post.id === id) : null;
        const title = item ? 'Редактировать статью' : 'Добавить статью';
        const formHtml = `
            <form id="admin-form">
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>Заголовок</label>
                        <input type="text" class="form-control" id="title" value="${item?.title || ''}" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Категория</label>
                        <input type="text" class="form-control" id="category" value="${item?.category || 'Tours & Travel'}" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label>Дата</label>
                        <input type="text" class="form-control" id="date" value="${item?.date || ''}" required>
                    </div>
                    <div class="form-group col-md-4">
                        <label>Автор</label>
                        <input type="text" class="form-control" id="author" value="${item?.author || 'Admin'}" required>
                    </div>
                    <div class="form-group col-md-4">
                        <label>Изображение</label>
                        <input type="text" class="form-control" id="image" value="${item?.image || '../img/blog-1.jpg'}" required>
                    </div>
                </div>
            </form>
        `;

        this.openFormModal({
            modalId: 'blog-modal',
            title,
            body: formHtml,
            submitText: item ? 'Обновить' : 'Добавить',
            onSubmit: () => {
                const form = document.getElementById('admin-form');
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return false;
                }

                const data = {
                    id: item ? item.id : this.getNextId(this.blog),
                    title: document.getElementById('title').value,
                    category: document.getElementById('category').value,
                    date: document.getElementById('date').value,
                    author: document.getElementById('author').value,
                    image: document.getElementById('image').value
                };

                if (item) {
                    this.blog = this.blog.map(post => post.id === item.id ? data : post);
                } else {
                    this.blog.push(data);
                }

                this.saveData('blog', this.blog);
                this.loadBlog();
                return true;
            }
        });
    }

    openGuideModal(id = null) {
        const item = id ? this.guides.find(guide => guide.id === id) : null;
        const title = item ? 'Редактировать гида' : 'Добавить гида';
        const formHtml = `
            <form id="admin-form">
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>Имя</label>
                        <input type="text" class="form-control" id="name" value="${item?.name || ''}" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Должность</label>
                        <input type="text" class="form-control" id="designation" value="${item?.designation || ''}" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>Изображение</label>
                        <input type="text" class="form-control" id="image" value="${item?.image || '../img/team-1.jpg'}" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Twitter</label>
                        <input type="text" class="form-control" id="twitter" value="${item?.social?.twitter || ''}">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label>Facebook</label>
                        <input type="text" class="form-control" id="facebook" value="${item?.social?.facebook || ''}">
                    </div>
                    <div class="form-group col-md-4">
                        <label>Instagram</label>
                        <input type="text" class="form-control" id="instagram" value="${item?.social?.instagram || ''}">
                    </div>
                    <div class="form-group col-md-4">
                        <label>LinkedIn</label>
                        <input type="text" class="form-control" id="linkedin" value="${item?.social?.linkedin || ''}">
                    </div>
                </div>
            </form>
        `;

        this.openFormModal({
            modalId: 'guide-modal',
            title,
            body: formHtml,
            submitText: item ? 'Обновить' : 'Добавить',
            onSubmit: () => {
                const form = document.getElementById('admin-form');
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return false;
                }

                const data = {
                    id: item ? item.id : this.getNextId(this.guides),
                    name: document.getElementById('name').value,
                    designation: document.getElementById('designation').value,
                    image: document.getElementById('image').value,
                    social: {
                        twitter: document.getElementById('twitter').value,
                        facebook: document.getElementById('facebook').value,
                        instagram: document.getElementById('instagram').value,
                        linkedin: document.getElementById('linkedin').value
                    }
                };

                if (item) {
                    this.guides = this.guides.map(guide => guide.id === item.id ? data : guide);
                } else {
                    this.guides.push(data);
                }

                this.saveData('guides', this.guides);
                this.loadGuides();
                return true;
            }
        });
    }

    openTestimonialModal(id = null) {
        const item = id ? this.testimonials.find(test => test.id === id) : null;
        const title = item ? 'Редактировать отзыв' : 'Добавить отзыв';
        const formHtml = `
            <form id="admin-form">
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>Имя</label>
                        <input type="text" class="form-control" id="name" value="${item?.name || ''}" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label>Профессия</label>
                        <input type="text" class="form-control" id="profession" value="${item?.profession || ''}" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Текст отзыва</label>
                    <textarea class="form-control" id="text" rows="4" required>${item?.text || ''}</textarea>
                </div>
                <div class="form-group">
                    <label>Изображение</label>
                    <input type="text" class="form-control" id="image" value="${item?.image || '../img/testimonial-1.jpg'}" required>
                </div>
            </form>
        `;

        this.openFormModal({
            modalId: 'testimonial-modal',
            title,
            body: formHtml,
            submitText: item ? 'Обновить' : 'Добавить',
            onSubmit: () => {
                const form = document.getElementById('admin-form');
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return false;
                }

                const data = {
                    id: item ? item.id : this.getNextId(this.testimonials),
                    name: document.getElementById('name').value,
                    profession: document.getElementById('profession').value,
                    text: document.getElementById('text').value,
                    image: document.getElementById('image').value
                };

                if (item) {
                    this.testimonials = this.testimonials.map(test => test.id === item.id ? data : test);
                } else {
                    this.testimonials.push(data);
                }

                this.saveData('testimonials', this.testimonials);
                this.loadTestimonials();
                return true;
            }
        });
    }

    editPackage(id) {
        this.openPackageModal(id);
    }

    editDestination(id) {
        this.openDestinationModal(id);
    }

    editBlog(id) {
        this.openBlogModal(id);
    }

    editGuide(id) {
        this.openGuideModal(id);
    }

    editTestimonial(id) {
        this.openTestimonialModal(id);
    }

    viewContact(id) {
        const message = this.contacts.find(contact => contact.id === id);
        if (!message) return;

        const body = `
            <p><strong>Имя:</strong> ${message.name}</p>
            <p><strong>Email:</strong> ${message.email}</p>
            <p><strong>Тема:</strong> ${message.subject}</p>
            <p><strong>Сообщение:</strong></p>
            <p>${message.message}</p>
        `;

        this.openFormModal({
            modalId: 'contact-view-modal',
            title: 'Просмотр сообщения',
            body,
            submitText: 'Закрыть',
            showSubmit: false,
            onCancelText: 'Закрыть'
        });
    }

    openFormModal({ modalId, title, body, submitText = 'Сохранить', onSubmit, showSubmit = true, onCancelText = 'Отмена' }) {
        const container = document.getElementById('modals-container');
        const existingModal = document.getElementById(modalId);
        if (existingModal) {
            existingModal.remove();
        }

        container.insertAdjacentHTML('beforeend', `
            <div class="modal fade" id="${modalId}" tabindex="-1" role="dialog" aria-labelledby="${modalId}Label" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="${modalId}Label">${title}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            ${body}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">${onCancelText}</button>
                            ${showSubmit ? `<button type="button" class="btn btn-primary" id="${modalId}-submit">${submitText}</button>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `);

        const modalElement = document.getElementById(modalId);
        if (!modalElement) return;

        $(modalElement).modal('show');
        $(modalElement).on('hidden.bs.modal', () => {
            modalElement.remove();
        });

        if (showSubmit && onSubmit) {
            const submitButton = document.getElementById(`${modalId}-submit`);
            submitButton.addEventListener('click', () => {
                const result = onSubmit();
                if (result !== false) {
                    $(modalElement).modal('hide');
                }
            });
        }
    }
}

function openPackageModal() {
    admin.openPackageModal();
}

function openDestinationModal() {
    admin.openDestinationModal();
}

function openBlogModal() {
    admin.openBlogModal();
}

function openGuideModal() {
    admin.openGuideModal();
}

function openTestimonialModal() {
    admin.openTestimonialModal();
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

let admin;
document.addEventListener('DOMContentLoaded', () => {
    admin = new AdminPanel();
});
