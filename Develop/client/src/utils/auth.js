const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('./auth');
const decode = require('jwt-decode');

const authMiddleware = async (req) => {
  let token = req.body.token || req.query.token || req.headers.authorization;
  
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const decoded = decode(token);

    req.user = await User.findById(decoded.sub);
  } catch (err) {
    throw new AuthenticationError('Invalid token');
  }

  return req;
}

class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken());
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

module.exports = {
  authMiddleware,
  AuthService: new AuthService()
};