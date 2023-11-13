const CONTAINER = document.querySelector(".note__container");
const BUTTON = document.querySelector("button");
const INPUT = document.querySelector(".note__input");

const addNote = (id, content) => {
  const noteWrapper = document.createElement("div");
  const note = document.createElement("input");
  const label = document.createElement("span");
  const editNote = document.createElement("button");
  const deleteNote = document.createElement("button");

  noteWrapper.id = id;
  noteWrapper.className = "note__wrapper";
  note.type = "checkbox";
  note.classList.add(id);
  note.classList.add("note__checkbox");
  label.innerText = content;
  label.className = "note__label";
  editNote.innerText = "E";
  editNote.className = "note__button_edit";
  editNote.classList.add(id);
  deleteNote.innerText = "X";
  deleteNote.className = "note__button_delete";
  deleteNote.classList.add(id);

  noteWrapper.append(note, label, editNote, deleteNote);
  CONTAINER.appendChild(noteWrapper);
};

const writeStorage = (id, content) => {
  localStorage[id] = content;
};

const deleteNote = (id) => {
  const noteToDelete = document.getElementById(id);
  noteToDelete.remove();
  delete localStorage[id];
};

const startEdit = (id, noteWrapper, target) => {
  const editNoteInput = document.createElement("input");
  const confirmEdit = document.createElement("button");
  const label = noteWrapper.querySelector(".note__label");
  editNoteInput.classList.add("note__input_edit");
  editNoteInput.classList.add(id);
  editNoteInput.value = label.innerText;
  confirmEdit.classList.add("note__button_confirm");
  confirmEdit.classList.add(id);
  confirmEdit.innerText = "C";
  noteWrapper.removeChild(label);
  noteWrapper.insertBefore(editNoteInput, target);
  noteWrapper.insertBefore(confirmEdit, target);
  target.remove();
};

const confirmEdit = (id, noteWrapper, target) => {
  const editNote = document.createElement("button");
  const label = document.createElement("span");
  const editNoteInput = noteWrapper.querySelector(".note__input_edit");
  const content = editNoteInput.value || "Empty";
  editNote.innerText = "E";
  editNote.classList.add("note__edit");
  editNote.classList.add(id);
  label.innerText = content;
  label.className = "note__label";

  noteWrapper.insertBefore(label, editNoteInput);
  noteWrapper.insertBefore(editNote, editNoteInput);
  noteWrapper.removeChild(target);
  noteWrapper.removeChild(editNoteInput);

  writeStorage(id, content);
};

BUTTON.addEventListener("click", (event) => {
  const uniqueId = Math.ceil(Math.random() * 10 ** 6);
  const content = INPUT.value || "Empty";

  addNote(uniqueId, content);
  writeStorage(uniqueId, content);
  INPUT.value = "";
});

CONTAINER.addEventListener("click", (event) => {
  const id = event.target.classList[1];
  const noteWrapper = document.getElementById(id);

  if (event.target.className.includes("note__button_delete")) {
    deleteNote(parseInt(id), noteWrapper);
  }

  if (event.target.className.includes("note__button_edit")) {
    startEdit(id, noteWrapper, event.target);
  }

  if (event.target.className.includes("note__button_confirm")) {
    confirmEdit(id, noteWrapper, event.target);
  }
});

if (localStorage.length !== 0) {
  for (const i in localStorage) {
    if (localStorage.getItem(i)) {
      addNote(i, localStorage[i]);
    }
  }
}
