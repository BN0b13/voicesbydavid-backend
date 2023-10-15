import axios from 'axios';

import 'dotenv/config';

const ReCaptchaCheck = async (recaptchaToken) => {
  try {
    
    const res = await axios.post('https://www.google.com/recaptcha/api/siteverify', {
      secret: process.env.RECAPTCHA_SECRET,
      response: recaptchaToken
    });

    return res.status;
  } catch (err) {
    console.log({
      ReCaptchaError: err,
      ReCaptchaErrorMsg: err.message
    });
  }
}

export default ReCaptchaCheck;