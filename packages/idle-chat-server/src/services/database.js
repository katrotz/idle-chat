const _ = require('lodash');

const storage = new Map();

storage.set('users', {
  mockedUser: {
    id: 'mockedUser',
    avatar: null,
    name: 'John Doe',
    session: {
      id: `session_${Date.now()}`,
      user: 'mockedUser',
      messages: [
        {
          id: `message_${Date.now()}`,
          user: 'mockedUser',
          deleted: false,
          created: Date.now(),
          updated: null,
          versions: [],
          content: 'This message is to inform you that the user is mocked in the backend as currently there is ' +
          'no facility to create a user and generate a chat session from the front-end. Happy chatting :)'
        }
      ]
    }
  }
});

const persistUser = (user) => {
  const users = storage.get('users');

  users[user.id] = user;

  storage.set('users', users);

  return Promise.resolve(user);
};

const fetchUser = (userId = 'mockedUser') => {
  const users = storage.get('users');

  return Promise.resolve(users[userId]);
};

const createUser = (id, name, avatar = null) => {
  const user = { id, avatar, name, session: null };

  return persistUser(user);
};

/**
 * Stores the session information
 * @param {Object} session The session object
 * @returns {Promise.<Object>} The updated session
 */
const persistSession = (session) => {
  return fetchUser(session.user)
    .then(user => {
      user.session = session;

      return persistUser(user).then(() => session);
    })
};

/**
 * Creates a new session
 * @param {string} userId The user id the session belongs to
 * @returns {Promise.<Object>} The updated session
 */
const initSession = (userId) => {
  const session = {
    id: `session_${Date.now()}`,
    user: userId,
    messages: []
  };

  return persistSession(session);
};

/**
 * Adds a message to a session
 * @param {string} userId The user the session belongs to
 * @param {Object} message The message object
 * @returns {Promise.<Object>} The updated session
 */
const addMessage = (userId, message) => {
  return fetchUser(userId)
    .then(user => user.session || initSession(userId))
    .then(session => {
      message = Object.assign({
        id: `message_${Date.now()}`,
        user: userId,
        deleted: false,
        created: Date.now(),
        updated: null,
        versions: []
      }, message);

      session.messages.push(message);

      return persistSession(session);
    });
};

/**
 * Alters an existing message
 * @param {string} userId The user id
 * @param {string} messageId The message id
 * @param {string} content The new message content
 * @returns {Promise.<Object>} The updated session
 */
const editMessage = (userId, messageId, content) => {
  return fetchUser(userId)
    .then(user => user.session)
    .then(session => {
      const message = _.find(session.messages, { id: String(messageId) });

      if (!message) throw new Error(`Failed to find the message with id "$\{ messageId }"`);

      // Push the old message into the history
      message.versions.push(message.content);
      message.content = content;
      message.updated = Date.now();

      return persistSession(session);
    });
};

/**
 * Soft deletes a message from a chat session
 * @param {string} userId The user id the chat session belongs to
 * @param {string} messageId The message id to remove
 * @returns {Promise.<Object>} The updated session
 */
const deleteMessage = (userId, messageId) => {
  return fetchUser(userId)
    .then(user => user.session)
    .then(session => {
      const message = _.find(session.messages, { id: messageId });

      message.deleted = true;

      return persistSession(session);
    });
};

module.exports = { createUser, fetchUser, initSession, addMessage, editMessage, deleteMessage };
