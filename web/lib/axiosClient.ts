import axios from "axios";

function resolveBaseUrl() {
  if (typeof window === "undefined") {
    return process.env.INTERNAL_API_URL || "http://server:8000/api/v1";
  }

  const protocol = window.location.protocol;
  const hostname = window.location.hostname;

  // To insert at deployment
  // const port = hostname === "localhost" ? ":8000" : "";

  return `${protocol}//${hostname}:8000/api/v1`;
}

const axiosClient = axios.create({
  baseURL: resolveBaseUrl(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      return Promise.reject(error);
    }
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default axiosClient;
