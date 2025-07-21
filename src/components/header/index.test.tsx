/** @jest-environment jsdom */
import { render, screen } from '@testing-library/react';
import { Header } from './index';

describe('Header', () => {
	it('When Header is rendered, Then it displays the app title and subtitle', () => {
		render(<Header />);
		expect(screen.getByText(/weather app/i)).toBeInTheDocument();
		expect(
			screen.getByText(/get current weather information/i)
		).toBeInTheDocument();
	});
});
