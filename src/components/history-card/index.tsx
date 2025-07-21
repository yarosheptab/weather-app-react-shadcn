import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import type { SearchHistoryItem } from '@/types/SearchHistoryItem';
import { History, X } from 'lucide-react';

export const HistoryCard = ({
	searchHistory,
	handleHistoryClick,
	removeHistoryItem
}: {
	searchHistory: SearchHistoryItem[];
	handleHistoryClick: (city: string) => void;
	removeHistoryItem: (id: string) => void;
}) => {
	return (
		<Card className="sticky top-4 min-h-[290px]">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<History className="w-5 h-5" />
					Search History
				</CardTitle>
				<CardDescription>Click on any city to view its weather</CardDescription>
			</CardHeader>
			<CardContent>
				{searchHistory.length > 0 ? (
					<div className="space-y-2">
						{searchHistory.map((item) => (
							<div key={item.id}>
								<div className="flex items-center justify-between p-3 hover:bg-background/40 border rounded-lg transition-colors">
									<button
										onClick={() => handleHistoryClick(item.city)}
										className="flex-1 text-left"
									>
										<div className="font-medium">{item.city}</div>
										<div className="text-sm text-gray-500">
											{item.searchedAt.toLocaleDateString()}
										</div>
									</button>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => removeHistoryItem(item.id)}
										className="ml-2 h-8 w-8 p-0"
									>
										<X className="w-4 h-4" />
									</Button>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-8">
						<History className="w-12 h-12 text-gray-400 mx-auto mb-3" />
						<p className="text-muted-foreground">No search history yet</p>
						<p className="text-sm text-gray-500">
							Search for cities to see them here
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
};
