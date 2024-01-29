import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button } from 'react-bootstrap';

function App() {
  const [things, setThings] = useState([]);
  const [myInput, setMyInput] = useState("");

  function handleClick() {
    const newThing = {
      id: things.length,
      name: myInput,
    };
    if(myInput !== '') {
    setThings((prevThings) => [...prevThings, newThing]);
    setMyInput("");
    } else {
      alert('Input empty')
    }
  }

  function deleteTodo(id) {
    const newThings = things.filter((thing) => thing.id !== id);
    setThings(newThings);
  }
  
  return (
    <div>
      <Container>
        <Form>
          <h1>To-Do List</h1>
          <input
            type="text"
            value={myInput}
            placeholder="Add To-do here"
            onChange={(e) => setMyInput(e.target.value)}
          />
          <Button onClick={handleClick}>Add new thing</Button>
          <ul>
            {things.map((thing, index) => (
              <div key={index}>
                <li>{thing.name}</li>
                <Button onClick={() => deleteTodo(thing.id)}>&times;</Button>
              </div>
            ))}
          </ul>
        </Form>
      </Container>
    </div>
  );
}

export default App;


//State to store data fethced from backend
// const [backendData, setBackendData] = useState([{}])
//Fetch data from the backend
// useEffect(() => {
//   fetch("/todo")
//     .then(response => response.json())
//     .then(data => {
//       setBackendData(data);
//     })
//     .catch(error => {
//       console.error("Error fetching data:", error);
//     });
// }, []);