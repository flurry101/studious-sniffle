import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGIN_FILE = path.join(__dirname, 'logins.json');
const SIGNUP_FILE = path.join(__dirname, 'signups.json');

const initializeFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
  }
};

// Save login credentials
export const saveLogin = (loginData) => {
  try {
    initializeFile(LOGIN_FILE);
    const logins = JSON.parse(fs.readFileSync(LOGIN_FILE, 'utf-8'));
    logins.push(loginData);
    fs.writeFileSync(LOGIN_FILE, JSON.stringify(logins, null, 2));
    console.log('✅ Login data saved successfully');
    return true;
  } catch (error) {
    console.error('❌ Error saving login data:', error);
    return false;
  }
};

// Save signup credentials
export const saveSignup = (signupData) => {
  try {
    initializeFile(SIGNUP_FILE);
    const signups = JSON.parse(fs.readFileSync(SIGNUP_FILE, 'utf-8'));
    signups.push(signupData);
    fs.writeFileSync(SIGNUP_FILE, JSON.stringify(signups, null, 2));
    console.log('✅ Signup data saved successfully');
    return true;
  } catch (error) {
    console.error('❌ Error saving signup data:', error);
    return false;
  }
};

// Get all logins
export const getLogins = () => {
  try {
    initializeFile(LOGIN_FILE);
    return JSON.parse(fs.readFileSync(LOGIN_FILE, 'utf-8'));
  } catch (error) {
    console.error('❌ Error reading logins:', error);
    return [];
  }
};

// Get all signups
export const getSignups = () => {
  try {
    initializeFile(SIGNUP_FILE);
    return JSON.parse(fs.readFileSync(SIGNUP_FILE, 'utf-8'));
  } catch (error) {
    console.error('❌ Error reading signups:', error);
    return [];
  }
};
