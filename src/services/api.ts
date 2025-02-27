import axios, { AxiosResponse, CancelTokenSource } from 'axios';
import { axiosInstance } from "./utilities";
import { EXIST_LOCAL_STORAGE } from "./constants";
import { Toast } from './toast';

// Track active requests to prevent duplicates
const cancelTokens: Record<string, CancelTokenSource> = {};

export interface ApiPayload {
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
  api: string;
  isFormData?: boolean;
  prefixUrl?: string;
  body?: any;
  status?: boolean;
  baseURL?: 'normal' | 'auth';
}

/**
 * Dynamic API handler for making HTTP requests
 * @param payload - Configuration for the API request
 * @returns Promise - Promise resolving to API response
 */
export const api = async (payload: ApiPayload): Promise<any> => {
  const {
    method = "get",
    api,
    isFormData = false,
    prefixUrl = "",
    body,
    status = false,
    baseURL = "normal",
  } = payload;

  return await new Promise((resolve, reject) => {
    // Build full URL
    const url = `${getMicroServiceURL(baseURL)}${api}${prefixUrl}`;
    
    // Cancel existing requests to the same endpoint
    if (cancelTokens[url]) {
      cancelTokens[url].cancel('Request canceled due to duplicate');
      delete cancelTokens[url];
    }

    // Create new cancel token
    const cancelToken = axios.CancelToken.source();
    cancelTokens[url] = cancelToken;
    
    // Set headers - safely access localStorage only on client
    const token = typeof window !== 'undefined' ? localStorage.getItem(EXIST_LOCAL_STORAGE.AUTHTOKEN) : null;
    const apiKey = typeof window !== 'undefined' ? localStorage.getItem(EXIST_LOCAL_STORAGE.API_KEY) : null;
    
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token || ""}`;
    axiosInstance.defaults.headers.common["API-Key"] = apiKey || "";
    
    if (isFormData) {
      axiosInstance.defaults.headers["Content-Type"] = "multipart/form-data";
    } else {
      axiosInstance.defaults.headers["Content-Type"] = "application/json";
    }

    // Make request
    axiosInstance[method](url, body ? body : "",  {
      cancelToken: cancelToken.token,
    })
      .then((response: AxiosResponse) => {
        resolve(formatResponse(status, response));
      })
      .catch((error: any) => {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.error('API error:', error);
          let errorMessage = error.message || "Something went wrong";
          Toast({ 
            type: 'danger', 
            message: errorMessage, 
            title: error?.response?.status?.toString() || 'Error' 
          });
          
          if (error.response) {
            reject(formatResponse(status, error.response));
          } else {
            reject({ message: errorMessage, status: 'error' });
          }
        }
      });
  });
};

/**
 * Format API response based on status flag
 */
const formatResponse = (status: boolean, data: AxiosResponse): any => {
  if (status) {
    return {
      status: data.status,
      ...data.data,
    };
  } else {
    return data?.data ? data.data : data;
  }
};

/**
 * Get base URL based on environment
 */
const getMicroServiceURL = (baseURL: string): string => {
  // Use environment variable safely
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';
  
  switch (baseURL) {
    case "normal":
      return `${BASE_URL}`;
    case "auth":
      return `${BASE_URL}`;
    default:
      return `${BASE_URL}`;
  }
};