import { commitMutation, graphql } from 'react-relay';

import { environment } from '../relayEnvironment'

const mutation = graphql`
  mutation deleteMessageMutation($user: ID!, $message: ID!) {
    session: deleteMessage(userId: $user, messageId: $message) {
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

export default function DeleteMessageMutation(userId, messageId, onCompleted) {
  const variables = {
    user: userId,
    message: messageId
  };

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted,
    onError: err => console.error(err)
  })
}