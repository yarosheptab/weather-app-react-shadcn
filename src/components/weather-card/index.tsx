import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { WeatherIcon } from '@/components/ui/weather-icon';
import type { WeatherData } from '@/types/weather-data';
import { Cloud, Thermometer, Wind } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

export const WeatherCard = ({
	weatherData,
	isLoading
}: {
	weatherData: WeatherData | null;
	isLoading: boolean;
}) => {
	return (
		<Card className="min-h-[360px]">
			{weatherData && !isLoading && (
				<>
					<CardHeader>
						<CardTitle className="flex items-center justify-between">
							<span>
								{weatherData.city}, {weatherData.country}
							</span>
							<WeatherIcon
								type={weatherData.icon}
								className="w-8 h-8 text-blue-500"
							/>
						</CardTitle>
						<CardDescription>{weatherData.description}</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-2 gap-6">
							{/* Current Temperature */}
							<div className="text-center">
								<div className="text-6xl font-bold mb-2">
									{weatherData.temperature}°C
								</div>
								<p className="text-muted-foreground">Current Temperature</p>
							</div>

							{/* Weather Details */}
							<div className="space-y-4">
								<div className="flex items-center justify-between p-3 bg-background/40 border rounded-lg">
									<div className="flex items-center gap-2">
										<Thermometer className="w-4 h-4 text-red-500" />
										<span className="font-medium">Min / Max</span>
									</div>
									<span>
										{weatherData.minTemp}°C / {weatherData.maxTemp}
										°C
									</span>
								</div>

								<div className="flex items-center justify-between p-3 bg-background/40 border rounded-lg">
									<div className="flex items-center gap-2">
										<Wind className="w-4 h-4 text-blue-500" />
										<span className="font-medium">Wind Speed</span>
									</div>
									<span>{weatherData.windSpeed} km/h</span>
								</div>

								<div className="flex items-center justify-between p-3 bg-background/40 border rounded-lg">
									<div className="flex items-center gap-2">
										<Cloud className="w-4 h-4 text-gray-500" />
										<span className="font-medium">Humidity</span>
									</div>
									<span>{weatherData.humidity}%</span>
								</div>
							</div>
						</div>
					</CardContent>
				</>
			)}

			{/* No weather data message */}
			{!weatherData && !isLoading && (
				<CardContent className="text-center py-12 flex-1 flex flex-col items-center justify-center gap-1">
					<WeatherIcon
						type="cloud"
						className="w-16 h-16 text-muted-foreground mx-auto mb-2"
					/>
					<h3 className="text-lg font-medium text-muted-foreground">
						No Weather Data
					</h3>
					<p className="text-gray-500">
						Search for a city to see the weather forecast
					</p>
				</CardContent>
			)}

			{isLoading && (
				<>
					<CardHeader>
						<CardTitle className="flex items-center justify-between gap-1.5">
							<Skeleton className="w-24 h-8" />
							<Skeleton className="w-8 h-8" />
						</CardTitle>
						<CardDescription>
							<Skeleton className="w-24 h-5" />
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-2 gap-6">
							{/* Current Temperature */}
							<div className="text-center">
								<div className="text-6xl font-bold mb-2 flex items-center justify-center">
									<Skeleton className="w-24 h-[60px]" />
								</div>
								<p className="text-muted-foreground">Current Temperature</p>
							</div>

							{/* Weather Details */}
							<div className="space-y-4">
								<div className="flex items-center justify-between p-3 bg-background/40 border rounded-lg">
									<div className="flex items-center gap-2">
										<Thermometer className="w-4 h-4 text-red-500" />
										<span className="font-medium">Min / Max</span>
									</div>
									<span>
										<Skeleton className="w-24 h-6" />
									</span>
								</div>

								<div className="flex items-center justify-between p-3 bg-background/40 border rounded-lg">
									<div className="flex items-center gap-2">
										<Wind className="w-4 h-4 text-blue-500" />
										<span className="font-medium">Wind Speed</span>
									</div>
									<span>
										<Skeleton className="w-24 h-6" />
									</span>
								</div>

								<div className="flex items-center justify-between p-3 bg-background/40 border rounded-lg">
									<div className="flex items-center gap-2">
										<Cloud className="w-4 h-4 text-gray-500" />
										<span className="font-medium">Humidity</span>
									</div>
									<span>
										<Skeleton className="w-24 h-6" />
									</span>
								</div>
							</div>
						</div>
					</CardContent>
				</>
			)}
		</Card>
	);
};
