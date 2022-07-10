import React, { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { Input, Button, Tag, Text, Container, Box, HStack } from '@chakra-ui/react';
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
    <Container textAlign={'center'}>
      <Text color={'blue.200'} fontSize={'5xl'} mt={10}>Todo App!</Text>
      <div>
        <Box mt={20} as='form' onSubmit={handleSubmit} display={'flex'} alignItems={'center'}>
          <Input _placeholder={{ color: 'inherit' }} color='blue.200' focusBorderColor='blue.200' required size='lg' width={'500px'} value={todoItem} type={'text'} placeholder="Add a new task!" onChange={(event) => setTodoItem(event.target.value)} />
          <Button ml={2} size={'lg'} colorScheme='blue' type='submit'>Create</Button>
        </Box>
      </div>
      {/* Todo items container */}
      <Container mt={16}>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          <Box display={'flex'}>
            <Text color='blue.200'>Created Tasks</Text><Tag borderRadius={'full'}>{allTodos.length}</Tag>
          </Box>
          <Box display={'flex'}>
            <Text color='blue.200' >Done Tasks</Text><Tag borderRadius={'full'}>{checkedTodos} of {allTodos.length}</Tag>
          </Box>
        </HStack>
        <div>
          {allTodos.map((i) => (
            <Todo id={i.id} isChecked={i.isChecked} title={i.title} handleDelete={handleDelete} handleComplete={handleComplete} />
          ))}
        </div>
      </Container>
    </Container >
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