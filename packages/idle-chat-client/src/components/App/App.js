import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';

import Chat from './../Chat/Chat';
import logo from './logo.png';
import './App.css';

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="app">
        <Header className="app-header">
          <Row type="flex" align="middle" justify="start">
            <Col span={ 3 }>
              <img src={ logo } className="app-logo" alt="logo" />
            </Col>
          </Row>
        </Header>

        <Layout>
          <Content className="app-content">
            <Chat></Chat>
          </Content>
        </Layout>

        <Footer>
          <Row type="flex" align="middle" justify="center">
            <Col span={ 24 } className="app-footer">
              Brewed by <a href="http://katrotz.space" title="Personal Website" target="blank_">katrotz</a>
            </Col>
          </Row>
        </Footer>
      </Layout>
    );
  }
}

export default App;
