import { useState } from 'react';

export const useTodo = () => {
    const [todoItem, setTodoItem] = useState("")
    const [allTodos, setAllTodos] = useState(JSON.parse(localStorage.getItem("todos")) || [])
    const [checkedTodos, setCheckedTodos] = useState(JSON.parse(localStorage.getItem("done")) || 0)

    const handleSubmitTodo = (newTodo) => {
        setAllTodos([...allTodos, newTodo])
        setTodoItem("")
        localStorage.setItem('todos', JSON.stringify([...allTodos, newTodo]))
    };

    const handleDeleteTodo = (filteredData) => {
        setAllTodos(filteredData)
        if (checkedTodos !== 0) {
            setCheckedTodos(checkedTodos - 1)
            localStorage.setItem('done', JSON.stringify(checkedTodos - 1))
        }
        localStorage.setItem('todos', JSON.stringify(filteredData))
    }

    const handleCompleteTodo = (id) => {
        const updatedData = allTodos.map(todoObj => {
            // find the right todo
            if (todoObj.id === id) {
                // if todo is already checked, uncheck it
                if (todoObj.isChecked) {
                    setCheckedTodos(checkedTodos - 1)
                    localStorage.setItem('done', JSON.stringify(checkedTodos - 1))
                    return {
                        title: todoObj.title,
                        id: todoObj.id,
                        isChecked: false
                    }
                }
                // else check it
                setCheckedTodos(checkedTodos + 1)
                localStorage.setItem('done', JSON.stringify(checkedTodos + 1))
                return {
                    title: todoObj.title,
                    id: todoObj.id,
                    isChecked: true
                }
            }
            return todoObj
        })
        setAllTodos(updatedData)
        localStorage.setItem('todos', JSON.stringify(updatedData))
    }
    return {
        todoItem,
        setTodoItem,
        allTodos,
        setAllTodos,
        checkedTodos,
        handleSubmitTodo,
        handleCompleteTodo,
        handleDeleteTodo
    }
}