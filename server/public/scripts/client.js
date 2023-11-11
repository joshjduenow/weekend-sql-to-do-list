console.log('JS is sourced!');



// GET TO-DO FUNCTION
function getTodos() {
    axios({
        type: 'GET',
        url: '/todos'
    }).then(res => {
    console.log('getTodos() response', response.data);
        renderTodos(res.data)
    }).catch(function (error) {
        console.log('error in GET', error);
      });
}

// POST TO-DO FUNCTION
function addToDo(event) {
    let incToDo = {
      name: document.getElementById('newToDo').value,
    //   age: document.getElementById('ageIn').value,
    //   gender: document.getElementById('genderIn').value,
    //   transfer: document.getElementById('readyForTransferIn').value,
    //   notes: document.getElementById('notesIn').value
  
  
    }
    console.log(incToDo);
    axios({
      method: 'POST',
      url: '/todos',
      data: incToDo,
    }).then(function (response) {
      console.log('incToDo()', response.data);
      getTodos();
    }).catch(function (error) {
      console.log('Error in POST', error)
      alert('Unable to add todo at this time. Please try again later.');
    });
  }

function renderTodos(todos) {
    
}