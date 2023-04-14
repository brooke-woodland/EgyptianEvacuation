import React, { useState, useEffect } from 'react';
import authService from '../api-authorization/AuthorizeService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import BurialPopup from './RolePopup';
//import { MultiSelect } from 'primereact/multiselect';
//import '../burial.css';

export default function FetchData() {
    const [burialData, setBurialData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        userName: { value: null, matchMode: FilterMatchMode.EQUALS },
        phoneNumber: { value: null, matchMode: FilterMatchMode.EQUALS },
        roleName: { value: null, matchMode: FilterMatchMode.EQUALS },
    });

    useEffect(() => {
        async function fetchData() {
            const token = await authService.getAccessToken();
            const response = await fetch('api/role-data', {
                headers: !token ? {} : { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setBurialData(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    const postData = async (newData) => {
        const postData = {
            id: String(newData.id),
            userName: newData.userName,
            roleName: newData.RoleName,
        }
        const raw = JSON.stringify(postData);
        console.log("Raw: " + raw);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const token = await authService.getAccessToken();
        if (token) {
            myHeaders.append("Authorization", `Bearer ${token}`);
        }

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("/api/role-data", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        /*
        const token = await authService.getAccessToken();
        const response = await fetch('api/burial-data', {
            method: 'POST',
            headers: !token
                ? {}
                : {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            body: raw,
        });
        const data = await response.json();
        console.log(data);
        */
    };

    const onRowEditComplete = (e) => {
        let _burialData = [...burialData];
        let { newData, index } = e;

        _burialData[index] = newData;

        setBurialData(_burialData);

        // Update DB
        postData(newData);
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    function renderBurialTable(burialData) {
        return (
            <div className="App">
                <DataTable editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete}
                    value={burialData} paginator removableSort sortMode="multiple" rows={5} rowsPerPageOptions={[5, 10, 25, 50]} totalRecords={burialData.length} filters={filters} filterDisplay="row" className="rounded shadow">
                    <Column field="userName" header="User Name" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} sortable editor={(options) => textEditor(options)} />
                    <Column field="phoneNumber" header="User Name" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} sortable editor={(options) => textEditor(options)} />
                    <Column field="roleName" header="Role Name" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} sortable editor={(options) => textEditor(options)} />
                    <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} alignFrozen="right" editor={(options) => textEditor(options)}></Column>
                </DataTable>
            </div>
        );
    }

    let contents = loading ? (
        <p>
            <em>Loading...</em>
        </p>
    ) : (
        renderBurialTable(burialData)
    );

    return (
        <div>
            <h1 id="tabelLabel">User Roles</h1>
            <p>Here are the current users.</p>
            {contents}
        </div>
    );
}


/*
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';

export default function UserRoles() {
  const [UserData, setUserData] = useState([]);

  useEffect(() => {
    fetch('https://localhost:5001/approles/GetRoles')
      .then((response) => response.json())
      .then((UserData) => setUserData(UserData));
  }, []);

  return (
    <>
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>UserName</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {UserData.map((data) => (
              <tr key={data.Id}>
                <td>{data.userName}</td>
                <td>{data.RoleName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DataTable
        value={UserData}
        globalFilterFields={['userName', 'RoleName']}
        sortMode="multiple"
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        totalRecords={UserData.length}
      >
        <Column field="userName" header="Title" sortable></Column>
        <Column field="RoleName" header="Year" sortable></Column>
      </DataTable>
    </>
  );
}*/
