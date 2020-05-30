//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all event listeners
loadEventListeners();

function loadEventListeners(){
    //DOM Load event
    document.addEventListener('DOMContentLoaded',getTasks);

    // Add task event
    form.addEventListener('submit',addTask);

    //Remove task event
    taskList.addEventListener('click',removeTask);

    //Clear Task
    clearBtn.addEventListener('click',clearTask);

    //Filter Task
    filter.addEventListener('keyup',filterTask);
}

// Add Task
function addTask(e){

    //console.log(e.target);

     if(taskInput.value === ''){
         alert('Add a task');
     }

    //Create li element
    const li = document.createElement('li');
    //Add Class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);

    // Append li to ul
    
    taskList.appendChild(li);
    //console.log(e);

    //Store in Local storage
    storeTaskInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value = '';

     e.preventDefault();

}

// Remove task
function removeTask(e){
    //console.log('john');
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure, you want to remove this task?')){
        e.target.parentElement.parentElement.remove();

        //Remove from Local Storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
        
    };


}

function clearTask(e){

    //First way
    //e.target.previousSibling.previousSibling.remove();

    //Second way
    //taskList.innerHTML = '';
   
    //Third way
    if(confirm("Are you sure you want to remove all task")){
    while(taskList.firstChild){
        
        taskList.removeChild(taskList.firstChild);

        //Remove All task from Local Storage
        removeAllTaskFromLocalStorage(taskList.firstChild);
        
        }
    }

}

function filterTask(e){
    let text = e.target.value.toLowerCase();
    //console.log(text);

    lists = document.querySelectorAll('.collection-item');
    //console.log(lists);
    
    lists.forEach(function(list){
        
        let item = list.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            list.style.display = 'block';
        } else {
            list.style.display = 'none';
        }

        //console.log(item);
        

    })

}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
    




}

//Remove from Local Storage
function removeTaskFromLocalStorage(taskItem){
    //console.log(taskItem.textContent);
    
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
        
    }

    tasks.forEach(function(task,index){
        
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        } 
    });
localStorage.setItem('tasks',JSON.stringify(tasks));
    

}
//Remove All task from Local Storage
function removeAllTaskFromLocalStorage(allTask){
    // let tasks;
    // if(localStorage.getItem('tasks') === null){
    //     tasks = [];
    // } else{
    //     tasks = JSON.parse(localStorage.getItem('tasks'));
    //     console.log(tasks);
        
    // }

    // tasks.forEach(function(task,index){
        
    //         tasks.splice(index,1);
    //     }
    // );
    // localStorage.setItem('tasks',JSON.stringify(tasks));


    //OR the below method

    localStorage.clear();

}

//Get Tasks from Local Storage

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){

    //Create li element
    const li = document.createElement('li');
    //Add Class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);

    // Append li to ul
    
    taskList.appendChild(li);

    })
}

