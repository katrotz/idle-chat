import React, { Component } from 'react';
import { Badge, Row, Col, Icon, Button, Dropdown, Menu, message as messageService } from 'antd';
import TextareaAutosize from 'react-textarea-autosize';
import { createFragmentContainer, graphql } from 'react-relay'

import './Chat.css';
import addMessageMutation from './../../mutations/addMessage';
import editMessageMutation from './../../mutations/editMessage';
import deleteMessageMutation from './../../mutations/deleteMessage';

class Chat extends Component {
  state = {
    inputElementValue: '',
    editedMessageId: null
  };

  constructor() {
    super(...arguments);
  }

  render() {
    const user = this.props.user;
    const session = user.session;
    const messageCount = session.messages.filter(message => !message.deleted).length;

    return (
      <div className="chat">
        <Row className="chat-header">
          <Col>
            Idle Chat <Badge count={ messageCount } className="chat-message-count" style={{ backgroundColor: '#87d068' }}></Badge>
          </Col>
        </Row>

        <Row className="chat-messages" type="flex" align="bottom">
          <Col span={ 24 }>
            { session.messages.map(message => this.renderMessage(message)) }
          </Col>
        </Row>

        <Row className="chat-input">
          <Col>
            <TextareaAutosize className="chat-input-textarea"
                              placeholder="Press Shift + Enter for multiline message"
                              value={ this.state.inputElementValue }
                              onChange={ this.onChatInputChange }
                              onKeyPress={ this.onChatInputKeyPress }>
            </TextareaAutosize>
          </Col>
        </Row>
      </div>
    );
  }

  getUserInitials() {
    return (this.props.user.name || 'X').split(' ').map(w => w[0].toUpperCase()).join('');
  }

  renderMessage(message) {
    if (message.deleted) return false;

    return (
      <Row className="chat-message" key={ message.id  }>
        <Col span={ 4 }>
          <Button shape="circle" type="dashed" className="chat-message-avatar">
            { this.getUserInitials() }
          </Button>
        </Col>
        <Col span={ 16 }>{ message.content }</Col>
        <Col span={ 4 } className="chat-message-actions">
          <Dropdown overlay={ this.renderMessageContextMenu(message) }>
            <a href="javascript:;" className="ant-dropdown-link">
              <Icon type="ellipsis" style={{ transform: 'rotate(90deg)' }}/>
            </a>
          </Dropdown>
        </Col>
      </Row>
    );
  }

  renderMessageContextMenu(message) {
    return (
      <Menu>
        <Menu.Item key="edit">
          <a className="ant-dropdown-link" title="Edit" onClick={ () => this.editMessage(message) }>
            <Icon type="edit"/>
          </a>
        </Menu.Item>
        <Menu.Item key="delete">
          <a className="ant-dropdown-link" title="Delete" onClick={ () => this.deleteMessage(message) }>
            <Icon type="delete"/>
          </a>
        </Menu.Item>
      </Menu>
    );
  }

  editMessage(message) {
    this.setState({
      inputElementValue: message.content,
      editedMessageId: message.id
    });
  }

  deleteMessage(message) {
    deleteMessageMutation(this.props.user.id, message.id, () => {
      messageService.success(`Message removed`);
    });
  }

  submitMessage(content, messageId = null) {
    return new Promise((resolve) => (
      messageId
        ? editMessageMutation(this.props.user.id, messageId, content,  resolve)
        : addMessageMutation(this.props.user.id, content,  resolve)
    ));
  }

  onChatInputKeyPress = (e) => {
    if (e.key === 'Enter' && !e.nativeEvent.shiftKey && e.nativeEvent.target.value) {
      const value = e.nativeEvent.target.value;

      e.nativeEvent.preventDefault();

      if (this.state.editedMessageId) {
        this.submitMessage(value, this.state.editedMessageId);
      } else {
        this.submitMessage(value);
      }

      this.setState({ inputElementValue: '', editedMessageId: null });
    }
  };

  onChatInputChange = (event) => {
    const inputElementValue = event.target.value;
    // Discards the edit of the message if entire message is removed
    const editedMessageId = inputElementValue ? this.state.editedMessageId : null;
    this.setState({ inputElementValue, editedMessageId});
  };
}

export default createFragmentContainer(Chat, graphql`
  fragment Chat_user on User {
    id,
    name,
    avatar,
    session {
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
`)