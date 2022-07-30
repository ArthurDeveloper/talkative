import './index.css';

export default function Sidebar() {
	const groups = new Array(5).fill(0).map((value, index) => {
		return {
			name: `Group ${index}`,
			picture: 'https://images.pexels.com/photos/834894/pexels-photo-834894.jpeg?auto=compress&cs=tinysrgb&w=600'
		}
	});

	return (
		<aside>
			<nav className="groups">
				{groups.map((value, index) => {
					return <div key={index} className="group-data">
						<img src={value.picture} className="group-picture" />
						<div className="group-name">{value.name}</div>
					</div>
				})}	
			</nav>
		</aside>
	)
}
