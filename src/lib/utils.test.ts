jest.mock('clsx', () => ({
	clsx: (...args: unknown[]) => args.filter(Boolean).join(' '),
	__esModule: true
}));

jest.mock('tailwind-merge', () => ({
	twMerge: (x: string) => x,
	__esModule: true
}));

import { mapWeatherIcon } from './utils';

describe('mapWeatherIcon', () => {
	it('When weather description contains sun or clear, Then it returns sun icon', () => {
		expect(mapWeatherIcon('Sunny')).toBe('sun');
		expect(mapWeatherIcon('clear sky')).toBe('sun');
	});

	it('When weather description contains rain, drizzle, or shower, Then it returns rain icon', () => {
		expect(mapWeatherIcon('Light rain')).toBe('rain');
		expect(mapWeatherIcon('Drizzle')).toBe('rain');
		expect(mapWeatherIcon('Shower')).toBe('rain');
	});

	it('When weather description contains snow, Then it returns snow icon', () => {
		expect(mapWeatherIcon('Heavy snow')).toBe('snow');
	});

	it('When weather description is anything else, Then it returns cloud icon', () => {
		expect(mapWeatherIcon('Fog')).toBe('cloud');
		expect(mapWeatherIcon('Cloudy')).toBe('cloud');
	});
});
