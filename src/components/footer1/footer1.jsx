import React from 'react';
import {
  Row,
  Col
} from 'reactstrap';

class Footer1 extends React.Component {
  render() {
    return (
      
      <Row>
        <footer className="left-f">
        <Col className="float-left" sm={6} lg={6}></Col>
        <Col className="foot-div-r float-right" sm={6} lg={6}>
        <label className="poweredbytext-lbl1">powered by</label> <label className="poweredbytext-lbl2">hydro</label>
        </Col>
        </footer>
      </Row>
     
    );
  }
}
export default Footer1;
