import cron from 'node-cron';
import { exec } from 'child_process';

const ONE_DAY_MS = 24 * 60 * 60 * 1000; // 1 day in milliseconds

class Cron {
    backup() {
        cron.schedule('0 0 0 * * *', () => {
            console.log('Running job...', Date());
            exec('sh backup.sh',
            (error, stdout, stderr) => {
                console.log(stdout);
                console.log(stderr);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                }
            });
        });
    }

    async updateSSL() {
        const expiryDate = await getSSLExpiryDate();
      
        if (expiryDate && new Date() > new Date(expiryDate.getTime() - ONE_DAY_MS)) {
          console.log('SSL certificate will expire soon. Renewing now...');
          // Continue with the certificate renewal process
        } else {
          console.log('SSL certificate is still valid for more than a day.');
        }
    }
}

export default Cron;