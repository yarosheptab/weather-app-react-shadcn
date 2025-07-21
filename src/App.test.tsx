/** @jest-environment jsdom */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('@/lib/getWeatherApiKey', () => ({
	getWeatherApiKey: () => 'test-api-key'
}));

describe('App', () => {
	it('When App is rendered, Then it displays WeatherApp', () => {
		render(<App />);
		expect(screen.getByText(/search weather/i)).toBeInTheDocument();
	});
});
