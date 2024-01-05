import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api';

import { createTodo } from '../graphql/mutations';

const CreatePage = () => {
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    comments: '',
    address: '',
    newfield: ''
  });
  const client = generateClient();

  const setInput = (key, value) => {
    setFormState({ ...formState, [key]: value });
  };

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return;
      const todo = { ...formState };
      setFormState({
        name: '',
        description: '',
        comments: '',
        address: '',
        newfield: ''
      });
      await client.graphql({
        query: createTodo,
        variables: {
          input: todo
        }
      });
      window.location.href = '/';
    } catch (err) {
      console.log('error creating todo:', err);
    }
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

  return (
    <div>
      <h2>Amplify Todos</h2>
      <input
        onChange={(event) => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={(event) => setInput('description', event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <input
        onChange={(event) => setInput('comments', event.target.value)}
        style={styles.input}
        value={formState.comments}
        placeholder="Comments"
      />
      <input
        onChange={(event) => setInput('address', event.target.value)}
        style={styles.input}
        value={formState.address}
        placeholder="Address"
      />
      <input
        onChange={(event) => setInput('newfield', event.target.value)}
        style={styles.input}
        value={formState.newfield}
        placeholder="Newfield"
      />
      <button style={styles.button} onClick={addTodo}>
        Create Todo
      </button>
    </div>
  );
};

export default CreatePage;
