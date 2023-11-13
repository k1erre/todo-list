const CONTAINER = document.querySelector(".note__container");
const BUTTON = document.querySelector(".plus__button");
const INPUT = document.querySelector(".note__input");

const addNote = (id, content) => {
  const noteWrapper = document.createElement("div");
  const checkBoxAndLabelWrapper = document.createElement("div");
  const note = document.createElement("input");
  const label = document.createElement("span");
  const buttonWrapper = document.createElement("div");
  const editNote = document.createElement("button");
  const deleteNote = document.createElement("button");

  noteWrapper.id = id;
  noteWrapper.className = "note__wrapper";
  checkBoxAndLabelWrapper.className = "checkbox-and-label__wrapper";
  note.type = "checkbox";
  note.classList.add(id);
  note.classList.add("note__checkbox");
  label.innerText = content;
  label.className = "note__label";
  buttonWrapper.className = "button__wrapper";
  editNote.innerHTML = '<i class="fa-solid fa-pen"></i>';
  editNote.classList.add("note__button");
  editNote.classList.add("edit");
  editNote.classList.add(id);
  deleteNote.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteNote.classList.add("note__button");
  deleteNote.classList.add("delete");
  deleteNote.classList.add(id);

  checkBoxAndLabelWrapper.append(note, label);
  buttonWrapper.append(editNote, deleteNote);

  noteWrapper.append(checkBoxAndLabelWrapper, buttonWrapper);
  CONTAINER.appendChild(noteWrapper);

  const trash = noteWrapper.querySelector(".fa-trash");
  trash.classList.add(id);

  const pen = noteWrapper.querySelector(".fa-pen");
  pen.classList.add(id);
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
  console.log(id, noteWrapper, target);
  const checkBoxAndLabelWrapper = noteWrapper.querySelector(
    ".checkbox-and-label__wrapper"
  );
  const buttonWrapper = noteWrapper.querySelector(".button__wrapper");
  const editNoteInput = document.createElement("input");
  const confirmEdit = document.createElement("button");
  const label = checkBoxAndLabelWrapper.querySelector(".note__label");
  if (target === noteWrapper.querySelector(".fa-pen")) {
    target = noteWrapper.querySelector(".note__button", ".edit");
  }
  editNoteInput.classList.add("note__input_edit");
  editNoteInput.classList.add(id);
  editNoteInput.value = label.innerText;
  confirmEdit.classList.add("note__button");
  confirmEdit.classList.add("confirm");
  confirmEdit.classList.add(id);
  confirmEdit.innerHTML = '<i class="fa-solid fa-check"></i>';
  label.remove();
  checkBoxAndLabelWrapper.appendChild(editNoteInput);
  buttonWrapper.insertBefore(confirmEdit, target);
  target.remove();

  const check = noteWrapper.querySelector(".fa-check");
  check.classList.add(id);
};

const confirmEdit = (id, noteWrapper, target) => {
  console.log(id, noteWrapper, target);
  const checkBoxAndLabelWrapper = noteWrapper.querySelector(
    ".checkbox-and-label__wrapper"
  );
  const buttonWrapper = noteWrapper.querySelector(".button__wrapper");
  const editNote = document.createElement("button");
  const deleteNote = buttonWrapper.querySelector(".delete");
  const label = document.createElement("span");
  const editNoteInput = noteWrapper.querySelector(".note__input_edit");
  const content = editNoteInput.value || "Empty";
  if (target === noteWrapper.querySelector(".fa-check")) {
    target = noteWrapper.querySelector(".note__button", ".confirm");
  }
  editNote.innerHTML = '<i class="fa-solid fa-pen"></i>';
  editNote.classList.add("note__button");
  editNote.classList.add("edit");
  editNote.classList.add(id);
  label.innerText = content;
  label.className = "note__label";

  checkBoxAndLabelWrapper.appendChild(label);
  buttonWrapper.insertBefore(editNote, deleteNote);
  buttonWrapper.removeChild(target);
  checkBoxAndLabelWrapper.removeChild(editNoteInput);

  const pen = noteWrapper.querySelector(".fa-pen");
  pen.classList.add(id);

  writeStorage(id, content);
};

const onPageLoad = () => {
  if (localStorage.length !== 0) {
    const listOfIds = [];

    for (const i in localStorage) {
      if (localStorage.getItem(i)) {
        listOfIds.push(i);
      }
    }

    listOfIds.sort((a, b) => a - b);

    for (const i of listOfIds) {
      addNote(parseInt(i), localStorage[parseInt(i)]);
    }
  }
};

BUTTON.addEventListener("click", (event) => {
  const date = new Date();
  const uniqueId = date.getTime();

  writeStorage(uniqueId, localStorage.length + 1 + ". ");
  addNote(uniqueId, localStorage.length + ". ");
});

CONTAINER.addEventListener("click", (event) => {
  const id = event.target.classList[2];
  const noteWrapper = document.getElementById(id);

  if (
    event.target.className.includes("note__button delete") ||
    event.target.className.includes("fa-solid fa-trash")
  ) {
    deleteNote(parseInt(id), noteWrapper);
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
});

onPageLoad();
