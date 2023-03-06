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
        let filterEmail = tableData.filter(email=> email !== data);
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
            <div>
                <h2 className="header">Email List</h2>
                <a href="/"> <button className="button" >Token List</button></a>
            </div>
            <table className="table" ref={tableRef}>
                <thead>
                    <tr>
                        <th>Email <button className="button-refresh" onClick={refresh} ><b>&#8634;</b></button></th>
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
            </table>
            <br />
            <br />
        </div>
    );
}

export default GenerateEmail;
