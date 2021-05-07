import { createTransport } from "nodemailer";

export async function sendMail(args) {
  let transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "imsmilingboy@gmail.com",
      pass: "razz#1206",
    },
  });
  let info = await transporter.sendMail({
    from: args.mailDetails.from,
    to: args.mailDetails.to,
    subject: args.mailDetails.subject,
    html: args.mailDetails.message,
  });
  let response = {
    message: info.messageId ? "Mail send successfully" : "Mail not send",
  };
  return response;
}
export default { sendMail };
