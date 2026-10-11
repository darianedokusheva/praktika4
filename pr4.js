const card = document.getElementById('card');
const textInput = document.getElementById('text');
const fromInput = document.getElementById('from');
const toInput = document.getElementById('to');
const sendBtn = document.getElementById('sendBtn');
const themeSelect = document.getElementById('theme');
const historyBox = document.getElementById('history');

// кнопка активна, только если все поля заполнены
function checkFields() {
    sendBtn.disabled = !(
        textInput.value.trim() &&
        fromInput.value.trim() &&
        toInput.value.trim()
    );
}
[textInput, fromInput, toInput].forEach(i => i.addEventListener('input', checkFields));

// смена темы
themeSelect.addEventListener('change', () => {
    card.className = 'card ' + themeSelect.value;
});

// localStorage
function getCards() {
    return JSON.parse(localStorage.getItem('cards') || '[]');
}

function renderHistory() {
    const cards = getCards();
    historyBox.innerHTML = '';
    if (cards.length === 0) {
        historyBox.innerHTML = '<p class="empty">Пока нет отправленных открыток</p>';
        return;
    }
    // новые сверху
    cards.slice().reverse().forEach(c => {
        const el = document.createElement('div');
        el.className = 'card ' + c.theme;

        const msg = document.createElement('p');
        msg.className = 'msg';
        msg.textContent = c.text;

        const meta = document.createElement('p');
        meta.className = 'meta';
        meta.textContent = 'От: ' + c.from + ' — Кому: ' + c.to;

        el.append(msg, meta);
        historyBox.appendChild(el);
    });
}

sendBtn.addEventListener('click', () => {
    const cards = getCards();
    cards.push({
        text: textInput.value.trim(),
        from: fromInput.value.trim(),
        to: toInput.value.trim(),
        theme: themeSelect.value
    });
    localStorage.setItem('cards', JSON.stringify(cards));

    textInput.value = fromInput.value = toInput.value = '';
    checkFields();
    renderHistory();
});

// при открытии страницы показываем сохранённые открытки
renderHistory();
