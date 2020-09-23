import React from 'react';
import {
    Input,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter
} from 'reactstrap';

import DeadmanSwitchModalPopupUI from '../../components/modalPopup/DeadmanSwitchPopupUI.jsx';

class VaultConfigUI extends React.Component {
    render() {
        const props = this.props.props;

        return <div>
            <Modal className="setting-popup" isOpen={true}
                fade={true} style={{ marginTop: '23vh', width: '90%' }}>
                <ModalHeader className="bg-modal"><i className="mdi mdi-arrow-left" onClick={props.onCancelSignerStepTwo}></i></ModalHeader>
                <ModalBody className="bg-modal">
                    <div>
                        <div className="row top-dead">
                            <div class="col-lg-10 col-md-10 col-sm-10">

                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-2">
                                <div className="save-btn pull-right">
                                    <a href="/">Save Change</a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="row main-sec">
                                <div className="col-md-7  ">
                                    <div className="top-title">
                                        <h3>Rate Limiters</h3>
                                    </div>
                                    <div className="form-section left-form">
                                        <div className="row">
                                            <div className="col-md-4 pr-0">
                                                <label>Max daily transactions</label>
                                            </div>
                                            <div className="col-md-6 max">
                                                <p><Input type="text" name="username" value="5"></Input>
                                                    <label class="notify">Unlimited
                                        <Input type="checkbox"></Input>
                                                        <span class="checkmark"></span>
                                                    </label></p>

                                            </div>

                                            <div className="col-md-4 pr-0">
                                                <label>Max daily amount</label>
                                            </div>
                                            <div className="col-md-6 max">
                                                <p><Input type="text" name="username" value="5000"></Input>
                                                    <label class="notify">Unlimited
                                        <Input type="checkbox"></Input>
                                                        <span class="checkmark"></span>
                                                    </label></p>
                                            </div>

                                            <div className="col-md-4 pr-0">
                                                <label>Max transactions per hour</label>
                                            </div>
                                            <div className="col-md-6 max">
                                                <p><Input type="text" name="username" value="5000"></Input>
                                                    <label class="notify">Unlimited
                                        <Input type="checkbox"></Input>
                                                        <span class="checkmark"></span>
                                                    </label></p>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="top-title mt-4">
                                        <h3>Time lock - Coming soon!</h3>
                                        <p>Time before broadcasting transaction to the blockchain</p>
                                    </div>
                                    <div className="top-title mt-4">
                                        <h3>Dead man switch</h3>
                                        <p>Use this feature to allow your funds to be distributed to a pre-defined addresses after <br />
                                            a pre-defined period of activityelapses.</p>
                                    </div>
                                    <Button className="btn btn-success" onClick={props.onShowDeadManSwitchUI}>Show</Button>

                                    {
                                        props.ishowDeadManSwitch ? <DeadmanSwitchModalPopupUI {...this.props.props} /> : ''
                                    }
                                </div>
                                <div className="col-md-5 right-sec">
                                    <div className="top-title">
                                        <h3>Whitelist</h3>
                                        <p>Please add in this section the addresses to which you want to enable as recipients for
                                your withdrawals.</p>
                                        <span>Note : you can only withdraw funds to addresses in this list.</span>
                                    </div>
                                    <div className="form-section ">
                                        <div className="row">
                                            <div className="col-md-4 pr-0">
                                                <label>Recipient name(alias:)</label>
                                            </div>
                                            <div className="col-md-8">
                                                <Input type="text" name="username" value="jef"></Input>
                                            </div>
                                            <div className="col-md-4">
                                                <label>Recipient email:</label>
                                            </div>
                                            <div className="col-md-8 max">
                                                <p><Input type="text" name="username" value="Jafett.sandi@hydrolabs.org"></Input>
                                                    <label class="notify">Notify
                                        <Input type="checkbox"></Input>
                                                        <span class="checkmark"></span>
                                                    </label></p>
                                            </div>
                                            <div className="col-md-4">
                                                <label>Recipient address:)</label>
                                            </div>
                                            <div className="col-md-8">
                                                <Input type="text" name="username" value="0xABCD1234EFGH5678JKL910"></Input>
                                            </div>
                                            <div className="col-md-4">
                                                <label></label>
                                            </div>
                                            <div className="col-md-8">
                                                <button type="submit" className="save-butn">Save Changes</button>
                                            </div>
                                        </div>
                                        <div className="row mt-4 ">
                                            <div className="col-md-4 pr-0">
                                                <label>Recipient name(alias:)</label>
                                            </div>
                                            <div className="col-md-8">
                                                <Input type="text" name="username" value="Akinde"></Input>
                                            </div>
                                            <div className="col-md-4">
                                                <label>Recipient email:</label>
                                            </div>
                                            <div className="col-md-8 max">
                                                <Input type="text" name="username" value="Akinde.sandi@hydrolabs.org"></Input>
                                                <label class="notify">Notify
                                        <Input type="checkbox"></Input>
                                                    <span class="checkmark"></span>
                                                </label>
                                            </div>
                                            <div className="col-md-4">
                                                <label>Recipient address:)</label>
                                            </div>
                                            <div className="col-md-8">
                                                <Input type="text" name="username" value="0xABCD1234EFGH5678JKL910"></Input>
                                            </div>
                                            <div className="col-md-4">
                                                <label></label>
                                            </div>
                                            <div className="col-md-8">
                                                <button type="submit" className="save-butn">Save Changes</button>
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-md-4 pr-0">
                                                <label>Recipient name(alias:)</label>
                                            </div>
                                            <div className="col-md-8">
                                                <Input type="text" name="username" value="<Name / Alias>"></Input>
                                            </div>
                                            <div className="col-md-4">
                                                <label>Recipient email:</label>
                                            </div>
                                            <div className="col-md-8 max">
                                                <Input type="text" name="username" value="<email>"></Input>
                                                <label class="notify">Notify
                                        <Input type="checkbox"></Input>
                                                    <span class="checkmark"></span>
                                                </label>
                                            </div>
                                            <div className="col-md-4">
                                                <label>Recipient address:)</label>
                                            </div>
                                            <div className="col-md-8">
                                                <Input type="text" name="username" value="<Wallet address>"></Input>
                                            </div>
                                            <div className="col-md-4">
                                                <label></label>
                                            </div>
                                            <div className="col-md-8">
                                                <button type="submit" className="save-butn add-new">Add New</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </Modal>
        </div>

    }
}

export default VaultConfigUI;