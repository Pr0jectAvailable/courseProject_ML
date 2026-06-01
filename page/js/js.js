function parseTicketsFromXML(xmlStrings) {
    const tickets = [];
    const parser = new DOMParser();
    for (let xmlStr of xmlStrings) {
        const xmlDoc = parser.parseFromString(xmlStr, "application/xml");
        const ticketNode = xmlDoc.querySelector("ticket");
        if (ticketNode) {
            const from = ticketNode.querySelector("from")?.textContent || "";
            const to = ticketNode.querySelector("to")?.textContent || "";
            const date = ticketNode.querySelector("date")?.textContent || "";
            const time = ticketNode.querySelector("time")?.textContent || "";
            const platform = ticketNode.querySelector("platform")?.textContent || "";
            const company = ticketNode.querySelector("company")?.textContent || "";
            const price = ticketNode.querySelector("price")?.textContent || "";
            const rating = parseFloat(ticketNode.querySelector("rating")?.textContent) || 0;
            tickets.push({ from, to, date, time, platform, company, price, rating });
        }
    }
    return tickets;
}

const allTickets = parseTicketsFromXML(ticketsXML);

const cities = ['Минск', 'Гомель', 'Могилёв', 'Витебск', 'Гродно', 'Брест', 'Бобруйск', 'Жлобин', 'Пинск', 'Орша'];

let currentFilter = { from: '', to: '', date: '', rating: '' };
let filteredTickets = [...allTickets];
let currentPage = 1;
const perPage = 6;
let totalPages = 1;

const catalogDiv = document.querySelector('.tickets-catalog-div');
const pagesDiv = document.querySelector('.pages');

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, m => m === '&' ? '&amp;' : (m === '<' ? '&lt;' : '&gt;'));
}

function updateFilteredTickets() {
    filteredTickets = allTickets.filter(ticket => {
        if (currentFilter.from && ticket.from !== currentFilter.from) return false;
        if (currentFilter.to && ticket.to !== currentFilter.to) return false;
        if (currentFilter.date && ticket.date !== currentFilter.date) return false;
        if (currentFilter.rating && ticket.rating < parseFloat(currentFilter.rating)) return false;
        return true;
    });
    currentPage = 1;
    totalPages = Math.ceil(filteredTickets.length / perPage);
    renderCurrentPage();
    renderPagination();
}

function renderCurrentPage() {
    if (filteredTickets.length === 0) {
        catalogDiv.innerHTML = '<div style="text-align:center; padding:40px;">Билеты не найдены. Измените параметры фильтра.</div>';
        return;
    }
    const start = (currentPage - 1) * perPage;
    const pageItems = filteredTickets.slice(start, start + perPage);
    let html = '';
    for (let t of pageItems) {
        html += `
            <div class="ticket" 
                 data-from="${escapeHtml(t.from)}" 
                 data-to="${escapeHtml(t.to)}" 
                 data-date="${escapeHtml(t.date)}" 
                 data-time="${escapeHtml(t.time)}" 
                 data-platform="${escapeHtml(t.platform)}" 
                 data-company="${escapeHtml(t.company)}" 
                 data-price="${escapeHtml(t.price)}" 
                 data-rating="${t.rating}">
                <div class="code"><img src="../images/barcode/barcode.png" alt=""></div>
                <div class="ticket-information">
                    <div class="ticket-first-line">
                        <p><strong>${escapeHtml(t.from)} → ${escapeHtml(t.to)}</strong></p>
                        <p>${escapeHtml(t.company)}</p>
                    </div>
                    <div class="ticket-second-line">
                        <p>${escapeHtml(t.date)} ${escapeHtml(t.time)} &nbsp;|&nbsp; ${escapeHtml(t.platform)}</p>
                        <p>⭐ ${t.rating}</p>
                    </div>
                    <div class="ticket-third-line">
                        <p>💰 ${escapeHtml(t.price)} BYN</p>
                    </div>
                </div>
            </div>
        `;
    }
    catalogDiv.innerHTML = html;
}

