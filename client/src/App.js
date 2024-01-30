import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDoList from './components/ToDoList';
import "./App.css";
import NavBar from './components/NavBar';

function App() {
  return (
    <div className='app'>
      <NavBar />
      <body>
        <ToDoList />
      </body>
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