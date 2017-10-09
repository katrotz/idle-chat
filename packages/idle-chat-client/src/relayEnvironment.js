import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const graphQlEndpoint = 'http://localhost:8080/graphql';

const fetchQuery = (operation, variables) => {
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
};

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export { environment }