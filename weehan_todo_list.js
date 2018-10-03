//Get the reference to all the elements we'll be needing
const textfield = document.getElementById("todo-add-input");
const form = document.getElementById("todo-add-form");
const list = document.getElementById("todo-list");

const handleSubmit = event => {
    event.preventDefault();

    //Create a <li>Random Content</li>
    const todoItem = document.createElement("li");

    //Create checkbox <input type="checkbox">
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    //Create span <span> todo item</span>
    const text = document.createElement("span");
    text.innerHTML = textfield.value;

    //Adds todoItem into the todo list
    list.appendChild(todoItem);

    // Adds the checkbox to the todoItem
    todoItem.appendChild(checkbox);
    todoItem.appendChild(text);

    //Empty the textfield
    textfield.value = "";
};

form.addEventListener("submit", handleSubmit);

const handleDelete = event => {
    event.preventDefault();
}

form.addEventListener("delete", handleDelete);