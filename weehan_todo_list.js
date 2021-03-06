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

//todoitem class

class todoitem {
    constructor(todo_text, due_year, due_month, due_day, due_hour, due_min) {
        this.todo_text = todo_text;
        this.due_year = due_year;
        this.due_month = due_month;
        this.due_day = due_day;
        this.due_hour = due_hour;
        this.due_min = due_min;
        this.checked = false;  
    }
}

//DOMs

const textfield = document.getElementById("todo-form-textfield");
const addButton = document.getElementById("todo-form-add-button");
const dueDay = document.getElementById("day");
const dueMonth = document.getElementById("month");
const dueYear = document.getElementById("year");
const dueHour = document.getElementById("hour");
const dueMin = document.getElementById("min");
const deleteButton = document.getElementById("todo-list-delete-button");
const sortButton = document.getElementById("todo-list-sort-button");
const selectAllButton = document.getElementById("todo-list-select-all-button");
const unselectAllButton = document.getElementById("todo-list-unselect-all-button");
const todoTable = document.getElementById("todo-table");
const checkList = document.getElementsByClassName("checkbox");

let todo_array = [];

const toggle_sortButton_selectAllButton_display = () => {
    //change display settings of sort button depending on whether todo_array is empty
    if (todo_array.length > 0) {
        sortButton.style.display = "inline";
        selectAllButton.style.display = "inline";
    } else {
        sortButton.style.display = "none";
        selectAllButton.style.display = "none";
    }
}

const toggle_deleteButton_unselectAllButton_display = () => {
    //change display settings of delete button depending on whether any of the checkboxes are checked
    let is_any_checked = false;
    var number_of_checked = 0;
    for (let i = 0; i < todo_array.length; i++) {
        is_any_checked = is_any_checked || todo_array[i].checked;
        if (todo_array[i].checked) {
            number_of_checked++;
        }
    } 
    if (is_any_checked) {
        deleteButton.innerHTML = "delete selected items (" + number_of_checked + ")";
        deleteButton.style.display = "inline";
        unselectAllButton.style.display = "inline";
    } else {
        deleteButton.style.display = "none";
        unselectAllButton.style.display = "none";
    }
}

const display_array = todo_arr => {
    const convert_todo_to_table_row = todoitem => {
        //Create table row
        const new_row = document.createElement("TR");
        new_row.className = "todo-table-rows";
        
        //Create text column
        const text = document.createElement("TD");
        text.innerHTML = todoitem.todo_text;
    
        //Create due Date column
        const date = document.createElement("TD");
        date.innerHTML = daysArray[todoitem.due_day - 1] + ' ' +
                         monthsArray[todoitem.due_month - 1] + ' ' +
                         yearsArray[todoitem.due_year - 1];
    
        //Create due Time column
        const time = document.createElement("TD");
        time.innerHTML = hoursArray[todoitem.due_hour - 1] + ':' +
                         minsArray[todoitem.due_min - 1];

        //Create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.checked = todoitem.checked;
        
        //append text, due date and due time to table row
        new_row.appendChild(text);
        new_row.appendChild(date);
        new_row.appendChild(time);
        new_row.appendChild(checkbox);
    
        //return new row
        return new_row;
    }
    //delete all existing table rows
    const current_table_rows = document.getElementsByClassName("todo-table-rows");
    while (current_table_rows.length > 0) {
        current_table_rows[0].remove();
    }

    //map convert_todo_to_table_row to each element in todo_arr then add each element to the todoTable
    for (let i = 0; i < todo_arr.length; i++) {
        todoTable.appendChild(todo_arr.map(convert_todo_to_table_row)[i]);
    }

    //toggle the display of sortButton and deleteButton
    toggle_sortButton_selectAllButton_display();
    toggle_deleteButton_unselectAllButton_display();
}

const handleSubmit = event => {
    //Prevent Default
    event.preventDefault();

    //Create new todoitem
    const todo = new todoitem(textfield.value,
                              dueYear.selectedIndex,
                              dueMonth.selectedIndex,
                              dueDay.selectedIndex,
                              dueHour.selectedIndex,
                              dueMin.selectedIndex);

    //Return error message if date is not keyed in
    if (todo.due_year === 0 || todo.due_month === 0 || todo.due_day === 0) {
        document.getElementById("error-message").innerHTML = "Please enter the due date";
    } 
    //Return error message if time is not keyed in
    else if (todo.due_hour === 0 || todo.due_min === 0) {
        document.getElementById("error-message").innerHTML = "Please enter the due time";
    } 

    else {
    //Clears error message (if any)
    document.getElementById("error-message").innerHTML = "";

    //push new todoitem into todo_array
    todo_array.unshift(todo);

    //convert todo_array to table
    display_array(todo_array);

    //clears textfield
    textfield.value = '';
    }
}

