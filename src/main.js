import { onPageLoad, animateSideBar } from "./modules/animations.js";
import {
  addNote,
  deleteNote,
  startEdit,
  confirmEdit,
  setCompleted,
} from "./modules/utils.js";

const CONTAINER = document.querySelector(".note__container");
const BUTTON = document.querySelector(".plus__button");
const SIDEBAR_BUTTON = document.querySelector(".header__button");
let isSideBar = false;

BUTTON.addEventListener("click", () => {
  const date = new Date();
  const uniqueId = date.getTime();
  const noteToWrite = {
    note: localStorage.length + 1 + ". ",
    isCompleted: false,
  };

  localStorage[uniqueId] = JSON.stringify(noteToWrite);
  addNote(uniqueId, localStorage.length + ". ", CONTAINER);
});

CONTAINER.addEventListener("click", (event) => {
  const id = event.target.classList[event.target.classList.length - 1];
  const noteWrapper = document.getElementById(id);

  if (
    event.target.className.includes("note__button delete") ||
    event.target.className.includes("fa-solid fa-trash")
  ) {
    noteWrapper.classList.remove("in");
    noteWrapper.classList.add("out");
    setTimeout(() => deleteNote(parseInt(id), noteWrapper), 500);
  }

  if (
    event.target.className.includes("note__button edit") ||
    event.target.className.includes("fa-pen")
  ) {
    startEdit(id, noteWrapper, event.target);
  }

  if (
    event.target.className.includes("note__button confirm") ||
    event.target.className.includes("fa-check")
  ) {
    confirmEdit(id, noteWrapper, event.target);
  }

  if (event.target.className.includes("note__checkbox")) {
    setCompleted(id, event.target);
  }
});

SIDEBAR_BUTTON.addEventListener("click", (event) => {
  event.stopPropagation();

  animateSideBar("in");
  isSideBar = true;
});

document.body.addEventListener("click", (event) => {
  if (isSideBar && !event.target.className.includes("sidebar")) {
    animateSideBar("out");
    isSideBar = false;
  }
});

onPageLoad(addNote, setCompleted, CONTAINER);
