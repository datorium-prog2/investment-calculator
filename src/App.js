import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { sp500rates } from './data/sp500rates'
import { useState } from 'react';

function App() {
  const [fromData, setFormData] = useState({
    amount: 100,
    years: 10,
  })

  const [result, setResult] = useState('')

  const calculationHandler = () => {
    const historyPercentage = sp500rates.filter((rate, index) => {
        return index < fromData.years
    })

    let amount = fromData.amount

    historyPercentage.forEach((rate) => {
      amount = amount + (amount * (rate / 100))
    })

    setResult(`
      Ja tu būtu ieguldījis S&P 500 fondā ${fromData.amount}€ pirms ${fromData.years} gadiem,
      tad tagad tu būtu ${(amount - fromData.amount).toFixed(2)}€ plusā!
    `)

    console.log(amount.toFixed(2));
  }

  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <h1 className='text-center'>Investīciju vēsturiskais aprēķins</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={(e) => {
            e.preventDefault()
            calculationHandler()

          }}>
            <Form.Group className="mb-3" controlId="amount">
              <Form.Label>Amount in €</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="100 €"
                value={fromData.amount}
                onChange={(e) => {
                  setFormData({
                    ...fromData,
                     amount: e.target.value,
                  })
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="years">
              <Form.Label>Pirms cik gadiem veici ieguldījumu</Form.Label>
              <Form.Select
                value={fromData.years}
                onChange={(e) => {
                  setFormData({
                    ...fromData,
                     years: e.target.value,
                  })
                }}
              >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                  <option value="35">35</option>
                  <option value="40">40</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Izrēķināt
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
            <h4>
              {result}
            </h4>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
