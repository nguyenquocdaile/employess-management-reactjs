import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Table from './components/Table/Table';
import './App.css';


function App() {
  const [employees, setEmployees] = useState([])
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    async function getData() {
      await axios
        .get('https://60b1b78b62ab150017ae121c.mockapi.io/employees')
        .then((response) => {
          console.log(response.data);

          setEmployees(response.data)
          setLoadingData(false);
        });
    }
    if (loadingData) {
      getData();
    }
  }, [])

  const columns = useMemo(
    () => [
      {
        Header: 'Employess',
        columns: [
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Email',
            accessor: 'email',
          },
          {
            Header: 'Position',
            accessor: 'Position',
          },
        ],
      }
    ],
    []
  )

  return (

    <div className="App">
      {
        loadingData ? 
          (<p>Loading Please wait...</p>) 
        : 
          ( <Table columns={columns} data={employees} />)
      }
    </div>
  );
}

export default App;
