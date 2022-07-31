import { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

export default function Chat() {
	const messagesRef = useRef(null);

	const [messages, setMessages] = useState(new Array(30).fill(0).map((value, index) => {
		return { 
			sender: 'John Doe',
			senderPicture: 'https://images.pexels.com/photos/834894/pexels-photo-834894.jpeg?auto=compress&cs=tinysrgb&w=600',
			content: `Message ${index}`
		}
	}));

	const handleMessageSent = (event) => {
		if (event.key === 'Enter') {
			if (event.target.value.length === 0) {
				toast('Type something before sending!', {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: false,
					type: 'error'
				});
				return;
			}

			setMessages([...messages, {
				sender: 'John Doe',
				senderPicture: 'https://images.pexels.com/photos/834894/pexels-photo-834894.jpeg?auto=compress&cs=tinysrgb&w=600',
				content: event.target.value
			}]);

			event.target.value = '';
		}
	}

	useEffect(() => {
		messagesRef.current.scroll({ top: messagesRef.current.scrollHeight });
	}, [messages]);

	return (
		<div className="chat">
			<div className="messages-wrapper" ref={(e) => messagesRef.current = e}>
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
			<input
				className="message-input"
				placeholder="Type your message..."
				onKeyPress={handleMessageSent}
			/>		

			<ToastContainer />
		</div>
	);
}
