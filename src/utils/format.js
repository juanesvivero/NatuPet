export function formatDate(dateString) {
  return new Intl.DateTimeFormat('es-EC', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date(`${dateString}T12:00:00`));
}
