import React, { useEffect, useState } from 'react';
const urlPrefix = process.env.REACT_APP_API_URL;
const CreateToken = () => {
    const [inputValue, setInputValue] = useState('');
    const [tableData, setTableData] = useState([]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(urlPrefix+'/addToken', {
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
        fetch(urlPrefix+'/tokens')
            .then((response) => response.json())
            .then((data) => {
                setTableData(data.map(token => { return { id: token._id, token: token.token } }));
            })
            .catch((error) => console.error(error));
    }, [])

    const handleDelete = (id) => {
        fetch(urlPrefix+`/deleteToken/${id}`, {
            method: 'DELETE'
        })
            .then((response) => response.json())
            .then((data) => {
                if(data){
                    let newFormData = tableData.filter(el => el.id !== id)
                    setTableData(newFormData);
                }
            })
            .catch((error) => console.error(error));
    };
    return (
        <div className="container">
            <div className="header">
                <h2 className="text-green">Token Generator</h2>
                {tableData.length > 0 && <p><b>Active Token:</b> <b className="text-red">{tableData.length}</b></p>}
                
            </div>
            <a href="/email" target="_blank"> <button className="button" >Get Email</button></a>
            <div>

                <p>Get Random Token on: <a target="blank" href={urlPrefix}><b>{urlPrefix}</b></a></p>

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
            </table> : <></>}
            <br />
            <br />
        </div>
    );
};

export default CreateToken;