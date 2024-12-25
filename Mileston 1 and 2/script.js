document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.toggle');
    var subdiv = document.querySelector('.stoggle');
    var iconShow = document.querySelector('.icon-show');
    var iconHide = document.querySelector('.icon-hide');
    if (toggle && subdiv && iconShow && iconHide) {
        toggle.addEventListener('click', function () {
            if (subdiv instanceof HTMLElement && iconShow instanceof HTMLElement && iconHide instanceof HTMLElement) {
                if (subdiv.style.display === 'none') {
                    subdiv.style.display = 'block'; // Show content
                    iconShow.style.display = 'none'; // Hide ▽
                    iconHide.style.display = 'inline'; // Show △
                }
                else {
                    subdiv.style.display = 'none'; // Hide content
                    iconShow.style.display = 'inline'; // Show ▽
                    iconHide.style.display = 'none'; // Hide △
                }
            }
        });
    }
});
