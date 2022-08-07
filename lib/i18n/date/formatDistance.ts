import { formatDistance as fnsFormatDistance } from "date-fns";
import { useCurrentLocale } from "../utils/useCurrentLocale";

export function formatDistance(
    date: Date | number,
    baseDate: Date | number,
    options: {
        includeSeconds?: boolean;
        addSuffix?: boolean;
        locale?: Locale;
    } = {}
) {
    const locale = useCurrentLocale();

    return fnsFormatDistance(date, baseDate, {
        locale,
        ...options,
    });
}
