const onPageLoad = (addNote, setCompleted, CONTAINER) => {
  if (localStorage.length !== 0) {
    const listOfIds = [];

    for (const i in localStorage) {
      if (localStorage.getItem(i)) {
        listOfIds.push(i);
      }
    }

    listOfIds.sort((a, b) => a - b);

    for (let i = 0; i < listOfIds.length; i++) {
      setTimeout(
        () =>
          addNote(
            parseInt(listOfIds[i]),
            JSON.parse(localStorage[parseInt(listOfIds[i])]).note,
            CONTAINER
          ),
        i * 250
      );
      setTimeout(
        () => setCompleted(parseInt(listOfIds[i]), "onPageLoad"),
        i * 250
      );
    }
  }
};

const animateSideBar = (type = "in") => {
  const sideBar = document.querySelector(".header__sidebar");

  const animationType = {
    in: [
      [{ transform: "translate(0, 0)" }, { transform: "translate(200%, 0)" }],
      "translate(200%, 0)",
    ],
    out: [
      [{ transform: "translate(200%, 0)" }, { transform: "translate(0, 0)" }],
      "translate(0, 0)",
    ],
  };

  const timing = {
    duration: 500,
    iterations: 1,
  };

  const animation = sideBar.animate(animationType[type][0], timing);

  animation.onfinish = () => {
    sideBar.style.transform = animationType[type][1];
  };
};

export { onPageLoad, animateSideBar };
