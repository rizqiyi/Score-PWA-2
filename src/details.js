import "./js/data/loadDetailPage.js";
import "./js/components/footer.js";
import { clickedButton } from "./js/api/getDetails.js";

document.addEventListener("DOMContentLoaded", clickedButton);

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
}
