import React from 'react';
import prescription from '../assets/images/prescription.jpg';

import './ClientMenu/clientMenu.scss';

const Prescription = () => (
    <div className="text-center">
        <img alt='img' src={prescription} style={{'maxWidth' : 600}}/>
        <div className="container daily-list-container d-flex flex-row justify-content-center"></div>
    </div>
);

export default Prescription;