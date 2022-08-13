import {
    createContext,
    ReactNode,
    useCallback,
    useEffect,
    useState,
} from "react";
import { Locale } from "date-fns";
import { I18nextProvider } from "react-i18next";
import { i18n } from "i18next";

type I18nContextData = ReturnType<typeof useProviderI18n>;
type I18nState = {
    locales: { [key: string]: Locale };
};

// i18n context
export const I18nContext = createContext<I18nContextData | null>(null);

// i18n provider
export function I18nProvider({
    i18n: i18nInstance,
    availableLanguages = {},
    children,
}: {
    i18n: i18n;
    availableLanguages: { [key: string]: string };
    children: ReactNode;
}) {
    const value = useProviderI18n();
    const { setLocale, locales } = value;

    const loadLocale = useCallback(async (language: string) => {
        const localeName = availableLanguages[language];

        if (!localeName) {
            throw new Error(`Locale "${localeName}" not supported`);
        }

        return (await import(`date-fns/locale/${localeName}`)).default;
    }, []);

    const onLoaded = useCallback(async () => {
        const loadedLocales: { [key: string]: Locale } = {};

        await Promise.all(
            (i18nInstance.languages || []).map((language) =>
                loadLocale(language).then(
                    (locale) => (loadedLocales[language] = locale)
                )
            )
        );

        setLocale(loadedLocales);
    }, []);

    const onLanguageChanged = useCallback(async () => {
        if (!locales[i18nInstance.resolvedLanguage]) {
            const locale = await loadLocale(i18nInstance.resolvedLanguage);

            setLocale({
                ...locales,
                [i18nInstance.resolvedLanguage]: locale,
            });
        }
    }, []);

    useEffect(() => {
        // only for loading "fallbackLng"
        onLoaded();

        i18nInstance.on("loaded", onLoaded);
        i18nInstance.on("languageChanged", onLanguageChanged);

        return () => {
            i18nInstance.off("loaded", onLoaded);
            i18nInstance.off("languageChanged", onLanguageChanged);
        };
    }, [i18nInstance]);

    return (
        <I18nContext.Provider value={value}>
            <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
        </I18nContext.Provider>
    );
}

export function useProviderI18n() {
    const [locales, setLocale] = useState<I18nState["locales"]>({});

    return {
        locales,
        setLocale,
    };
}
