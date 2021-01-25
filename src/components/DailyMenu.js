import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import { Button ,Modal,Form} from 'react-bootstrap';
import { Row, Col} from 'reactstrap';

import './ClientMenu/clientMenu.scss';


const DailyMenu = ({buttonNumber}) => {
		const [fetch,setFetch]=useState(false)
		const [records,setRecords]=useState({})
		useEffect(() => {
    (async () => {
        const result = await Axios.get(
            `https://dry-falls-55056.herokuapp.com/api/coach/getMenu/${buttonNumber}/${localStorage.getItem('currUserId')}`
				);
				if(result)setRecords(result.data);
    })();
		}, [buttonNumber,fetch]);

		
		
		const [breakFast,setBreakFast]=useState(false)
		const [lunch,setLunch]=useState(false)
		const [dinner,setDinner]=useState(false)
		const [formData, setFormData] = useState({});
		
		let breakFastHandler = function () {
			 setBreakFast(true)
		 }

		let lunchHandler = function () {
			 setLunch(true)
		}

		let dinnerHandler = function () {
			 setDinner(true)
		 }
		let breakFastSubmitHandler = async ()=>{
			const { name ,quantity} = formData;
			if (!name ||!quantity) {
					alert('Fill All the Fileds')
					return
			} 
			let res = await Axios.post(`https://dry-falls-55056.herokuapp.com/api/coach/addMenu/${buttonNumber}/${localStorage.getItem('currUserId')}/breakFast`,{...formData})
			if(res.data.massage==='done'){
				if(formData._id){
					alert('Breakfast Updated')	
				} else {
				alert('Breakfast Added successfully')		
				}
				setBreakFast(false) 
				setFetch(!fetch)
				return
			} else {
				alert('Validation error')
				return
			}     
	};

		let lunchSubmitHandler = async ()=>{
			const { name ,quantity} = formData;
			if (!name ||!quantity) {
					alert('Fill All the Fileds')
					return
			} 
			let res = await Axios.post(`https://dry-falls-55056.herokuapp.com/api/coach/addMenu/${buttonNumber}/${localStorage.getItem('currUserId')}/lunch`,{...formData})
			if(res.data.massage==='done'){
				if(formData._id){
					alert('Lunch Updated')	
				} else {
				alert('Lunch Added successfully')		
				}
				setLunch(false) 
				setFetch(!fetch)
				return
			} else {
				alert('Validation error')
				return
			}     
	};

		let dinnerSubmitHandler = async ()=>{
			const { name ,quantity} = formData;
			if (!name ||!quantity) {
					alert('Fill All the Fileds')
					return
			} 
			let res = await Axios.post(`https://dry-falls-55056.herokuapp.com/api/coach/addMenu/${buttonNumber}/${localStorage.getItem('currUserId')}/dinner`,{...formData})
			if(res.data.massage==='done'){
				if(formData._id){
					alert('Lunch Updated')	
				} else {
				alert('Lunch Added successfully')		
				}
				setLunch(false) 
				setFetch(!fetch)
				return
			} else {
				alert('Validation error')
				return
			}     
	};

	  const handleClose = () => {
			setDinner(false)
			setBreakFast(false)
      setLunch(false)    
		};

		const handleFormData = e => {
      setFormData({ ...formData,[e.target.name]: e.target.value });
		};
    return (
        <div>
				    <div className ="text-center"><h4>Menu Of Day {buttonNumber}</h4>
				</div>
            <div className="container daily-list-container d-flex flex-row justify-content-center mt-3">
                <div className="day-item mt-2 p-0 d-flex flex-row justify-content-between">
                    {/* <h1>djgfsgdy</h1> */}
                    <div class="card text-center food-list">
                        <div class="card-header text-center">
                            <h3>Breakfast</h3>
                        </div>
                        {records.breakFast?.length ?<div class="card-body">
                            <ul>
                                {records.breakFast.map(b=>{
																	return <>
																	<li className="d-flex justify-content-around">
                                    <h6>{b.name}</h6>
                                    <h6>{b.quantity} Ser</h6>
																	</li>
																	<hr />
																	</>
																})}
                            </ul>
                        </div>:<h4>No Breakfast</h4>}
												<button className="btn btn-success" onClick={breakFastHandler} style={{width:'120px',marginLeft:'50px'}}>Add BreakFast</button>
                    </div>

                    <div class="card text-center food-list">
                        <div class="card-header">
                            <h3>Lunch</h3>
                        </div>
                        {records.lunch?.length ?<div class="card-body">
                            <ul>
                                {records.lunch.map(b=>{
																	return <>
																	<li className="d-flex justify-content-around">
                                    <h6>{b.name}</h6>
                                    <h6>{b.quantity} Ser</h6>
																	</li>
																	<hr />
																	</>
																})}
                            </ul>
                        </div>:<h4>No Lunch</h4>}
												<button className="btn btn-success" onClick={lunchHandler} style={{width:'120px',marginLeft:'50px'}}>Add Lunch</button>
                    </div>
                    <div class="card text-center food-list">
                        <div class="card-header">
                            <h3>Dinner</h3>
                        </div>
                        {records.dinner?.length ?<div class="card-body">
                            <ul>
                                {records.dinner.map(b=>{
																	return <>
																	<li className="d-flex justify-content-around">
                                    <h6>{b.name}</h6>
                                    <h6>{b.quantity} Ser</h6>
																	</li>
																	<hr />
																	</>
																})}
                            </ul>
                        </div>:<h4>No Dinner</h4>}
												<button className="btn btn-success" onClick={dinnerHandler} style={{width:'120px',marginLeft:'50px'}}>Add Dinner</button>
                    </div>									
                </div>
            </div>

				<Modal show={lunch} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Add New Lunch Item for Day {buttonNumber}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Row>
								<Row>
									<Col>
										<Form.Label>Menu Name</Form.Label>
										<Form.Control required onChange={handleFormData} name="name" value={formData.name} placeholder="e.g Apple ,Banana etc" />
									</Col>
									<Col>
										<Form.Label>Qunatity</Form.Label>
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
						<Button variant="success" onClick={lunchSubmitHandler}>
							Submit
						</Button>
					</Modal.Footer>
				</Modal>

				<Modal show={dinner} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Add New Dinner Item for Day {buttonNumber}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Row>
								<Row>
									<Col>
										<Form.Label>Menu Name</Form.Label>
										<Form.Control required onChange={handleFormData} name="name" value={formData.name} placeholder="e.g Apple ,Banana etc" />
									</Col>
									<Col>
										<Form.Label>Qunatity</Form.Label>
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
						<Button variant="success" onClick={dinnerSubmitHandler}>
							Submit
						</Button>
					</Modal.Footer>
				</Modal>

				<Modal show={breakFast} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Add New Breakfast Item for Day {buttonNumber}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Row>
								<Row>
									<Col>
										<Form.Label>Menu Name</Form.Label>
										<Form.Control required onChange={handleFormData} name="name" value={formData.name} placeholder="e.g Apple ,Banana etc" />
									</Col>
									<Col>
										<Form.Label>Qunatity</Form.Label>
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
						<Button variant="success" onClick={breakFastSubmitHandler}>
							Submit
						</Button>
					</Modal.Footer>
				</Modal>
        </div>
    );
};

export default DailyMenu;
