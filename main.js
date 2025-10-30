const grid = document.getElementById("uploadGrid");
const addBtn = document.getElementById("addBtn");
const fileInput = document.getElementById("fileInput");

// for + button click
addBtn.addEventListener("click", () => {
  fileInput.click();
});

// handle section
fileInput.addEventListener("change", (event) => {
  handleFiles(event.target.files);
  fileInput.value = "";
});

// drag and drop functionality
grid.addEventListener("dragover", (event) => preventDefaults());
grid.addEventListener("drop", (event) => {
  event.preventDefault();
  handleFiles(event.dataTransfer.files);
});

// past support funcitionality
document.addEventListener("paste", (event) => {
  const files = [];
  for (let items of event.clipboardData.items) {
    if (items.kind === "file") files.push(items.getAsFile());
  }
  if (files.length) handleFiles(files);
});

// display files
function handleFiles(files) {
  [...files].forEach((file) => createCard(file));
}

function createCard(file) {
  const card = document.createElement("section");
  card.className = "file-card position-relative ";

  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.innerHTML = "x";
  removeBtn.onclick = () => card.remove();

  let preview;

  if (file.type.startsWith("image/")) {
    preview = document.createElement("img");
    preview.className = "file-preview";
    const reader = new FileReader();
    reader.onload = (e) => (preview.src = e.target.result);
    reader.readAsDataURL(file);
  } else {
    preview = document.createElement("section");
    preview.className ='d-flex justify-content-left align-items-start h-100 text-secondary fs-1';
    preview.innerHTML = '<i class="bi bi-file-earmark p-2"></i>';
  }

  const info = document.createElement("section");
  info.className = "file-info";
  info.innerHTML = `<span class="file-name">${file.name}</span>
                      <span class="file-size">${formatBytes(file.size)}</span>`;

  card.appendChild(preview);
  card.appendChild(removeBtn);
  card.appendChild(preview);
  card.appendChild(removeBtn);
  card.appendChild(info);

  grid.insertBefore(card, addBtn);

}
function formatBytes(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Bytes";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
}
