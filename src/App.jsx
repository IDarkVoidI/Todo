import React, { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { Input, Button, Tag, Text } from '@chakra-ui/react';
import Todo from './Components/Todo';

function App() {
  const [todoItem, setTodoItem] = useState("")
  const [allTodos, setAllTodos] = useState(JSON.parse(localStorage.getItem("todos")) || [])
  const [checkedTodos, setCheckedTodos] = useState(JSON.parse(localStorage.getItem("done")) || 0)

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTodo = {
      title: todoItem,
      isChecked: false,
      id: uuidv4()
    }
    setAllTodos([...allTodos, newTodo])
    setTodoItem("")
    localStorage.setItem('todos', JSON.stringify([...allTodos, newTodo]))
  }

  const handleDelete = (id) => {
    const filteredData = allTodos.filter((todoObj) => todoObj.id !== id)
    setAllTodos(filteredData)
    if (checkedTodos !== 0) {
      setCheckedTodos(checkedTodos - 1)
      localStorage.setItem('done', JSON.stringify(checkedTodos - 1))
    }
    localStorage.setItem('todos', JSON.stringify(filteredData))
  }

  const handleComplete = (id) => {
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

  return (
    <div className='App'>
      <Text color={'blue.200'} fontSize={'5xl'}>Todo App!</Text>
      <div>
        <form onSubmit={handleSubmit}>
          <Input _placeholder={{ color: 'inherit' }} color='blue.200' focusBorderColor='blue.200' required mt={10} size='lg' width={'500px'} value={todoItem} type={'text'} placeholder="Add a new task!" onChange={(event) => setTodoItem(event.target.value)} />
          <Button ml={2} mb={1.5} size={'lg'} colorScheme='blue' type='submit'>Create</Button>
        </form>
      </div>
      {/* Todo items container */}
      <div className='content-container'>
        <div className='h-stack'>
          <div className='h-stack'>
            <Text color='blue.200' ml={'810px'}>Created Tasks</Text><Tag borderRadius={'full'}>{allTodos.length}</Tag>
          </div>
          <div className='h-stack'>
            <Text color='blue.200' >Done Tasks</Text><Tag mr={'810px'} borderRadius={'full'}>{checkedTodos} of {allTodos.length}</Tag>
          </div>
        </div>
        <div>
          {allTodos.map((i) => (
            <Todo id={i.id} isChecked={i.isChecked} title={i.title} handleDelete={handleDelete} handleComplete={handleComplete} />
          ))}
        </div>
      </div>
    </div >
  );
}

export default App;

// step 1: store curren todo text in some state
// step 2:
  // hit create button
  // call onSubmit action
  // create a new todo object (title, isChecked, id)
  // push it to all todos array
  // clear the todoItem state