import axios, { AxiosInstance } from 'axios';

const defaultContentType: string = "application/json"

const createApiInstance = (contentType: string = defaultContentType)=>{
  const token = localStorage.getItem("token");
  let source = axios.CancelToken.source();
  const api: AxiosInstance = axios.create({
      baseURL: 'http://localhost:8080/api',
      headers: {
        'Content-Type': contentType,
        "Authorization": `Bearer ${token || ""}`
      },
  });
  return {api: api, source: source}
}

export default createApiInstance;