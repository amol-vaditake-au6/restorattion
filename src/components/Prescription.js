import React from 'react';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
import { CardHeader, CardFooter, CardTitle, CardText } from 'reactstrap';
import prescription from '../assets/images/prescription.jpg';

import './ClientMenu/clientMenu.scss';

const Prescription = () => (
    <div className="text-center">
        <img src={prescription} style={{'maxWidth' : 600}}/>
        <div className="container daily-list-container d-flex flex-row justify-content-center"></div>
    </div>
);

export default Prescription;