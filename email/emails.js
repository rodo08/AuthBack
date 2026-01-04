import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from './emailTemplates.js';

import { sendEmail } from './email.service.js';

export async function sendVerificationEmail(email, token) {
  return sendEmail({
    to: email,
    subject: 'Verify your email',
    html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', token),
    text: `Your verification code is: ${token}`,
  });
}

export async function sendPasswordResetEmail(email, resetUrl) {
  return sendEmail({
    to: email,
    subject: 'Reset your password',
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetUrl),
    text: `Reset your password here: ${resetUrl}`,
  });
}

export async function sendResetSuccessEmail(email) {
  return sendEmail({
    to: email,
    subject: 'Password reset successful',
    html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    text: 'Your password has been successfully reset.',
  });
}

export async function sendWelcomeEmail(email, name) {
  const html = `<p>Hello ${name}, welcome to our app!</p>`; // opcional: puedes crear un template real
  return sendEmail({
    to: email,
    subject: 'Welcome to the app',
    html,
    text: `Hello ${name}, welcome to our app!`,
  });
}
