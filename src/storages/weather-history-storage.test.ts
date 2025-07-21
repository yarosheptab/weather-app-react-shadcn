/** @jest-environment jsdom */
const mockItem = {
	id: '1',
	city: 'Kyiv',
	country: 'UA',
	searchedAt: new Date('2020-01-01T00:00:00Z')
};

describe('WeatherHistoryStorage', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('When storage is empty, Then get returns empty array', async () => {
		const { WeatherHistoryStorage } = await import('./weather-history-storage');
		expect(WeatherHistoryStorage.get()).toEqual([]);
	});

	it('When history is set and retrieved, Then it stores and retrieves history correctly', async () => {
		const { WeatherHistoryStorage } = await import('./weather-history-storage');
		WeatherHistoryStorage.set([mockItem]);
		const result = WeatherHistoryStorage.get();
		expect(result[0].city).toBe('Kyiv');
		expect(result[0].searchedAt).toBeInstanceOf(Date);
	});

	it('When item is inserted without index, Then it adds item to start', async () => {
		const { WeatherHistoryStorage } = await import('./weather-history-storage');
		WeatherHistoryStorage.set([]);
		WeatherHistoryStorage.insert(mockItem);
		const result = WeatherHistoryStorage.get();
		expect(result[0].city).toBe('Kyiv');
	});

	it('When item is inserted at specific index, Then it adds item at that index', async () => {
		const { WeatherHistoryStorage } = await import('./weather-history-storage');
		const item2 = { ...mockItem, id: '2', city: 'London' };
		WeatherHistoryStorage.set([mockItem]);
		WeatherHistoryStorage.insert(item2, 1);
		const result = WeatherHistoryStorage.get();
		expect(result[1].city).toBe('London');
	});

	it('When item is removed by id, Then it deletes the item', async () => {
		const { WeatherHistoryStorage } = await import('./weather-history-storage');
		WeatherHistoryStorage.set([mockItem]);
		WeatherHistoryStorage.remove('1');
		expect(WeatherHistoryStorage.get()).toEqual([]);
	});
});
