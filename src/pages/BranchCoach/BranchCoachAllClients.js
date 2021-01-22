import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';


import {
    Row,
		Col,
    Card,
    CardBody,
    Input,
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import PageTitle from '../../components/PageTitle';

const defaultSorted = [
    {
        dataField: 'id',
        order: 'asc',
    },
];

const sizePerPageRenderer = ({ options, currSizePerPage, onSizePerPageChange }) => (
    <React.Fragment>
        <label className="d-inline mr-1">Show</label>
        <Input
            type="select"
            name="select"
            id="no-entries"
            className="custom-select custom-select-sm d-inline col-1"
            defaultValue={currSizePerPage}
            onChange={(e) => onSizePerPageChange(e.target.value)}>
            {options.map((option, idx) => {
                return <option key={idx}>{option.text}</option>;
            })}
        </Input>
        <label className="d-inline ml-1">entries</label>
    </React.Fragment>
);

const BranchCoachAllClients = () => {
    const [records, setRecords] = useState([]);


		const linkFormatter=function(){
			return (
					 <a href="/branchcoach/clientdetails">More</a>
				);
		}
    const columns = [
        {
            text: 'Client ID',
            dataField: '_id',
            headerStyle: (colum, colIndex) => {
                return { 'white-space': 'nowrap' };
            },
            sort: true,
        },
        {
            text: 'Name',
            dataField: 'full_name',
            headerStyle: (colum, colIndex) => {
                return { 'white-space': 'nowrap' };
            },
            sort: true,
        },
        {
            text: 'Age',
            dataField: 'age',
            headerStyle: (colum, colIndex) => {
                return { 'white-space': 'nowrap' };
            },
            sort: true,
        },
        {
            text: 'Gender',
            dataField: 'gender',
            headerStyle: (colum, colIndex) => {
                return { 'white-space': 'nowrap' };
            },
            sort: true,
        },
        {
            text: 'Status',
            dataField: 'status',
            headerStyle: (colum, colIndex) => {
                return { 'white-space': 'nowrap' };
            },
            sort: true,
        },
        {
            text: 'Contact',
            dataField: 'phone_number',
            headerStyle: (colum, colIndex) => {
                return { 'white-space': 'nowrap' };
            },
            sort: true,
        },
        {
            text: 'City',
            dataField: 'city',
            headerStyle: (colum, colIndex) => {
                return { 'white-space': 'nowrap' };
            },
            sort: true,
        },
        {
            text: 'Branch Name',
            dataField: 'branchName',
            headerStyle: (colum, colIndex) => {
                return { 'white-space': 'nowrap' };
            },
            sort: true,
        },
        {
            text: 'Mode',
            dataField: 'mode',
            headerStyle: (colum, colIndex) => {
                return { 'white-space': 'nowrap' };
            },
            sort: true,
        },
        {
            text: 'View',
						dataField: 'viewLink',
						formatter: linkFormatter,
            headerStyle: (colum, colIndex) => {
                return { 'white-space': 'nowrap' };
						},
						events: {
							onClick: (e, column, columnIndex, row) => {							
								if(localStorage.getItem('usertype')=== 'coach' && Boolean(localStorage.getItem('token'))){
									localStorage.setItem('currUserId',row._id)
								}
						},},
            sort: true,
        },
    ];

    const { SearchBar } = Search;
    const { ExportCSVButton } = CSVExport;
    useEffect(() => {
        (async () => {
						const result = await axios.get(`http://localhost:8000/api/coach/myClients/${localStorage.getItem('id')}`);
            if (result.data) setRecords(result.data);
        })();
    }, []);


    return (
        <React.Fragment>
            <Row className="page-title">
                <Col className="col-12">
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'SuperAdmin', path: '/superadmin/clientlist/allclients' },
                            { label: 'ClientList', path: '/superadmin/clientlist/allclients' },
                            { label: 'AllClients', path: '/superadmin/clientlist/allclients', active: true },
                        ]}
                        title={'All Clients'}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <ToolkitProvider
                                bootstrap4
                                keyField="id"
                                data={records}
                                columns={columns}
                                search
                                exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
                                {(props) => (
                                    <React.Fragment>
                                        <Row>
                                            <Col>
                                                <SearchBar {...props.searchProps} />
                                            </Col>
                                            <Col className="text-right">
                                                <ExportCSVButton {...props.csvProps} className="btn btn-success">
                                                    Export CSV
                                                </ExportCSVButton>
                                            </Col>
                                        </Row>

                                        <BootstrapTable
                                            {...props.baseProps}
                                            bordered={false}
                                            defaultSorted={defaultSorted}
                                            pagination={paginationFactory({
                                                sizePerPage: 5,
                                                sizePerPageRenderer: sizePerPageRenderer,
                                                sizePerPageList: [
                                                    { text: '5', value: 5 },
                                                    { text: '10', value: 10 },
                                                    { text: '25', value: 25 },
                                                    { text: 'All', value: records.length },
                                                ],
                                            })}
                                            wrapperClasses="table-responsive"
                                        />
                                    </React.Fragment>
                                )}
                            </ToolkitProvider>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default BranchCoachAllClients;
