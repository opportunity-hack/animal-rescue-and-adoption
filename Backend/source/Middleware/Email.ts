import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { CouldNotSendEmail } from '../../library/Errors/External';
import { Globals } from '../../library/Globals/Globals';

export class Email {
  public static async send(
    to: string,
    options: Mail.Options
  ): Promise<SMTPTransport.SentMessageInfo> {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: Globals.V_EMAIL,
          pass: Globals.V_PASSWORD
        }
      });

      const mailOptions: Mail.Options = {
        from: `Skillify <${Globals.V_EMAIL}>`,
        to,
        ...options
      };

      return await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Email sending error:', error);
      throw new CouldNotSendEmail(`Error sending email to ${to}`);
    }
  }

  public static async sendVerificationCode(
    to: string,
    subject: string,
    code: number
  ): Promise<void> {
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #ffffff;">
        <h2 style="color: #333333;">Your Verification Code</h2>
        <p style="font-size: 18px; color: #555555;">${sanitize(code.toString())}</p>
        <p style="font-size: 14px; color: #777777;">This code is valid for your most recent verification request.</p>
      </div>
    `;

    const mailOptions: Mail.Options = { subject, html };

    await Email.send(to, mailOptions);
  }
}

/**
 * Sanitizes input to prevent HTML injection.
 * @param input - The input string to sanitize.
 * @returns The sanitized string.
 */
function sanitize(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
