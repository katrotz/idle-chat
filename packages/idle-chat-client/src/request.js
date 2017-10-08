const graphQlEndpoint = 'http://localhost:8080/graphql';

function fetchQuery(operation, variables) {
  const query = operation.text;
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  };

  return fetch(graphQlEndpoint, init)
    .then(response => response.json());
}

export { fetchQuery }