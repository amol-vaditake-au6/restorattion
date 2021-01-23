import React,{useState,useEffect} from 'react';
import Axios from 'axios';
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

const AllBranches = () => {

		const [records,setRecords]=useState([])
    const { SearchBar } = Search;
    const { ExportCSVButton } = CSVExport;
		useEffect(() => {
    (async () => {
        const result = await Axios.get(
            "https://dry-falls-55056.herokuapp.com/api/sAdmin/branches"
				);
				let myResults = result?.data?.filter(b=>b.adminId===localStorage.getItem('id'))
				if(myResults)setRecords(myResults);
    })();
    }, []);		


	 const columns = [
				{
						text: 'Branch ID',
						dataField: '_id',
						headerStyle: (colum, colIndex) => {
								return { 'white-space': 'nowrap' };
						},
						sort: true,
				},
				{
						text: 'Name',
						dataField: 'name',
						headerStyle: (colum, colIndex) => {
								return { 'white-space': 'nowrap' };
						},
						sort: true,
				},
				{
						text: 'GPS Location',
						dataField: 'GPSlocation',
						headerStyle: (colum, colIndex) => {
								return { 'white-space': 'nowrap' };
						},
						sort: true,
				},
				{
						text: 'Address',
						dataField: 'address',
						headerStyle: (colum, colIndex) => {
								return { 'white-space': 'nowrap' };
						},
						sort: true,
				},
				{
						text: 'District',
						dataField: 'district',
						headerStyle: (colum, colIndex) => {
								return { 'white-space': 'nowrap' };
						},
						sort: true,
				},
				{
						text: 'State',
						dataField: 'state',
						headerStyle: (colum, colIndex) => {
								return { 'white-space': 'nowrap' };
						},
						sort: true,
				},
				{
						text: 'Admin',
						dataField: 'adminName',
						headerStyle: (colum, colIndex) => {
								return { 'white-space': 'nowrap' };
						},
						sort: true,					
				},
				{
						text: 'Contact',
						dataField: 'adminContact',
						headerStyle: (colum, colIndex) => {
								return { 'white-space': 'nowrap' };
						},
						sort: true,
				},
				{
						text: 'Active Clients',
						dataField: 'active_clients',
						sort: true,
				},
				{
						text: 'Coaches',
						dataField: 'coaches',
						headerStyle: (colum, colIndex) => {
								return { 'white-space': 'nowrap' };
						},
						sort: true,
				},
		];

		const defaultSorted = [
				{
						dataField: 'id',
						order: 'asc',
				},
		];

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col className="col-12">
                    <PageTitle
                        breadCrumbItems={[]}
                        title={'All Branches'}
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
																deleteRow={ true }
                                exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
                                {(props) => (
                                    <React.Fragment>
                                        <Row>
                                            <Col>
                                                <SearchBar {...props.searchProps} />
                                            </Col>
                                            <Col className="text-right">
                                              <ExportCSVButton {...props.csvProps} className="btn btn-primary">
                                                    Export CSV
                                              </ExportCSVButton>
                                            </Col>
                                        </Row>
                                        {records.length ?
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
                                                    { text: 'All', value: records?.length || 0 },
                                                ],
                                            })}
                                            wrapperClasses="table-responsive"
                                        />:<h3 style={{textAlign:'center'}}>No Branches Found</h3>}
                                    </React.Fragment>
                                )}
                            </ToolkitProvider>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
						<Row>
						</Row>
        </React.Fragment>
    );
};

export default AllBranches;
