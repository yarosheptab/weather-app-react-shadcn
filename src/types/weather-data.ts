export interface WeatherData {
	city: string;
	country: string;
	temperature: number;
	description: string;
	minTemp: number;
	maxTemp: number;
	windSpeed: number;
	humidity: number;
	icon: WeatherType;
}

export type WeatherType = 'sun' | 'rain' | 'snow' | 'cloud';
