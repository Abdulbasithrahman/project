import Button from 'react-bootstrap/Button';
import { Col, Form } from "react-bootstrap";
import React from 'react';
import './Deposit.css'

function Deposit(props) {

  //initialization

  const userName = JSON.parse(localStorage.getItem("user"));

  const initialHistory = {
    id: null,
    amount: 0,
    payout: "",
    sucuess: "",
    description: "",
    transaction: "",
    balance: "",
    timestamp: "",
    accountnumber: ""
  };

  //states

  const [history, setHistory] = React.useState(initialHistory);

  const [validated, setValidated] = React.useState(false);

  //functions

  const handleInputChange = event => {
    const { name, value } = event.target
    setHistory({
      ...history,
      [name]: value
    });
  }

  const handleDeposit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else {
      props.balance(history.amount);
      props.checkWidthdraw(history.amount);
      props.addHistory(history, "Credited");

      props.hide();
    }
    setValidated(true);
  }

  return (

    <Form className={props.overlay} noValidate validated={validated} onSubmit={handleDeposit}>
      <div className='text-center'> <h1 style={{ color: "white", fontWeight: "bold" }}>Deposit</h1></div>
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
          <option value="account_number">{userName.accountnumber}</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className='text-box' md="4" controlId="validationCustom02">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          required
          size="lg"
          type="number"
          min="0"
          onChange={handleInputChange}
          name="amount"
          placeholder="Enter the Amount"
        />
      </Form.Group>
      <Form.Group className="text-box">
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
          <option value="">--Select Payment Method</option>
          <option value="Cash">Cash</option>
          <option value="Online Transfer">Online Transfer</option>
          <option value="Cheque">Cheque</option>
          <option value="DD">DD</option>
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
      </Form.Group>
      <Button className={props.buttonClass} variant="success" type="submit">
        Deposit
      </Button>
    </Form>
  );
}

export default Deposit;