const Toast = (function () {
  // Bootstrap gives a toast the same classes (.show.showing) while it shows and while it hides,
  // so mark the hide for the slide-out in _toast.scss. Document level, so it also covers toasts not shown through Show
  document.addEventListener("hide.bs.toast", (event) => {
    if (!event.defaultPrevented) event.target.classList.add("hiding");
  });
  document.addEventListener("show.bs.toast", (event) => event.target.classList.remove("hiding"));
  document.addEventListener("hidden.bs.toast", (event) => event.target.classList.remove("hiding"));

  return {
    // Moves a rendered .toast into its region, shows it and removes it once hidden
    Show: function (toastElement, options = {}) {
      const { placement = "bottom", delay = 5000 } = options;
      document.querySelector(`[data-swift-toast-region="${placement === "top" ? "top" : "bottom"}"]`)?.appendChild(toastElement);
      toastElement.addEventListener("hidden.bs.toast", () => toastElement.remove(), { once: true });

      const toast = window.bootstrap.Toast.getOrCreateInstance(toastElement, { delay: delay });
      toast.show();
      return toast;
    },
  };
})();

export { Toast };
