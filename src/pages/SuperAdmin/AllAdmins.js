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
            "https://dry-falls-55056.herokuapp.com/api/sAdmin/getAdmins"
        );
				if(result)setRecords(result.data);
    })();
    }, []);

		const [showAdmin, setShowAdmin] = useState(false);
		const [formData, setFormData] = useState({});

		const handleClose = () => {
			setShowAdmin(false)     
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
				if(formData._id){
					alert('Admin Updated')	
				} else {
				alert('Admin Added successfully')		
				}
				window.location.reload()
				setShowAdmin(false) 
				return
			} else {
				alert('Validation error')
				return
			}     
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
						text: 'Admin Name',
						dataField: 'adminName',
						headerStyle: (colum, colIndex) => {
								return { 'white-space': 'nowrap' };
						},
						sort: true,
				},
				{
						text: 'User Name',
						dataField: 'userName',
						headerStyle: (colum, colIndex) => {
								return { 'white-space': 'nowrap' };
						},
						sort: true,
				},
				{
						text: 'Contact Number',
						dataField: 'adminContact',
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
								let res = await Axios.get(`https://dry-falls-55056.herokuapp.com/api/sAdmin/getAdmin/${row._id}`)
			          if(res.data){
									setFormData(res.data)
									setShowAdmin(true)       
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
							  let res = await Axios.post(`https://dry-falls-55056.herokuapp.com/api/sAdmin/deleteAdmin/${row._id}`)
			          if(res.data.massage === 'done'){
									alert('Deleted Admin')
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
	  // const [adminId, setAdminId] = useState();
		// const [adminName, setAdminName] = useState();
		// const handleChange=(e)=>{
		// 	let index = e.nativeEvent.target.selectedIndex;
		// 	let label = e.nativeEvent.target[index].text;
		// 	setAdminId(e.target.value)
		// 	setAdminName(label)			
		// }
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
                                              <ExportCSVButton {...props.csvProps} className="btn btn-success">
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
                                        />:<h3 style={{textAlign:'center'}}>No Admins Found</h3>}
                                    </React.Fragment>
                                )}
                            </ToolkitProvider>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
						<Row>
						<Col className="text-right">
							  <button className="btn btn-success" onClick={handleShowAdmin} style={{marginRight:'20px'}}>
                  Add New Admin
                </button>
            </Col>
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
											  <Form.Control required onChange={handleFormData} name="userName" value={formData.userName} placeholder="User Name" />
										  </Col>
											<Col>
											  <Form.Label>Admin Id</Form.Label>
											  <Form.Control  value={formData.adminName} required onChange={handleFormData} name="adminName" placeholder="ID" />
										  </Col>
										</Row>
										<Row>
											<Col>
											<Form.Label>Password</Form.Label>
											<Form.Control required  type='password' name="password" onChange={handleFormData} placeholder="password" />
											</Col>
											<Col>
											<Form.Label>Confirm Password</Form.Label>
											<Form.Control required type='password' name="confirmPassword" onChange={handleFormData} placeholder="confirm password" />
											</Col>
										</Row>
										<Row>
											<Col>
											<Form.Label>Contact Number</Form.Label>
											<Form.Control value={formData.adminContact} required type='number' name="adminContact" onChange={handleFormData} placeholder="Contact Number" />
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
