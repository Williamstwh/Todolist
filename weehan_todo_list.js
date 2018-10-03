const textfield = document.getElementById("todo-form-textfield");
const form = document.getElementById("todo-form");
const addButton = document.getElementById("todo-list-add-button");
const list = document.getElementById("todo-list");

const handleSubmit = event => {
    event.preventDefault();

    const todoItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const text = document.createElement("span");
    text.innerHTML = textfield.value;
    list.appendChild(todoItem);
    todoItem.appendChild(checkbox);
    todoItem.appendChild(text);
    textfield.value = '';

}


form.addEventListener("submit", handleSubmit);

const handleDelete = event => {
    event.preventDefault;

    list[0].remove();
}

list.addEventListener("delete", handleDelete);