addButton.addEventListener("click", handleSubmit);

const handleDelete = event => {
    //Prevent Default
    event.preventDefault();

    //Delete all todoitems that are checked from todo_array
    for (let i = 0; i < todo_array.length; i++) {
        if (todo_array[i].checked) {
            delete todo_array[i];
        }
    }

    //filter out undefined left from deleting todoitems
    todo_array = todo_array.filter(x => x !== undefined);

    //convert todo_array to table
    display_array(todo_array);
}

deleteButton.addEventListener("click", handleDelete);


const handleSort = event => {
    //Prevent Default
    event.preventDefault(); 

    //define function merge sort function to sort array
    function merge_sort(arr) {
        //function earlier returns between 2 todoitems the earlier one. If same date, returns in alphabetical order
        const earlier = (todoitem1, todoitem2) => {
            return todoitem1.due_year < todoitem2.due_year 
                   ? todoitem1
                   : todoitem1.due_year > todoitem2.due_year
                     ? todoitem2
                     : todoitem1.due_month < todoitem2.due_month
                       ? todoitem1
                       : todoitem1.due_month > todoitem2.due_month 
                         ? todoitem2
                         : todoitem1.due_day < todoitem2.due_day 
                           ? todoitem1
                           : todoitem1.due_day >  todoitem2.due_day
                             ? todoitem2
                             : todoitem1.due_hour <  todoitem2.due_hour
                               ? todoitem1
                               : todoitem1.due_hour >  todoitem2.due_hour
                                 ? todoitem2
                                 : todoitem1.due_min < todoitem2.due_min
                                   ? todoitem1
                                   : todoitem1.due_min > todoitem2.due_min
                                   ? todoitem2
                                   : todoitem1.todo_text.toLowerCase() < todoitem2.todo_text.toLowerCase()
                                     ? todoitem1
                                     : todoitem1.todo_text.toLowerCase() > todoitem2.todo_text.toLowerCase()
                                       ? todoitem2
                                       : todoitem1;
        }
    
        //function is_earlier returns true if first todoitem argument is earlier than the second, otherwise returns false
        const is_earlier = (todoitem1, todoitem2) => {
            return todoitem1 === earlier(todoitem1, todoitem2); 
        }

        //function merge merges and sorts 2 arrays
        function merge(arr1, arr2) {
            return arr1.length === 0
                   ? arr2
                   : arr2.length === 0
                     ? arr1
                     : is_earlier(arr1[0], arr2[0])
                       ? [arr1[0]].concat(merge(arr1.splice(1), arr2))
                       : [arr2[0]].concat(merge(arr1, arr2.splice(1)));
        }
        const midpoint = Math.floor(arr.length / 2);
        return arr.length === 1 || arr.length === 0
               ? arr 
               : merge(merge_sort(arr.slice(0, midpoint)),
                       merge_sort(arr.slice(midpoint, arr.length)));
    }

    //Sort todo_array 
    todo_array = merge_sort(todo_array);

    display_array(todo_array);
}

sortButton.addEventListener("click", handleSort);


const handleCheck = event => {
    event.preventDefault();

    //Assign checked value of checkboxes to checked value in todo_Array
    for (let i = 0; i < todo_array.length; i++) {
        todo_array[i].checked = checkList[i].checked;
    }

    //toggle the display of deleteButton
    toggle_deleteButton_unselectAllButton_display();
}

todoTable.addEventListener("change", handleCheck);

const handleSelectAll = (event, boo) => {
    //prevent default
    event.preventDefault();

    //map true of all todoitems.checked in todo_array
    for (let i = 0; i < todo_array.length; i++) {
        todo_array[i].checked = boo;
    }

    //display array with all items checked
    display_array(todo_array);
}

selectAllButton.addEventListener("click", event => handleSelectAll(event, true));

unselectAllButton.addEventListener("click", event => handleSelectAll(event, false));