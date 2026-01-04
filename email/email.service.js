import { mailgunClient } from './mailgun.client.js';

export async function sendEmail({ to, subject, html, text }) {
  return mailgunClient.messages.create(process.env.MAILGUN_DOMAIN, {
    from: process.env.MAILGUN_FROM,
    to,
    subject,
    html,
    text,
  });
}
