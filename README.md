# Ignis Boilerplate

A modern Vue.js boilerplate for building robust web applications. This template includes authentication, routing, state management, and component organization out of the box.

## Features

- 🔒 Authentication with Firebase
- 🎯 Vue 3 with Composition API
- 🗃️ Pinia for state management
- 🎨 Element Plus UI components
- 📱 Responsive design
- 🚦 Vue Router with guards
- 🔧 ESLint + Prettier setup

## Prerequisites

- Node.js >= 14.x
- npm >= 6.x
- Firebase account for authentication

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ignis.git
cd ignis
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Usage

### Development

Start the development server:
```bash
npm run dev
```

### Build

Build for production:
```bash
npm run build
```

### Test

Run tests:
```bash
npm run test
```

## Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Vue components
├── router/         # Vue Router configuration
├── stores/         # Pinia stores
├── styles/         # Global styles
├── utils/          # Utility functions
├── App.vue         # Root component
└── main.js         # Application entry point
```

Project goal
```
/ignis
├── backend/             # FastAPI backend
│   ├── app/
│   │   ├── api/         # API routes
│   │   ├── models/      # Pydantic models
│   │   ├── services/    # Business logic
│   │   ├── tests/       # Backend tests
│   │   ├── main.py      # FastAPI entry point
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── firebase_config.json  # Firebase Admin SDK
│   ├── pytest.ini
│
├── frontend/             # Vue.js frontend
│   ├── src/
│   │   ├── components/   # Reusable Vue components
│   │   ├── views/        # Page views
│   │   ├── router.js     # Vue Router
│   │   ├── store.js      # Vuex or Pinia state management
│   │   ├── api/          # API services (calls to backend)
│   │   ├── firebase.js   # Firebase config
│   │   ├── main.js       # Vue entry point
│   ├── public/
│   ├── tests/            # Frontend tests
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.js
│
├── shared/               # Shared code between frontend & backend
│   ├── models.py         # Shared Pydantic models
│   ├── types.ts          # Shared TypeScript models
│
├── docker-compose.yml
├── .gitignore
├── README.md
```

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Running tests
PYTHONPATH=$PWD pytest backend/app/tests -v

## License

MIT License - see the [LICENSE](LICENSE) file for details

