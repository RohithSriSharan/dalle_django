import {useState, useEffect} from 'react'
import './App.css';

function App() {

  const[imageurl, setImageUrl] = useState('')
  const [connection, setConnection] = useState("")
  const [text, setText ] = useState('')

  fetch("http://127.0.0.1:8000/")
  .then(response => response.json())
  .then(data=> setConnection(data.connection))
  .catch(error => console.error(error))

  const handleChange = (event) => {
    setText(event.target.value)
  };
  const handleSubmit = (e) =>{
    e.preventDefault();

    const response = fetch("http://127.0.0.1:8000/", {
      method:'POST',
      headers : {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(text)
      
    })
    .then((response) => response.json())
    .then((data) => {setImageUrl(data.url) ; 
      console.log(data.url);})
    .catch((error) => console.error(error))

    
  }

  return (
    <div className="App">
          <h1>Connection: {connection}</h1>

          <form onSubmit={handleSubmit}>
            <input name='prompt' value={text} onChange={handleChange}></input>
            <button> Submit </button>
          </form>
          <img src={imageurl} alt='dalle'></img>
    </div>
  );
}

export default App;
