import axios from 'axios';
const auth = {
  authenticated: false,
  async updateAuthentication() {
    // const getAuth = () => (new Promise(resolve => {
    //   axios.get('/auth/authenticated').then((res) => {
    //     resolve(res.data.authenticated);
    //   });
    // }));
    const res = await axios.get('auth/authenticated');
    console.log(res.data.authenticated);
    this.authenticated = res.data.authenticated;

    return res.data.authenticated;
  }, // Set to true in development
  username: '',
  authenticate(user, secret, cb) {
    axios.post('/auth/login', {username: user, loginSecret: secret})
      .then((res) => {
        console.log(res);
        this.username = user;
        this.isAuthenticated = true;
        cb(true);
      }).catch((res) => {cb(false)});
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}


export default auth;
// isAuthenticated() {
//   axios.get('/auth/isAuthenticated')
//     .then(
//       ()
//     ).catch(
//
//     );
// },
