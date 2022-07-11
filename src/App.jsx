import React, { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { Input, Button, Tag, Text, Container, Box, HStack } from '@chakra-ui/react';
import Todo from './Components/Todo';
import { useTodo } from './hooks/useTodo'

function App() {
  const { todoItem, checkedTodos, setTodoItem, allTodos, handleSubmitTodo, handleDeleteTodo, handleCompleteTodo } = useTodo()

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTodo = {
      title: todoItem,
      isChecked: false,
      id: uuidv4()
    }
    handleSubmitTodo(newTodo)
  }

  const handleDelete = (id) => {
    const filteredData = allTodos.filter((todoObj) => todoObj.id !== id)
    handleDeleteTodo(filteredData)
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
            <Todo id={i.id} isChecked={i.isChecked} title={i.title} handleDelete={handleDelete} handleComplete={handleCompleteTodo} />
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