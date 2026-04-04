import { useState } from 'react'
import { ChatMessages } from './components/ChatMessages';
import { ChatInput } from './components/ChatInput';
import './App.css'


      


function App(){

        const array=useState([]);

        const chatMessages= array[0]; // Gives the actual objects inside the array
        const setChatMessages= array[1]; // A function that also updats the html when array is updated, it is achived by swaping the previous array with a new array.

        return(
        <div className='appDiv'>
          <ChatMessages chatMessages={chatMessages} />
          <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages} />

        </div>
        );
      }


export default App
