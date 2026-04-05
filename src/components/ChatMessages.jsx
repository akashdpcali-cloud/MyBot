import { useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage';

export function ChatMessages({chatMessages}){
        const chatMessagesRef=useRef(null);
        const hasScrolledRef = useRef(false);

        useEffect(() => {
          if (!hasScrolledRef.current && window.innerWidth < 768) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
            hasScrolledRef.current = true;
          }
        }, []);

        useEffect(() => {
          const lastMessage = document.getElementById("last-message");

          if (lastMessage) {
            lastMessage.scrollIntoView({
              behavior: "smooth",
              block: "start" // 👈 THIS is the key
            });
          }

        }, [chatMessages]);

        return(
          
          <div className='messageDiv' ref={chatMessagesRef}>
          
            {
              chatMessages.map((chatMessage, index) => {
                const isLast = index === chatMessages.length - 1;

                return (
                  <div key={chatMessage.key} id={isLast ? "last-message" : ""}>
                    <ChatMessage
                      message={chatMessage.message}
                      sender={chatMessage.sender}
                    />
                  </div>
                );
              })
            }
          </div>
        );

      }
