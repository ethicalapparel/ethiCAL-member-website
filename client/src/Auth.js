import axios from 'axios';
const auth = {
  isAuthenticated: false, // Set to true in development
  username: '',
  authenticate(user, secret, cb) {
    axios.post('/auth/login', {loginSecret: secret})
      .then(() => {
        this.isAuthenticated=true;
        this.username = user
        cb(this.isAuthenticated);
      });
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

export default auth;
