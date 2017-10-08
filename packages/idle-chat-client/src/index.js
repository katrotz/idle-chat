import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryRenderer, commitMutation, graphql } from 'react-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { Row, Col } from 'antd';

import './index.css';
import App from './components/App/App';
import { fetchQuery } from './request';

// import registerServiceWorker from './registerServiceWorker';

const modernEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

// Generates a unique id assigned to the browser running the client as we do not provide any step to create a user
if (!sessionStorage.getItem('idleChatUserId')) {
  sessionStorage.setItem('idleChatUserId', _.random(1, 1000))
}

const appQueryVariables = {
  userId: sessionStorage.getItem('idleChatUserId')
};

const appQuery = graphql`
  query srcIndexQuery($userId: ID!) {
      sessions: fetchUserSessions(userId: $userId) {
        id,
        user,
        messages {
          id,
          user,
          content,
          deleted,
          created,
          updated,
          versions
        }
      }
    }
`;

function createSession() {
  const variables = {
    userId: sessionStorage.getItem('idleChatUserId')
  };

  const mutation = graphql`
    mutation srcIndexMutation($userId: ID!) {
      session: initSession(userId: $userId) {
        id,
        user,
        messages {
          id
        }
      }
    }
  `;

  // TODO Find out how relay updates its storage!!!!!!!111
  commitMutation(modernEnvironment, {
    mutation,
    variables,
    onCompleted: (response, errors) => {
      console.log('Response received from server.', response, errors);
    },
    onError: err => console.error(err),
  });
}

ReactDOM.render(<QueryRenderer
  environment={ modernEnvironment }
  query={ appQuery }
  variables={ appQueryVariables }
  render={({ error, props }) => {
    if (props) {
      return <App userId={ appQueryVariables.userId } sessions={ props.sessions } createSession={ createSession }/>;
    } else {
      return <Row className="loader" type="flex" align="middle" justify="start">
        <Col span={ 24 }>Loading</Col>
      </Row>;
    }
  }}
/>, document.getElementById('root'));

// registerServiceWorker();
