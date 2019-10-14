const initNavigation = () => {
  document.addEventListener("keydown", e => {
    console.log(e.keyCode)
    switch (e.keyCode) {
      case 49:
        document.getElementById("0").style.background = "red";
    }
  });

  document.addEventListener("keyup", e => {
    switch (e.keyCode) {
      case 49:
        document.getElementById("0").style.background = "purple";
    }
  });
};

export default initNavigation;
