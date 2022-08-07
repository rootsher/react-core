import { formatDistanceStrict as fnsFormatDistanceStrict } from "date-fns";
import { useCurrentLocale } from "../utils/useCurrentLocale";

export function formatDistanceStrict(
    date: Date | number,
    baseDate: Date | number,
    options: {
        addSuffix?: boolean;
        unit?: "second" | "minute" | "hour" | "day" | "month" | "year";
        roundingMethod?: "floor" | "ceil" | "round";
        locale?: Locale;
    } = {}
) {
    const locale = useCurrentLocale();

    return fnsFormatDistanceStrict(date, baseDate, {
        locale,
        ...options,
    });
}
