import { commitMutation, graphql } from 'react-relay';

import { environment } from '../relayEnvironment'

const mutation = graphql`
  mutation addMessageMutation($user: ID!, $message: String) {
    session: addMessage(userId: $user, message: $message) {
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

export default function AddMessageMutation(userId, content, onCompleted) {
  const variables = {
    user: userId,
    message: content
  };

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted,
    onError: err => console.error(err)
  })
}