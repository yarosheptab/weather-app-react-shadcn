# Weather Application

A modern React-based weather application that provides real-time weather information for cities worldwide. Built with TypeScript, Vite, and Tailwind CSS, featuring a responsive design.

## Features

- **Real-time Weather Data**: Fetch current weather conditions using the WeatherAPI.com service
- **Search History**: Maintain a searchable history of previously searched cities
- **Responsive Design**: Optimized for desktop and mobile devices
- **Undo Functionality**: Ability to undo removed history items with toast notifications
- **Type Safety**: Full TypeScript implementation with comprehensive type definitions
- **Testing**: Comprehensive test suite with Jest and React Testing Library

## Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js**: Version 22 or higher
- **npm** or **yarn**: Package manager
- **WeatherAPI.com Account**: Free API key required for weather data

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yarosheptab/weather-app-react-shadcn.git
   cd weather-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root directory and add your WeatherAPI.com API key:

   ```env
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

   To obtain an API key:

   - Visit [WeatherAPI.com](https://www.weatherapi.com/)
   - Sign up for a free account
   - Copy your API key from the dashboard

## Development

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

### Code Quality

Lint the codebase:

```bash
npm run lint
```

## Project Structure

```
src/
├── components/           # React components
│   ├── header/          # Application header
│   ├── history-card/    # Search history display
│   ├── search-form/     # City search input
│   ├── ui/              # Reusable UI components
│   ├── weather-app/     # Main application component
│   └── weather-card/    # Weather information display
├── hooks/               # Custom React hooks
│   └── use-weather.ts   # Weather data management
├── lib/                 # Utility functions and configurations
│   ├── get-weather-api-key.ts  # API key management
│   └── utils.ts         # Helper functions
├── providers/           # React context providers
│   └── theme-provider.tsx      # Theme management
├── storages/            # Data persistence
│   └── weather-history-storage.ts  # Local storage utilities
├── types/               # TypeScript type definitions
│   ├── search-history-item.ts  # History item interface
│   └── weather-data.ts         # Weather data interface
└── App.tsx              # Root application component
```

## Key Components

### WeatherApp

The main application component that orchestrates the weather search functionality, history management, and layout.

### useWeather Hook

Custom hook that manages:

- Weather data fetching using SWR
- Search history state and persistence
- Error handling and user feedback
- API integration with WeatherAPI.com

### WeatherCard

Displays current weather information including:

- Temperature (current, min/max)
- Weather description and icon
- Wind speed and humidity
- Loading states and error handling

### HistoryCard

Manages search history with features:

- List of previously searched cities
- Click to search functionality
- Remove items with undo capability
- Local storage persistence

## API Integration

The application integrates with WeatherAPI.com's current weather endpoint:

- **Base URL**: `https://api.weatherapi.com/v1/current.json`
- **Authentication**: API key via environment variable
- **Data Mapping**: Custom mapping for weather icons and data formatting
- **Error Handling**: Comprehensive error handling with user-friendly messages

## Data Persistence

Search history is persisted using:

- **Local Storage**: Browser-based storage for search history
- **State Management**: React state with localStorage synchronization
- **Data Structure**: Typed interfaces for type safety

## Styling and UI

- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **shadcn/ui**: Minimalistic component library
- **Lucide React**: Icon library
- **Sonner**: Toast notifications

## Testing Strategy

The application includes comprehensive testing:

- **Unit Tests**: Component and hook testing
- **Test Utilities**: Custom testing utilities and mocks
- **Coverage**: Jest configuration with TypeScript support

## Configuration Files

- **vite.config.ts**: Vite build configuration with path aliases
- **tsconfig.json**: TypeScript configuration
- **jest.config.js**: Jest testing configuration
- **eslint.config.js**: ESLint code quality rules
- **tailwind.config.js**: Tailwind CSS configuration

## Environment Variables

| Variable               | Description            | Required |
| ---------------------- | ---------------------- | -------- |
| `VITE_WEATHER_API_KEY` | WeatherAPI.com API key | Yes      |

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [WeatherAPI.com](https://www.weatherapi.com/) for weather data
- [Vite](https://vitejs.dev/) for build tooling
- [React](https://reactjs.org/) for the UI framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [SWR](https://swr.vercel.app/) for data fetching
