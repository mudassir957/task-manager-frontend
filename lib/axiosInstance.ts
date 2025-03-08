import axios from 'axios';

// ✅ Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // Send cookies automatically
  headers: {
    'Content-Type': 'application/json',
  },
});

let accessToken: string | null | undefined = null;

// ✅ Function to get the latest access token from cookies
const getAccessTokenFromCookies = () => {
  const match = document.cookie.match(/(?:^|; )access_token=([^;]*)/);
  return match ? match[1] : null;
};

// Store access token in memory
accessToken = getAccessTokenFromCookies();

console.log('🔒 Access token:', accessToken);

// ✅ Refresh token function with detailed logs
const refreshAccessToken = async () => {
  try {
    console.log('🔄 Refreshing token...');
    const response = await api.post('/auth/refresh-token');

    if (response.data?.access_token) {
      accessToken = response.data.access_token;
      console.log('✅ New Access Token:', accessToken);
    }

    return accessToken;
  } catch (error) {
    console.error('❌ Token refresh failed:', error);
    return null;
  }
};

// ✅ Request interceptor: Attach access token and log request details
api.interceptors.request.use(
  async (config) => {
    const latestAcessToken = getAccessTokenFromCookies();

    if (latestAcessToken) {
      config.headers.Authorization = `Bearer ${latestAcessToken}`;
      console.log('🚀 Sending request with token:', latestAcessToken);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Refresh token on 401
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       accessToken = await refreshAccessToken();
//       if (accessToken) {
//         error.config.headers.Authorization = `Bearer ${accessToken}`;
//         return api(error.config);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn('⚠️ 401 Unauthorized, trying token refresh...');

      // Prevent infinite refresh loop
      if (error.config._retryCount && error.config._retryCount >= 1) {
        console.error('⛔ Refresh retry limit reached, logging out.');
        return Promise.reject(error);
      }

      error.config._retryCount = (error.config._retryCount || 0) + 1;

      accessToken = await refreshAccessToken();

      if (accessToken) {
        error.config.headers.Authorization = `Bearer ${accessToken}`;
        return api(error.config); // Retry the failed request
      }
    }
    return Promise.reject(error);
  }
);

export default api;
