import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css"; // Import the CSS file
import profileImage from "./profile.jpeg";
import emailImage from "./mail.jpeg";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [approvedImages, setApprovedImages] = useState([]);
    const [error, setError] = useState("");
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchUsers();
        fetchImages();
        fetchApprovedImages();
    }, []);

    // Fetch users
    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/admin/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Fetch images
    const fetchImages = async () => {
        try {
            const response = await axios.get("http://localhost:5000/images");
            setImages(response.data);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

     const [deleteMessage, setDeleteMessage] = useState(""); // State to hold delete message

    // // Delete an image
    // const handleDeleteImage = async (filename) => {
    //     try {
    //         const response = await axios.delete(`http://localhost:5000/images/${filename}`);
    //         console.log(response.data);
    //         fetchImages(); // Refresh images list after deletion
            
    //         // Set the success message
    //         setDeleteMessage("Image deleted successfully!");

    //         // Clear the success message after 3 seconds
    //         setTimeout(() => {
    //             setDeleteMessage(""); // Clear message after 3 seconds
    //         }, 3000);
    //     } catch (error) {
    //         console.error("Error deleting image:", error);
    //     }
    // };


    // Handle input change
    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
        setError("");
    };

    // Add new user
    const handleAddUser = async (e) => {
        e.preventDefault();
    
        if (newUser.password !== newUser.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:5000/admin/users", {
                username: newUser.username,
                email: newUser.email,
                password: newUser.password,
                confirmPassword: newUser.confirmPassword,
            });
            console.log("User added:", response.data);
            fetchUsers();
            setNewUser({ username: "", email: "", password: "", confirmPassword: "" });
            setError("");
        } catch (error) {
            console.error("Error adding user:", error);
            setError("Failed to add user. Please try again.");
        }
    };
    

    // Delete a user
    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/admin/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const fetchApprovedImages = async () => {
        try {
            const response = await axios.get("http://localhost:5000/approved-images");
            setApprovedImages(response.data);
        } catch (error) {
            console.error("Error fetching approved images:", error);
        }
    };

    const handleDeleteImage = async (filename) => {
        try {
            await axios.post("http://localhost:5000/approve-image", { filename });
            setImages(images.filter(image => image !== filename));
            setApprovedImages([...approvedImages, filename]);
            setDeleteMessage("Image moved to Approved Files!");

            setTimeout(() => {
                setDeleteMessage("");
            }, 3000);
        } catch (error) {
            console.error("Error approving image:", error);
        }
    };

    const [searchQuery, setSearchQuery] = useState("");

    

    // Filter users based on username or email
    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    


    return (
        <div className="admin-container">
            <h1 className="title">Admin Dashboard</h1>

            <div className="form-container">
                <div className="add-user-header">
                    <h2 className="add-user-title">Add User</h2>
                    <img src={profileImage} alt="User Profile" className="profile-image" />
                </div>
                <form onSubmit={handleAddUser} className="user-form">
                <input type="text" name="username" placeholder="Username" value={newUser.username} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleChange} required />
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" value={newUser.confirmPassword} onChange={handleChange} required />
                    
                    {error && <p className="error-message">{error}</p>} 

                    <button type="submit" className="add-user-btn">Add User</button>
                </form>
            </div>

            <h2>Users List</h2>
<input 
    type="text" 
    placeholder="Search by username or email..." 
    value={searchQuery} 
    onChange={(e) => setSearchQuery(e.target.value)}
    className="search-input"
/>

{filteredUsers.length === 0 ? (
    <p>No users found.</p>
) : (
    <table className="users-table">
        <thead>
            <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {filteredUsers.map((user) => (
                <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="delete-btn" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
)}


<h2>Uploaded Files</h2>
            <div className="images-container">
                {images.length > 0 ? (
                    images.map((filename, index) => (
                        <div key={index} className="image-wrapper">
                            <img src={`http://localhost:5000/images/${filename}`} alt={filename} className="image-preview" />
                            <p>{filename}</p>
                            <button className="delete-btn" onClick={() => handleDeleteImage(filename)}>Approve</button>
                        </div>
                    ))
                ) : (
                    <p>No images uploaded yet.</p>
                )}
                {deleteMessage && <p className="success-message">{deleteMessage}</p>}
            </div>

           

            <h2>Approved Files</h2>
<div className="images-container">
    {approvedImages.length > 0 ? (
        approvedImages.map((filename, index) => (
            <div key={index} className="image-wrapper">
                <img 
                    src={`http://localhost:5000/approve-image/${filename}`} 
                    alt={filename} 
                    className="image-preview" 
                />
                <p>{filename}</p>
            </div>
        ))
    ) : (
        <p>No approved files yet.</p>
    )}
</div>
<SendEmail />


        </div>
    );
};

// Separate email sending component
const SendEmail = () => {
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");

    const sendEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/send-email", {
                to: email,
                subject,
                text: message,
            });

            
            if (response.status === 200) {
                setStatus("✅ Email sent successfully!");
                // Clear the input fields
                setEmail("");
                setSubject("");
                setMessage("");
            } else {
                setStatus("❌ Failed to send email.");
            }
        } catch (error) {
            setStatus(`❌ Error: ${error.message}`);
        }
        
    };
     // Automatically clear status message after 3 seconds
     useEffect(() => {
        if (status) {
            const timer = setTimeout(() => {
                setStatus("");
            }, 3000);

            return () => clearTimeout(timer); // Cleanup function
        }
    }, [status]);
    return (
        <div className="email-container">
            <h2>Send Email</h2>

    {/* Email Icon Image - Placed Above the Form */}
    <div className="image-wrapper">
        <img src={emailImage} alt="Email Icon" className="email-icon" />
    </div>

    
    <form onSubmit={sendEmail}>
        <input 
            type="email" 
            placeholder="Recipient Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
        />
        <input 
            type="text" 
            placeholder="Subject" 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
            required 
        />
        <textarea 
            placeholder="Message" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required
        ></textarea>

        {/* Send Email Button */}
        <button type="submit" className="send-email-btn">
            📩 Send Email
        </button>
    </form>

    {status && <p>{status}</p>}
</div>
    )
};

export default AdminDashboard;
