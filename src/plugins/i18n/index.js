// const { LANG_STORAGE_KEY } = require("@/core/constants");
import { LANG_STORAGE_KEY } from '@/core/constants';
import { getItem } from '@/core/helpers/localeStorage';
import { createI18n } from 'vue-i18n';
import en from './locales/en.json'
import uz from './locales/uz.json'
import ru from './locales/ru.json'
import tr from './locales/tr.json'
import zh from './locales/zh.json'
import ko from './locales/ko.json'
import ja from './locales/ja.json'
import ar from './locales/ar.json'
import fa from './locales/fa.json'
import ms from './locales/ms.json'

export const i18n = createI18n({
    locale: getItem(LANG_STORAGE_KEY) || 'uz',
    fallbackLocale: getItem(LANG_STORAGE_KEY) || 'uz',
    messages: {
        en,
        uz,
        ru,
        tr,
        zh,
        ko,
        ja,
        ar,
        fa,
        ms
    }
});