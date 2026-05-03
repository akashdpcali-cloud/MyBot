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
            event.preventDefault();
            sendMessages();
          }
        }

        async function getAIResponse(inputMessage) {
  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=AIzaSyC9aTz5UGZlgDZx5NluMT0JDpBUhCDWRhc",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: inputMessage }
            ]
          }
        ]
      })
    }
  );

  const data = await res.json();

  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
}

        
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
