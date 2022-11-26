import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import './Widthraw.css'

const userName = JSON.parse(localStorage.getItem("user"))
function Widthdraw(props) {
  const userName = JSON.parse(localStorage.getItem("user"));
  const initialHistory = {
    id: null,
    amount: 0,
    payout: "cash",
    sucuess: "",
    description: "",
    transaction: "",
    balance: "",
    timestamp: "",
    accountnumber: ""
  };
  const [history, setHistory] = React.useState(initialHistory);

  const handleInputChange = event => {
    const { name, value } = event.target
    setHistory({ ...history, [name]: value });
  }
  const [validated, setValidated] = React.useState(false);
  const handleWidthdraw = (event) => {

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else {
      event.preventDefault();
      props.balance(history.amount)
      props.addHistory(history, "Debited");
      props.hide();
    }
    setValidated(true);
  }
  return (

    <Form className={props.overlay} noValidate validated={validated} onSubmit={handleWidthdraw}>
      <div className='text-center'> <h1 style={{ color: "white", fontWeight: "bold" }}>Widthdraw</h1></div>
      <Form.Group className="text-box">
        <Form.Label>
          Account Number<span className="req-tag">*</span>
        </Form.Label>
        <Form.Control
          required
          as="select"
          size="lg"
          type="select"
          name="accountnumber"
          onChange={handleInputChange}
        >
          <option value="">--Select Account Number--</option>
          <option value="account_number)">{userName.accountnumber}</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className='text-box' md="4" controlId="formBasicPassword">
        <Form.Label>Amount</Form.Label>
        <Form.Control required size="lg" type="number" onChange={handleInputChange} name="amount" placeholder="Enter the Amount" />
      </Form.Group>
      <Form.Group className="text-box" md="4" controlId="validationCustom03">
        <Form.Label>
          Payment Method<span className="req-tag">*</span>
        </Form.Label>
        <Form.Control
          required
          as="select"
          size="lg"
          type="select"
          name="payout"
          onChange={handleInputChange}
          value={history.payout}
        >
          <option value="">--Select Payment Method--</option>
          <option value="By Cash">Cash</option>
          <option value="Online Transfer">Online Transfer</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please Add Payment Method
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3 text-box ">
        <Form.Label>
          Description
        </Form.Label>
        <Form.Control required as="textarea" rows={3} maxLength={75} name='description' onChange={handleInputChange} type='textarea' placeholder='Enter the Description' />
        <Form.Control.Feedback type="invalid">
          Please provide a valid city.
        </Form.Control.Feedback>
      </Form.Group>
      <Button className={props.buttonClass} variant="success" type="submit">
        Widthdraw
      </Button>
    </Form>
  );
}

export default Widthdraw;