import axios from 'axios';

// 创建 Axios 实例
const service = axios.create({
baseURL: 'http://lintao.raysvivi.com:8998', // 基础 URL
timeout: 5000, // 请求超时时间
headers: {
'Content-Type': 'application/json;charset=utf-8'
}
});

// 请求拦截器
service.interceptors.request.use(config => {
const token = localStorage.getItem('token');
if (token) {
config.headers['Authorization'] = `Bearer ${token}`;
}
return config;
}, error => {
return Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use(response => {
const res = response.data;
if (res.code !== 0) {
  return Promise.reject(new Error(res.message || 'Error'));
} else {
  return res;
}
}, error => {
console.error('Response Error:', error);
return Promise.reject(error);
});

export default service;