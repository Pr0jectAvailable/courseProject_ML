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
        catalogDiv.innerHTML = '<div style="text-align:center; padding:40px;">🚆 Билетов не найдено. Измените параметры фильтра.</div>';
        return;
    }
    const start = (currentPage - 1) * perPage;
    const pageItems = filteredTickets.slice(start, start + perPage);
    let html = '';
    for (let t of pageItems) {
        html += `
            <div class="ticket">
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