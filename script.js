/**
 * Простой сайт-переводчик на JavaScript с Tailwind CSS,
 * использующий API Lingva.ml, стилизованный под Google Translate.
 */

const apiUrl = 'https://lingva.ml/api/v1';
const defaultSrcLang = 'auto';
const defaultDstLang = 'ru';

// DOM элементы
const srcLangSelect = document.getElementById('srcLang');
const dstLangSelect = document.getElementById('dstLang');
const inputText = document.getElementById('inputText');
const translateBtn = document.getElementById('translateBtn');
const outputText = document.getElementById('outputText');
const swapBtn = document.getElementById('swapBtn');
const copyBtn = document.getElementById('copyBtn'); // Добавлена кнопка копирования

// Список языков
const languages = {
    auto: 'Auto', en: 'English', ru: 'Русский', es: 'Español', fr: 'Français', de: 'Deutsch', it: 'Italiano', pt: 'Português', nl: 'Nederlands', sv: 'Svenska', da: 'Dansk', fi: 'Suomi', no: 'Norsk', pl: 'Polski', cs: 'Čeština', hu: 'Magyar', ro: 'Română', bg: 'Български', el: 'Ελληνικά', tr: 'Türkçe', ar: 'العربية', he: 'עברית', zh: '中文', ja: '日本語', ko: '한국어', hi: 'हिन्दी', th: 'ไทย', id: 'Bahasa Indonesia', vi: 'Tiếng Việt', uk: 'Українська', 
    ms: 'Bahasa Melayu', fa: 'فارسی', ur: 'اردو', bn: 'বাংলা', ta: 'தமிழ்', te: 'తెలుగు', mr: 'मराठी', kn: 'ಕನ್ನಡ', gu: 'ગુજરાતી', ml: 'മലയാളം'
};

// Заполнение выпадающих списков языков
function populateLanguageSelect(select) {
    select.innerHTML = '';
    Object.keys(languages).forEach(code => {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = languages[code];
        select.appendChild(option);
    });
}

populateLanguageSelect(srcLangSelect);
populateLanguageSelect(dstLangSelect);

dstLangSelect.value = defaultDstLang;

// Перевод текста
async function translateText() {
    const text = inputText.value.trim();
    if (!text) return;
    
    const srcLang = srcLangSelect.value || defaultSrcLang;
    const dstLang = dstLangSelect.value || defaultDstLang;
    
    try {
        const response = await fetch(`${apiUrl}/${srcLang}/${dstLang}/${encodeURIComponent(text)}`);
        const data = await response.json();
        
        outputText.value = data.translation;
    } catch (error) {
        outputText.value = 'Ошибка перевода';
    }
}

// Переключение языков
swapBtn.addEventListener('click', () => {
    const temp = srcLangSelect.value;
    srcLangSelect.value = dstLangSelect.value;
    dstLangSelect.value = temp;
});

// Копирование переведенного текста
copyBtn.addEventListener('click', () => {
    outputText.select();
    navigator.clipboard.writeText(outputText.value);
});

// Обработчик кнопки
translateBtn.addEventListener('click', translateText);

// HTML структура (вставить в body)
/*
<div class="max-w-3xl mx-auto p-6 bg-gray-100 text-gray-900 rounded-lg shadow-lg flex flex-col items-center">
    <div class="flex w-full justify-between items-center mb-4">
        <select id="srcLang" class="p-2 border border-gray-400 bg-white rounded"></select>
        <button id="swapBtn" class="p-2 bg-gray-300 text-black rounded-full">⇄</button>
        <select id="dstLang" class="p-2 border border-gray-400 bg-white rounded"></select>
    </div>
    <div class="flex w-full gap-4 relative">
        <textarea id="inputText" class="w-full p-3 border border-gray-400 bg-white rounded h-24" placeholder="Введите текст..."></textarea>
    </div>
    <div class="w-full mt-2">
        <button id="translateBtn" class="bg-blue-500 text-white p-3 rounded flex items-center w-full">⚡ Перевести</button>
    </div>
    <div class="flex w-full gap-4 mt-2">
        <textarea id="outputText" class="w-full p-3 border border-gray-400 bg-white rounded h-24" readonly></textarea>
        <button id="copyBtn" class="bg-gray-500 text-white p-3 rounded">📋</button>
    </div>
</div>
*/