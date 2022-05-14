import { computed } from "@vue/reactivity";
import { unref } from 'vue';
import type { LocaleType } from "~/config";
import { useLocaleStore } from '@/stores/locale'

import { i18n } from '.';
import { setHtmlPageLang } from "./helper";

interface LangModule {
    message: Recordable;
    dateLocale: Recordable;
    dateLocaleName: string;
}

function setI18nLanguage(locale: LocaleType) {
    const localeStore = useLocaleStore();

    if (i18n.mode === 'legacy') {
        i18n.global.locale = locale;
    } else {
        (i18n.global.locale as any).value = locale;
    }
    localeStore.setLocaleInfo({ locale });
    setHtmlPageLang(locale);
}

export function useLocale() {
    const localeStore = useLocaleStore();
    const getLocale = computed(() => localeStore.locale);

    const getElLocale = computed((): any => {
        return i18n.global.getLocaleMessage(unref(getLocale))?.elLocal ?? {};
    });

    async function changeLocale(locale: LocaleType) {
        const globalI18n = i18n.global;
        const currentLocale = unref(globalI18n.locale);
        if (currentLocale === locale) {
            return locale;
        }

        const langModule = ((await import(`./lang/${locale}/index.ts`)) as any).default as LangModule;
        if (!langModule) return;

        const { message } = langModule;

        globalI18n.setLocaleMessage(locale, message);
        setI18nLanguage(locale);
        return locale;
    }

    return {
        getLocale,
        changeLocale,
        getElLocale,
    };
}