import axios from 'axios'

axios.defaults.baseURL = 'api'

let post = (path, data, auth = false) => {
    let body = {
        method: 'post',
        url: path,
        data: data
    }

    if (auth) {
        body = Object.assign(body, {auth: auth})
    }

    return new Promise((resolve, reject) => {
        axios(Object.assign(
            authRequest,
            body
        ))
        .then(response => {
            resolve(response)
        },err => {
            reject(err)
        })
    })
}

let get = (path, data) => {
    return new Promise((resolve, reject) => {
        axios(Object.assign(
            authRequest,
            {
                method: 'get',
                url: path,
                params: data
            }
        ))
        .then(response => {
            resolve(response)
        }, err => {
            reject(err)
        })
    })
}

// Auth request body
const authRequest = {
    headers: {
      'Authorization': 'Bearer ' + window.sessionStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    validateStatus: () => {
      return true
    },
}

const http = {
    post,
    get
}

export default http;