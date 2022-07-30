import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';

export default function App() {
	return (
		<div className="page">
			<Topbar />
			<div className="row">
				<Sidebar />
				<Chat />
			</div>
		</div>
	)
}
