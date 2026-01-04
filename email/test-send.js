import { sendVerificationEmail } from './emails.js';

sendVerificationEmail('rodrigodev.connect@gmail.com', '123456')
  .then(() => console.log('Email de verificación enviado'))
  .catch(console.error);
