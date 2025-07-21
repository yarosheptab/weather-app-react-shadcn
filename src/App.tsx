import WeatherApp from '@/components/pages/main-page';
import { Toaster } from '@/components/ui/sonner';
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
