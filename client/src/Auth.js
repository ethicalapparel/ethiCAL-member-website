import axios from 'axios';
const auth = {
  isAuthenticated: false,
  authenticate(secret, cb) {
    axios.post('/auth/login', {loginSecret: secret})
      .then(() => (this.isAuthenticated=true));
    cb(this.isAuthenticated)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

export default auth;
