import React, { useEffect, useState } from 'react';
import "./Todo.css"

function Todo() {
  const [data, setData] = useState([]);
  const [item, setItem] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(()=>{
    setData(JSON.parse(localStorage.getItem("toDoData")) || [])
  },[])
  const addItem = (e) => {
    e.preventDefault();
    if(!item){
        alert("its cant be empty")
        return
    }    
    if(data.find(it => it===item)){
        alert("already exist")
        return
    }
    setData([...data, item]);
    setItem('');
    localStorage.setItem("toDoData",JSON.stringify([...data, item]))
    return
  };

  const editItem = (index) => {
    const currentItem = data[index];
    setItem(currentItem);
    setEditingIndex(index);
    setIsEditing(true);
  };

  const saveItem = (e) => {
    e.preventDefault()
    const newData = [...data];
    newData[editingIndex] = item;
    setData(newData);
    localStorage.setItem("toDoData",JSON.stringify(newData))
    setItem('');
    setEditingIndex(-1);
    setIsEditing(false);
  };

  const deleteItem = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    localStorage.setItem("toDoData",JSON.stringify(newData))
    setItem('')
  };

  return (
    <div className="todo-container">
        <h2>Todo list</h2>
      <div className="todo">
        <form onSubmit={isEditing ? saveItem : addItem}>
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          {isEditing ? (
            <button type="submit">Save</button>
          ) : (
            <button type="submit">Add</button>
          )}
        </form>
      </div>
      <div className="show-item">
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <span>{item}</span>
              <button onClick={() => editItem(index)}>Edit</button>
              <button onClick={() => deleteItem(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      </div>

)
}
export default Todo
