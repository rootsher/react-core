import { useContext } from "react";
import { useTranslation } from "react-i18next";

import { I18nContext } from "../i18nContext";

export function useI18n() {
    const i18nContext = useContext(I18nContext);
    const { i18n, t } = useTranslation();
    const supportedLanguages = i18n.options.supportedLngs || [];

    if (!i18nContext) {
        throw new Error("`useI18n` must be used inside I18nProvider");
    }

    return { ...i18nContext, supportedLanguages, i18n, t };
}
