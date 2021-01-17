import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import { Button ,Modal} from 'react-bootstrap';

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
import PageTitle from '../../../components/PageTitle';

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

const AllClients = () => {
	
		const [records,setRecords]=useState([])
		
		const [userId,setUserId]=useState('')
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
						text: 'Coach',
						dataField: 'coachName',
						headerStyle: (colum, colIndex) => {
								return { 'white-space': 'nowrap' };
						},
						sort: true,
						events: {
						onClick: (e, column, columnIndex, row) => {
							if(localStorage.getItem('usertype')==='branchadmin'){														
							 setUserId(row._id);
							 handleShowCoach()	
							}
						},}
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
						events: {
						onClick: (e, column, columnIndex, row) => {							
							if(localStorage.getItem('usertype')==='superadmin'){
							setUserId(row._id);
							handleShow()
							}
						},
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
		];
    const { SearchBar } = Search;
		const { ExportCSVButton } = CSVExport;
		const [branchOptions, setBranchOptions] = useState([{label:'Choose',value:'choose'}]);
		const [coachOptions, setCoachOptions] = useState([{label:'Choose',value:'choose'}]);

    useEffect(() => {
    (async () => {
        const result = await Axios.get(
            "https://restoration-backend.herokuapp.com/api/newClients"
				);
				const branches = await Axios.get(
            "https://restoration-backend.herokuapp.com/api/sAdmin/branches"
				);
				const coaches = await Axios.get(
            "https://restoration-backend.herokuapp.com/api/sAdmin/coaches"
        );
				if(result){
					let newClients=result.data.filter(a=>a.branchName==='Click To Allocate')
					setRecords(newClients)
				};
				let branchOptionsAll;
				if(branches) branchOptionsAll = branches?.data?.map(a=>{return {value:a._id,label:a.adminName}})
				if(branchOptionsAll.length){
					branchOptionsAll.unshift({label:'Choose',value:''})
					setBranchOptions(branchOptionsAll)
				}
				let coachOptionsAll;
				if(coaches) coachOptionsAll = coaches?.data?.map(a=>{return {value:a._id,label:a.full_name}})
				if(coachOptionsAll.length){
					coachOptionsAll.unshift({label:'Choose',value:''})
					setCoachOptions(coachOptionsAll)
				}
    })();
		}, []);

		const [show, setShow] = useState(false);
		const [showCoach, setShowCoach] = useState(false);
		const [branchId, setBranchId] = useState();
		const [coachId, setCoachId] = useState();
		const [branchName, setBranchName] = useState();
		const [coachName, setCoachName] = useState();

		const handleChangeee=(e)=>{
			let index = e.nativeEvent.target.selectedIndex;
			let label = e.nativeEvent.target[index].text;
			setBranchId(e.target.value)
			setBranchName(label)			
		}

		const handleChangeCoach=async(e)=>{
			let index = e.nativeEvent.target.selectedIndex;
      let label = e.nativeEvent.target[index].text;
			setCoachId(e.target.value)
			setCoachName(label)			
		}

    const submitBranch = async() => {
			await Axios.post(`https://restoration-backend.herokuapp.com/api/sAdmin/allocateBranch/${userId}/${branchId}/${branchName}`)
			setShow(false)       
		};

    const handleCloseCommon = async() => {
			setShow(false)  
			setShowCoach(false)      
		};

		const submitCoach = async() => {
			await Axios.post(`https://restoration-backend.herokuapp.com/api/sAdmin/allocateCoach/${userId}/${coachId}/${coachName}`)
			setShowCoach(false)       
		};
		const handleShow = () => setShow(true);
		const handleShowCoach = () => setShowCoach(true);
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
                                                <ExportCSVButton {...props.csvProps} className="btn btn-primary">
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
						 <>
						<Modal show={show} onHide={handleCloseCommon}>
							<Modal.Header closeButton>
								<Modal.Title>Allocate Branch</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<label>Select Branch </label>
								{branchOptions.length ? 
								<select onChange={handleChangeee}>
								{branchOptions.map((option) => (
									<option value={branchId}>{option.label}</option>
								))}
              </select>:<div>No branches Availabel</div>}
								
							</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" onClick={handleCloseCommon}>
									Close
								</Button>
								<Button variant="primary" onClick={submitBranch}>
									Allocate Branch
								</Button>
							</Modal.Footer>
						</Modal>
						<Modal show={showCoach} onHide={handleCloseCommon}>
							<Modal.Header closeButton>
								<Modal.Title>Allocate Coach</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<label>Select Coach </label>
								{coachOptions.length ? <select onChange={handleChangeCoach}>
								{coachOptions.map((option) => (
									<option value={option.value}>{option.label}</option>
								))}
              </select>:<div>No coaches Availabel</div>}
								
								</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" onClick={handleCloseCommon}>
									Close
								</Button>
								<Button variant="primary" onClick={submitCoach}>
									Allocate Coach
								</Button>
							</Modal.Footer>
						</Modal>
    </>
        </React.Fragment>
    );
};

export default AllClients;