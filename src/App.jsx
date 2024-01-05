import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Amplify } from 'aws-amplify'
import awsExports from './aws-exports.js'
Amplify.configure(awsExports)

import { generateClient } from 'aws-amplify/api';

import { createTodo, updateTodo } from './graphql/mutations';
import { listTodos } from './graphql/queries';
import { withAuthenticator, Button, Heading,Link } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import CreatePage from './pages/CreatePage.jsx'


const App = ({signout,user}) => {
  
  const handleUpdate = async (updatedTodo) => {
    console.log("todos",todos)
    console.log("updatedTodo",updatedTodo)
    try {
     
  
      const updatedTodos = todos.map(todo => {
        if (todo.id === updatedTodo) {
          return updatedTodo; // Replace the todo with the updated version
        }
        return todo; // For other todos, return as is
      });
  console.log("updatedTodos",updatedTodos)
  console.log("updateTodo",updateTodo)
      setTodos(updatedTodos);
      
      await client.graphql({
        query: updateTodo,
        variables: {
          input: todos
        }
      });
    } catch (err) {
      console.log('Error updating todo:', err);
    }
  }
  

  const list = ["CreateTodo","AllTodos"]
  console.log("list",list)
  return (
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/createtodo' element={<CreatePage/>}/>

     
    </Routes>

  );
      }
   
      
      export default withAuthenticator(App);