const apiUrl = 'https://lingva.ml/api/v1';
const defaultSrcLang = 'auto';
const defaultDstLang = 'ru';
const srcLangSelect = document.getElementById('srcLang');
const dstLangSelect = document.getElementById('dstLang');
const inputText = document.getElementById('inputText');
const translateBtn = document.getElementById('translateBtn');
const outputText = document.getElementById('outputText');
const swapBtn = document.getElementById('swapBtn');
const copyBtn = document.getElementById('copyBtn');
const languages = {
    auto: 'Auto', en: 'English', ru: 'Русский', es: 'Español', fr: 'Français', de: 'Deutsch', it: 'Italiano', pt: 'Português', nl: 'Nederlands', sv: 'Svenska', da: 'Dansk', fi: 'Suomi', no: 'Norsk', pl: 'Polski', cs: 'Čeština', hu: 'Magyar', ro: 'Română', bg: 'Български', el: 'Ελληνικά', tr: 'Türkçe', ar: 'العربية', he: 'עברית', zh: '中文', ja: '日本語', ko: '한국어', hi: 'हिन्दी', th: 'ไทย', id: 'Bahasa Indonesia', vi: 'Tiếng Việt', uk: 'Українська', 
    ms: 'Bahasa Melayu', fa: 'فارسی', ur: 'اردو', bn: 'বাংলা', ta: 'தமிழ்', te: 'తెలుగు', mr: 'मराठी', kn: 'ಕನ್ನಡ', gu: 'ગુજરાતી', ml: 'മലയാളം'
};
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
swapBtn.addEventListener('click', () => {
    const temp = srcLangSelect.value;
    srcLangSelect.value = dstLangSelect.value;
    dstLangSelect.value = temp;
});
copyBtn.addEventListener('click', () => {
    outputText.select();
    navigator.clipboard.writeText(outputText.value);
});
translateBtn.addEventListener('click', translateText);