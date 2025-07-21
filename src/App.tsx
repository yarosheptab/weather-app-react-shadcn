import { Button } from '@/components/ui/button';
import { ThemeProvider } from '@/providers/theme-provider';

function App() {
	return (
		<ThemeProvider defaultTheme="dark">
			<div>
				<h1 className="text-3xl font-bold underline">Hello World</h1>
				<Button variant="outline">Click me</Button>
			</div>
		</ThemeProvider>
	);
}

export default App;
