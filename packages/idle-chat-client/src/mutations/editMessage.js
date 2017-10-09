import { commitMutation, graphql } from 'react-relay';

import { environment } from '../relayEnvironment'

const mutation = graphql`
  mutation editMessageMutation($user: ID!, $message: ID!, $content: String) {
    session: editMessage(userId: $user, messageId: $message, content: $content) {
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

export default function EditMessageMutation(userId, messageId, content, onCompleted) {
  const variables = {
    user: userId,
    message: messageId,
    content: content
  };

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted,
    onError: err => console.error(err)
  })
}
