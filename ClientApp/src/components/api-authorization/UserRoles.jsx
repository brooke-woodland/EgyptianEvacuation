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
}
