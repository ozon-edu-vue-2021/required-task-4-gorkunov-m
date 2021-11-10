export function formatDate(date) {
    return new Intl.DateTimeFormat('ru', { timeZone: 'UTC' }).format(date);
}
