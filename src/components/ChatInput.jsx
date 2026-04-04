import { useState } from 'react'

export function ChatInput({ setChatMessages}){

        const [inputMessage, setInputMessage]= useState('');

        function saveInputMessage(event){
          setInputMessage(event.target.value);
        }

        async function getAIResponse(inputMessage) {
          const res = await fetch("Hello", {
            method: "POST",
            headers: {
              "Authorization": "Bearer Hello", 
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

            <input className='input' placeholder='Type here'  onChange={saveInputMessage} value= {inputMessage} />
            <button  className='sendBut' onClick={sendMessages} >Send</button>
            
          </div>
        );
      }