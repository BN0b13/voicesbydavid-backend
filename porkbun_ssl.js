const axios = require('axios');
const fs = require('fs');
const { exec } = require('child_process');
require('dotenv').config();

const PORKBUN_API_KEY = process.env.PORKBUN_API_KEY;
const PORKBUN_API_SECRET = process.env.PORKBUN_API_SECRET;
const CERT_PATH = '/etc/ssl/certs/domain.cert.pem';
const KEY_PATH = '/etc/ssl/private/private.key.pem';
const site = 'voicesbydavid.com';

async function getSSLExpiryDate() {
  try {
    const stdout = await execPromise(`openssl x509 -enddate -noout -in ${CERT_PATH}`);
    console.log('GET SSL Expiry Date res:', stdout);

    if (!stdout || typeof stdout !== 'string') {
      throw new Error('Unexpected OpenSSL output format');
    }

    const expiryDateStr = stdout.split('=')[1]?.trim(); // Use optional chaining
    if (!expiryDateStr) {
      throw new Error('Could not extract expiry date');
    }

    const expiryDate = new Date(expiryDateStr + ' UTC'); // Ensure UTC parsing
    return expiryDate;
  } catch (error) {
    console.error('Error checking SSL expiry:', error);
    return null;
  }
}

function execPromise(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Command failed: ${command}\nError: ${error.message}`);
        reject(error);
      } else if (stderr) {
        console.error(`Command stderr: ${stderr}`);
        reject(stderr);
      } else {
        console.log(`Command stdout: ${stdout}`); // Log to confirm output
        resolve(stdout.trim()); // Ensure it resolves a trimmed string
      }
    });
  });
}

async function updateSSL() {
  const expiryDate = await getSSLExpiryDate();

  console.log('Formatted expiration date for SSL:', expiryDate);
  console.log('If statement check:', expiryDate && new Date() > expiryDate);

  if (expiryDate && new Date() > expiryDate) {
    console.log('SSL certificate is expired. Renewing now...');

    try {
      const response = await axios.post(`https://api.porkbun.com/api/json/v3/ssl/retrieve/${site}`, {
        apikey: PORKBUN_API_KEY,
        secretapikey: PORKBUN_API_SECRET,
      });      

      console.log('Porkbun API response:', response.data);

      if (response.data.status === 'SUCCESS') {
        console.log('SSL certificate retrieved successfully.');

        // Format certificate data
        const cert = response.data.certificatechain.replace(/\\n/g, '\n');
        const key = response.data.privatekey.replace(/\\n/g, '\n');

        // Write to respective files
        fs.writeFileSync('/etc/ssl/certs/domain.cert.pem', cert);
        fs.writeFileSync('/etc/ssl/private/private.key.pem', key);

        // Set proper file permissions
        exec(`sudo chmod 644 /etc/ssl/certs/domain.cert.pem && sudo chmod 600 /etc/ssl/private/private.key.pem`, (err) => {
          if (err) console.error('Failed to set permissions:', err);
          else console.log('Updated file permissions.');
        });

        // Reload NGINX
        exec('sudo nginx -s reload', (err) => {
          if (err) console.error('Failed to reload NGINX:', err);
          else console.log('NGINX reloaded successfully.');
        });
      } else {
        console.error('Error retrieving SSL certificate:', response.data.message);
      }
    } catch (error) {
      console.error('Error connecting to Porkbun API:', error.message);
    }
  } else {
    console.log('SSL certificate is still valid.');
  }
}

updateSSL();