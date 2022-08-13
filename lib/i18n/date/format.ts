import { format as fnsFormat } from "date-fns";
import { useCurrentLocale } from "../utils/useCurrentLocale";

export function format(
    date: Date | number,
    formatStr = "PP",
    options: {
        locale?: Locale;
        weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
        firstWeekContainsDate?: number;
        useAdditionalWeekYearTokens?: boolean;
        useAdditionalDayOfYearTokens?: boolean;
    } = {}
) {
    const locale = useCurrentLocale();

    return fnsFormat(date, formatStr, {
        locale,
        ...options,
    });
}
