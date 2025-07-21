/** @jest-environment jsdom */
import type { WeatherType } from '@/types/weather-data';
import { render, screen } from '@testing-library/react';
import { WeatherCard } from './index';

describe('WeatherCard', () => {
	const weatherData = {
		city: 'Kyiv',
		country: 'UA',
		temperature: 20,
		description: 'Sunny',
		minTemp: 18,
		maxTemp: 22,
		windSpeed: 10,
		humidity: 50,
		icon: 'sun' as WeatherType
	};

	it('When WeatherCard is rendered with weather data, Then it displays weather information', () => {
		render(
			<WeatherCard
				weatherData={weatherData}
				isLoading={false}
			/>
		);
		expect(screen.getByText(/kyiv, ua/i)).toBeInTheDocument();
		expect(screen.getByText(/sunny/i)).toBeInTheDocument();
		expect(screen.getByText(/20°C/)).toBeInTheDocument();
		expect(screen.getByText(/18°C \/ 22°C/)).toBeInTheDocument();
		expect(screen.getByText(/10 km\/h/)).toBeInTheDocument();
		expect(screen.getByText(/50%/)).toBeInTheDocument();
	});

	it('When isLoading is true, Then it renders loading skeletons', () => {
		render(
			<WeatherCard
				weatherData={null}
				isLoading={true}
			/>
		);
		// Check for at least one element with data-slot="skeleton"
		const skeletons = document.querySelectorAll('[data-slot="skeleton"]');
		expect(skeletons.length).toBeGreaterThan(0);
	});

	it('When no data is provided and not loading, Then it renders empty state', () => {
		render(
			<WeatherCard
				weatherData={null}
				isLoading={false}
			/>
		);
		expect(screen.getByText(/no weather data/i)).toBeInTheDocument();
		expect(screen.getByText(/search for a city/i)).toBeInTheDocument();
	});
});
