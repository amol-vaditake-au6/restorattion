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
		const [fetch,setFetch]=useState(false)
    const { SearchBar } = Search;
    const { ExportCSVButton } = CSVExport;
		useEffect(() => {
    (async () => {
        const result = await Axios.get(
            "https://dry-falls-55056.herokuapp.com/api/sAdmin/getAllDisease"
        );
				if(result)setRecords(result.data);
    })();
    }, [fetch]);

		const [show, setShow] = useState(false);
		const [formData, setFormData] = useState({});

		const handleClose = () => {
			setShow(false)     
		};

	 const submitForm = async() => {
			const { name ,price } = formData;
			if (!name || !price) {
					alert('Fill All the Fileds')
					return
			} 
			let res = await Axios.post(`https://dry-falls-55056.herokuapp.com/api/sAdmin/newDisease`,{...formData})
			if(res.data.massage === 'done'){
				if(formData._id){
					alert('Disease Updated')	
				} else {
				alert('Disease Added successfully')		
				}
				setShow(false) 
				setFetch(!fetch)
				return
			} else {
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
					<Button className="btn btn-success">Delete</Button>
				);
		}

		const editFormatter=function(){
			return (
					<Button className="btn btn-success">Edit</Button>
				);
		}
	 const columns = [
				{
						text: 'Name',
						dataField: 'name',
						headerStyle: (colum, colIndex) => {
								return { 'white-space': 'nowrap' };
						},
						sort: true,
				},
				{
						text: 'Price',
						dataField: 'price',
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
							if(localStorage.getItem('usertype') === 'superadmin'){
								let res = await Axios.get(`https://dry-falls-55056.herokuapp.com/api/sAdmin/disease/${row._id}`)
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
							  let res = await Axios.post(`https://dry-falls-55056.herokuapp.com/api/sAdmin/delete/disease/${row._id}`)
			          if(res.data.massage === 'done'){
									alert('Deleted Disease')
									setFetch(!fetch)
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
							  <button className="btn btn-success" onClick={handleShow} style={{marginRight:'20px'}}>
                  Add New Disease
                </button>
            </Col>
						<Modal show={show} onHide={handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>Add New Disease</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Form>
									<Form.Row>
										<Row>
											<Col>
											  <Form.Label>Name</Form.Label>
											  <Form.Control required onChange={handleFormData} name="name" value={formData.name} placeholder="Name of disease" />
										  </Col>
											<Col>
											  <Form.Label>Price</Form.Label>
											  <Form.Control  value={formData.price} required onChange={handleFormData} type='number' min="1" name="price" placeholder="Price" />
										  </Col>
										</Row>
									</Form.Row>
								</Form>								
							</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" onClick={handleClose}>
									Cancel
								</Button>
								<Button variant="success" onClick={submitForm}>
									Submit
								</Button>
							</Modal.Footer>
						</Modal>
						</Row>
        </React.Fragment>
    );
};

export default AllBranches;
