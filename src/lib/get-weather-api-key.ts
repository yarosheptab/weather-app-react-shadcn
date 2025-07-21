export function getWeatherApiKey(): string {
	if (typeof import.meta !== 'undefined' && import.meta.env) {
		return import.meta.env.VITE_WEATHER_API_KEY as string;
	}
	return process.env.VITE_WEATHER_API_KEY as string;
}
