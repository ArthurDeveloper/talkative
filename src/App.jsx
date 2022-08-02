import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function App() {
	const navigation = useNavigate();
	const [loggedIn, setLoggedIn] = useState(true);
	useEffect(() => {
		const auth = getAuth();
		console.log(auth);
		setLoggedIn(auth.currentUser !== null);
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
			<div className="row">
				<Sidebar />
				<Chat />
			</div>
		</div> 
	);
}
