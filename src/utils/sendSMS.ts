import Twilio from "twilio";

const twilioClient = Twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_TOKEN
);

// 1. 어떤 번호로든 어떤 본문과 함께 텍스트 메시지를 보내는 함수
export const sendSMS = (to:string, body: string) => {
    return twilioClient.messages.create({
        body,
        to,
        from: process.env.TWILIO_PHONE
    });
};

// 2. 1번 함수를 이용하여 정해진 key를 user에게 보내는 함수
export const sendVerificationSMS = (to: string, key: string) =>
    sendSMS(to, `Your verification key is: ${key}`);