/** @jest-environment jsdom */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchForm } from './index';

describe('SearchForm', () => {
	const handleSubmit = jest.fn();

	beforeEach(() => {
		handleSubmit.mockClear();
	});

	it('When SearchForm is rendered, Then it displays input and button', () => {
		render(
			<SearchForm
				handleSubmit={handleSubmit}
				isLoading={false}
			/>
		);
		expect(screen.getByPlaceholderText(/enter city name/i)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
	});

	it('When form is submitted with input value, Then it calls handleSubmit with the value', async () => {
		render(
			<SearchForm
				handleSubmit={handleSubmit}
				isLoading={false}
			/>
		);
		const input = screen.getByPlaceholderText(/enter city name/i);
		await userEvent.type(input, 'Kyiv');
		await userEvent.click(screen.getByRole('button', { name: /search/i }));
		expect(handleSubmit).toHaveBeenCalledWith('Kyiv');
	});

	it('When form is submitted, Then it clears the input', async () => {
		render(
			<SearchForm
				handleSubmit={handleSubmit}
				isLoading={false}
			/>
		);
		const input = screen.getByPlaceholderText(/enter city name/i);
		await userEvent.type(input, 'Kyiv');
		await userEvent.click(screen.getByRole('button', { name: /search/i }));
		expect(input).toHaveValue('');
	});

	it('When isLoading is true, Then it disables the button and shows loading text', () => {
		render(
			<SearchForm
				handleSubmit={handleSubmit}
				isLoading={true}
			/>
		);
		expect(screen.getByRole('button')).toBeDisabled();
		expect(screen.getByText(/searching/i)).toBeInTheDocument();
	});
});
