import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import './firebase';
import './index.css';

const root = ReactDOM.createRoot(	
	document.querySelector('#root')
);

root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="login" element={<Login />} />
			<Route path="*" element={
				<div>
					Page couldn't be found!😢
					<br/>
					<NavLink to='/'>Back to home</NavLink>
				</div>
			} />
		</Routes>
	</BrowserRouter>
);
