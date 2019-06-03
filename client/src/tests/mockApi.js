import axios from 'axios';

const loginData = {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJybHMiOiJvcGVyYXRvciIsImlkIjo1LCJpYXQiOjE1NTcxMDIwNzYsImV4cCI6MTU1NzE4ODQ3NiwicmZfZXhwIjoxNTU5Njk0MDc2LCJqdGkiOiJiMWRkNGY0ZS04M2YwLTQyZGMtYmM1Yi1hMDJmMzBiMzM2ZjcifQ.CPxPUwvHXIEQByP2tiZW77HYPClHF9GYIb9X1xvEwWA"
}

const response = data => ({ status: 200, data: { response: data } });

const mockApi = () => {
  axios.get.mockImplementation((url) => {
    if (url.includes('login')) {
      return Promise.resolve(response(loginData));
    }
    return Promise.reject();
  });
};

export default mockApi;
