const Scroll = (function () {
  
  return {

    setContentPosition() {
      var headerHeight = 100;
      document.querySelectorAll(".page-header").forEach((header) => {
        /*The invisible header is 0*/
        headerHeight += header.offsetHeight;
      });

      document.documentElement.style.setProperty(
        "--header-height",
        headerHeight + "px"
      );
    },
  };
})();

export { Scroll };
