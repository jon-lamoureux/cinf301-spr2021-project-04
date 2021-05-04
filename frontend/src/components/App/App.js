import './App.css';
import React, { useEffect, useState } from 'react';
import { getNotes } from '../../functions/notes';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    let mounted = true;
    getNotes()
      .then(items => {
        console.log(items);
        if (mounted) {
          setNotes(items)
        }
      })
    return () => mounted = false;
  }, [])

  return (
	<Container>
      <h1>Users</h1>
	  <Row>
		<Col>User ID</Col>
		<Col>Username</Col>
		<Col>Birthdate</Col>
		<Col>Location</Col>
		<Col>Account created:</Col>		
	  </Row>
     {notes.map(item => <Row><Col key={item._id}>{item.userid}</Col><Col key={item._id}>{item.username}</Col>
	 <Col key={item._id}>{item.userbirthday}</Col><Col key={item._id}>{item.userlocation}</Col>
	 <Col key={item._id}>{item.createdAt}</Col></Row>)}
</Container>
  )
}
App.propTypes = {
	username: PropTypes.string,
	userbirthday: PropTypes.string,
	userlocation: PropTypes.string,
	userid: PropTypes.number
};

export default App;