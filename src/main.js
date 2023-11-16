import { animateSideBar } from "./modules/animations.js";
import {
  onPageLoad,
  addNote,
  deleteNote,
  startEdit,
  confirmEdit,
  setCompleted,
} from "./modules/utils.js";

const CONTAINER = document.querySelector(".note__container"),
  BUTTON = document.querySelector(".plus__button"),
  SIDEBAR_BUTTON = document.querySelector(".header__button");
let isSideBar = false;

BUTTON.addEventListener("click", () => {
  const uniqueId = new Date().getTime();

  const noteToWrite = {
    note: localStorage.length + 1 + ". ",
    isCompleted: false,
  };

  localStorage[uniqueId] = JSON.stringify(noteToWrite);
  addNote(uniqueId, localStorage.length + ". ", CONTAINER);
});

CONTAINER.addEventListener("click", (event) => {
  const id = event.target.classList[event.target.classList.length - 1],
    noteWrapper = document.getElementById(id),
    targetClass = event.target.className;

  if (
    targetClass.includes("note__button delete") ||
    targetClass.includes("fa-solid fa-trash")
  ) {
    noteWrapper.classList.remove("in");
    noteWrapper.classList.add("out");
    setTimeout(() => deleteNote(parseInt(id), noteWrapper), 500);
  }

  if (
    targetClass.includes("note__button edit") ||
    targetClass.includes("fa-pen")
  ) {
    startEdit(id, noteWrapper, event.target);
  }

  if (
    targetClass.includes("note__button confirm") ||
    targetClass.includes("fa-check")
  ) {
    confirmEdit(id, noteWrapper, event.target);
  }

  targetClass.includes("note__checkbox") && setCompleted(id, event.target);
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

onPageLoad(addNote, CONTAINER);
