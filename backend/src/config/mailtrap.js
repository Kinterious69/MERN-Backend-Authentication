import { MailtrapClient }  from "mailtrap"

const TOKEN = "5f536757c161fbce2f68289caa3e6ba0";

export const client = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};
export const recipients = [
  {
    email: "sulaymankinteh918@gmail.com",
  }
];

