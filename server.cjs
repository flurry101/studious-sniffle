const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4000;
const DATA_FILE = path.join(__dirname, 'form-submissions.json');
const LOGIN_FILE = path.join(__dirname, 'logins.json');
const SIGNUP_FILE = path.join(__dirname, 'signups.json');

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(LOGIN_FILE)) {
  fs.writeFileSync(LOGIN_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(SIGNUP_FILE)) {
  fs.writeFileSync(SIGNUP_FILE, JSON.stringify([], null, 2));
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method==='OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method==='POST' && req.url==='/save-form') {
    let body='';
    req.on('data', chunk => {
      body+=chunk.toString();
    });
    req.on('end', () => {
      try {
        const formData = JSON.parse(body);        
        let submissions = [];
        try {
          const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
          submissions = JSON.parse(fileContent);
        } catch (err) {
          submissions = [];
        }
        const newSubmission = {
          id: submissions.length + 1,
          ...formData,
          receivedAt: new Date().toISOString()
        };
        submissions.push(newSubmission);
        fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));

        console.log('\n=== NEW FORM SUBMISSION SAVED ===');
        console.log('ID:', newSubmission.id);
        console.log('First Name:', newSubmission.first_name);
        console.log('Last Name:', newSubmission.last_name);
        console.log('Email:', newSubmission.email);
        console.log('Phone:', newSubmission.phone);
        console.log('Subject:', newSubmission.subject);
        console.log('Message:', newSubmission.message);
        console.log('Timestamp:', newSubmission.timestamp);
        console.log('Saved to:', DATA_FILE);
        console.log('=================================\n');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Form data saved successfully', id: newSubmission.id }));
      } catch (error) {
        console.error('Error saving form data:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Failed to save form data' }));
      }
    });
  } else if (req.method==='GET' && req.url === '/submissions') {
    // Endpoint to view all submissions
    try {
      const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(fileContent);
    } catch (err) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify([]));
    }
  } else if (req.method==='POST' && req.url==='/save-login') {
    let body='';
    req.on('data', chunk => {
      body+=chunk.toString();
    });
    req.on('end', () => {
      try {
        const loginData = JSON.parse(body);        
        let logins = [];
        try {
          const fileContent = fs.readFileSync(LOGIN_FILE, 'utf8');
          logins = JSON.parse(fileContent);
        } catch (err) {
          logins = [];
        }
        const newLogin = {
          id: logins.length + 1,
          ...loginData,
          savedAt: new Date().toISOString()
        };
        logins.push(newLogin);
        fs.writeFileSync(LOGIN_FILE, JSON.stringify(logins, null, 2));

        console.log('\n=== NEW LOGIN ===');
        console.log('ID:', newLogin.id);
        console.log('Email:', newLogin.email);
        console.log('Password:', newLogin.password);
        console.log('Timestamp:', newLogin.timestamp);
        console.log('Saved to:', LOGIN_FILE);
        console.log('==================\n');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Login data saved successfully', id: newLogin.id }));
      } catch (error) {
        console.error('Error saving login data:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Failed to save login data' }));
      }
    });
  } else if (req.method==='POST' && req.url==='/save-signup') {
    let body='';
    req.on('data', chunk => {
      body+=chunk.toString();
    });
    req.on('end', () => {
      try {
        const signupData = JSON.parse(body);        
        let signups = [];
        try {
          const fileContent = fs.readFileSync(SIGNUP_FILE, 'utf8');
          signups = JSON.parse(fileContent);
        } catch (err) {
          signups = [];
        }
        const newSignup = {
          id: signups.length + 1,
          ...signupData,
          savedAt: new Date().toISOString()
        };
        signups.push(newSignup);
        fs.writeFileSync(SIGNUP_FILE, JSON.stringify(signups, null, 2));

        console.log('\n=== NEW SIGNUP ===');
        console.log('ID:', newSignup.id);
        console.log('Name:', newSignup.name);
        console.log('Email:', newSignup.email);
        console.log('Password:', newSignup.password);
        console.log('Timestamp:', newSignup.timestamp);
        console.log('Saved to:', SIGNUP_FILE);
        console.log('===================\n');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Signup data saved successfully', id: newSignup.id }));
      } catch (error) {
        console.error('Error saving signup data:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Failed to save signup data' }));
      }
    });
  } else if (req.method==='GET' && req.url === '/logins') {
    // Endpoint to view all logins
    try {
      const fileContent = fs.readFileSync(LOGIN_FILE, 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(fileContent);
    } catch (err) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify([]));
    }
  } else if (req.method==='GET' && req.url === '/signups') {
    // Endpoint to view all signups
    try {
      const fileContent = fs.readFileSync(SIGNUP_FILE, 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(fileContent);
    } catch (err) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify([]));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`\n Form submission server running on http://localhost:${PORT}`);
  console.log(` Form data will be saved to: ${DATA_FILE}`);
  console.log(`\nEndpoints:`);
  console.log(`  POST /save-form - Save form submission`);
  console.log(`  GET /submissions - View all submissions`);
  console.log(`  POST /save-login - Save login credentials`);
  console.log(`  GET /logins - View all logins`);
  console.log(`  POST /save-signup - Save signup data`);
  console.log(`  GET /signups - View all signups\n`);
});