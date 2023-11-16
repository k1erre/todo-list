const notesPopUp = (listOfIds, addNote, setCompleted, CONTAINER) => {
  for (const i in listOfIds) {
    setTimeout(() => {
      addNote(
        parseInt(listOfIds[i]),
        JSON.parse(localStorage[parseInt(listOfIds[i])]).note,
        CONTAINER
      );
      setCompleted(parseInt(listOfIds[i]), "onPageLoad");
    }, i * 250);
  }
};

const animateSideBar = (type = "in") => {
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

  const sideBar = document.querySelector(".header__sidebar"),
    animation = sideBar.animate(animationType[type][0], timing);

  animation.onfinish = () => {
    sideBar.style.transform = animationType[type][1];
  };
};

export { notesPopUp, animateSideBar };
