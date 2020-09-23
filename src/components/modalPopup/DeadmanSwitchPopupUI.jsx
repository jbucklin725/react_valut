import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Input
} from 'reactstrap';

class DeadManSwitchModalPopup extends React.Component {

  render() {
    return (
      <div>
        <Modal className="deadman-show" isOpen={true}
          fade={true} style={{ marginTop: '23vh', width: '35%' }}>
          <ModalHeader className="bg-modal"><i className="mdi mdi-arrow-left"></i></ModalHeader>
          <ModalBody className="bg-modal">
            <div className="modal-content demo-content">
              {/* <div className="modal-header">
                                        <button type="button" className="close demo-cls" data-dismiss="modal">&times;</button>
                                    </div> */}

              <div className="modal-body">
                <div className="first-sec">
                  <p>After
                                                 <select className="form-control" id="sel1">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>days of inactivity elapses</p>
                  <div className="row dead">
                    <div className="col-md-1">
                      <label class="notify">
                        <Input type="checkbox"></Input>
                        <span class="checkmark"></span>
                      </label>
                    </div>
                    <div className="col-md-11 pl-3 mb-2">
                      <p>Enable all the funds from this Vault to be transfered to the following address:</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="button-wallet">
                        <button type="submit">Wallet address</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="alert-sec">
                  <div className="row">
                    <div className="col-md-2 alt">
                      {/* <img src="images/alert.png" alt="alert" /> */}
                      <i className="mdi mdi-alert mdi-alert-design"></i>
                    </div>
                    <div className="col-md-10">
                      <p>Please ensure that the address you are entering
                        is correct, and that the recipient has access to
                                                     successfully withdraw the funds.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="modal-footer"> */}
              {/* <!----<button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>--> */}
              {/* </div> */}
            </div>

          </ModalBody>
          {/* <ModalFooter className="bg-modal">
                        
                    </ModalFooter> */}
        </Modal>
      </div>
    );
  }
}
export default DeadManSwitchModalPopup;

