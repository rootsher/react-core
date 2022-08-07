import { formatRelative as fnsFormatRelative } from "date-fns";
import { useCurrentLocale } from "../utils/useCurrentLocale";

export function formatRelative(
    date: Date | number,
    baseDate: Date | number,
    options: {
        locale?: Locale;
        weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    } = {}
) {
    const locale = useCurrentLocale();

    return fnsFormatRelative(date, baseDate, {
        locale,
        ...options,
    });
}
