import React from 'react';

import './ClientMenu/clientMenu.scss';

var item = {};

const DailyMenu = () => {
    return (
        <div>
            {/* <h3 className="container text-center">DAILY MENU</h3> */}
            <div className="container daily-list-container d-flex flex-row justify-content-center mt-3">
                <div className="day-item mt-2 p-0 d-flex flex-row justify-content-between">
                    {/* <h1>djgfsgdy</h1> */}
                    <div class="card text-center food-list">
                        <div class="card-header text-center">
                            <h3>Breakfast</h3>
                        </div>
                        <div class="card-body">
                            <ul>
                                <li className="d-flex justify-content-around">
                                    <h6>Apple</h6>
                                    <h6>1 Ser</h6>
                                </li>
                                <hr />
                                <li className="d-flex justify-content-around">
                                    <h6>Oats</h6>
                                    <h6>1 Ser</h6>
                                </li>
                                <hr />
                                <li className="d-flex justify-content-around">
                                    <h6>Green Gram Curry</h6>
                                    <h6>1 Ser</h6>
                                </li>
                                <hr />
                                <li className="d-flex justify-content-around">
                                    <h6>Milk</h6>
                                    <h6>1 Ser</h6>
                                </li>
                                <hr />
                                <li className="d-flex justify-content-around">
                                    <h6>Sprouts</h6>
                                    <h6>1 Ser</h6>
                                </li>
                                <hr />
                            </ul>
                        </div>
                    </div>
                    <div class="card text-center food-list">
                        <div class="card-header">
                            <h3>Lunch</h3>
                        </div>
                        <div class="card-body">
                            <ul>
                                <li className="d-flex justify-content-around">
                                    <h6>Fish</h6>
                                    <h6>1 Ser</h6>
                                </li>
                                <hr />
                                <li className="d-flex justify-content-around">
                                    <h6>Brown Rice</h6>
                                    <h6>1 Ser</h6>
                                </li>
                                <hr />
                                <li className="d-flex justify-content-around">
                                    <h6>Brocollid</h6>
                                    <h6>1 Ser</h6>
                                </li>
                                <hr />
                            </ul>
                        </div>
                    </div>
                    <div class="card text-center food-list">
                        <div class="card-header">
                            <h3>Dinner</h3>
                        </div>
                        <div class="card-body">
                            <ul>
                                <li className="d-flex justify-content-around">
                                    <h6>Veg Salad + Flax seed</h6>
                                    <h6>1 Ser</h6>
                                </li>
                                <hr />
                                <li className="d-flex justify-content-around">
                                    <h6>Brown Rice</h6>
                                    <h6>1 Ser</h6>
                                </li>
                                <hr />
                                <li className="d-flex justify-content-around">
                                    <h6>Ash Guard</h6>
                                    <h6>1 Ser</h6>
                                </li>
                                <hr />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyMenu;
