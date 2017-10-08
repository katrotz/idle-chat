import React, { Component } from 'react';
import { Badge, Row, Col, Icon, Button, Dropdown, Menu, message } from 'antd';
import TextareaAutosize from 'react-textarea-autosize';

import './Chat.css';

class Chat extends Component {
  render() {
    const messageContextMenu = (
      <Menu>
        <Menu.Item key="edit">
          <a href="#" className="ant-dropdown-link" title="Edit" onClick={ this.editMessage }>
            <Icon type="edit"/>
          </a>
        </Menu.Item>
        <Menu.Item key="delete">
          <a href="#" className="ant-dropdown-link" title="Delete" onClick={ this.deleteMessage }>
            <Icon type="delete"/>
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="chat">
        <Row className="chat-header">
          <Col>
            Idle Chat <Badge count={ 10 } className="chat-message-count" style={{ backgroundColor: '#87d068' }}></Badge>
          </Col>
        </Row>

        <Row className="chat-messages" type="flex" align="bottom">
          <Col span={ 24 }>
            <Row className="chat-message">
              <Col span={ 4 }>
                <Button shape="circle" type="dashed">
                  PIC
                </Button>
              </Col>
              <Col span={ 16 }>
                Some very long content might fit here if we try hard
              </Col>
              <Col span={ 4 } className="chat-message-actions">
                <Dropdown overlay={ messageContextMenu }>
                  <a className="ant-dropdown-link" href="#">
                    <Icon type="ellipsis" style={{ transform: 'rotate(90deg)' }}/>
                  </a>
                </Dropdown>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="chat-input">
          <Col>
            <TextareaAutosize className="chat-input-textarea"
                              placeholder="Press Shift + Enter for multiline message"
                              onKeyPress={ this.onChatInputKeyPress }>
            </TextareaAutosize>
          </Col>
        </Row>
      </div>
    );
  }

  editMessage() {}

  deleteMessage() {
    message.success(`Message removed`);
  }

  submitMessage(message) {}

  onChatInputKeyPress = (e) => {
    if (e.key === 'Enter' && !e.nativeEvent.shiftKey && e.nativeEvent.target.value) {
      const value = e.nativeEvent.target.value;

      e.nativeEvent.preventDefault();
      e.nativeEvent.target.value = '';

      this.submitMessage(value);
    }
  };
}

export default Chat;
