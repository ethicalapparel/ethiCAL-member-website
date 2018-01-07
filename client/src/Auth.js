import axios from 'axios';
const auth = {
  isAuthenticated: false,
  authenticate(secret, cb) {
    //this.isAuthenticated = true;
    axios.post('/auth/login', {loginSecret: secret})
      .then((response) => (this.isAuthenticated=true));
    setTimeout(() => cb(this.isAuthenticated), 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

export default auth;
