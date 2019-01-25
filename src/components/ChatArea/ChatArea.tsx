import * as React from 'react';
import { connect } from 'react-redux';
import StyledChatArea from './StyledChatArea';
import Message from '../Message';
import { scrollToBottom } from '../../utilities/common';

interface IChatAreaState {
  messageState: {
    messages: []
  }
}

interface IChatAreaProps {
    messages: []
}

class ChatArea extends React.Component {
  private chatAreaRef = React.createRef<HTMLDivElement>();

  public render() {
    const { messages } = this.props as IChatAreaProps;

    console.log('>>> messages count: ', messages.length);

    return (
      <StyledChatArea ref={this.chatAreaRef}>
          {messages.map((element: { from: string, content: string, time: string, type: string}, idx: number) => {
            return (
              <React.Fragment key={idx}>
                <Message message={element}/>
              </React.Fragment>
            )
          })}
      </StyledChatArea>
    );
  }

  public componentDidUpdate(): void {
    const chatAreaElement: Element = this.chatAreaRef.current as Element;
    const shouldScroll: boolean = chatAreaElement.scrollTop + chatAreaElement.clientHeight !== chatAreaElement.scrollHeight;

    if (shouldScroll) {
      scrollToBottom(chatAreaElement);
    }
  }
}

const mapStateToProps = (state: IChatAreaState) => ({
  messages: state.messageState.messages
});

export default connect(mapStateToProps)(ChatArea);