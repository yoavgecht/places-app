import React from 'react';
import loader from '../../images/giphy_s.gif'
import { Row, Col } from 'react-bootstrap';

const LoaderComponent = (props) => (
    	<Row className="show-grid">
			<Col xs={12} md={12}>
				<img src={loader} className="center-block loader img-responsive"/>
			</Col>
		</Row>
);

export default LoaderComponent;