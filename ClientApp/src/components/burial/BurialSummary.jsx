import React, { useState, useEffect } from 'react';
import authService from '../api-authorization/AuthorizeService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import BurialPopup from './BurialPopup';
//import { MultiSelect } from 'primereact/multiselect';
//import '../burial.css';

export default function FetchData() {
    const [burialData, setBurialData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        burialMainId: { value: null, matchMode: FilterMatchMode.EQUALS },
        burialNumber: { value: null, matchMode: FilterMatchMode.EQUALS },
        depth: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        deathAge: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        headDirection: { value: null, matchMode: FilterMatchMode.IN },
        squareNorthSouth: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        northSouth: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        squareEastWest: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        eastWest: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        area: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        hairColor: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        estimateStature: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        color: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        structure: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        sex: { value: null, matchMode: FilterMatchMode.EQUALS },
    });

    useEffect(() => {
        async function fetchData() {
            const token = await authService.getAccessToken();
            const response = await fetch('api/burial-data', {
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
            id: newData.burialMainId,
            depth: newData.depth,
            deathAge: newData.deathAge,
            headDirection: newData.headDirection,
            squareNorthSouth: newData.squareNorthSouth,
            northSouth: newData.northSouth,
            squareEastWest: newData.squareEastWest,
            eastWest: newData.eastWest,
            area: newData.area,
            burialNumber: newData.burialNumber,
            hairColor: newData.hairColor
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
        fetch("/api/burial-data", requestOptions)
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
                    <Column
                        field="burialMainId" header="Burial Id" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} sortable
                        body={(rowData) => <BurialPopup rowData={rowData} />}
                    ></Column>
                    <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} alignFrozen="right" editor={(options) => textEditor(options)}></Column>
                    <Column field="burialNumber" header="Burial Number" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} sortable editor={(options) => textEditor(options)} />
                    <Column field="depth" header="Depth" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} sortable editor={(options) => textEditor(options)} />
                    <Column field="deathAge" header="Death Age" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} sortable editor={(options) => textEditor(options)} />
                    <Column field="headDirection" header="Head Direction" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} sortable editor={(options) => textEditor(options)} />
                    <Column field="squareNorthSouth" header="Square North South" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} sortable editor={(options) => textEditor(options)} />
                    <Column field="northSouth" header="North South" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} sortable editor={(options) => textEditor(options)} />
                    <Column field="squareEastWest" header="Square East West" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} sortable editor={(options) => textEditor(options)} />
                    <Column field="eastWest" header="East West" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} sortable editor={(options) => textEditor(options)} />
                    <Column field="area" header="Area" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} sortable editor={(options) => textEditor(options)} />
                    <Column field="hairColor" header="Hair Color" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} sortable editor={(options) => textEditor(options)} />
                    <Column field="estimateStature" header="Estimate Stature" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} sortable />
                    <Column field="color" header="Color" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} sortable />
                    <Column field="structure" header="Structure" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} sortable />
                    <Column field="sex" header="Sex" filter filterPlaceholder="Search" style={{ minWidth: '12rem' }} sortable />

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
            <h1 id="tabelLabel">Burial Data</h1>
            <p>This is all the data currently available from past findings.</p>
            {contents}
        </div>
    );
}
