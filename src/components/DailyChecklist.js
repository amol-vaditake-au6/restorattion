import React, { useEffect,useState } from 'react';
import Axios from 'axios';
import { Button ,Modal,Form} from 'react-bootstrap';
import { Row, Col} from 'reactstrap';
import './ClientMenu/clientMenu.scss';

const DailyCheckList = function({buttonNumber}) {
	const [records,setRecords]=useState([])
		useEffect(() => {
    (async () => {
        const result = await Axios.get(
            `http://localhost:8000/api/coach/getChecklist/${buttonNumber}/${localStorage.getItem('currUserId')}`
				);
				if(result)setRecords(result?.data);
    })();
		}, [buttonNumber]);	

		let [showAddList,setShowAddList]=useState(false)
		const [formData, setFormData] = useState({});

		const handleClose = () => {
			setShowAddList(false)     
		};
		const handleShowAdmin = () => {
			setShowAddList(true)       
		};

		const handleFormData = e => {
      setFormData({ ...formData,[e.target.name]: e.target.value });
		};

		let submitForm= async()=>{
			const { name ,quantity} = formData;
			if (!name ||!quantity) {
					alert('Fill All the Fileds')
					return
			} 
			let res = await Axios.post(`http://localhost:8000/api/coach/addChecklist/${buttonNumber}/${localStorage.getItem('currUserId')}`,{...formData})
			if(res.data.massage==='done'){
				if(formData._id){
					alert('Checklist Updated')	
				} else {
				alert('Checklist Added successfully')		
				}
				window.location.reload()
				setShowAddList(false) 
				return
			} else {
				alert('Validation error')
				return
			}     
	};

	let hanldeEdit = function(p){
			setShowAddList(true) 
			setFormData({...p})      
	}
	
	let hanldeDelete=async(p)=>{
		let res = await Axios.post(`http://localhost:8000/api/coach/deleteChecklist/${localStorage.getItem('currUserId')}/${p._id}`)
			if(res.data.massage==='done'){
				alert('Checklist Deleted')	
				window.location.reload()
				return
			} else {
				alert('Validation error')
				return
			} 
	}
	return (
    <div className = "text-center">
        <div className="day-item m-auto">
                <div class="card text-center check-food-list">
                    <div class="card-body">
												{records.length
												?<ul>
                            {records.map(p=>{
															return (<>
															<li className="d-flex justify-content-between">
                                <h6 style={{width:'100px'}}>{p?.name}</h6>
                                <h6 style={{width:'100px'}}>{p?.quantity}</h6>
																<button onClick={()=>{hanldeEdit(p)}}>Edit </button>
																<button onClick={()=>{hanldeDelete(p)}}>Delete </button>
                            </li>
                            <hr />
														</>)
														})}
												</ul>
												:<h4>No Data Found for day {buttonNumber}</h4>}
                    </div>
                </div>               
        </div>
				<Col className="text-center" style={{marginTop:'10px'}}>
						<button className="btn btn-primary" onClick={handleShowAdmin} >
							Add New
						</button>
				</Col>
				<Modal show={showAddList} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Add New Checklist Item</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Row>
								<Row>
									<Col>
										<Form.Label>Name</Form.Label>
										<Form.Control required onChange={handleFormData} name="name" value={formData.name} placeholder="e.g Apple ,Banana etc" />
									</Col>
									<Col>
										<Form.Label>Qunatity Or Target</Form.Label>
										<Form.Control  value={formData.quantity} required onChange={handleFormData} type='number' name="quantity" placeholder="e.g 4 or 5 apple" />
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
    </div>
);
}

export default DailyCheckList;

