import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import { QueryRenderer, graphql } from 'react-relay';

import { environment } from './../../relayEnvironment';
import Chat from './../Chat/Chat';
import logo from './logo.png';
import './App.css';

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    const appQuery = graphql`
      query AppQuery {
        user: mockedUser {
          ...Chat_user
        }
      }
    `;

    return (
      <QueryRenderer
        environment={ environment }
        query={ appQuery }
        variables={{}}
        render={({ error, props }) => {
          if (!props || error) {
            return this.renderLoader(error);
          }

          return this.renderApplication(props);
        }}
      />
    );
  }

  renderLoader(error = null) {
    return (
      <Row className="loader" type="flex" align="middle" justify="start">
        <Col span={ 24 }>{ error || 'Loading' }</Col>
      </Row>
    );
  }

  renderApplication(props) {
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
            <Chat user={ props.user }></Chat>
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
