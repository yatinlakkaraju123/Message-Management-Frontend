import axios from "axios";
export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8083'
    }
)
const predefinedToken = "eyJraWQiOiI1ODVkNWJkMi1iMTllLTQ5NDQtYjM0Ni0wYzc4YzQ1MjBlMTIiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkZWZhdWx0Iiwic2NvcGUiOiJST0xFX1VTRVIiLCJpc3MiOiJzZWxmIiwidGVuYW50SWQiOiJ1cGVnIiwiZXhwIjoxNzQzNDk4NDQ3LCJpYXQiOjE3NDM0OTMwNDd9.bwyDOLGTrd2WiagZlQLeUjnESbXwuXrRkU8-Hft6_3fRB8p-KVfiy5nbFPrTlEOKxopohxhdpRGnvp30munzuKsmsJsf44wTirOqJ-jd2TtRi2NNTN-19PoI0jjaWMBGJV6xYxkqdEVDZIUUh89fXi58nTsZnkxdp5-dlWOokOM1lVKb0i4U10j2W6LJko5AcWPUfpTdOFOvBM9i7YFVd-XtuTKati_mtMWvfopfqGmcOmyw2osDsIMRgxQ5ZJU7X1c9kdjwExYBHP18IgSINQdGW3xS7Hzgzl-q20-j-_XurcODVHLk9LfJ68QH4XLUqDDJ3IkzOxdqSYmluMI3_w"
apiClient.interceptors.request.use((config) => {
    console.log("Outgoing request config:", config); // Logs the entire request configuration
    return config;
}, (error) => {
    console.error("Error in request interceptor:", error);
    return Promise.reject(error);
});
apiClient.defaults.headers.common["Authorization"] = `Bearer ${predefinedToken}`;

