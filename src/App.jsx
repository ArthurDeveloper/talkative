import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function App() {
	const navigation = useNavigate();
	const [currentGroup, setCurrentGroup] = useState('');
	const [loggedIn, setLoggedIn] = useState(true);
	useEffect(() => {
		const auth = getAuth();
		auth.onAuthStateChanged((state) => {
			setLoggedIn(state !== null);
		});
	}, []);

	useEffect(() => {
		if (!loggedIn) {
			navigation('/login');
		}
	}, [loggedIn]);

	return (	
		loggedIn &&
		<div className="page">
			<Topbar />

			<Sidebar changeGroup={(newGroup) => setCurrentGroup(newGroup)}/>
			<Chat group={currentGroup} />	
		</div>
	);
}
