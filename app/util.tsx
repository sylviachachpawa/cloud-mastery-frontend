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