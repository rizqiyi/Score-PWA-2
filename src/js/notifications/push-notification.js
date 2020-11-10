const webPush = require("web-push");
const vapidKeys = {
  publicKey:
    "BB94Ey55ANnjYwIw0h-KE5jMQ6G24VBr_JI0ci4hIfqNhA88X86CQRy5PHiA3AtJPj3rSzQZddIRRXUYmsjD6MI",
  privateKey: "cFCaHvarQq9058-x_H98Hn-Fju0NXu7gt5K_1a3HyQs",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/cPeJc4NTNpc:APA91bHLlPr20RWtRHT3ZpkSLRosHVETSxmI4W3WBk3oxTOHRg7sCWxU572X10ZUObTZ1bSbSbP3weMejv3F_nd_f4y_AMxu9Ejg4qi6ARryI6GoqiJBoh3OVSU2ufripg9Fwbw0etFT",
  keys: {
    p256dh:
      "BBwjYmXvJ7w32AVV3ba8KAolVHBqSCqozvs7pAGGSImyzdBQ2dz1xuprNAWQwk7N1mvWUvLwb2Z20GDdA/ewsI4=",
    auth: "uk/lnuRZOEIchSyC6K+B4Q==",
  },
};

const payload = "Selamat! Aplikasi anda sudah dapat menerima push notification";

const options = {
  gcmAPIKey: "777362820309",
  TTL: 60,
};

webPush.sendNotification(pushSubscription, payload, options);
