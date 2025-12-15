const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4000;
const DATA_FILE = path.join(__dirname, 'form-submissions.json');

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
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
  console.log(`  GET /submissions - View all submissions\n`);
});