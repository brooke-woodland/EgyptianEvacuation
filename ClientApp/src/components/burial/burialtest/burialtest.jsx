import React, { useState } from 'react';
import data from './NewMovieData.json';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import '../burial.css';
import BurialPopup from '../BurialPopup';

const dataSample = data.MovieData;

export default function BurialTest() {
  const movieList = dataSample;
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  return (
    <div>
      <div className="d-flex align-items-center">
        <h1 className="col-9">Joel Hilton's Movie Collection</h1>
        <InputText
          className="col-3"
          type="search"
          placeholder="Search"
          onInput={(e) =>
            setFilters({
              ...filters,
              global: {
                value: e.target.value,
                matchMode: FilterMatchMode.CONTAINS,
              },
            })
          }
        />
      </div>
      <div>
        <DataTable
          value={movieList}
          sortMode="multiple"
          filters={filters}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          totalRecords={movieList.length}
        >
          <Column
            field="Title"
            header="Title"
            sortable
            body={(rowData) => <BurialPopup rowData={rowData} />}
          ></Column>
          <Column field="Year" header="Year" sortable></Column>
          <Column field="Director" header="Director" sortable></Column>
          <Column field="Rating" header="Rating" sortable></Column>
          <Column field="Category" header="Category" sortable></Column>
          <Column field="Edited" header="Edited" sortable></Column>
        </DataTable>
      </div>
    </div>
  );
}
