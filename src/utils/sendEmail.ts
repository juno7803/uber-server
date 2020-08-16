import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
    apiKey: process.env.MAILGUN_API_KEY || '',
    domain: "sandboxb4fe6b853bd84d81ab50a5b68836478a.mailgun.org"
});

const sendEmail = (subject:string,html:string)=>{
    const emailData = {
        from: "junolee7803@gmail.com",
        to: "junolee7803@gmail.com",
        subject,
        html
    }
    return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName:string, key: string)=>{
    const emailSubject = `Hello! ${fullName}, please verify your email`;
    const emailBody = `Verify your email email by clicking <a href="github.com/juno7803/${key}">here`;
    return sendEmail(emailSubject,emailBody);
}