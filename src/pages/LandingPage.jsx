import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listTodos } from '../graphql/queries';
import { Amplify } from 'aws-amplify'
import awsExports from '../aws-exports.js'
Amplify.configure(awsExports)
import { generateClient } from 'aws-amplify/api';


import '@aws-amplify/ui-react/styles.css';
import { Heading, withAuthenticator,Button } from '@aws-amplify/ui-react';
import EditPage from './EditPage.jsx';
import { updateTodo } from '../graphql/mutations.js';
const LandingPage = ({signOut,user}) => {
  const [todos, setTodos] = useState([]);
  const [selectTodos, setSelectTodos] = useState();
  const [modalopen, setModalOpen] = useState(false);
  console.log("selectTodos",selectTodos)
  const client = generateClient();

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const todoData = await client.graphql({
        query: listTodos
      });
      const todos = todoData.data.listTodos.items;
      console.log("todos data",todos)
      setTodos(todos);
    } catch (err) {
      console.log('Error fetching todos:', err);
    }
  }
   const handleEdit = (selectTodo) => {
    setModalOpen(true)
     setSelectTodos(selectTodo)
  }
 
console.log("todos",todos)
  return (
    <div style={styles.container}>
         <Heading level={1}>Hello {user.username} </Heading>
    <Button onClick={signOut}>Sign out</Button>
      <header>
        <nav>
          <ul style={styles.menu}>
            <li style={styles.listItem}>
              <Link to="/createtodo">CreateTodo</Link>
            </li>
            <li style={styles.listItem}>
              <Link to="/">AllTodos</Link>
            </li>
          </ul>
        </nav>
      </header>

      <div style={styles.todo}>
        {/* <h1>All Todos</h1> */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Description</th>
              <th style={styles.tableHeader}>Comments</th>
              <th style={styles.tableHeader}>Address</th>
              <th style={styles.tableHeader}>NewField</th>
              <th style={styles.tableHeader}>Edit</th>
              {/* Add other headers for different fields if needed */}
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{todo.name}</td>
      <td style={styles.tableCell}>{todo.description}</td>
      <td style={styles.tableCell}>{todo.comments}</td>
      <td style={styles.tableCell}>{todo.address}</td>
      <td style={styles.tableCell}>{todo.newfield}</td>
      <td style={styles.tableCell} onClick={() => handleEdit(todo)}><Link>Edit</Link></td>
                {/* Render other fields within additional <td> tags */}
              </tr>
            ))}
          </tbody>
        </table>
        {modalopen && <EditPage  selectTodo={selectTodos} setModalOpen={setModalOpen} fetchTodos={fetchTodos} onClose={() => setSelectTodos(null)}/> }
      </div>
    </div>
  );
};

const styles = {
  // Your existing styles

  table: {
    borderCollapse: 'collapse',
    width: '100%',
    border: '2px solid #000', // Example border to visualize the table size
  },
  tableHeader: {
    border: '1px solid #ddd',
    padding: '12px', // Adjust padding for header cells
    textAlign: 'left',
    fontWeight: 'bold'
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '12px' // Adjust padding for table cells
  },
  listItem: {
    display: "inline-block",
    padding:"10px"
  }
  // Rest of your styles...
};

export default withAuthenticator (LandingPage);
