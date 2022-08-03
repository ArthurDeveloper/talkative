import { GoogleAuthProvider, GithubAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Google, Github } from 'react-bootstrap-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

export default function Login() {
	const navigation = useNavigate();

	const handleSignIn = (providerName) => {
		const provider = 
			providerName === 'google' ? 
				new GoogleAuthProvider() : new GithubAuthProvider();
		const auth = getAuth();
		signInWithPopup(auth, provider)
			.then((result) => {
				console.log('here');
				navigation('/');
			})
			.catch((error) => {
				toast(error.message, {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: false,
					type: 'error'
				});
			});
	}

	return (
		<div className="login-page">
			<h1 className="main-text">
				<span className="blue-text">Welcome</span> to <span className="blue-text">Talk</span>Ative
			</h1>

			<div className="auth-buttons-wrapper">
				<button
					onClick={() => handleSignIn('google')}
					className="auth-button google-button"
				>
					<Google className="auth-button-icon google-icon"/> 
					<span className="auth-button-text">SIGN IN WITH GOOGLE</span>
				</button>

				<button 
					onClick={() => handleSignIn('github')}
					className="auth-button github-button"
				>
					<Github className="auth-button-icon github-icon"/>
					<span className="auth-button-text">SIGN IN WITH GITHUB</span>
				</button>

				<ToastContainer />
			</div>
		</div>
	)
}
