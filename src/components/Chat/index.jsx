import ScrollBar from 'react-scrollbar';
import './index.css';

export default function Chat() {
	const messages = new Array(30).fill(0).map((value, index) => {
		return { 
			sender: 'John Doe',
			senderPicture: 'https://images.pexels.com/photos/834894/pexels-photo-834894.jpeg?auto=compress&cs=tinysrgb&w=600',
			content: `Message ${index}`
		}
	});

	return (
		<div className="chat">
			<div className="messages-wrapper">
				{messages.map((message, index) => {
					return (
						<div className="message" key={index}>
							<img
								className="message-picture" 
								src={message.senderPicture}
								alt={message.sender}
							/>
							
							<div>
								<div className="message-sender">{message.sender}</div>
								<div className="message-content">{message.content}</div>
							</div>
						</div>
					)
				})}
			</div>
			<input className="message-input" placeholder="Type your message..."/>		
		</div>
	);
}
