/** @jest-environment jsdom */
import * as WeatherHistory from '@/storages/weather-history-storage';
import { act, renderHook } from '@testing-library/react';
import * as Sonner from 'sonner';
import useSWR from 'swr';
import { useWeather } from './use-weather';

jest.mock('swr');
jest.mock('@/lib/getWeatherApiKey', () => ({
	getWeatherApiKey: () => 'test-api-key'
}));

const mockHistory = [
	{ id: '1', city: 'Kyiv', country: 'UA', searchedAt: new Date() },
	{ id: '2', city: 'London', country: 'UK', searchedAt: new Date() }
];

describe('useWeather', () => {
	beforeEach(() => {
		jest
			.spyOn(WeatherHistory.WeatherHistoryStorage, 'get')
			.mockReturnValue([...mockHistory]);
		jest
			.spyOn(WeatherHistory.WeatherHistoryStorage, 'set')
			.mockImplementation(() => {});
		jest.spyOn(Sonner.toast, 'error').mockImplementation(jest.fn());
		jest.spyOn(Sonner.toast, 'success').mockImplementation(jest.fn());
		(useSWR as jest.Mock).mockReturnValue({
			data: null,
			error: null,
			isLoading: false
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('When useWeather is called, Then it returns initial state', () => {
		const { result } = renderHook(() => useWeather());
		expect(result.current.weatherData).toBeNull();
		expect(result.current.isLoading).toBe(false);
		expect(result.current.searchHistory.length).toBe(2);
	});

	it('When search is called with a city, Then it sets the city', () => {
		const { result } = renderHook(() => useWeather());
		act(() => {
			result.current.search('Paris');
		});
		expect(useSWR).toHaveBeenCalled();
	});

	it('When removeHistoryItem is called with an id, Then it removes the item', () => {
		const { result } = renderHook(() => useWeather());
		act(() => {
			result.current.removeHistoryItem('1');
		});
		expect(WeatherHistory.WeatherHistoryStorage.set).toHaveBeenCalledWith([
			mockHistory[1]
		]);
	});

	it('When undoRemove is called with previous history, Then it restores the previous history', () => {
		const { result } = renderHook(() => useWeather());
		const prev = [...mockHistory];
		act(() => {
			result.current.undoRemove(prev);
		});
		expect(WeatherHistory.WeatherHistoryStorage.set).toHaveBeenCalledWith(prev);
	});
});
