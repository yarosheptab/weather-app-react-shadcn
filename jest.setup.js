require('@testing-library/jest-dom');

// Polyfill localStorage for Jest
global.localStorage = {
	store: {},
	getItem(key) {
		return this.store[key] || null;
	},
	setItem(key, value) {
		this.store[key] = value.toString();
	},
	removeItem(key) {
		delete this.store[key];
	},
	clear() {
		this.store = {};
	}
};

// Set a dummy weather API key for tests
process.env.VITE_WEATHER_API_KEY = 'test-key';

// Mock window.matchMedia for jsdom
if (typeof window !== 'undefined') {
	window.matchMedia =
		window.matchMedia ||
		function () {
			return {
				matches: false,
				media: '',
				onchange: null,
				addListener: jest.fn(),
				removeListener: jest.fn(),
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
				dispatchEvent: jest.fn()
			};
		};
}
