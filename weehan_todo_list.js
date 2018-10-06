//Selecting date & time
const daySelect = document.getElementById("day");
const monthSelect = document.getElementById("month");
const yearSelect = document.getElementById("year");

const hourSelect = document.getElementById("hour");
const minSelect = document.getElementById("min");

function enumerate_options(select_list, lst) {
    for (var i = 0; i <= lst.length - 1; i++) {
        var options = document.createElement("option");
        options.innerHTML = lst[i];
        select_list.appendChild(options);
    }
}

function enum_array(start, end) {
    var arr = [];
    for (var i = start; i <= end; i++) {
        arr.push(i)
    }
    return arr;
}

const one_to_ten_array = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"]
const daysArray = one_to_ten_array.concat(enum_array(11, 31));
const monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const yearsArray = enum_array(2018, 2100);
const hoursArray = ["00"].concat(one_to_ten_array.concat(enum_array(11, 23)));
const minsArray = ["00"].concat(one_to_ten_array.concat(enum_array(11, 59)));
enumerate_options(daySelect, daysArray);
enumerate_options(monthSelect, monthsArray);
enumerate_options(yearSelect, yearsArray);
enumerate_options(hourSelect, hoursArray);
enumerate_options(minSelect, minsArray);

//DOMs

const textfield = document.getElementById("todo-form-textfield");
const form = document.getElementById("todo-form");
const addButton = document.getElementById("todo-form-add-button")
const deleteButton = document.getElementById("todo-list-delete-button");
const table = document.getElementById("todo-table");

const handleSubmit = event => {
    event.preventDefault();
    if (daySelect.selectedIndex === 0 || 
        monthSelect.selectedIndex === 0 || 
        yearSelect.selectedIndex === 0) {
        alert("you have not entered the date!");
    } else if (hourSelect.selectedIndex === 0 ||
               minSelect.selectedIndex === 0) {
        alert("you have not entered the date and time")
    } else {
        //create table row
        const todoItem = document.createElement("tr");

        //create text
        const text = document.createElement("td");
        text.innerHTML = textfield.value;

        //Create due date
        const dueDate = document.createElement("td");
        dueDate.innerHTML = daysArray[daySelect.selectedIndex - 1] + ' ' +
                            monthsArray[monthSelect.selectedIndex - 1] + ' ' +
                            yearsArray[yearSelect.selectedIndex - 1];  

        //Create due time
        const dueTime = document.createElement("td");
        dueTime.innerHTML = hoursArray[hourSelect.selectedIndex - 1] + ':' +
                            minsArray[minSelect.selectedIndex - 1] + ' hrs';

        //create checkbox
        const col3 = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        col3.innerHTML = checkbox;
        
        table.appendChild(todoItem);
        todoItem.appendChild(text);
        todoItem.appendChild(dueDate);
        todoItem.appendChild(dueTime);
        todoItem.appendChild(checkbox);
        textfield.value = '';
    }

}


addButton.addEventListener("click", handleSubmit);

const handleDelete = event => {
    event.preventDefault;

    if (table.hasChildNodes()) {
        for (var i = 0; i <= table.childElementCount; i++) {
            if (table.childNodes[i].tagName === "TR" && table.childNodes[i].childNodes[3].checked === true) {
                table.childNodes[i].remove();
                i--;
            }
        }
    }
}

deleteButton.addEventListener("click", handleDelete);

