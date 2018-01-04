import axios from 'axios';
const auth = {
  isAuthenticated: false,
  authenticate(secret, cb) {
    this.isAuthenticated = true;
    console.log(secret);
    axios.get('/auth/login', {'secret':secret});
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

export default auth;
