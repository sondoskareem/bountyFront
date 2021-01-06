// import Axios from 'axios';
// // import router from '../router';

// const base = Axios.create({
//   baseURL: 'http://api.clothes.srit.me',
//   timeout: 30000,
// });

// base.interceptors.request.use(function(config) {
//   const token = window.localStorage.getItem('__token');
//   if (token) config.headers['Authorization'] = 'Bearer '+ token;
//   return config;
// });

// base.interceptors.response.use(
//   function(response) {
//     return response;
//   },
//   function(error) {
//     const { status } = error.response;
//     if (status === 401 || status === 403) {
//       window.localStorage.removeItem('__token');
//       router.push('Login');
//     }
//     return Promise.reject(error);
//   }
// );

// export default base;