import React from 'react';
import { Row, Col } from 'reactstrap';
import { Card, CardBody, Media } from 'reactstrap';
import { Modal, Button } from 'react-bootstrap';


import ButtonCarousel from '../../components/ButtonCarousel';
import DailyMenu from '../../components/DailyMenu';
import DailyChecklist from '../../components/DailyChecklist';
import Prescription from '../../components/Prescription';

import {
    CardList,
    CardChecklist,
    FileEarmarkBarGraph,
    CalendarPlus,
    ChatRightText,
    Eject,
} from 'react-bootstrap-icons';

import './clientDetails.scss';

// const [show, setShow] = useState(false);

// const handleShow = () => setShow(true);
// const handleClose = async () => {
//     setShow(false);
// };

class ClientDetails extends React.Component {
    constructor() {
        super();
        this.state = { dailyChecklist: true, dailyMenu: false, prescription: false, show: false ,buttonNumber:1};
    }

    handleShow = () => {
        this.setState({ dailyChecklist: true, dailyMenu: false, prescription: false, show: true })
    };
    handleClose = async () => {
        this.setState({ dailyChecklist: true, dailyMenu: false, prescription: false, show: false })
    };

    showChecklist = () => {
        this.setState({ dailyChecklist: true, dailyMenu: false, prescription: false, show: false });
    }

    showMenu = () =>{
        this.setState({ dailyChecklist: false, dailyMenu: true, prescription: false, show: false })
    }

    showPrescription = () =>{
        this.setState({ dailyChecklist: false, dailyMenu: false, prescription: true, show: false })
    }

		setButtonNumber = (value) =>{
        this.setState({ ...this.state,buttonNumber: value})
		}

    render() {
        let mainAreaContent = <h1>Hello</h1>;
        if (this.state.dailyChecklist) {
            mainAreaContent = <DailyChecklist buttonNumber={this.state.buttonNumber} className="" />;
        } else if (this.state.dailyMenu) {
            mainAreaContent = <DailyMenu buttonNumber={this.state.buttonNumber} className="daily-menu" />;
        } else if (this.state.prescription) {
            mainAreaContent = <Prescription className="" />;
        }

        return (
            <div>
                <div className="client-details">
                    <br />
                    <ButtonCarousel class="" setButtonNumber={this.setButtonNumber}/>
                    <Row>
                        <Col md={2} xl={2}>
                            <Card className="client-details-card">
                                <CardBody className="p-0" >
                                    <h5 onClick={this.showChecklist} role="button">
                                        <CardChecklist className="icons mx-1" />
                                        Daily Checklist
                                    </h5>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={2} xl={2}>
                            <Card className="client-details-card ">
                                <CardBody className="p-0">
                                    <Media body>
                                        <h5 onClick={this.showMenu} role="button">
                                            <CardList className="icons"  /> Daily Menu{' '}
                                        </h5>
                                    </Media>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={2} xl={2}>
                            <Card className="client-details-card ">
                                <CardBody className="p-0">
                                    <Media body>
                                        <h5 className="mb-0" onClick={this.handleShow} role="button">
                                            {' '}
                                            <FileEarmarkBarGraph className="icons" /> Medical Report
                                        </h5>
                                        <Modal
                                            show={this.state.show}
                                            onHide={this.handleClose}
                                            className="text-center">
                                            <Modal.Header closeButton>
                                                <Modal.Title>Medical Report</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Medical Report is not Available.</Modal.Body>
                                            <Modal.Footer>
                                                <div>
                                                    <Button
                                                        variant="success"
                                                        onClick={this.handleClose}
                                                        className="mr-2">
                                                        Ask for Medical Report
                                                    </Button>
                                                    <Button
                                                        variant="secondary"
                                                        onClick={this.handleClose}
                                                        className="mr-5">
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </Modal.Footer>
                                        </Modal>
                                    </Media>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={2} xl={2}>
                            <Card className="client-details-card ">
                                <CardBody className="p-0">
                                    <Media body>
                                        <h5 className="mb-0" onClick = {this.showPrescription} role="button">
                                            
                                                <CalendarPlus className="icons" /> Prescription
                                            
                                        </h5>
                                    </Media>
                                </CardBody>
                            </Card>
                        </Col>
                        {/* Profile */}
                        <Col md={2} xl={2}>
                            <Card className="client-details-card ">
                                <CardBody className="p-0">
                                    <Media body>
                                        <h5 className="mb-0">
                                            <ChatRightText className="icons" /> Feedback
                                        </h5>
                                    </Media>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={2} xl={2}>
                            <Card className="client-details-card ">
                                <CardBody className="p-0">
                                    <Media body>
                                        <h5 className="mb-0">
                                            <Eject className="icons" /> Health Progress
                                        </h5>
                                    </Media>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div className="client-details-option-expansion">
                    <br />
                    {mainAreaContent}
                </div>
            </div>
        );
    }
}
export default ClientDetails;
