import React,{useState,useEffect} from 'react';
import { Button ,Modal,Form} from 'react-bootstrap';
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
import PageTitle from '../../../components/PageTitle';



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
            "https://restoration-backend.herokuapp.com/api/sAdmin/branches"
        );
        if(result)setRecords(result.data);
    })();
    }, []);
		const [show, setShow] = useState(false);
		const [showAdmin, setShowAdmin] = useState(false);
		const [formData, setFormData] = useState({});

		const handleClose = () => {
			setShow(false)
			setShowAdmin(false)       
		};

		const submitForm = async() => {
			const { GPSlocation, address, district, state, adminName='Click To Allocate', adminContact, email,name} = formData;
        if (!GPSlocation || !address || !district || !state || !adminName || !adminContact || !email || !name){
					alert('Fill all the Fields')
					return
				}
			try {
				await Axios.post(`https://restoration-backend.herokuapp.com/api/sAdmin/newBranch`,{...formData})				
				setShow(false)
				if(formData._id){
					alert('Branch Updated')
				}else{
				  alert('Branch Added')
				}
				window.location.reload()
			}catch(err){
         alert('Match Failed duplicate name Found ')
			}       
		};

	 const submitFormAdmin = async() => {
			if( formData.password !== formData.confirmPassword ){
				alert('Password Not Matched Please Enter Again')
				return
			}
			setShowAdmin(false)       
		};

		const handleShow = () => {
			setShow(true)       
		};

		const handleShowAdmin = () => {
			setShowAdmin(true)       
		};

		const handleFormData = e => {
      setFormData({ ...formData,[e.target.name]: e.target.value });
		};
		
		const deleteFormatter=function(){
			return (
					<Button>Delete</Button>
				);
		}

		const editFormatter=function(){
			return (
					<Button>Edit</Button>
				);
		}

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
						text: 'Location',
						dataField: 'location',
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
				{
						text: 'Edit',
						dataField: 'Edit',
						formatter: editFormatter,
						sort: true,
						events:{
							onClick: async(e, column, columnIndex, row) => {							
							if(localStorage.getItem('usertype')==='superadmin'){
							  let res = await Axios.get(`https://restoration-backend.herokuapp.com/api/sAdmin/getBranch/${row._id}`)
			          if(res.data){
									setFormData(res.data)
									setShow(true)
								}
							}else{
								alert('You are Not Super Admin')
							}
						}},
				},
				{
						text: 'Delete',
						dataField: 'Delete',
						formatter: deleteFormatter,
						sort: true,
						events:{
							onClick: async(e, column, columnIndex, row) => {							
							if(localStorage.getItem('usertype')==='superadmin'){
							  let res = await Axios.post(`https://restoration-backend.herokuapp.com/api/sAdmin/deleteBranch/${row._id}`)
			          if(res.data.massage === 'done'){
									alert('Deleted Branch')
									window.location.reload()
								}
							}else{
								alert('You are Not Super Admin')
							}
						}},
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
                        breadCrumbItems={[
                            { label: 'SuperAdmin', path: '/superadmin/branchcoach/allbranches' },
                            { label: 'ClientList', path: '/superadmin/branchcoach/allbranches' },
                            { label: 'AllClients', path: '/superadmin/branchcoach/allbranches', active: true },
                        ]}
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
                                        />
                                    </React.Fragment>
                                )}
                            </ToolkitProvider>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
						<Row>
						<Col className="text-right">
							  <button className="btn btn-primary" onClick={handleShowAdmin} style={{marginRight:'20px'}}>
                  Add New Admin
                </button>
                <button className="btn btn-primary" onClick={handleShow}>
                  Add New Branch
                </button>
            </Col>
						<Modal show={show} onHide={handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>Add New Coach</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Form>
									<Form.Row>
										<Row>
											<Col>
											  <Form.Label>Branch Name</Form.Label>
											  <Form.Control value={formData.name} required onChange={handleFormData} name="name" placeholder="Name" />
										  </Col>
											<Col>
											  <Form.Label>Admin Name</Form.Label>
											  <Form.Control value={formData.adminName} required onChange={handleFormData} name="adminName" placeholder="Name" />
										  </Col>
										</Row>
										<Row>
											<Col>
											<Form.Label>Emails Id</Form.Label>
											<Form.Control required  name="email" onChange={handleFormData} value={formData.email} placeholder="Email" />
											</Col>
											<Col>
												<Form.Label>Contact Number</Form.Label>
												<Form.Control required  type='number' name="adminContact" value={formData.adminContact} onChange={handleFormData} placeholder="Contact Number" />
											</Col>
										</Row>
										<Row>
											<Col>
											<Form.Label>District</Form.Label>
											<Form.Control value={formData.district} required name='district' onChange={handleFormData} placeholder="District" />
											</Col>
											<Col>
												<Form.Label>State</Form.Label>
												<Form.Control value={formData.state} required name='state' onChange={handleFormData} placeholder="State" />
											</Col>
										</Row>
										<Row>
											<Col>
											<Form.Label>Location</Form.Label>
											<Form.Control required value={formData.GPSlocation} name='GPSlocation' onChange={handleFormData} placeholder="Gps Location" />
											</Col>
											<Col>
											  <Form.Label>Addreess</Form.Label>
												<Form.Control value={formData.address} required onChange={handleFormData} name="address" placeholder="Addreess" />
											</Col>
										</Row>
									</Form.Row>
								</Form>								
							</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" onClick={handleClose}>
									Cancel
								</Button>
								<Button variant="primary" onClick={submitForm}>
									Submit
								</Button>
							</Modal.Footer>
						</Modal>
						<Modal show={showAdmin} onHide={handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>Add New Coach</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Form>
									<Form.Row>
										<Row>
											<Col>
											  <Form.Label>Admin Name</Form.Label>
											  <Form.Control required onChange={handleFormData} name="name" placeholder="Name" />
										  </Col>
											<Col>
											  <Form.Label>Admin Id</Form.Label>
											  <Form.Control required onChange={handleFormData} name="adminName" placeholder="ID" />
										  </Col>
										</Row>
										<Row>
											<Col>
											<Form.Label>Password</Form.Label>
											<Form.Control required type='password' name="password" onChange={handleFormData} placeholder="password" />
											</Col>
											<Col>
											<Form.Label>Confirm Password</Form.Label>
											<Form.Control required type='password' name="confirmPassword" onChange={handleFormData} placeholder="confirm password" />
											</Col>
										</Row>
									</Form.Row>
								</Form>								
							</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" onClick={handleClose}>
									Cancel
								</Button>
								<Button variant="primary" onClick={submitFormAdmin}>
									Submit
								</Button>
							</Modal.Footer>
						</Modal>
						</Row>
        </React.Fragment>
    );
};

export default AllBranches;
