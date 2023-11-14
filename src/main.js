const CONTAINER = document.querySelector(".note__container");
const BUTTON = document.querySelector(".plus__button");
const SIDEBAR_BUTTON = document.querySelector(".header__button");
let isSideBar = false;

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
  note.classList.add("note__checkbox");
  note.classList.add(id);
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
  const checkBoxAndLabelWrapper = noteWrapper.querySelector(
    ".checkbox-and-label__wrapper"
  );
  const buttonWrapper = noteWrapper.querySelector(".button__wrapper");
  const editNote = document.createElement("button");
  const deleteNote = buttonWrapper.querySelector(".delete");
  const label = document.createElement("span");
  const editNoteInput = noteWrapper.querySelector(".note__input_edit");
  const content = {
    note: editNoteInput.value,
    isCompleted: JSON.parse(localStorage[id]).isCompleted,
  } || { note: "Empty", isCompleted: JSON.parse(localStorage[id]).isCompleted };
  if (target === noteWrapper.querySelector(".fa-check")) {
    target = noteWrapper.querySelector(".note__button", ".confirm");
  }
  editNote.innerHTML = '<i class="fa-solid fa-pen"></i>';
  editNote.classList.add("note__button");
  editNote.classList.add("edit");
  editNote.classList.add(id);
  label.innerText = content.note;
  label.className = "note__label";

  checkBoxAndLabelWrapper.appendChild(label);
  buttonWrapper.insertBefore(editNote, deleteNote);
  buttonWrapper.removeChild(target);
  checkBoxAndLabelWrapper.removeChild(editNoteInput);

  const pen = noteWrapper.querySelector(".fa-pen");
  pen.classList.add(id);

  writeStorage(id, JSON.stringify(content));
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

  if (
    noteInStorage.isCompleted &&
    target.className.includes("note__checkbox")
  ) {
    noteInStorage.isCompleted = false;
    writeStorage(id, JSON.stringify(noteInStorage));
  } else if (
    !noteInStorage.isCompleted &&
    target.className.includes("note__checkbox")
  ) {
    noteInStorage.isCompleted = true;
    writeStorage(id, JSON.stringify(noteInStorage));
  }
};

const openSideBar = () => {
  const sideBar = document.createElement("div");
  const img = document.createElement("div");
  const githubButton = document.createElement("button");
  const themeSliderLabel = document.createElement("span");
  const themeSlider = document.createElement("input");

  sideBar.style =
    "width: 30%; height: 100vh; position: absolute; top: 0; left: 0; z-index: 1; background: white; box-shadow: 10px 0 20px rgba(0, 0, 0, 20%);";
  sideBar.className = "header__sidebar";

  img.style =
    "width: 100%; height: 30%; background: url(img/violet-rectangle-material-design-0ob3hu6zud8zzm2q.webp) no-repeat";

  document.body.appendChild(sideBar);
  sideBar.append(img);

  isSideBar = true;
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
      addNote(parseInt(i), JSON.parse(localStorage[parseInt(i)]).note);
      setCompleted(parseInt(i), "onPageLoad");
    }
  }
};

BUTTON.addEventListener("click", (event) => {
  const date = new Date();
  const uniqueId = date.getTime();
  const noteToWrite = {
    note: localStorage.length + 1 + ". ",
    isCompleted: false,
  };

  writeStorage(uniqueId, JSON.stringify(noteToWrite));
  addNote(uniqueId, localStorage.length + ". ");
});

CONTAINER.addEventListener("click", (event) => {
  const id = event.target.classList[event.target.classList.length - 1];
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

  if (event.target.className.includes("note__checkbox")) {
    setCompleted(id, event.target);
  }
});

SIDEBAR_BUTTON.addEventListener("click", (event) => {
  event.stopPropagation();
  openSideBar();
});

document.body.addEventListener("click", (event) => {
  if (isSideBar) {
    const sideBar = document.querySelector(".header__sidebar");

    if (event.target !== sideBar) sideBar.remove();
  }
});

onPageLoad();
