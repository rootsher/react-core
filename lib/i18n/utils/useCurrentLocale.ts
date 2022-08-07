import { isArray } from "lodash";

import { useI18n } from "./useI18n";

export function useCurrentLocale() {
    const {
        i18n: {
            language,
            options: { fallbackLng },
        },
        locales,
    } = useI18n();
    let fallback = "";

    if (typeof fallbackLng === "string") {
        fallback = fallbackLng;
    } else if (isArray(fallbackLng) && typeof fallbackLng[0] === "string") {
        fallback = fallbackLng[0];
    }

    return locales[language] || locales[fallback];
}
