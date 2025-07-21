import { Header } from '@/components/header';
import { HistoryCard } from '@/components/history-card';
import { SearchForm } from '@/components/search-form';
import { Button } from '@/components/ui/button';
import { WeatherCard } from '@/components/weather-card';
import { useWeather } from '@/hooks/use-weather';
import { Undo2 } from 'lucide-react';
import { toast } from 'sonner';

export default function WeatherApp() {
	const {
		weatherData,
		isLoading,
		error,
		search,
		searchHistory,
		removeHistoryItem,
		undoRemove
	} = useWeather();

	const handleSearch = async (city: string) => {
		await search(city);
	};

	const handleHistoryClick = (city: string) => {
		handleSearch(city);
	};

	const handleRemoveHistoryItem = (id: string) => {
		removeHistoryItem(id);
		const itemToRemove = searchHistory.find((item) => item.id === id);

		if (!itemToRemove) {
			return;
		}

		const previousHistory = searchHistory;

		toast.success(`${itemToRemove.city} removed from history`, {
			action: (
				<Button
					variant="outline"
					size="sm"
					onClick={() => undoRemove(previousHistory)}
					className="ml-2 bg-transparent"
				>
					<Undo2 className="w-4 h-4 mr-1" />
					Undo
				</Button>
			)
		});
	};

	if (error) {
		toast.error('Failed to fetch weather data. Please try again.');
	}

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="max-w-5xl w-full mx-6 md:mx-auto my-14">
				<Header />

				<div className="grid lg:grid-cols-3 gap-6 w-full">
					<div className="lg:col-span-2 space-y-6">
						<SearchForm
							handleSubmit={handleSearch}
							isLoading={isLoading}
						/>

						<WeatherCard
							weatherData={weatherData}
							isLoading={isLoading}
						/>
					</div>

					<div className="lg:col-span-1">
						<HistoryCard
							searchHistory={searchHistory}
							handleHistoryClick={handleHistoryClick}
							removeHistoryItem={handleRemoveHistoryItem}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
