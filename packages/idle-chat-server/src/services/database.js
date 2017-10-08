const _ = require('lodash');

const sessions = new Map();

/**
 * Stores the session information
 * @param {Object} session The session object
 * @returns {Promise.<Object>} The updated session
 */
const persistSession = (session) => {
  sessions.set(session.id, session);

  return Promise.resolve(session);
};

/**
 * Creates a new session
 * @param {string} sessionId The session id for the new session
 * @param {string} userId The user id
 * @returns {Promise.<Object>} The updated session
 * @throws Error
 * TODO Throw an error when the session already exists to avoid leaking the session to the wrong user
 */
const initSession = (sessionId, userId) => {
  return fetchSession(sessionId)
    .catch(() => {
      const session = {
        id: sessionId,
        user: userId,
        messages: []
      };

      return persistSession(session);
    });
};

/**
 * Fetches a session by id
 * @param {string} sessionId The session id
 * @returns {Promise.<Object>} The updated session
 */
const fetchSession = (sessionId) => {
  const session = sessions.get(sessionId);

  if (!session) return Promise.reject(`Session "${ sessionId }" not found`);

  return Promise.resolve(session);
};

/**
 * Adds a message to a session
 * @param {string} sessionId The session id
 * @param {Object} message The message object
 * @returns {Promise.<Object>} The updated session
 */
const addMessage = (sessionId, message) => {
  return fetchSession(sessionId)
    .then(session => {
      message = Object.assign({
        id: String(Date.now()),
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
 * @param {string} sessionId The session id
 * @param {string} messageId The message id
 * @param {string} content The new message content
 * @returns {Promise.<Object>} The updated session
 */
const editMessage = (sessionId, messageId, content) => {
  return fetchSession(sessionId)
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
 * @param {string} sessionId The session id the message belongs to
 * @param {string} messageId The message id to remove
 * @returns {Promise.<Object>} The updated session
 */
const deleteMessage = (sessionId, messageId) => {
  return fetchSession(sessionId)
    .then(session => {
      const message = _.find(session.messages, { id: messageId });

      message.deleted = true;

      return persistSession(session);
    });
};

module.exports = { initSession, fetchSession, addMessage, editMessage, deleteMessage };
