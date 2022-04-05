/* 8-uyga vazifa */
const elTodoForm = document.querySelector(".todo__form");
const elTodoInput = document.querySelector(".todo__input");
const elTodoList = document.querySelector(".todo__list");
const elAddBtn = document.querySelector(".btn-add");
const elBtnWrapper = document.querySelector(".todo__wrapper-btn");

const elAllBtn = document.querySelector(".btn-all");
const elAllCount = document.querySelector(".allcount");

const elComplatedBtn = document.querySelector(".btn-complated");
const elComplatedCount = document.querySelector(".complatedcount");

const elUncomplatedBtn = document.querySelector(".btn-uncomplated");
const elUncomplatedCount = document.querySelector(".uncomplatedcount");
const elTodoTemplate = document.querySelector("#todo_item_template").content;

let storage = window.localStorage
let localTodoArray = JSON.parse(storage.getItem("todoArray"))
let localCounter = JSON.parse(storage.getItem("counter"))

let todosArray = localTodoArray || []
let counter = localCounter || 1

elTodoForm.addEventListener("submit", function (evt) {
    evt.preventDefault()
    
    let todoInput = elTodoInput.value.trim()
    
    if (todoInput) {        
        let oneTodo = {
            id: counter++,
            todo: todoInput,
            isComplated: false
        }        
        
        storage.setItem("counter", JSON.stringify(counter))
        todosArray.unshift(oneTodo)
        elTodoInput.value = null
    }
    
    renderTodos(todosArray, elTodoList)
    storage.setItem("todoArray", JSON.stringify(todosArray))
})



function renderTodos(array, wrapper) {
    wrapper.innerHTML = null
    
    let todoFragment = document.createDocumentFragment()
    
    array.forEach(item => {
        let todoTemplate = elTodoTemplate.cloneNode(true)
        
        todoTemplate.querySelector(".todo__item-input").dataset = item.id
        todoTemplate.querySelector(".todo__item-text").textContent = item.todo
        todoTemplate.querySelector(".todo__item-btn").dataset = item.id
        
        if (item.isComplated === true) {
            todoTemplate.querySelector(".todo__item-input").checked = true
        }
        
        todoFragment.appendChild(todoTemplate)
    });
    
    wrapper.appendChild(todoFragment)
}

renderTodos(todosArray, elTodoList)



elTodoList.addEventListener("click", function(evt) {
    let check = evt.target.matches(".todo__item-input")
    
    if (check) {
        let checkboxId = evt.target.dataset.todoId
        
        let foundTodo = todosArray.find(item => item.id == checkboxId) 
        
        let foundTodoIndex = todosArray.findIndex(item => item.id == checkboxId)
        
        if (!foundTodo.isComplated) {
            foundTodo.isComplated = true
            todosArray[foundTodoIndex].isComplated = true
        }
        else {
            foundTodo.isComplated = false
            todosArray[foundTodoIndex].isComplated = false
        }
        storage.setItem("todoArray", JSON.stringify(todosArray))
        calculateTodos(todosArray)
    }
    
    
    
    let checkForBtn = evt.target.matches(".todo__item-btn")
    
    if (checkForBtn) {
        let checkboxId = evt.target.dataset.todoId
        
        let foundTodoIndex = todosArray.findIndex(function(item) {
            return item.id == checkboxId
        })
        
        todosArray.splice(foundTodoIndex, 1)
        
        updateArray()
    }
})


function calculateTodos(array) {

}

calculateTodos(todosArray)