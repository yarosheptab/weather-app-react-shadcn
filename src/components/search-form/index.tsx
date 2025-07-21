import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

export const SearchForm = ({
	handleSubmit,
	isLoading
}: {
	handleSubmit: (city: string) => void;
	isLoading: boolean;
}) => {
	const [searchQuery, setSearchQuery] = useState('');

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleSubmit(searchQuery);
		setSearchQuery('');
	};

	return (
		<Card className="gap-2">
			<CardHeader>
				<CardTitle className="flex items-center gap-1">
					<Search className="w-5 h-5" />
					Search Weather
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={onSubmit}
					className="flex gap-2"
				>
					<Input
						type="text"
						placeholder="Enter city name..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="flex-1"
					/>
					<Button
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? 'Searching...' : 'Search'}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};
