import axios from 'axios';

axios.defaults.baseURL = 'api';

// Auth request body
let authRequest = () => {
  return {
    headers: {
      Authorization: 'Bearer ' + window.sessionStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
    validateStatus: () => {
      return true
    },
  }
};

let post = (path, data) => {
  let body = {
    method: 'post',
    url: path,
    data: data
  };

  return new Promise((resolve, reject) => {
    axios(Object.assign(authRequest(), body)).then(
      (response) => {
        resolve(response);
      },
      (err) => {
        reject(err);
      }
    );
  });
};

let get = (path, data) => {
 Object.assign(authRequest(), {
    method: 'get',
    url: path,
    params: data
  })
  return new Promise((resolve, reject) => {
    axios(
      Object.assign(authRequest(), {
        method: 'get',
        url: path,
        params: data,
      })
    ).then(
      (response) => {
        resolve(response);
      },
      (err) => {
        reject(err);
      }
    );
  });
};

let del = (path) => {
    return new Promise((resolve, reject) => {
      axios(
        Object.assign(authRequest(), {
          method: 'delete',
          url: path,
        })
      ).then(
        (response) => {
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };
  let put = (path,data) => {
    return new Promise((resolve, reject) => {
      axios(
        Object.assign(authRequest(), {
          method: 'put',
          url: path, 
          data:data
        })
      ).then(
        (response) => {
          resolve(response); 
        },
        (err) => {
          reject(err);
        }
      );
    });
  };
const http = {
  post,
  get,
  del,
  put
};

export default http;
