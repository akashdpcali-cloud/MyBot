import robotAvatar from '../assets/robot.jpeg'
import userAvatar from '../assets/user.jpeg'

export function ChatMessage(props){

        const message=props.message;
        const sender=props.sender;

        return (
          <div className={sender==='user' ? 'user' : 'robot'} >
            {sender==='robot' && <img src={robotAvatar} />}
            <div className='message'>{message}</div>
            {sender==='user' && <img src={userAvatar} width='50px'/>}
          </div>
        );
      }