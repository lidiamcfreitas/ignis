# Ignis Boilerplate

A modern Vue.js boilerplate for building robust web applications. This template includes authentication, routing, state management, and component organization out of the box.

## Features

- 🔒 Authentication with Firebase
- 🎯 Vue 3 with Composition API
- 🗃️ Pinia for state management
- 🎨 Vuetify v3
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
git clone https://github.com/lidiamcfreitas/ignis.git <your_project>
cd <your_project>
```

2. Install dependencies:
```bash
npm install
```

3. Setup firebase
-  Create the project in https://console.firebase.google.com/ and give it a name. Enable analytics (optional)
-  You can use spark plan if you want to keep the app free, if you want to use other google services change to blaze plan.
- Add a web app on the main page to get started. We are not using firebase hosting for now, this can be changed later.
- Run `npm install firebase`
- Duplicate the `.env.example` file and rename it to `.env` . Copy the firebase config keys into the `.env` file

 3.2 Enable services
  3.2.1 A. Enable Authentication
  3.2.2 In Firebase Console, go to Build → Authentication.
  3.2.3 Click Get Started.
  3.2.4 Select the authentication methods you want to use (Google Sign-In).

B. Enable Firestore Database
In Firebase Console, go to Firestore Database.
Click Create Database.
Choose Start in Test Mode (or set up rules for security).
Select your preferred location and click Enable.

Get Firebase Admin SDK Credentials
In Firebase Console, go to Project Settings → Service Accounts.
Click Generate new private key.
This will download a json file (e.g., budget-app-firebase-adminsdk.json).
Move the file to your backend directory (e.g., backend/firebase_config.json).

Change the firebase project
- gcloud config get-value project; # get current project. See if this matches the project you want
- gcloud projects list; # list all projects
- gcloud config set project ignis-14a77; # Your active project does not match the quota project in your local Application Default Credentials file. This might result in unexpected quota issues. To update your Application Default Credentials quota project, use the `gcloud auth application-default set-quota-project` command.
- gcloud auth application-default set-quota-project ignis-14a77; 


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

### Backend
PYTHONPATH=$PWD pytest backend/app/tests -v

Or look for changes
PYTHONPATH=$PWD pytest-watch app/tests -v

### Frontend
npm run test:unit -- --watch

## Generating the typescript models from the pydantic models
Inside the backend folder:
```
python generate_types.py  
```

## Before launching
- setup token to be in Secure HTTP-only cookies, instead of pinia. Prevents XXS attacks.
- setup docker

## License

MIT License - see the [LICENSE](LICENSE) file for details

