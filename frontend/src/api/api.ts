import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
import { getAuth, signOut } from 'firebase/auth';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your FastAPI backend URL
});

// Ensure latest token is attached to requests
api.interceptors.request.use(
  async (config) => {
    const userStore = useUserStore();

    // Ensure headers object exists before modifying it
    if (!config.headers) {
      config.headers = {};
    }

    // If there's no token, try to refresh it
    if (!userStore.token) {
      await userStore.fetchToken();
    }
    console.log("Attaching token to authorization header.")
    // Attach token
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`;
    }

    return config; // Ensure we return a valid Axios config
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle 401 errors and retry once
api.interceptors.response.use(
  (response) => response, // If the response is successful, just return it
  async (error) => {
    const userStore = useUserStore();
    const auth = getAuth();

    if (error.response?.status === 401) {
      console.warn('401 Unauthorized: Attempting token refresh...');

      // Avoid infinite loop by checking if we already retried this request
      if (!error.config._retry) {
        error.config._retry = true; // Mark request as retried

        try {
          await userStore.fetchToken(true); // Force refresh token
          error.config.headers.Authorization = `Bearer ${userStore.token}`;
          return api(error.config); // Retry request with new token
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          await userStore.logout(); // Log out user on persistent failure
          window.location.reload(); // Reset app state
        }
      }
    }

    return Promise.reject(error); // Reject if retry fails or already retried
  }
);

export default api;
