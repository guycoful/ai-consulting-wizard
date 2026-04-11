import nodemailer from 'nodemailer';

const FROM_NAME = 'Guy Cohen';
const FROM_EMAIL = 'info@guycohen-ai.co.il';

function createTransporter(): nodemailer.Transporter {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER || FROM_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

async function sendBookingConfirmation(
  toEmail: string,
  toName: string,
  date: string,
  time: string
): Promise<void> {
  const transporter = createTransporter();

  const html = `
    <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.8; color: #333;">
      <h2 style="color: #1a1a2e;">אישור פגישה עם Guy Cohen</h2>
      <p>שלום ${toName},</p>
      <p>הפגישה שלך אושרה בהצלחה!</p>
      <table style="border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px 16px; font-weight: bold;">תאריך:</td>
          <td style="padding: 8px 16px;">${date}</td>
        </tr>
        <tr>
          <td style="padding: 8px 16px; font-weight: bold;">שעה:</td>
          <td style="padding: 8px 16px;">${time}</td>
        </tr>
      </table>
      <p>נדבר בזום, הקישור ישלח לפני הפגישה.</p>
      <p>אם צריך לבטל או לשנות - פשוט תחזור אליי.</p>
      <br/>
      <p>גיא כהן</p>
      <p style="color: #666; font-size: 14px;">Guy Cohen - AI Consulting</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to: toEmail,
    subject: 'אישור פגישה עם Guy Cohen',
    html,
  });
}

async function sendOwnerNotification(
  bookerName: string,
  bookerEmail: string,
  date: string,
  time: string
): Promise<void> {
  const transporter = createTransporter();

  const html = `
    <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.8; color: #333;">
      <h2 style="color: #1a1a2e;">פגישה חדשה נקבעה!</h2>
      <table style="border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px 16px; font-weight: bold;">שם:</td>
          <td style="padding: 8px 16px;">${bookerName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 16px; font-weight: bold;">אימייל:</td>
          <td style="padding: 8px 16px;"><a href="mailto:${bookerEmail}">${bookerEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 16px; font-weight: bold;">תאריך:</td>
          <td style="padding: 8px 16px;">${date}</td>
        </tr>
        <tr>
          <td style="padding: 8px 16px; font-weight: bold;">שעה:</td>
          <td style="padding: 8px 16px;">${time}</td>
        </tr>
      </table>
    </div>
  `;

  await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to: process.env.GMAIL_USER || FROM_EMAIL,
    subject: `פגישה חדשה: ${bookerName} - ${date} ${time}`,
    html,
  });
}

async function sendCancellationNotice(
  toEmail: string,
  toName: string,
  date: string,
  time: string
): Promise<void> {
  const transporter = createTransporter();

  const html = `
    <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.8; color: #333;">
      <h2 style="color: #1a1a2e;">הפגישה בוטלה</h2>
      <p>שלום ${toName},</p>
      <p>הפגישה שהיתה מתוכננת בוטלה:</p>
      <table style="border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px 16px; font-weight: bold;">תאריך:</td>
          <td style="padding: 8px 16px;">${date}</td>
        </tr>
        <tr>
          <td style="padding: 8px 16px; font-weight: bold;">שעה:</td>
          <td style="padding: 8px 16px;">${time}</td>
        </tr>
      </table>
      <p>אם תרצה לקבוע פגישה חדשה, אתה מוזמן לעשות את זה דרך האתר.</p>
      <br/>
      <p>גיא כהן</p>
      <p style="color: #666; font-size: 14px;">Guy Cohen - AI Consulting</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to: toEmail,
    subject: 'הפגישה בוטלה',
    html,
  });
}

export {
  sendBookingConfirmation,
  sendOwnerNotification,
  sendCancellationNotice,
};
