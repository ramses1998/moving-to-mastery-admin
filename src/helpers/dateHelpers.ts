
const months = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Auout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre"
]

export const convertNumericMonthHumanReadableFormat = (month: number): string => {
    return months[month]
}

export const convertHumanReadableMonthToNumericFormat = (month: string): number => {
    return months.indexOf(month)
}

export const formatJavaScriptDateToStringDateTime = (date: Date): string => {
    return date.toLocaleDateString(
        [],
        {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }
    )
}
