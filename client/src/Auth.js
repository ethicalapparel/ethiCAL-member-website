import axios from 'axios';
const auth = {
  authenticated: false,
  knowAuth: false,
  updateAuthentication(cb) {
      axios.get('auth/authenticated')
        .then((res) => {
          this.authenticated = res.data.authenticated;
          if (this.authenticated) {
            this.username = res.data.name,
            this.id = res.data.id
          }
          this.knowAuth = true;
          cb();
        });
    // return res.data.authenticated;
  }, // Set to true in development
  username: '',
  authenticate(user, secret, cb) {
    axios.post('/auth/login', {username: user, loginSecret: secret})
      .then((res) => {
        this.updateAuthentication(cb);
      })
      .catch((err) => {
        this.updateAuthentication(cb);
      });
  },
  signout(cb) {
    this.authenticated = false
    setTimeout(cb, 100)
  }
}


export default auth;
