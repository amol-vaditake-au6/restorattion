import React, { useEffect,useState } from 'react';
import Axios from 'axios';
import { Button ,Modal,Form} from 'react-bootstrap';
import { Row, Col} from 'reactstrap';
import './ClientMenu/clientMenu.scss';

const DailyCheckList = function({buttonNumber}) {
	const [records,setRecords]=useState([])
	const [fetch,setFetch]=useState(false)
		useEffect(() => {
    (async () => {
        const result = await Axios.get(
            `https://dry-falls-55056.herokuapp.com/api/coach/getChecklist/${buttonNumber}/${localStorage.getItem('currUserId')}`
				);
				if(result)setRecords(result?.data);
    })();
		}, [buttonNumber,fetch]);	

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
			let res = await Axios.post(`https://dry-falls-55056.herokuapp.com/api/coach/addChecklist/${buttonNumber}/${localStorage.getItem('currUserId')}`,{...formData})
			if(res.data.massage==='done'){
				if(formData._id){
					alert('Checklist Updated')	
				} else {
				alert('Checklist Added successfully')		
				}
				setFetch(!fetch)
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
		let res = await Axios.post(`https://dry-falls-55056.herokuapp.com/api/coach/deleteChecklist/${localStorage.getItem('currUserId')}/${p._id}`)
			if(res.data.massage==='done'){
				alert('Checklist Deleted')	
				setFetch(!fetch)
				return
			} else {
				alert('Validation error')
				return
			} 
	}
	return (
    <div className = "text-center">
        <div className="day-item m-auto">
                {records.length	? 
									<div class="card text-center check-food-list">
										<h4>Daily Checklist For Day {buttonNumber}</h4>
                    <div class="card-body">
												<ul>
                            {records.map(p=>{
															return (<>
															<li className="d-flex justify-content-between">
                                <h6 style={{width:'100px'}}>{p?.name}</h6>
                                <h6 style={{width:'100px'}}>{p?.quantity} Ser</h6>
																<button className="btn btn-success" onClick={()=>{hanldeEdit(p)}} clan>Edit </button>
																<button className="btn btn-success" onClick={()=>{hanldeDelete(p)}}>Delete </button>
                            </li>
                            <hr />
														</>)
														})}
												</ul>												
                    </div>
                </div>:<h4>No Data Found for day {buttonNumber}</h4>}               
        </div>
				<Col className="text-center" style={{marginTop:'10px'}}>
						<button className="btn btn-success" onClick={handleShowAdmin} >
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

