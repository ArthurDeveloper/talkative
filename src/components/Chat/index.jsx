import { useState, useRef, useEffect } from 'react';
import db from '../../firebase';
import { getAuth } from 'firebase/auth';
import { collection, query, orderBy, addDoc, onSnapshot } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

export default function Chat({ group }) {
	const messagesRef = useRef(null);

	const [messages, setMessages] = useState([]);
	const [userData, setUserData] = useState(null);

	const listenForMessagesInCurrentGroup = () => {
		const messagesQuery = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));
		onSnapshot(messagesQuery, (snapshot) => {
			const docs = snapshot.docs.map((doc) => {	
				return doc.data().group.name === group.name ? doc.data() : null;	
			}).filter((value) => value !== null);

			setMessages(docs);
		});
	}

	useEffect(() => {
		setUserData(getAuth().currentUser);
	}, []);

	useEffect(() => {
		const unsubscribe = listenForMessagesInCurrentGroup();
		return unsubscribe;
	}, [group]);

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

			const messagesCollection = collection(db, 'messages');
			addDoc(messagesCollection, {
				sender: userData.displayName,
				senderPicture: userData.photoURL,
				content: event.target.value,
				group: group,
				createdAt: new Date(),
			});

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
								referrerPolicy="no-referrer"
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
