import { ReactElement } from "react";
import i18n from "i18next";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { initReactI18next } from "react-i18next";

import { I18nProvider, useCurrentLocale, useI18n } from "./i18n";

const EN = "en";
const PL = "pl";
const availableLanguages = {
    [EN]: "en-US",
    [PL]: "pl",
};
const resources = {
    [EN]: { translation: { hello: "hello" } },
    [PL]: { translation: { hello: "cześć" } },
};

const renderProvider = (ui: ReactElement) => render(ui, { wrapper: Provider });

describe("i18n()", () => {
    it("should check default language", async () => {
        // arrange
        renderProvider(<LanguageSwitcher />);

        // act - noop

        // assert
        await waitFor(() => {
            expect(screen.getByRole("locale")).toHaveTextContent(
                availableLanguages[EN]
            );
        });
    });

    it("should change language and translation", async () => {
        // arrange
        renderProvider(<LanguageSwitcher />);

        // act
        userEvent.click(screen.getByRole(PL));

        // assert
        await waitFor(() => {
            expect(screen.getByRole("locale")).toHaveTextContent(
                availableLanguages[PL]
            );
            expect(screen.getByRole("translation")).toHaveTextContent(
                resources[PL].translation.hello
            );
        });
    });

    afterEach(cleanup);
});

function Provider({ children }: { children: ReactElement }) {
    const i18nInstance = i18n.createInstance();

    i18nInstance.use(initReactI18next).init({
        fallbackLng: EN,
        debug: false,
        load: "languageOnly",
        supportedLngs: Object.keys(availableLanguages),
        resources,
    });

    return (
        <I18nProvider
            i18n={i18nInstance}
            availableLanguages={availableLanguages}
        >
            {children}
        </I18nProvider>
    );
}

function LanguageSwitcher() {
    const { i18n, supportedLanguages, t } = useI18n();
    const locale = useCurrentLocale();

    return (
        <>
            {locale && (
                <>
                    <div role="locale">{locale.code}</div>
                    <div role="translation">{t("hello")}</div>
                </>
            )}
            {supportedLanguages.map((locale) => (
                <button
                    role={locale}
                    onClick={() => i18n.changeLanguage(locale)}
                    key={locale}
                >
                    {locale}
                </button>
            ))}
        </>
    );
}
