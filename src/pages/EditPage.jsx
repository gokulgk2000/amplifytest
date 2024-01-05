import React, { useState } from 'react'
import { updateTodo } from '../graphql/mutations';
import { generateClient } from 'aws-amplify/api';

const EditPage = ({selectTodo,fetchTodos,setModalOpen,onClose}) => {
    const [updatedTodos, setUpdatedTodos] = useState(selectTodo);
    const client = generateClient()
    const handleInputChange = (key, value) => {
      setUpdatedTodos({
        ...updatedTodos,
        [key]: value
      });
    };
    const handleUpdate = async () => {
        try {
          // Validate if the selectedTodo has an ID (assuming 'id' is the identifier field)
          if (!updatedTodos.id) {
            console.error('Todo ID is missing.');
            return;
          }
    
          const updatedTodoInput = {
            id: updatedTodos.id,
            name: updatedTodos.name,
            description: updatedTodos.description,
            comments: updatedTodos.comments,
            address: updatedTodos.address,
            newfield: updatedTodos.newfield,
            // Add other fields as needed
          };
    
          await client.graphql({
            query: updateTodo,
            variables: {
              input: updatedTodoInput
            }
          });
         await fetchTodos()
         setModalOpen(false)
         onClose()
          console.log('Todo updated successfully:', updatedTodoInput);
          // Perform any necessary actions after successful update
        } catch (error) {
          console.error('Error updating todo:', error);
        }
      };
  return (
    <div className='modal'>
        <div className='modal-content'>
     <input
        onChange={(event) => handleInputChange('name', event.target.value)}
        style={styles.input}
        value={updatedTodos.name}
        placeholder="Name"
      />
      <input
        onChange={(event) => handleInputChange('description', event.target.value)}
        style={styles.input}
        value={updatedTodos.description}
        placeholder="Description"
      />
    <input
        onChange={(event) => handleInputChange('comments', event.target.value)}
        style={styles.input}
        value={updatedTodos.comments}
        placeholder="Comments"
      />
      <input
        onChange={(event) => handleInputChange('address', event.target.value)}
        style={styles.input}
        value={updatedTodos.address}
        placeholder="Address"
      />
      <input
        onChange={(event) => handleInputChange('newfield', event.target.value)}
        style={styles.input}
        value={updatedTodos.newfield}
        placeholder="Newfield"
      />
  <button onClick={handleUpdate}>
    update Todo
  </button>
  </div>    </div>
  )
}

const styles = {
    input: {
      border: 'none',
      backgroundColor: '#ddd',
      marginBottom: 10,
      padding: 8,
      fontSize: 18
    },
    button: {
      backgroundColor: 'black',
      color: 'white',
      outline: 'none',
      fontSize: 18,
      padding: '12px 0px'
    }
  };
export default EditPage