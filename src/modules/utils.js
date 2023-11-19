import { notesPopUp } from "./animations.js";

const addNote = (id, content, CONTAINER) => {
  const noteWrapper = document.createElement("div"),
    checkBoxAndLabelWrapper = document.createElement("div"),
    note = document.createElement("input"),
    label = document.createElement("span"),
    buttonWrapper = document.createElement("div"),
    editNote = document.createElement("button"),
    deleteNote = document.createElement("button");

  noteWrapper.id = id;
  noteWrapper.classList.add("note__wrapper", "in");

  checkBoxAndLabelWrapper.className = "checkbox-and-label__wrapper";

  note.type = "checkbox";
  note.classList.add("note__checkbox", id);

  label.innerText = content;
  label.className = "note__label";
  label.style.userSelect = "none";

  buttonWrapper.className = "button__wrapper";

  editNote.innerHTML = '<i class="fa-solid fa-pen"></i>';
  editNote.classList.add("note__button", "edit", id);

  deleteNote.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteNote.classList.add("note__button", "delete", id);

  checkBoxAndLabelWrapper.append(note, label);
  buttonWrapper.append(editNote, deleteNote);

  noteWrapper.append(checkBoxAndLabelWrapper, buttonWrapper);
  CONTAINER.appendChild(noteWrapper);

  const trash = noteWrapper.querySelector(".fa-trash");
  trash.classList.add(id);

  const pen = noteWrapper.querySelector(".fa-pen");
  pen.classList.add(id);
};

const deleteNote = (id) => {
  const noteToDelete = document.getElementById(id);
  noteToDelete.remove();
  delete localStorage[id];
};

const startEdit = (id, noteWrapper, target) => {
  const checkBoxAndLabelWrapper = noteWrapper.querySelector(
      ".checkbox-and-label__wrapper"
    ),
    buttonWrapper = noteWrapper.querySelector(".button__wrapper"),
    editNoteInput = document.createElement("input"),
    confirmEdit = document.createElement("button"),
    label = checkBoxAndLabelWrapper.querySelector(".note__label");

  if (target === noteWrapper.querySelector(".fa-pen")) {
    target = noteWrapper.querySelector(".note__button", ".edit");
  }

  editNoteInput.classList.add("note__input_edit", id);
  editNoteInput.value = label.innerText;

  confirmEdit.classList.add("note__button", "confirm", id);
  confirmEdit.innerHTML = '<i class="fa-solid fa-check"></i>';

  label.remove();
  checkBoxAndLabelWrapper.appendChild(editNoteInput);
  buttonWrapper.insertBefore(confirmEdit, target);
  target.remove();

  const check = noteWrapper.querySelector(".fa-check");
  check.classList.add(id);
};

const confirmEdit = (id, noteWrapper, target) => {
  const checkBoxAndLabelWrapper = noteWrapper.querySelector(
      ".checkbox-and-label__wrapper"
    ),
    buttonWrapper = noteWrapper.querySelector(".button__wrapper"),
    editNote = document.createElement("button"),
    deleteNote = buttonWrapper.querySelector(".delete"),
    label = document.createElement("span"),
    editNoteInput = noteWrapper.querySelector(".note__input_edit");

  const content = {
    note: editNoteInput.value,
    isCompleted: JSON.parse(localStorage[id]).isCompleted,
  };

  if (target === noteWrapper.querySelector(".fa-check")) {
    target = noteWrapper.querySelector(".note__button", ".confirm");
  }

  editNote.innerHTML = '<i class="fa-solid fa-pen"></i>';
  editNote.classList.add("note__button", "edit", id);

  label.innerText = content.note;
  label.className = "note__label";

  checkBoxAndLabelWrapper.appendChild(label);
  buttonWrapper.insertBefore(editNote, deleteNote);
  buttonWrapper.removeChild(target);
  checkBoxAndLabelWrapper.removeChild(editNoteInput);

  const pen = noteWrapper.querySelector(".fa-pen");
  pen.classList.add(id);

  localStorage[id] = JSON.stringify(content);
};

const setCompleted = (id, target) => {
  const noteInStorage = JSON.parse(localStorage[id]);

  if (target === "onPageLoad") {
    const checkbox = document
      .getElementById(id)
      .querySelector(".note__checkbox");
    if (noteInStorage.isCompleted) checkbox.checked = true;
    return;
  }

  if (target.className.includes("note__checkbox")) {
    noteInStorage.isCompleted = !noteInStorage.isCompleted;
  }

  localStorage[id] = JSON.stringify(noteInStorage);
};

const parseTodos = (CONTAINER) => {
  if (localStorage.length) {
    const listOfIds = [];

    for (const i in localStorage) {
      localStorage.getItem(i) && listOfIds.push(i);
    }

    listOfIds.sort((a, b) => a - b);

    notesPopUp(listOfIds, addNote, setCompleted, CONTAINER);
  }
};

export {
  addNote,
  deleteNote,
  startEdit,
  confirmEdit,
  parseTodos,
  setCompleted,
};
