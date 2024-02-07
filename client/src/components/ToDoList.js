import React, { useState, useEffect } from "react";
import { Container, Form, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

export default function ToDoList() {
    const [things, setThings] = useState([]);
    const [myInput, setMyInput] = useState("");

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = () => {
        fetch("http://localhost:5000/ThingToDo")
            .then(response => response.json())
            .then(data => {
                // Map the tasks from the server and set the completion status properly
                const mappedData = data.map(task => ({ ...task, completed: task.completed === 1 }));
                setThings(mappedData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function handleClick() {
        if (myInput !== '') {
            const newThing = {
                name: myInput,
                completed: false
            };

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newThing)
            };

            fetch('http://localhost:5000/addThingToDo', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setThings([...things, data])
                    setMyInput("")
                    window.location.reload();
                });
        } else {
            alert('Input empty')
        }
    }

    function deleteTodo(id) {
        fetch(`/deleteThingToDo/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message);
            window.location.reload();
        })
        .catch(error => {
            console.error('There was a problem with the delete request:', error);
        });
    }

    function toggleCompleted(id) {
        setThings(things.map(prevThing => {
            if (prevThing.id === id) {
                const updatedThing = { ...prevThing, completed: !prevThing.completed };

                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ completed: updatedThing.completed }),
                };

                fetch(`http://localhost:5000/updateCompleted/${id}`, requestOptions)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(() => console.log('Task updated successfully'))
                    .catch(error => console.error('Error updating task:', error));

                return updatedThing;
            } else {
                return prevThing;
            }
        }))
    }

    console.log(things);

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
                                id={`custom-switch-${thing.id}`}
                                label={thing.completed ? "Completed" : "Uncompleted"}
                                onClick={() => toggleCompleted(thing.id)}
                                checked={thing.completed}
                            />
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </Form>
        </Container>
    )
}

