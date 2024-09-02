import React, { useState, useEffect } from 'react';
import './Profile.css'; // 导入CSS文件
import {Avatar} from '../../public/avatar'
import CardBackground from '../../public/cardBackground.svg'
import EditIcon from '../../public/editIcon.svg'
import api from '../libs/api';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [editData, setEditData] = useState(null);
  async function getProfiles() {
    const { data } = await api.get('/api/getProfiles');
    if(data.length > 0){
      setUserData(data[0])
      setEditData(data[0])
    }
  }
  async function updateProfiles(data) {
    await api.put('/api/updateProfiles', data);
    getProfiles()
  }
  async function addProfiles(data) {
    await api.put('/api/addProfiles', data);
    getProfiles()
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
      alert('Please enter your name or email or phone.')
      return
    }
    if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(editData.email)){
      alert('Please enter email with correct format.')
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
        <div className="profile-edit">
          <img src={Avatar} alt="Avatar" className='profile-card-content-top-avatar-edit'/>
          <div className="form-group">
            <label><strong>Username:</strong></label>
            <input
              type="text"
              name="name"
              value={editData?.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label><strong>Email:</strong></label>
            <input
              type="email"
              name="email"
              value={editData?.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label><strong>Phone:</strong></label>
            <input
              type="text"
              name="phone"
              value={editData?.phone}
              onChange={handleChange}
            />
          </div>
            <button onClick={handleSaveClick} className="btn-save">Save</button>
            <button onClick={handleCancelClick} className="btn-cancel">Cancel</button>
        </div>
      ) : (
        <>
          <h2 className="profile-header">User Profile</h2>
          <div className="profile-container">
            <div className="profile-view">
              <img src={CardBackground} alt="CardBackground"  className='profile-card-content-svg'/>
              <img src={Avatar} alt="Avatar" className='profile-card-content-top-avatar'/>
              <img src={EditIcon} alt="EditIcon" className='profile-card-content-edit' onClick={handleEditClick} title="edit"/>
              <div className="profile-content">
                <div className="profile-usernameFont">{userData?.name}</div>
                <div className="profile-emailFont">{userData?.email}</div>
                <div className="profile-phoneFont">{userData?.phone}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
