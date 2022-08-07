import { useState, useRef, useEffect } from 'react';
import db from '../../firebase';
import { collection, query, orderBy, addDoc, onSnapshot } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ReactModal from 'react-modal';
import './index.css';

export default function Sidebar({ changeGroup, open }) {
	const [groups, setGroups] = useState([]);

	const [selectedGroup, setSelectedGroup] = useState(0);

	const [modalOpen, setModalOpen] = useState(false);
	const modalPictureDisplay = useRef(null);

	const [modalGroupNameInput, setModalGroupNameInput] = useState('');
	const [modalGroupPictureInput, setModalGroupPictureInput] = useState('');

	const [modalFormSubmitWentWrong, setModalFormSubmitWentWrong] = useState(false);

	const addGroup = async (name, picture) => {
		setGroups([...groups, { name, picture }]);

		const storage = getStorage();
		const storageRef = ref(storage, `group_pics/${name}`);
		await uploadBytes(storageRef, picture);

		const groupsCollection = collection(db, 'groups');
		await addDoc(groupsCollection, { 
			name, 
			picture: `group_pics/${name}`,
			createdAt: new Date()
		});

		setModalOpen(false);
	}

	const handleGroupImageSelected = (event) => {
		modalPictureDisplay.current.src = URL.createObjectURL(event.target.files[0]);
		setModalGroupPictureInput(event.target.files[0]);
	}

	const handleGroupAddFormSubmit = (event) => {
		event.preventDefault();
		setModalFormSubmitWentWrong(false);
	}

	useEffect(() => {
		const groupsQuery = query(collection(db, 'groups'), orderBy('createdAt', 'asc'));
		const unsubscribe = onSnapshot(groupsQuery, (snapshot) => {
			const docs = snapshot.docs.map((doc) => {
				return doc.data();
			});

			const fetchImage = async (doc) => {
				const storage = getStorage();	
				const url = await getDownloadURL(ref(storage, doc.picture));

				return url;
			}

			const loadImages = async () => {
				const newGroups = docs.filter((doc) => (
					!groups.includes(doc)
				));

				for (let i = 0; i < newGroups.length; i++) {
					(async () => {
						const image = await fetchImage(newGroups[i]);
						newGroups[i].picture = image;	
						setGroups((groups) => [...groups, newGroups[i]]);
					})();
				}
			}

			(async () => {
				await loadImages();
			})();
		});

		return unsubscribe;
	}, []);

	useEffect(() => {
		changeGroup(groups[selectedGroup]);
	}, [selectedGroup]);

	useEffect(() => {
		if (modalFormSubmitWentWrong === false) {
			if (modalGroupNameInput.trim().length === 0) {
				setModalFormSubmitWentWrong(true);
				return;
			}
			setModalOpen(false);
			(async () => await addGroup(modalGroupNameInput, modalGroupPictureInput))();
			setModalFormSubmitWentWrong(null);
		}
	}, [modalFormSubmitWentWrong]);

	return (
		<>
			<div className="dummy-background"  />
			<aside style={{
				display: open ? 'block' : 'none',
				transform: open ? 'translateX(0)' : 'translateX(-100%)',
				transition: 'transform 300ms cubic-bezier(.17,.67,0,1.45)',	
			}}>
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
		</>
	)
}
