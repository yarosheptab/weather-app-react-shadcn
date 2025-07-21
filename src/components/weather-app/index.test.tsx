/** @jest-environment jsdom */
import * as useWeatherModule from '@/hooks/use-weather';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WeatherApp from './index';

jest.mock('@/hooks/use-weather');
jest.mock('@/lib/getWeatherApiKey', () => ({
	getWeatherApiKey: () => 'test-api-key'
}));

describe('WeatherApp', () => {
	const mockSearch = jest.fn();
	const mockRemove = jest.fn();
	const mockUndo = jest.fn();
	const mockHistory = [
		{ id: '1', city: 'Kyiv', country: 'UA', searchedAt: new Date() }
	];

	beforeEach(() => {
		(useWeatherModule.useWeather as jest.Mock).mockReturnValue({
			weatherData: null,
			isLoading: false,
			search: mockSearch,
			searchHistory: mockHistory,
			removeHistoryItem: mockRemove,
			undoRemove: mockUndo,
			error: null
		});
		jest.clearAllMocks();
	});

	it('When WeatherApp is rendered, Then it displays header, search form, weather card, and history card', () => {
		render(<WeatherApp />);
		expect(screen.getByText(/search weather/i)).toBeInTheDocument();
		expect(screen.getByText(/kyiv/i)).toBeInTheDocument();
	});

	it('When search form is submitted with city name, Then it calls search function', async () => {
		render(<WeatherApp />);
		const input = screen.getByPlaceholderText(/enter city name/i);
		await userEvent.type(input, 'London');
		await userEvent.click(screen.getByRole('button', { name: /search/i }));
		expect(mockSearch).toHaveBeenCalledWith('London');
	});

	it('When removeHistoryItem is called, Then it calls the remove function', () => {
		render(<WeatherApp />);
		mockRemove('1');
		expect(mockRemove).toHaveBeenCalledWith('1');
	});
});
