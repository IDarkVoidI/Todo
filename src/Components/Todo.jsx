import React from 'react'
import { Container, Checkbox, Text } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

const Todo = (props) => {
    return (
        <div key={props.id}>
            <Container mt={5} height={'50px'} justifyContent={'space-between'} display={'flex'} maxW={'2xl'} bg='gray.600' color='white' borderRadius={'md'}>
                <Checkbox borderColor={'blue.200'} defaultChecked={props.isChecked} onChange={() => props.handleComplete(props.id)} colorScheme='green' />
                <Text color='blue.200' as={props.isChecked ? "s" : ""} mt={3}>{props.title}</Text>
                <button onClick={() => props.handleDelete(props.id)}><DeleteIcon color={'red.500'} mb={1} /></button>
            </Container>
        </div>
    )
}

export default Todo