function renderPagination() {
    if (totalPages <= 1) {
        pagesDiv.innerHTML = '';
        return;
    }
    let pagHtml = `<button id="prevPage" ${currentPage === 1 ? 'disabled' : ''}>←</button>`;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    if (endPage - startPage < 4 && startPage > 1) startPage = Math.max(1, endPage - 4);
    for (let i = startPage; i <= endPage; i++) {
        pagHtml += `<button class="page-btn" data-page="${i}" ${i === currentPage ? 'style="background-color:#005f99;"' : ''}>${i}</button>`;
    }
    pagHtml += `<button id="nextPage" ${currentPage === totalPages ? 'disabled' : ''}>→</button>`;
    pagesDiv.innerHTML = pagHtml;
    
    document.getElementById('prevPage')?.addEventListener('click', () => {
        if (currentPage > 1) { currentPage--; renderCurrentPage(); renderPagination(); }
    });
    document.getElementById('nextPage')?.addEventListener('click', () => {
        if (currentPage < totalPages) { currentPage++; renderCurrentPage(); renderPagination(); }
    });
    document.querySelectorAll('.page-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            let page = parseInt(e.target.dataset.page, 10);
            if (page && page !== currentPage && page >= 1 && page <= totalPages) {
                currentPage = page;
                renderCurrentPage();
                renderPagination();
            }
        });
    });
}

(function() {
    let modalOverlay = null;
    let notificationTimeout = null;

    function createModal() {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <h3>Оформление заказа</h3>
                <div class="ticket-info" id="modalTicketInfo"></div>
                <input type="text" id="modalLastName" placeholder="Фамилия" autocomplete="off">
                <input type="text" id="modalFirstName" placeholder="Имя" autocomplete="off">
                <input type="tel" id="modalPhone" placeholder="Номер телефона" autocomplete="off">
                <button id="modalConfirmBtn">Зарегистрировать билет</button>
            </div>
        `;
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) hideModal();
        });
        const closeSpan = overlay.querySelector('.modal-close');
        if (closeSpan) closeSpan.addEventListener('click', hideModal);
        const confirmBtn = overlay.querySelector('#modalConfirmBtn');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                const lastName = document.getElementById('modalLastName').value.trim();
                const firstName = document.getElementById('modalFirstName').value.trim();
                const phone = document.getElementById('modalPhone').value.trim();
                if (lastName === '' || firstName === '' || phone === '') {
                    alert('Пожалуйста, заполните все поля');
                    return;
                }
                hideModal();
                showNotification('Билет зарегистрирован');
                document.getElementById('modalLastName').value = '';
                document.getElementById('modalFirstName').value = '';
                document.getElementById('modalPhone').value = '';
            });
        }
        return overlay;
    }

    function showModal(ticketData) {
        if (!modalOverlay) {
            modalOverlay = createModal();
            document.body.appendChild(modalOverlay);
        }
        const ticketInfoDiv = modalOverlay.querySelector('#modalTicketInfo');
        if (ticketInfoDiv && ticketData) {
            ticketInfoDiv.innerHTML = `
                <strong>${escapeHtml(ticketData.from)} → ${escapeHtml(ticketData.to)}</strong><br>
                ${escapeHtml(ticketData.date)} | ${escapeHtml(ticketData.time)}<br>
                ${escapeHtml(ticketData.platform)}<br>
                💰 ${escapeHtml(ticketData.price)} BYN
            `;
        }
        modalOverlay.style.display = 'flex';
    }

    function hideModal() {
        if (modalOverlay) {
            modalOverlay.style.display = 'none';
        }
    }

    function showNotification(message) {
        if (notificationTimeout) clearTimeout(notificationTimeout);
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        const notif = document.createElement('div');
        notif.className = 'notification';
        notif.textContent = message;
        document.body.appendChild(notif);
        notificationTimeout = setTimeout(() => {
            notif.remove();
        }, 3000);
    }

    if (catalogDiv) {
        catalogDiv.addEventListener('click', (e) => {
            const ticketDiv = e.target.closest('.ticket');
            if (!ticketDiv) return;
            const from = ticketDiv.dataset.from;
            const to = ticketDiv.dataset.to;
            const date = ticketDiv.dataset.date;
            const time = ticketDiv.dataset.time;
            const platform = ticketDiv.dataset.platform;
            const price = ticketDiv.dataset.price;
            showModal({ from, to, date, time, platform, price });
        });
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const filterFrom = document.getElementById('filterFrom');
    const filterTo = document.getElementById('filterTo');
    const filterDate = document.getElementById('filterDate');
    const filterRating = document.getElementById('filterRating');
    const applyBtn = document.getElementById('applyFilter');

    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            currentFilter = {
                from: filterFrom.value,
                to: filterTo.value,
                date: filterDate.value,
                rating: filterRating.value
            };
            updateFilteredTickets();
        });
    }

    updateFilteredTickets();
});