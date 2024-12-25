document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".toggle");
  const subdiv = document.querySelector(".stoggle");
  const iconShow = document.querySelector(".icon-show");
  const iconHide = document.querySelector(".icon-hide");

  if (toggle && subdiv && iconShow && iconHide) {
    toggle.addEventListener("click", () => {
      if (
        subdiv instanceof HTMLElement &&
        iconShow instanceof HTMLElement &&
        iconHide instanceof HTMLElement
      ) {
        if (subdiv.style.display === "none") {
          subdiv.style.display = "block";
          iconShow.style.display = "none";
          iconHide.style.display = "inline";
        } else {
          subdiv.style.display = "none";
          iconShow.style.display = "inline";
          iconHide.style.display = "none";
        }
      }
    });
  }
});
