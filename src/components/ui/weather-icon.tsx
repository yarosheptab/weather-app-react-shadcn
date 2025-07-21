import type { WeatherType } from '@/types/WeatherData';
import { Cloud, CloudRain, Snowflake, Sun } from 'lucide-react';

export const WeatherIcon = ({
	type,
	className
}: {
	type: WeatherType;
	className?: string;
}) => {
	switch (type) {
		case 'sun':
			return <Sun className={className} />;
		case 'rain':
			return <CloudRain className={className} />;
		case 'snow':
			return <Snowflake className={className} />;
		default:
			return <Cloud className={className} />;
	}
};
