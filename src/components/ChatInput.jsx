import { useState, useEffect, useRef } from 'react'

export function ChatInput({ setChatMessages}){
        const inputRef = useRef(null);
        const [inputMessage, setInputMessage]= useState('');

        useEffect(() => {
          inputRef.current?.focus();
        }, []);

        function saveInputMessage(event){
          setInputMessage(event.target.value);
        }

        function handleKeyDown(event){
          if(event.key === 'Enter'){
            sendMessages();
          }
        }

        async function getAIResponse(inputMessage) {
          const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": "Bearer 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", 
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              model: "llama-3.3-70b-versatile",
              messages: [
                { role: "user", content: inputMessage }
              ]
            })
          });

          const data = await res.json();
          return data.choices[0].message.content;
        }
        
     async function sendMessages(){

        // 1. Add user message
          const userMessage = {
            message: inputMessage,
            sender: 'user',
            key: crypto.randomUUID()
          };

          setChatMessages(prev => [...prev, userMessage]);

          const currentInput = inputMessage;
          setInputMessage('');

          // 2. Get AI response
          const response = await getAIResponse(currentInput);

          // 3. Add bot message
          const botMessage = {
            message: response,
            sender: 'robot',
            key: crypto.randomUUID()
          };

          setChatMessages(prev => [...prev, botMessage]);
        }
        return (
          <div className='inputDiv'>

            <textarea  
             ref={inputRef}  
             className="input"  
             placeholder="Ask MyBot"  
             onChange={saveInputMessage}  
             onKeyDown={handleKeyDown}  
             value={inputMessage}  
             autoFocus  
             rows={1}
           />
            <button  className='sendBut' onClick={sendMessages} >Send</button>
            
          </div>
        );
      }
