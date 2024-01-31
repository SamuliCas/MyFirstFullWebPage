import React, { useState, useEffect } from "react";
import { Container, Form, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

export default function ToDoList () {
    const [things, setThings] = useState([]);
    const [myInput, setMyInput] = useState("");
  
    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = () => {
      fetch("http://localhost:5000/ThingToDo")
        .then(response => response.json())
        .then(data => setThings(data))
        .catch(error => console.error('Error fetching data:', error))
    }

    function handleClick() {
      if(myInput !== '') {
        const newThing = {
          name: myInput,
          completed: false
        };

          // Update the local state first
          setThings([...things, newThing]);
        
          const reguestOptions = {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify(newThing)
          };
          
          fetch('http://localhost:5000/addThingToDo', reguestOptions)
            .then(response => response.json())
            .then(data => {
              console.log('New task added successfully:', data);
            })
            .catch(error => {
              // If there's an error with the API call, you might want to handle it
              console.error('Error adding new task:', error);
            });  

            // Clear the input field
            setMyInput("")
            } else {
              alert('Input empty')
      }
    }

    function deleteTodo(id) {
      setThings(things.filter(thing => thing.id !== id));
    }

    function toggleCompleted (id) {
        setThings(things.map(prevThing => {
            if (prevThing.id === id) {
                return {...prevThing, completed: !prevThing.completed}
            }else {
                return prevThing;
            } 
        }))
    }

    console.log(things)

    return (    
        <Container className="todo-container">
        <Form className="todo-list">
          <h1 className="todo-title">To-Do List</h1>
          <input
            type="text"
            value={myInput}
            placeholder="Add To-do here"
            onChange={(e) => setMyInput(e.target.value)}
            className="form-control mb-3"
          />
          <Button onClick={handleClick} variant="primary" className="mb-3">Add new thing</Button>
          <ListGroup variant="flush" className="todo-item">
            {things.map((thing) => (
                <ListGroupItem key={thing.id} className="todo-listgroup" >{thing.name}
                <Button onClick={() => deleteTodo(thing.id)} variant="danger" className="ml-2">&times;</Button>
                <Form.Check 
                    type="switch"
                    id="custom-switch"
                    label={thing.completed ? "Completed" : "Uncompleted"}
                    onClick={() => toggleCompleted(thing.id)}
                />
                </ListGroupItem>
            ))}
          </ListGroup>
        </Form>
      </Container>
    )
}