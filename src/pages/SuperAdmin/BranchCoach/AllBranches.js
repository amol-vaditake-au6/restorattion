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
		const [adminOptions, setAdminOptions] = useState([]);
    const { SearchBar } = Search;
    const { ExportCSVButton } = CSVExport;
		useEffect(() => {
    (async () => {
        const result = await Axios.get(
            "https://dry-falls-55056.herokuapp.com/api/sAdmin/branches"
        );
				if(result)setRecords(result.data);
				
				const admins = await Axios.get(
            "https://dry-falls-55056.herokuapp.com/api/sAdmin/getAdmins"
				);

				let adminOptionsAll;
				if(admins) adminOptionsAll = admins?.data?.map(a=>{return {value:a._id,label:a.userName}})
				if(adminOptionsAll.length){
					adminOptionsAll.unshift({label:'Choose',value:''})
					setAdminOptions(adminOptionsAll)
				}
    })();
    }, []);
		const [show, setShow] = useState(false);
		const [showAdmin, setShowAdmin] = useState(false);
		const [formData, setFormData] = useState({});

		const handleClose = () => {
			setShow(false)
			setShowAdmin(false) 
			setAllocateAdmin(false)      
		};

		const submitForm = async() => {
			const { GPSlocation, address, district, state, adminName='Click To Allocate', email,name} = formData;
        if (!GPSlocation || !address || !district || !state || !adminName ||  !email || !name){
					alert('Fill all the Fields')
					return
				}
			try {
				await Axios.post(`https://dry-falls-55056.herokuapp.com/api/sAdmin/newBranch`,{...formData})				
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
			const { userName ,adminName, password,adminContact} = formData;
			if (!userName ||!adminName|| !password || !adminContact) {
					alert('Fill All the Fileds')
					return
			} 
			let res = await Axios.post(`https://dry-falls-55056.herokuapp.com/api/sAdmin/newAdmin`,{...formData})
			if(res.data.massage==='done'){
				alert('Admin Added successfully')				
			  setShowAdmin(false) 
			} else{
				alert('Validation error')
				return
			}     
		};

		const handleShow = () => {
			setShow(true)       
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
	 const [branchId,setBranchId]=useState('')

	 let [allocateAdmin,setAllocateAdmin] = useState(false)

	 let handleAdminAllocateShow= ()=>{
		 setAllocateAdmin(true)
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
						events: {
							onClick: (e, column, columnIndex, row) => {							
								if(localStorage.getItem('usertype')==='superadmin'){
									setBranchId(row._id);
									handleAdminAllocateShow()
								}
						},
					}
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
							  let res = await Axios.get(`https://dry-falls-55056.herokuapp.com/api/sAdmin/getBranch/${row._id}`)
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
							  let res = await Axios.post(`https://dry-falls-55056.herokuapp.com/api/sAdmin/deleteBranch/${row._id}`)
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
	  const [adminId, setAdminId] = useState();
		const [adminName, setAdminName] = useState();
		const handleChange=(e)=>{
			let index = e.nativeEvent.target.selectedIndex;
			let label = e.nativeEvent.target[index].text;
			setAdminId(e.target.value)
			setAdminName(label)			
		}
		let submitAdmin=async()=>{
			try {
				let res = await Axios.post(`https://dry-falls-55056.herokuapp.com/api/sAdmin/allocateAdmin/${branchId}`,{ adminName, adminId})	
				if(res.data.massage === 'done'){
					alert('Admin Added')					
				  setShow(false)					
				  window.location.reload()
				} else {
				  alert(res.data.massage)
				}
			} catch(err){
         alert('Failed')
			} 
		}
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
						<Col className="text-right">
                <button className="btn btn-primary" onClick={handleShow}>
                  Add New Branch
                </button>
            </Col>
						<Modal show={show} onHide={handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>Add New Branch</Modal.Title>
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
											<Form.Label>Emails Id</Form.Label>
											<Form.Control required  name="email" onChange={handleFormData} value={formData.email} placeholder="Email" />
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
								<Modal.Title>Add New Admin</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Form>
									<Form.Row>
										<Row>
											<Col>
											  <Form.Label>Admin Name</Form.Label>
											  <Form.Control required onChange={handleFormData} name="userName" placeholder="User Name" />
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
										<Row>
											<Col>
											<Form.Label>Contact Number</Form.Label>
											<Form.Control required type='number' name="adminContact" onChange={handleFormData} placeholder="Contact Number" />
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

						<Modal show={allocateAdmin} onHide={handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>Allocate Admin</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<label>Select Admin</label>
								{adminOptions.length ? 
								<select onChange={handleChange}>
								{adminOptions.map((option) => (
									<option value={option.value}>{option.label}</option>
								))}
              </select>:<div>No Admins Availabel</div>}
								
							</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" onClick={handleClose}>
									Close
								</Button>
								<Button variant="primary" onClick={submitAdmin}>
									Allocate Admin
								</Button>
							</Modal.Footer>
						</Modal>
						</Row>
        </React.Fragment>
    );
};

export default AllBranches;
