import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Todo from './components/Todo';

function App(props) {
  return (
    <Routes>
      <Route path='/' element={<Todo/>}/>
    </Routes>
  );
}

export default App;