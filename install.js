let deferredInstallPrompt = null;

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  deferredInstallPrompt = event;

  const button = document.querySelector("#install-app");

  if (button) {
    button.hidden = false;
  }
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;

  const button = document.querySelector("#install-app");

  if (button) {
    button.hidden = true;
  }
});

document.addEventListener("click", async event => {
  const button = event.target.closest("#install-app");

  if (!button || !deferredInstallPrompt) return;

  deferredInstallPrompt.prompt();

  await deferredInstallPrompt.userChoice;

  deferredInstallPrompt = null;
  button.hidden = true;
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js", {
      scope: "./"
    });
  });
}
