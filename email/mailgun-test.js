import 'dotenv/config';
import { sendEmail } from './email.service.js';

sendEmail({
  to: ['rodrigodev.connect@gmail.com'],
  subject: 'Mailgun service test',
  text: 'Este email se envió usando email.service.js',
});
