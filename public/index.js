import "./js/components/nav.js";
import "./js/components/footer.js";
import "./js/api/api.js";

document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    offset: 230,
    duration: 1000,
  });
});

const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);

  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
};

const requestPermission = () => {
  if ("Notification" in window) {
    Notification.requestPermission().then((result) => {
      if (result === "denied") {
        return;
      } else if (result === "default") {
        return;
      }

      navigator.serviceWorker.ready.then(() => {
        if ("PushManager" in window) {
          navigator.serviceWorker.getRegistration().then((registration) => {
            registration.pushManager
              .subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                  "BB94Ey55ANnjYwIw0h-KE5jMQ6G24VBr_JI0ci4hIfqNhA88X86CQRy5PHiA3AtJPj3rSzQZddIRRXUYmsjD6MI"
                ),
              })
              .then((subscribe) => {
                console.log(
                  `Berhasil melakukan subscribe dengan endpoint : ${subscribe.endpoint}`
                );
                console.log(
                  `Berhasil melakukan subscribe dengan p256dh key : ${btoa(
                    String.fromCharCode.apply(
                      null,
                      new Uint8Array(subscribe.getKey("p256dh"))
                    )
                  )}`
                );
                console.log(
                  `Berhasil melakukan subscribe dengan auth key : ${btoa(
                    String.fromCharCode.apply(
                      null,
                      new Uint8Array(subscribe.getKey("auth"))
                    )
                  )}`
                );
              })
              .catch((err) => {
                console.error(
                  `Tidak dapat melakukan subscribe : ${err.message}`
                );
              });
          });
        }
      });
    });
  }
};

const registerServiceWorker = () => {
  return navigator.serviceWorker
    .register("/service-worker.js")
    .then((registration) => {
      return registration;
    })
    .catch((err) => {
      console.error(`Registrasi service worker gagal : ${err}`);
    });
};

if (!("serviceWorker" in navigator)) {
  console.log("Service worker tidak didukung browser ini.");
} else {
  registerServiceWorker();
  requestPermission();
}
