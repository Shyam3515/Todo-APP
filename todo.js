//MVC Architecture
//Model
let todo;
const savedTodos = JSON.parse(localStorage.getItem('todos'));
if(Array.isArray(savedTodos)){
    todo = savedTodos;
} else {
    todo=
    [{title:'Make Dinner',
        dueDate:'2022-06-12',
    id:'id1'},
    {title:'Car Wash',
        dueDate:'2022-06-12',
        id:'id2'},
    {title:'Dry Wash',
        dueDate:'2022-06-12',
        id:'id3'}];
}  
render();

//creates todo
function createTodo(title,dueDate){
    const id='' + new Date().getTime();
    todo.push({
        title:title,
        dueDate:dueDate,
        id:id
    });
    saveTodos();
}
//deletes todo
function removeTodo(idToDelete){
    todo = todo.filter(function(todo){
       if(todo.id===idToDelete){
            return false;
        }
        else{
            return true;
        }
    });
    saveTodos();
}
//Local Storage
function saveTodos(){
    localStorage.setItem('todos',JSON.stringify(todo))
}

//Controller
function addTodo(){
    const todo_text=document.getElementById('todo-text');
    const title=todo_text.value;

    const date_picker=document.getElementById('date-picker');
    const due_Date=date_picker.value;
    if(title ==='' || due_Date === ''){
        return alert('Enter todo or select date')
    }   
    createTodo(title,due_Date);
    render();
}
//function to delete Todo
function deleteTodo(event){
    const deleteButton=event.target;
    const idToDelete=deleteButton.id;
    removeTodo(idToDelete)
    render()
}
//View
function render(){
    document.getElementById('todo-list').innerHTML='';
    todo.forEach(function(todo){
        let element=document.createElement('div');
        element.innerText=todo.title +' => Due Date : '+todo.dueDate;
        //Adding delete button to each todo
        const deleteButton=document.createElement('button');
        deleteButton.innerText='Delete';
        deleteButton.style="margin-left:12px;"
        deleteButton.onclick=deleteTodo;
        //linking todo and delete by id
        deleteButton.id=todo.id;
        element.appendChild(deleteButton)

        let div_list=document.getElementById('todo-list');
        div_list.appendChild(element);
    });             
}