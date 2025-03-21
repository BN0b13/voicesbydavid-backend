import cron from 'node-cron';
import { exec } from 'child_process';

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

    sslRenewal() {
        cron.schedule('0 0 * * *', () => {
          console.log('Checking SSL certificate status...', new Date());
          exec('node ../porkbun_ssl.cjs', (error, stdout, stderr) => {
            console.log(stdout, stderr);
            if (error) console.log(`exec error: ${error}`);
          });
        });
    }
}

export default Cron;