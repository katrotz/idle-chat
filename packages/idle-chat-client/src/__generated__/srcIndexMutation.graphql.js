/**
 * @flow
 * @relayHash f6ada9fa44d6fa4c1df5c779890874c6
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type srcIndexMutationVariables = {|
  userId: string;
|};
export type srcIndexMutationResponse = {|
  +session: ?{|
    +id: ?string;
    +user: ?string;
    +messages: ?$ReadOnlyArray<?{|
      +id: ?string;
    |}>;
  |};
|};
*/


/*
mutation srcIndexMutation(
  $userId: ID!
) {
  session: initSession(userId: $userId) {
    id
    user
    messages {
      id
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "userId",
        "type": "ID!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "srcIndexMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "session",
        "args": [
          {
            "kind": "Variable",
            "name": "userId",
            "variableName": "userId",
            "type": "ID"
          }
        ],
        "concreteType": "Session",
        "name": "initSession",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "user",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Message",
            "name": "messages",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "srcIndexMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "userId",
        "type": "ID!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "srcIndexMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "session",
        "args": [
          {
            "kind": "Variable",
            "name": "userId",
            "variableName": "userId",
            "type": "ID"
          }
        ],
        "concreteType": "Session",
        "name": "initSession",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "user",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Message",
            "name": "messages",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation srcIndexMutation(\n  $userId: ID!\n) {\n  session: initSession(userId: $userId) {\n    id\n    user\n    messages {\n      id\n    }\n  }\n}\n"
};

module.exports = batch;
