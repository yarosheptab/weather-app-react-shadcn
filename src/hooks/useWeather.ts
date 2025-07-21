import { mapWeatherIcon } from '@/lib/utils';
import { WeatherHistoryStorage } from '@/storages/WeatherHistoryStorage';
import type { SearchHistoryItem } from '@/types/SearchHistoryItem';
import type { WeatherData } from '@/types/WeatherData';
import { useState } from 'react';
import useSWR from 'swr';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string;
const BASE_URL = 'https://api.weatherapi.com/v1/current.json';

const fetcher = async (url: string): Promise<WeatherData> => {
	const res = await fetch(url);
	if (!res.ok) throw new Error('Failed to fetch weather data');
	const data = await res.json();

	return {
		city: data.location.name,
		country: data.location.country,
		temperature: Math.round(data.current.temp_c),
		description: data.current.condition.text,
		minTemp: Math.round(data.current.temp_c), // weatherapi.com current endpoint does not provide min/max, so use current
		maxTemp: Math.round(data.current.temp_c),
		windSpeed: Math.round(data.current.wind_kph),
		humidity: data.current.humidity,
		icon: mapWeatherIcon(data.current.condition.text)
	};
};

export function useWeather() {
	const [city, setCity] = useState<string | null>(null);
	const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>(
		WeatherHistoryStorage.get()
	);

	const updateHistory = (data: WeatherData | null) => {
		if (!data) return;

		const historyItem: SearchHistoryItem = {
			id: Date.now().toString(),
			city: data.city,
			country: data.country,
			searchedAt: new Date()
		};

		const filtered = searchHistory.filter(
			(item) => item.city.toLowerCase() !== data.city.toLowerCase()
		);

		const newHistory = [historyItem, ...filtered].slice(0, 10);

		saveHistory(newHistory);
	};

	const { data, error, isLoading } = useSWR(
		city ? `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(city)}` : null,
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			onSuccess: updateHistory
		}
	);

	const saveHistory = (history: SearchHistoryItem[]) => {
		setSearchHistory(history);
		WeatherHistoryStorage.set(history);
	};

	const search = async (cityName: string) => {
		if (!cityName.trim()) return;

		setCity(cityName);
	};

	const removeHistoryItem = (id: string) => {
		const itemToRemove = searchHistory.find((item) => item.id === id);

		if (!itemToRemove) {
			return;
		}

		const newHistory = searchHistory.filter((item) => item.id !== id);
		saveHistory(newHistory);
	};

	const undoRemove = (previousHistory: SearchHistoryItem[]) => {
		if (!previousHistory) {
			return;
		}

		const newHistory = [...previousHistory];

		newHistory.sort((a, b) => b.searchedAt.getTime() - a.searchedAt.getTime());

		saveHistory(newHistory);
	};

	return {
		weatherData: data ?? null,
		isLoading: isLoading,
		error,
		search,
		searchHistory,
		removeHistoryItem,
		undoRemove
	};
}
