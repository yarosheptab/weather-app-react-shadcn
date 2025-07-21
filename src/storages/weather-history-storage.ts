import type { SearchHistoryItem } from '@/types/search-history-item';

const STORAGE_KEY = 'weatherHistory';

export const WeatherHistoryStorage = {
	get: (): SearchHistoryItem[] => {
		const savedHistory = localStorage.getItem(STORAGE_KEY);

		if (!savedHistory) return [];

		try {
			const parsedHistory = JSON.parse(savedHistory);

			if (!Array.isArray(parsedHistory)) return [];

			return parsedHistory.map((item: SearchHistoryItem) => ({
				...item,
				searchedAt: new Date(item.searchedAt)
			}));
		} catch (error) {
			console.error('Error parsing weather history:', error);
			return [];
		}
	},
	set: (history: SearchHistoryItem[]) => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
	},
	insert: (item: SearchHistoryItem, index?: number) => {
		const history = WeatherHistoryStorage.get();

		if (index !== undefined) {
			history.splice(index, 0, item);
		} else {
			history.unshift(item);
		}

		WeatherHistoryStorage.set(history);
	},
	remove: (id: string) => {
		const history = WeatherHistoryStorage.get();

		const filteredHistory = history.filter(
			(item: SearchHistoryItem) => item.id !== id
		);

		WeatherHistoryStorage.set(filteredHistory);
	}
};
