import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
    apiKey: process.env.MAILGUN_API_KEY || '',
    domain: "sandboxb4fe6b853bd84d81ab50a5b68836478a.mailgun.org"
});