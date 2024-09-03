import React, { useState, useEffect } from 'react';
import './Profile.css';
import {Avatar} from '../../public/avatar'
import CardBackground from '../../public/cardBackground.svg'
import EditIcon from '../../public/editIcon.svg'
import api from '../libs/api';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [editData, setEditData] = useState(null);
  async function getProfiles() {
    try {
      const { data } = await api.get('/api/getProfiles');
      if(data.length > 0){
        setUserData(data[0])
        setEditData(data[0])
      }
    } catch (error) {
      console.error("getProfiles error", error);
    }
  }
  async function updateProfiles(data) {
    try {
      await api.put('/api/updateProfiles', data);
      getProfiles()
    } catch (error) {
      console.error("updateProfiles error", error);
    }
  }
  async function addProfiles(data) {
    try {
      await api.put('/api/addProfiles', data);
      getProfiles()
    } catch (error) {
      console.error("addProfiles error", error);
    }
  }
  useEffect(() => {
    getProfiles()
  }, [])

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditData({ ...userData });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    if(!editData.name || !editData.email || !editData.phone) {
      alert('The field of name or email or phone can not be empty.')
      return
    }
    if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(editData.email)){
      alert('Please enter email with correct format.')
      return
    }
    if(!/^1[3-9]\d{9}$/.test(editData.phone)){
      alert('Please enter phone number with correct format.')
      return
    }
    setUserData({ ...editData });
    setIsEditing(false);
    if(editData.id){
      updateProfiles({ ...editData })
    }else{
      addProfiles({ ...editData })
    }
  };

  return (
    <>
      {isEditing ? (
        <div className="profileEdit">
          <img src={Avatar} alt="Avatar" className='profileCardContentTopAvatarEdit'/>
          <div className="formGroup">
            <label><strong>Username:</strong></label>
            <input
              type="text"
              name="name"
              value={editData?.name}
              onChange={handleChange}
            />
          </div>
          <div className="formGroup">
            <label><strong>Email:</strong></label>
            <input
              type="email"
              name="email"
              value={editData?.email}
              onChange={handleChange}
            />
          </div>
          <div className="formGroup">
            <label><strong>Phone:</strong></label>
            <input
              type="text"
              name="phone"
              value={editData?.phone}
              onChange={handleChange}
            />
          </div>
            <button onClick={handleSaveClick} className="btnSave">Save</button>
            <button onClick={handleCancelClick} className="btnCancel">Cancel</button>
        </div>
      ) : (
        <>
          <h2 className="profileHeader">User Profile</h2>
          <div className="profileContainer">
            <div className="profileView">
              <img src={CardBackground} alt="CardBackground"  className='profileCardContentSvg'/>
              <img src={Avatar} alt="Avatar" className='profileCardContentTopAvatar'/>
              <img src={EditIcon} alt="EditIcon" className='profileCardContentEdit' onClick={handleEditClick} title="edit"/>
              <div className="profileContent">
                <div className="profileUsernameFont">{userData?.name}</div>
                <div className="profileEmailFont">{userData?.email}</div>
                <div className="profilePhoneFont">{userData?.phone}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
