

console.log('JS is sourced!');
getTodos();


// GET TO-DO FUNCTION
function getTodos() {
    axios({
        type: 'GET',
        url: '/todos'
    }).then(function (response) {
        console.log('getTodos() response', response.data);
        renderTodos(response.data)
    }).catch(function (error) {
        console.log('error in GET', error);
    });
}

// POST TO-DO FUNCTION

function addToDo(event) {
    event.preventDefault();

    let incToDo = {
        text: document.getElementById('newToDo').value,

    }
    console.log(incToDo);
    axios({
        method: 'POST',
        url: '/todos',
        data: incToDo,
    }).then(function (response) {
        console.log('incToDo() response', response.data);
        getTodos();
    }).catch(function (error) {
        console.log('Error in POST', error)
        alert('Unable to add todo at this time. Please try again later.');
    });
}


function renderTodos(toDos) {
    console.log(toDos);
    const viewToDo = document.getElementById('viewToDo');
    viewToDo.innerHTML = '';

    for (let toDo of toDos) {
        console.log(toDo.isComplete);
        let isComplete = '';
        if (toDo.isComplete) {
            isComplete = 'completed'
        }
        viewToDo.innerHTML += 
     `<tr data-testid="toDoItem" data-toDoId="${toDo.id}">
        <td>${toDo.text}</td>
        <td><button data-testid="deleteButton" onclick="deleteToDo(event)">Delete</button></td>
        <td><button data-testid="completeButton" class="${isComplete}" onclick="completeToDo(event, ${toDo.id})">Complete</button></td>
      </tr>`
    }


}


function deleteToDo(event) {
    event.preventDefault();

    let deleteToDo = event.target.closest('tr');
    let toDoId = deleteToDo.getAttribute('data-toDoId');
    console.log("check delete button and toDoId", deleteToDo, toDoId)

    axios({
        method: 'DELETE',
        url: `/todos/${toDoId}`
    }).then(function (response) {
        getTodos();

    }).catch(function (error) {
        console.log('error in DELETE', error);
    });
}


function completeToDo(event, compId) {
    event.preventDefault();
    console.log('in completeToDo');
    console.log("check event and id", event, compId)

    axios({
        method: 'PUT',
        url: `/todos/${compId}`
    }).then(function (response) {
        getTodos();

    }).catch(function (error) {
        console.log('error in PUT', error);
    });


}
//<td><button onclick="deleteToDo(event)">Delete</button>
//<td>${toDo.transfer != true ? `<button onclick="saveKoala(event,${koala.id})">Transfer</button>`:''}</td>
//   if (isComplete === true) {
//     isComplete.innerHTML = `<button class='over-budget'> ${totalMonthly}</p>`
// }
// else { monthlySalary.innerHTML = `<p>${totalMonthly}</p>` };}
// <td>${toDo.isComplete != true ? `<button data-testid="completeButton" onclick="completeToDo(event,${toDo.id})">Complete</button>` : '✅'}</td>
// let taskComplete = document.getElementById('task-complete')
// if (taskComplete === false) {
//     taskComplete.innerHTML = `<button class='task-complete'>${Complete}</button>`
// }
// else { taskComplete. innerHTML = `<button>${Complete}</button>` };