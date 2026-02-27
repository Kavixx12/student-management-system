import React, { useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom'; 
import './AccountSettings.css';
import { toast } from 'react-toastify'; 


const IcoProfile = () => (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
const IcoSecurity = () => (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>);

const IcoEye = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>);
const IcoEyeOff = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>);

export default function AccountSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const fileInputRef = useRef(null);

  const { profileImage, setProfileImage } = useOutletContext();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "Kaveesha",
    username: "user23826608",
    email: "kaveeshapathumina1234@gmail.com"
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const handleProfileChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) => setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const handleImageButtonClick = () => fileInputRef.current.click();

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    toast.success("Profile Updated Successfully!", { theme: "dark" });
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match!", { theme: "dark" });
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long!", { theme: "dark" });
      return;
    }
    toast.success("Password Changed Successfully!", { theme: "dark" });
    setPasswordData({ newPassword: "", confirmPassword: "" }); 
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <main className="dashboard-content" style={{ padding: '28px 32px' }}>
      <h1 className="dashboard-title">SETTINGS</h1>

      <div className="settings-page-container">
        <div className="settings-inner-sidebar">
          <div className="settings-section-title">Account</div>
          <button className={`settings-nav-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
            <IcoProfile /> Profile
          </button>
          <div className="settings-section-title" style={{ marginTop: '24px' }}>Security</div>
          <button className={`settings-nav-btn ${activeTab === 'password' ? 'active' : ''}`} onClick={() => setActiveTab('password')}>
            <IcoSecurity /> Password
          </button>
        </div>

        <div className="settings-content-area">
          {activeTab === 'profile' && (
            <>
              <h2 className="settings-content-title">PROFILE</h2>
              <form onSubmit={handleProfileSave}>
                <div className="avatar-section">
                  <span className="profile-form-label">Avatar</span>
                  <div className="avatar-preview-container">
                    <input type="file" ref={fileInputRef} onChange={handleImageFileChange} style={{ display: 'none' }} accept="image/png, image/jpeg, image/jpg" />
                    <div className="avatar-preview">
                    
                      {profileImage ? <img src={profileImage} alt="Profile" /> : "K"}
                    </div> 
                    <button type="button" className="avatar-change-btn" onClick={handleImageButtonClick}>Change Image</button>
                  </div>
                </div>

                <div className="profile-form-group">
                  <label className="profile-form-label">Name</label>
                  <input type="text" name="name" className="profile-form-input" value={formData.name} onChange={handleProfileChange} />
                </div>
                <div className="profile-form-group">
                  <label className="profile-form-label">Username</label>
                  <input type="text" name="username" className="profile-form-input" value={formData.username} onChange={handleProfileChange} />
                </div>
                <div className="profile-form-group">
                  <label className="profile-form-label">Email</label>
                  <input type="email" name="email" className="profile-form-input" value={formData.email} onChange={handleProfileChange} />
                </div>
                <button type="submit" className="save-profile-btn">Save Changes</button>
              </form>
            </>
          )}

          {activeTab === 'password' && (
            <>
              <h2 className="settings-content-title">SET PASSWORD</h2>
              <form onSubmit={handlePasswordSave}>
                <div className="profile-form-group">
                  <label className="profile-form-label">New Password</label>
                  <div className="password-input-wrapper">
                    <input type={showNewPassword ? "text" : "password"} name="newPassword" className="profile-form-input" value={passwordData.newPassword} onChange={handlePasswordChange} required />
                    <button type="button" className="password-toggle-btn" onClick={() => setShowNewPassword(!showNewPassword)}>
                      {showNewPassword ? <IcoEyeOff /> : <IcoEye />}
                    </button>
                  </div>
                </div>
                <div className="profile-form-group">
                  <label className="profile-form-label">Confirm Password</label>
                  <div className="password-input-wrapper">
                    <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" className="profile-form-input" value={passwordData.confirmPassword} onChange={handlePasswordChange} required />
                    <button type="button" className="password-toggle-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <IcoEyeOff /> : <IcoEye />}
                    </button>
                  </div>
                  <p className="password-hint">8 characters or longer. Combine upper and lowercase letters and numbers.</p>
                </div>
                <button type="submit" className="save-profile-btn">Save Changes</button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}