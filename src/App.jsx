import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { getAuth } from 'firebase/auth';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
	const pageRef = useRef(null);

	const navigation = useNavigate();
	
	const [adviceToastShown, setAdviceToastShown] = useState(false);

	const [currentGroup, setCurrentGroup] = useState('');
	const [loggedIn, setLoggedIn] = useState(true);

	const [touchStart, setTouchStart] = useState(0);
	const [touchEnd, setTouchEnd] = useState(0);	
	const [sidebarOpen, setSidebarOpen] = useState(true);

	const adjustPageLayout = () => {
		if (sidebarOpen) {
			pageRef.current.classList.remove('page-mobile-sidebar-closed');
		} else {
			pageRef.current.classList.add('page-mobile-sidebar-closed');
		}
	}

	const handleTouchStart = (e) => {
		setTouchStart(e.targetTouches[0].clientX);
	}

	const handleTouchMove = (e) => {
		setTouchEnd(e.targetTouches[0].clientX);
	}

	useEffect(() => {
		const auth = getAuth();
		auth.onAuthStateChanged((state) => {
			setLoggedIn(state !== null);
		});
	}, []);

	useEffect(() => {
		if (!adviceToastShown && window.innerWidth < 768) {
			toast('Swipe left to see the groups!', {
				position: 'top-center',
				type: 'info',
			});
			setAdviceToastShown(true);
		}
	}, [adviceToastShown]);

	useEffect(() => {
		if (!loggedIn) {
			navigation('/login');
		}
	}, [loggedIn]);

	
	useEffect(() => {
		if (touchEnd - touchStart >= 250) {
			console.log('swipe left');
			setSidebarOpen(true);
		} else if (touchStart - touchEnd >= 250) {
			console.log('swipe right');
			setSidebarOpen(false);
		}
	}, [touchEnd]);
		
	useEffect(() => {
		adjustPageLayout();
	}, [sidebarOpen]);

	return (	
		loggedIn &&
		<div 
			className="page"
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			ref={(e) => pageRef.current = e}
		>
			<Topbar />

			<Sidebar 
				changeGroup={(newGroup) => {
					setCurrentGroup(newGroup);
					if (sidebarOpen && window.innerWidth <= 768) {
						setSidebarOpen(false);
					}
				}} 
				open={sidebarOpen}
			/>

			<Chat group={currentGroup} />	

			<ToastContainer />
		</div>
	);
}
