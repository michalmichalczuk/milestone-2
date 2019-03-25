
var taskArray = [];

window.onload = function () {

    // html variables

    var confirmBtn = document.getElementById('confirmBtn');
    confirmBtn.addEventListener("click", createTask);
    var searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener('click', searchTask);

    //creating a task object and running showData

    function createTask() {
        var titleInput = document.getElementById('titleInput').value;
        var detailInput = document.getElementById('detailInput').value;


        var task = {};
        task['title'] = titleInput;
        task['detail'] = detailInput;
        task['id'] = makeId();

        taskArray.push(task);
        showData(taskArray);
        
    }


    function showData(array) {
        tbody.innerHTML = "";
        var thead = document.getElementById('thead');
        for (var i = 0; i < array.length; i++) {
            var nextRow = createRow(array[i]);
            tbody.appendChild(nextRow);
        }
        document.getElementById('titleInput').value = "";
        document.getElementById('detailInput').value = "";
        thead.style.display = 'table-row';
    }


    //generate random id
    function makeId() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    //html table 

    function createCell(text) {
        var nextTd = document.createElement('td');
        nextTd.innerText = text;
        return nextTd;
    }

    function createRow(object) {

        //task input into html table
        var nextTr = document.createElement('tr');
        var cell1 = createCell(object.title);
        var cell2 = createCell(object.detail);
        nextTr.appendChild(cell1);
        nextTr.appendChild(cell2);


        //edit, remove and status buttons added to html
        var removeBtn = document.createElement('button');
        removeBtn.innerText = 'Delete';
        removeBtn.type = 'submit';
        removeBtn.id = object.id;
        nextTr.appendChild(removeBtn);
        removeBtn.addEventListener("click", removeTask);

        var editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.type = 'submit';
        editBtn.id = object.id;
        nextTr.appendChild(editBtn);
        editBtn.addEventListener("click", editTask);

        var selectInput = document.createElement('select');
        selectInput.id = object.id;

        var options = ['Not Started', 'Working on it', 'Done'];
        for (var i = 0; i < options.length; i++) {
            var nextOption = document.createElement('option');
            nextOption.innerText = options[i];
            selectInput.appendChild(nextOption);
        }
        nextTr.appendChild(selectInput);

        return nextTr;
    }


    //remove task

    function removeTask(event) {
        var idToRemove = event.target.id;
        var indexToRemove = taskArray.findIndex(el => el.id === idToRemove);
        taskArray.splice(indexToRemove, 1);
        showData(taskArray);
    }

    //edit task

    function editTask(event) {
        confirmBtn.removeEventListener('click', createTask);
        confirmBtn.addEventListener('click', processEdit);
        var idToEdit = event.target.id;
        var indexToEdit = taskArray.findIndex(el => el.id === idToEdit);
        var titleInput = document.getElementById('titleInput');
        var detailInput = document.getElementById('detailInput');

        titleInput.value = taskArray[indexToEdit].title;
        detailInput.value = taskArray[indexToEdit].detail;
        confirmBtn.innerText = "Save";

        function processEdit() {
            var editedTask = {};
            editedTask['title'] = titleInput.value;
            editedTask['detail'] = detailInput.value;
            editedTask['id'] = taskArray[indexToEdit].id;

            taskArray[indexToEdit] = editedTask;

            showData(taskArray);
            confirmBtn.innerText = "Add";
            confirmBtn.removeEventListener('click', processEdit);
            confirmBtn.addEventListener('click', createTask);
        }

    }

    //search task
    function searchTask() {
        var searchedPhrase = document.getElementById('searchInput').value;
        var filteredArray = taskArray.filter(el => el.title === searchedPhrase || el.detail === searchedPhrase);
        showData(filteredArray);
    }

} //onload stache