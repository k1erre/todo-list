const CONTAINER = document.querySelector(".note__container");
const BUTTON = document.querySelector("button");
const INPUT = document.querySelector(".note__input");

const writeNote = (id, content) => {
  localStorage[id] = content;
};

const deleteNote = (id) => {
  delete localStorage[id];
};

BUTTON.addEventListener("click", (event) => {
  const uniqueId = Math.ceil(Math.random() * 10 ** 6);

  const noteWrapper = document.createElement("div");
  const note = document.createElement("input");
  const label = document.createElement("span");
  const editNote = document.createElement("button");
  const deleteNote = document.createElement("button");

  noteWrapper.id = uniqueId;
  note.type = "checkbox";
  note.className = uniqueId;
  label.innerText = INPUT.value;
  label.className = "label";
  editNote.innerText = "E";
  editNote.className = "editNote";
  editNote.classList.add(uniqueId);
  deleteNote.innerText = "X";
  deleteNote.className = "deleteNote";
  deleteNote.classList.add(uniqueId);

  noteWrapper.append(note, label, editNote, deleteNote);
  CONTAINER.appendChild(noteWrapper);

  writeNote(uniqueId, INPUT.value);
  INPUT.value = "";
});

CONTAINER.addEventListener("click", (event) => {
  const id = event.target.classList[1];
  const noteWrapper = document.getElementById(id);

  if (event.target.className.includes("deleteNote")) {
    const noteToDelete = document.getElementById(id);
    noteToDelete.remove();
    deleteNote(parseInt(id));
  }

  if (event.target.className.includes("editNote")) {
    const editNoteInput = document.createElement("input");
    const confirmEdit = document.createElement("button");
    const label = noteWrapper.querySelector(".label");
    editNoteInput.classList.add("editNotInput");
    editNoteInput.classList.add(id);
    editNoteInput.value = label.innerText;
    confirmEdit.classList.add("confirmEdit");
    confirmEdit.classList.add(id);
    confirmEdit.innerText = "C";
    noteWrapper.removeChild(label);
    noteWrapper.insertBefore(editNoteInput, event.target);
    noteWrapper.insertBefore(confirmEdit, event.target);
    event.target.remove();
  }

  if (event.target.className.includes("confirmEdit")) {
    const id = event.target.classList[1];
    const editNote = document.createElement("button");
    const label = document.createElement("span");
    const editNoteInput = noteWrapper.querySelector(".editNotInput");
    editNote.innerText = "E";
    editNote.classList.add("editNote");
    editNote.classList.add(id);
    label.innerText = editNoteInput.value;
    label.className = "label";

    noteWrapper.insertBefore(label, editNoteInput);
    noteWrapper.insertBefore(editNote, editNoteInput);
    noteWrapper.removeChild(event.target);

    writeNote(id, editNoteInput.value);
    noteWrapper.removeChild(editNoteInput);
  }
});
