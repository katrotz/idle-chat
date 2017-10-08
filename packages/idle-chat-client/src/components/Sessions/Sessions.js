import React, { Component } from 'react';
import { Badge, Row, Col, Icon, Button, Dropdown, Menu, message } from 'antd';

import './Sessions.css';

class Sessions extends Component {
  static defaultProps = {
    createSession: () => {}
  };

  render() {
    const sessions = this.props.sessions;

    return (
      <div className="sessions">
        <Row>
          <Col span={ 12 }>
            <Row className="sessions-list">
              <Col span={ 24 }>
                { !sessions.length &&
                  <Button type="primary" onClick={ this.props.createSession }>Create session</Button>
                }
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Sessions;
