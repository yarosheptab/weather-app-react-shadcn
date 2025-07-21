import { Toaster } from '@/components/ui/sonner';
import WeatherApp from '@/components/weather-app';
import { ThemeProvider } from '@/providers/theme-provider';

function App() {
	return (
		<ThemeProvider defaultTheme="dark">
			<WeatherApp />
			<Toaster />
		</ThemeProvider>
	);
}

export default App;
