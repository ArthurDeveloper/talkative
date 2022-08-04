import { useState, useRef, useEffect } from 'react';
import ReactModal from 'react-modal';
import './index.css';

export default function Sidebar({ changeGroup }) {
	const [groups, setGroups] = useState(new Array(5).fill(0).map((value, index) => {
		return {
			name: `Group ${index}`,
			picture: 'https://images.pexels.com/photos/834894/pexels-photo-834894.jpeg?auto=compress&cs=tinysrgb&w=600'
		}
	}));

	const [selectedGroup, setSelectedGroup] = useState(0);

	const [modalOpen, setModalOpen] = useState(false);
	const modalPictureDisplay = useRef(null);

	const [modalGroupNameInput, setModalGroupNameInput] = useState('');
	const [modalGroupPictureInput, setModalGroupPictureInput] = useState('');

	const [modalFormSubmitWentWrong, setModalFormSubmitWentWrong] = useState(false);

	const addGroup = (name, picture) => {
		setGroups([...groups, { name, picture }]);
	}

	const handleGroupImageSelected = (event) => {
		modalPictureDisplay.current.src = URL.createObjectURL(event.target.files[0]);
		setModalGroupPictureInput(URL.createObjectURL(event.target.files[0]));
	}

	const handleGroupAddFormSubmit = (event) => {
		event.preventDefault();
		setModalFormSubmitWentWrong(false);
	}

	useEffect(() => {
		changeGroup(groups[selectedGroup]);
	}, []);

	useEffect(() => {
		changeGroup(groups[selectedGroup]);
	}, [selectedGroup]);

	useEffect(() => {
		if (!modalFormSubmitWentWrong) {
			if (modalGroupNameInput.trim().length === 0) {
				setModalFormSubmitWentWrong(true);
				return;
			}
			setModalOpen(false);
			addGroup(modalGroupNameInput, modalGroupPictureInput);
		}
	}, [modalFormSubmitWentWrong]);

	return (
		<aside>
			<nav className="groups">
				{groups.map((value, index) => {
					return (
						<div
							key={index}
							className={`group-data ${selectedGroup === index ? 'selected' : ''}`}
							onClick={() => setSelectedGroup(index)}
						>
							<img src={value.picture} className="group-picture" />
							<div className="group-name">{value.name}</div>
						</div>
					)
				})}
			
				<div className="add-group-btn-wrapper">
					<button
						className="add-group-btn"
						onClick={() => setModalOpen(true)}
					>
						ADD
					</button>
				</div>
			
				<ReactModal
					isOpen={modalOpen}
					contentLabel="Add Group"
					style={{
						overlay: {
							backgroundColor: '#00000088',
							animation: modalOpen ? 
								'add-group-modal-overlay-fade-in 200ms ease-in-out' : 'none'
						},
						content: {
							backgroundColor: 'var(--background-secondary)',
							border: 'none',
							borderRadius: '0.5rem',
							color: '#fff',
							padding: '2.5rem',
							animation: modalOpen ? 
								'add-group-modal-content-fade-in 400ms cubic-bezier(.21,-0.07,0,1.24)' : 'none',
						} 
					}}
				>
					<h1>Add group</h1>

					<form className="add-group-modal-form" onSubmit={handleGroupAddFormSubmit}>
						<input
							placeholder="Group name"
							className= "add-group-modal-name-input"
							value={modalGroupNameInput}
							onChange={(e) => setModalGroupNameInput(e.target.value)}
							style={{
								animation: modalFormSubmitWentWrong ? 
									"add-group-modal-name-input-error-shake 400ms ease-in-out" :
									"none"
							}}

						/>
						
						<label
							className="add-group-modal-picture-input"
							for="add-group-modal-picture-input"
						>
							Upload picture (optional)
						</label>
						<input
							type="file"
							accept="image/*"
							id="add-group-modal-picture-input"
							onChange={(e) => handleGroupImageSelected(e)}
						/>

						<img
							ref={(e) => modalPictureDisplay.current = e}
							className="add-group-modal-picture-display"
						/>

						<button
							type="submit"
							className="add-group-modal-submit-btn"
						>
							ADD
						</button>
					</form>
				</ReactModal>
			</nav>
		</aside>
	)
}
