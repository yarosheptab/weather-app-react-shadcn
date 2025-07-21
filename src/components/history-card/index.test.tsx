/** @jest-environment jsdom */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HistoryCard } from './index';

describe('HistoryCard', () => {
	const mockHistory = [
		{ id: '1', city: 'Kyiv', country: 'UA', searchedAt: new Date('2024-01-01') }
	];
	const handleHistoryClick = jest.fn();
	const removeHistoryItem = jest.fn();

	it('When HistoryCard is rendered with history, Then it displays search history items', () => {
		render(
			<HistoryCard
				searchHistory={mockHistory}
				handleHistoryClick={handleHistoryClick}
				removeHistoryItem={removeHistoryItem}
			/>
		);
		expect(screen.getByText('Kyiv')).toBeInTheDocument();
		expect(screen.getByText('1/1/2024')).toBeInTheDocument();
	});

	it('When city is clicked, Then it calls handleHistoryClick with city name', async () => {
		render(
			<HistoryCard
				searchHistory={mockHistory}
				handleHistoryClick={handleHistoryClick}
				removeHistoryItem={removeHistoryItem}
			/>
		);
		await userEvent.click(screen.getByText('Kyiv'));
		expect(handleHistoryClick).toHaveBeenCalledWith('Kyiv');
	});

	it('When remove button is clicked, Then it calls removeHistoryItem with item id', async () => {
		render(
			<HistoryCard
				searchHistory={mockHistory}
				handleHistoryClick={handleHistoryClick}
				removeHistoryItem={removeHistoryItem}
			/>
		);
		// Click the second button (remove button)
		await userEvent.click(screen.getAllByRole('button')[1]);
		expect(removeHistoryItem).toHaveBeenCalledWith('1');
	});

	it('When no history is provided, Then it renders empty state', () => {
		render(
			<HistoryCard
				searchHistory={[]}
				handleHistoryClick={handleHistoryClick}
				removeHistoryItem={removeHistoryItem}
			/>
		);
		expect(screen.getByText(/no search history yet/i)).toBeInTheDocument();
	});
});
