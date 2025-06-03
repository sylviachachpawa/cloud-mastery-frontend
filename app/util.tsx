export const formatRelativeDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if invalid date
    if (isNaN(date.getTime())) return 'Invalid date';

    // Format time
    const timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    // Check if today
    if (date.toDateString() === now.toDateString()) {
        return `Today, ${timeString}`;
    }

    // Check if yesterday
    if (date.toDateString() === yesterday.toDateString()) {
        return `Yesterday, ${timeString}`;
    }

    // For other dates
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric', 
    }).replace(/(\d+)/, (match) => {
        const day = parseInt(match);
        const suffix = ['th', 'st', 'nd', 'rd'][day % 10] || 'th';
        return `${day}${suffix}`;
    });
};
export function renderStatusBadge(status: string) {
  let statusClass = "";
  let statusText = "";

  switch (status) {
    case "confirmed":
      statusClass = "bg-green-100 text-green-500";
      statusText = "Completed";
      break;
    case "pending":
      statusClass = "bg-yellow-100 text-yellow-500";
      statusText = "Pending";
      break;
    case "shipped":
      statusClass = "bg-blue-100 text-blue-500";
      statusText = "Shipped";
      break;
    case "delivered":
      statusClass = "bg-blue-100 text-blue-500";
      statusText = "Delivered";
      break;
    case "cancelled":
      statusClass = "bg-red-100 text-red-500";
      statusText = "Cancelled";
      break;
    default:
      statusClass = "bg-gray-100 text-gray-500";
      statusText = status;
  }

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClass}`}
    >
      {statusText}
    </span>
  );
}

export function formatUnderscoreToSpace(str: string) {
  return str.replace(/_/g, ' ');
}
