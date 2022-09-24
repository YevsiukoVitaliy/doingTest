import { Component } from 'react';
import { nanoid } from 'nanoid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Accordion } from 'react-bootstrap';
export default class App extends Component {
  state = {
    services: '',
    price: 0,
    servicesItem: [],
  };
  handleSubmit = e => {
    e.preventDefault();
    const postToAdd = {
      id: nanoid(),
      name: this.state.services,
      price: this.state.price,
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(postToAdd),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };
    fetch('http://localhost:3002/hash', options);
    this.setState({
      services: '',
      price: 0,
    });
  };
  componentDidMount() {
    try {
      fetch('http://localhost:3002/hash')
        .then(res => res.json())
        .then(data => {
          this.setState({ servicesItem: data });
        });
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state.servicesItem) {
      try {
        fetch('http://localhost:3002/hash')
          .then(res => res.json())
          .then(data => {
            this.setState({ servicesItem: data });
          });
      } catch (error) {
        console.log(error);
      }
    }
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(this.state.servicesItem);
  };
  render() {
    const { services, price, servicesItem } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="services" name="services">
              Services
            </Form.Label>
            <Form.Control
              onChange={handleChange}
              name="services"
              type="text"
              required
              value={services}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="price" id="price">
              Price
            </Form.Label>
            <Form.Control
              onChange={handleChange}
              type="number"
              name="price"
              required
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              value={price === 0 ? '' : price}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
        <div>
          <h1>Order services</h1>
          <Accordion defaultActiveKey="0">
            {servicesItem.map(({ id, name, price }) => (
              <Accordion.Item eventKey={id} key={id}>
                <Accordion.Header>{name}</Accordion.Header>
                <Accordion.Body>Price: {price}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </>
    );
  }
}
