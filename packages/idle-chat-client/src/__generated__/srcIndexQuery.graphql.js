/**
 * @flow
 * @relayHash 1c7252c859f9a29f1ca29ce044f85187
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type srcIndexQueryResponse = {|
  +sessions: ?$ReadOnlyArray<?{|
    +id: ?string;
    +user: ?string;
    +messages: ?$ReadOnlyArray<?{|
      +id: ?string;
      +user: ?string;
      +content: ?string;
      +deleted: ?boolean;
      +created: ?number;
      +updated: ?number;
      +versions: ?$ReadOnlyArray<?string>;
    |}>;
  |}>;
|};
*/


/*
query srcIndexQuery(
  $userId: ID!
) {
  sessions: fetchUserSessions(userId: $userId) {
    id
    user
    messages {
      id
      user
      content
      deleted
      created
      updated
      versions
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
    "name": "srcIndexQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "sessions",
        "args": [
          {
            "kind": "Variable",
            "name": "userId",
            "variableName": "userId",
            "type": "ID"
          }
        ],
        "concreteType": "Session",
        "name": "fetchUserSessions",
        "plural": true,
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
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "user",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "content",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "deleted",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "created",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "updated",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "versions",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "srcIndexQuery",
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
    "name": "srcIndexQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "sessions",
        "args": [
          {
            "kind": "Variable",
            "name": "userId",
            "variableName": "userId",
            "type": "ID"
          }
        ],
        "concreteType": "Session",
        "name": "fetchUserSessions",
        "plural": true,
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
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "user",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "content",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "deleted",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "created",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "updated",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "versions",
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
  "text": "query srcIndexQuery(\n  $userId: ID!\n) {\n  sessions: fetchUserSessions(userId: $userId) {\n    id\n    user\n    messages {\n      id\n      user\n      content\n      deleted\n      created\n      updated\n      versions\n    }\n  }\n}\n"
};

module.exports = batch;
