import React, { useState, useRef, useEffect } from 'react';

function GenerateEmail() {
    const [tableData, setTableData] = useState([]);
    const tableRef = useRef(null);


    useEffect(() => {
        fetch('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=100')
            .then((response) => response.json())
            .then((data) => {
                setTableData(data);
            })
            .catch((error) => console.error(error));
    }, [])
    const handleCopyClick = (data) => {
        let filterEmail = tableData.filter(email => email !== data);
        setTableData(filterEmail);
        navigator.clipboard.writeText(data);
    };

    const refresh = () => {
        fetch('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=100')
            .then((response) => response.json())
            .then((data) => {
                setTableData(data);
            })
            .catch((error) => console.error(error));
    }
    return (
        <div className="container">
            <div className="header">
                <h2 className="text-green">Email List</h2>
                <a href="/"> <button className="button" >Token List</button></a>
                <p>Sign Up Link: <a target="blank" href="https://plagiarismcheck.org/"><b>https://plagiarismcheck.org/</b></a></p>
                <p>Get Token Link: <a target="blank" href="https://plagiarismcheck.org/for-developers/"><b>https://plagiarismcheck.org/for-developers/</b></a></p>
            </div>
            <div className="header">
                <button onClick={refresh}>Refresh email <b>&#8634;</b></button>
            </div>
            {tableData.length > 0 && <table className="table" ref={tableRef}>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((data, index) => (
                        <tr key={index}>
                            <td>{data}</td>
                            <td>
                                <button className="button" onClick={() => handleCopyClick(data)}>Copy</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>}
            
            <br />
            <br />
        </div>
    );
}

export default GenerateEmail;
