const addNote = (id, content, CONTAINER) => {
  const noteWrapper = document.createElement("div");
  const checkBoxAndLabelWrapper = document.createElement("div");
  const note = document.createElement("input");
  const label = document.createElement("span");
  const buttonWrapper = document.createElement("div");
  const editNote = document.createElement("button");
  const deleteNote = document.createElement("button");

  noteWrapper.id = id;
  noteWrapper.classList.add("note__wrapper", "in");
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
    if (noteInStorage.isCompleted) {
      noteInStorage.isCompleted = false;
    } else {
      noteInStorage.isCompleted = true;
    }
  }

  localStorage[id] = JSON.stringify(noteInStorage);
};

export { addNote, deleteNote, startEdit, confirmEdit, setCompleted };
