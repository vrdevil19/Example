function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const li = document.createElement("li");
  li.textContent = taskText;

  // Mark as completed on click
  li.addEventListener("click", function () {
    li.classList.toggle("completed");
  });

  // Add delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.className = "delete";
  delBtn.onclick = function () {
    li.remove();
  };

  li.appendChild(delBtn);

  document.getElementById("taskList").appendChild(li);
  input.value = ""; // Clear input
}
