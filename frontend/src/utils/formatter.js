// 1. Date and Time (e.g., "Sep 19, 2026, 4:45 PM")
export const formatDateTime = (dateString) => {
	return new Intl.DateTimeFormat("en-US", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(dateString));
};

// 2. Date Only (e.g., "Sep 19, 2026")
export const formatDateOnly = (dateString) => {
	return new Intl.DateTimeFormat("en-US", {
		dateStyle: "medium",
	}).format(new Date(dateString));
};
