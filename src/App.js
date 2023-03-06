import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [tableData, setTableData] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://token-generator-server.vercel.app/addToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: inputValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        let newFormData = [...tableData, { id: data.insertedId, token: inputValue }]
        setTableData(newFormData);
        setInputValue('');
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    fetch('https://token-generator-server.vercel.app/tokens')
      .then((response) => response.json())
      .then((data) => {
        setTableData(data.map(token => { return { id: token._id, token: token.token } }));
      })
      .catch((error) => console.error(error));
  }, [tableData, setTableData])

  const handleDelete = (id) => {
    fetch(`https://token-generator-server.vercel.app/deleteToken/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((data) => {
        let newFormData = tableData.filter(el => el.id !== id) 
        setTableData(newFormData);
        setInputValue('');
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="container">
      <div>
        <h2 className="header">Token Generator</h2>
        <p>Get Random Token on: <a target="blank" href="https://token-generator-server.vercel.app/"><b>https://token-generator-server.vercel.app/</b></a></p>
      </div>
      <form onSubmit={handleSubmit}>
        <label className="label">
          <b>Add Token: </b>
          <input className="input" type="text" value={inputValue} onChange={handleInputChange} />
        </label>
        <button disabled={inputValue === ''} className={inputValue === '' ? "button-gray" : "button"} type="submit">Submit</button>
      </form>
      {tableData.length > 0 ? <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Token ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.token}</td>
              <td><button onClick={() => handleDelete(data.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table> :<></>}
      
    </div>
  );
}

export default App;
