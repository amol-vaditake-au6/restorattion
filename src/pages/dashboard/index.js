import React, { Component } from 'react';
import { Row, Col, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import Flatpickr from 'react-flatpickr'
import { ChevronDown, Mail, Printer, File } from 'react-feather';

import Loader from '../../components/Loader';

import SuperAdminStats from './Statistics';
import CoachStats from './CoachStats'
import BranchStats from './BranchStats'


class Dashboard extends Component {

    constructor(props) {
        super(props);

        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 15);

        this.state = {
            filterDate: [oneWeekAgo, new Date()]
        };
    }

    render() {
			let user=localStorage.getItem('usertype')
        return (
            <React.Fragment>
                <div className="">
                    { /* preloader */}
                    {this.props.loading && <Loader />}

                    <Row className="page-title align-items-center">
                        <Col sm={4} xl={6}>
                            <h4 className="mb-1 mt-0">Dashboard</h4>
                        </Col>
                        <Col sm={8} xl={6}>
                            <form className="form-inline float-sm-right mt-3 mt-sm-0">
                                <div className="form-group mb-sm-0 mr-2">
                                    <Flatpickr value={this.state.filterDate}
                                        onChange={date => { this.setState({ filterDate: date }) }} options={{ mode: "range" }}
                                        className="form-control" />
                                </div>
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="success" className="dropdown-toggle">
                                        <i className='uil uil-file-alt mr-1'></i>Download
                                            <i className="icon ml-1"><ChevronDown /></i>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            <Mail className="icon-dual icon-xs mr-2"></Mail>
                                            <span>Email</span>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Printer className="icon-dual icon-xs mr-2"></Printer>
                                            <span>Print</span>
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            <File className="icon-dual icon-xs mr-2"></File>
                                            <span>Re-Generate</span>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </form>
                        </Col>
                    </Row>

                    {/* stats */}
                    { user ==='superadmin' &&<SuperAdminStats></SuperAdminStats>}
										{ user ==='branchadmin' &&<BranchStats></BranchStats>}
										{ user ==='coach' &&<CoachStats></CoachStats>}
                </div>
            </React.Fragment>
        )
    }
}


export default Dashboard;