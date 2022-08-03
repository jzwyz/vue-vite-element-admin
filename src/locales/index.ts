import type { App } from 'vue'
import type { I18n, I18nOptions } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import { setHtmlPageLang } from '@/locales/helper'
import { useLocaleStore } from '@/stores/locale'
import formats from '@/locales/lang/formats'

export let i18n: I18n<any>;

async function createI18nOptions(): Promise<I18nOptions> {

    const localeStore = useLocaleStore();
    localeStore.initLocale()
    const locale = localeStore.locale
    const defaultLocal = await import(`./lang/${locale}/index.ts`);
    const message = defaultLocal.default?.message ?? {};

    setHtmlPageLang(locale);

    return {
        legacy: false,
        locale: locale,
        fallbackLocale: 'zh-CN',
        messages: {
            [locale]: message,
        },
        numberFormats: formats.numberFormats,
        datetimeFormats: formats.datetimeFormats,
        //   availableLocales: availableLocales,
        sync: true, //If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
        silentTranslationWarn: true, // true - warning off
        missingWarn: false,
        silentFallbackWarn: true,
    };
}

export async function setupI18n(app: App<Element>) {
    const options = await createI18nOptions();
    i18n = createI18n(options) as any
    app.use(i18n);
}