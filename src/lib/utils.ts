import type { WeatherType } from '@/types/weather-data';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function mapWeatherIcon(text: string): WeatherType {
	const t = text.toLowerCase();
	if (t.includes('sun') || t.includes('clear')) return 'sun';
	if (t.includes('rain') || t.includes('drizzle') || t.includes('shower'))
		return 'rain';
	if (t.includes('snow')) return 'snow';
	return 'cloud';
}
