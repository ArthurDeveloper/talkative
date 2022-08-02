import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

export default function Login() {
	const navigation = useNavigate();

	const handleGoogleSignIn = () => {
		const provider = new GoogleAuthProvider();
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
		<div>
			<button onClick={handleGoogleSignIn}>Sign in with Google</button>
			<ToastContainer />
		</div>
	)
}
