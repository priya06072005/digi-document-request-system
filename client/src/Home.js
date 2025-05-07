import React, { useContext, useEffect, useState } from "react";
import { store } from "./App";
import { useNavigate } from "react-router-dom";
import aboutImage from "./about.png";
import "./Home.css";
import wwp from "./wwp.png";
import images from "./images.jpeg";
import document from "./document.jpg";
import student_id_card from "./student_id_card.webp";
import studycertificate from "./studycertificate.webp";
import bonafide from "./bonafide.webp";


const Home = () => {
  const [token] = useContext(store);
  const navigate = useNavigate();
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [message, setMessage] = useState("");
 
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [messages, setMessages] = useState({
    study: "",
    bonafide: "",
    transfer: "",
  });
  
  const [selectedFiles, setSelectedFiles] = useState({
    study: null,
    bonafide: null,
    transfer: null,
  });
  
  const handleFileUpload = async (event, type) => {
    event.preventDefault();
  
    if (!selectedFiles[type]) {
      setMessages((prev) => ({ ...prev, [type]: "Please select a file first." }));
      return;
    }
  
    const formData = new FormData();
    formData.append("image", selectedFiles[type]);
  
    try {
      const response = await fetch("http://localhost:5000/single", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
      if (response.ok) {
        setMessages((prev) => ({ ...prev, [type]: "✅ File uploaded successfully!" }));
        setSelectedFiles((prev) => ({ ...prev, [type]: null }));
        event.target.reset();
  
        setTimeout(() => {
          setMessages((prev) => ({ ...prev, [type]: "" }));
        }, 3000);
      } else {
        setMessages((prev) => ({ ...prev, [type]: `❌ Error: ${result.message}` }));
      }
    } catch (error) {
      setMessages((prev) => ({ ...prev, [type]: "❌ Network error! Please try again." }));
    }
  };
  
  const handleFileChange = (event, type) => {
    setSelectedFiles((prev) => ({ ...prev, [type]: event.target.files[0] }));
    setMessages((prev) => ({ ...prev, [type]: "" })); // Clear message when new file is selected
  };
  

  

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "ec7fa13a-8262-47c6-a195-980e8bab7cac");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const data = await res.json();
      if (data.success) {
        alert("Your message has been sent successfully!");
        event.target.reset();
      } else {
        alert("Message submission failed. Please try again!");
      }
    } catch (error) {
      alert("Network error! Please try again later.");
    }

  };

  const [faqs, setFaqs] = React.useState([
    { question: "How does AI-powered verification work?", answer: "Our system uses AI models to validate and verify document authenticity automatically.", open: false },
    { question: "Can I track my document request in real time?", answer: "Yes, our platform provides real-time updates on document processing status.", open: false },
    { question: "Is my data secure?", answer: "Absolutely! We use end-to-end encryption to ensure the highest level of security.", open: false },
  ]);
  
  const toggleFAQ = (index) => {
    setFaqs(faqs.map((faq, i) => (i === index ? { ...faq, open: !faq.open } : faq)));
  };
  const handleProfileClick = () => {
    navigate('/userdashboard');
  };

 
  
  
  return (
    <div>
      {/* Navbar */}
      <nav style={styles.navbar}>
      <h2 style={styles.logo}>DIGIDOC<br /><span style={styles.tagline}>Smart. Secure. Seamless.</span></h2>
        <ul style={styles.navLinks}>
          <li onClick={() => scrollToSection("about")}>About</li>
          <li onClick={() => scrollToSection("document-request")}>Document Request</li>
          <li onClick={() => scrollToSection("contact")}>Contact Us</li>
        </ul>
         {/* User Profile Button */}
         <button style={styles.profileButton} onClick={handleProfileClick}>
       Profile
    </button>
      </nav>
      <div style={styles.imageContainer}>
  <img src={document} alt="About Us" style={styles.documentImage} />
</div>

     {/* About Section */}
    
<section id="about" style={styles.aboutSection}>
  <div style={styles.aboutContainer}>
    <div style={styles.aboutContent}>
      <h2 style={styles.aboutTitle}>About</h2>
      <p style={styles.aboutText}>
      DigiLock aims at 'Digital Empowerment' of citizen by providing access to authentic digital documents to citizen's/students. DigiLock is a secure cloud based platform for storage, sharing and verification of documents & certificates.
      </p>
    </div>
    <img src={aboutImage} alt="About Us" style={styles.aboutImage} />
  </div>
</section>
<section style={{ padding: "30px", margin: "20px 0" }}>
  <div style={{ 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "space-between", 
    flexWrap: "wrap",
    gap: "25px" // Reduced the gap for a closer layout
  }}>
    {/* Left Content */}
    <div style={{ flex: "1", maxWidth: "75%", padding: "15px" }}>
      <h2 style={{ marginBottom: "10px" }}>Certificate Request Process</h2>
      <p style={{ marginBottom: "15px" }}>
        Please ensure that all documents uploaded are clear and in the correct format (PDF or JPG).  
        Upload documents with the Id. (ex: R200***.jpg).  
        Our team will verify the details and process your request within <strong>3-5 working days</strong>.  
      </p>

      <h3 style={{ fontWeight: "600", marginBottom: "8px" }}>Guidelines:</h3>
      <ul style={{ 
        listStyleType: "disc", 
        textAlign: "left", 
        maxWidth: "600px", 
        paddingLeft: "20px", 
        lineHeight: "1.7",
        marginBottom: "15px",
        fontWeight:"600",
        fontsize:"60"
      }}>
        <li>Ensure the uploaded document is clear and legible.</li>
        <li>Double-check that the details match your records.</li>
        <li>Requests submitted after 5 PM will be processed the next working day.</li>
        <li>Contact the admin in case of urgent processing.</li>
      </ul>

      <h3 style={{ fontWeight: "600", marginBottom: "8px" }}>Processing Time:</h3>
      <p style={{ lineHeight: "1.5" }}>
        - Standard requests: <strong>3-5 working days</strong> <br />
        - Urgent requests (with justification): <strong>1-2 working days</strong> <br />
        - A confirmation email will be sent once the certificate is ready for collection.  
      </p>
    </div>

    {/* Right Image Section */}
    <div style={{ flex: "1", maxWidth: "35%", textAlign: "right", padding: "10px" }}>
  <img 
    src={images} 
    alt="Certificate Process" 
    style={{ 
      width: "100%",  // Ensures it takes full container width
      maxWidth: "400px", // Increased max width to make it larger
      height: "auto", 
      borderRadius: "8px", 
      margin: "auto",
      display: "block"
    }} 
  />
</div>

  </div>
</section>


      {/* Document Request Section */}
      
      <section id="document-request" style={styles.section}>
      <h1>Explore</h1>
    <h2>Request a Document</h2>
    <p>Easily submit your document request with automated approval and real-time tracking.</p>

    <div style={styles.cardContainer}>
  {/* Study Certificate */}
  <div style={styles.card}>
    <h3>Request for Study Certificate</h3>
    <img src={studycertificate} alt="Study Certificate" style={styles.image} />
    <p style={styles.paragraph}>
      A Study Certificate verifies your enrollment and academic status at the institution. Please upload the necessary documents to process your request.
    </p>
    <form onSubmit={(e) => handleFileUpload(e, "study")} style={styles.form}>
      <input type="file" name="image" onChange={(e) => handleFileChange(e, "study")} required style={styles.input} />
      <button type="submit" style={styles.button}>Upload File</button>
    </form>
    {messages.study && <p style={styles.message}>{messages.study}</p>}
  </div>

  {/* Bonafide Certificate */}
  <div style={styles.card}>
    <h3>Request for Bonafide Certificate</h3>
    <img src={bonafide} alt="Bonafide Certificate" style={styles.image} />
    <p style={styles.paragraph}>
      A Bonafide Certificate certifies that you are a genuine student of the institution. Kindly upload your proof to initiate the process.
    </p>
    <form onSubmit={(e) => handleFileUpload(e, "bonafide")} style={styles.form}>
      <input type="file" name="image" onChange={(e) => handleFileChange(e, "bonafide")} required style={styles.input} />
      <button type="submit" style={styles.button}>Upload File</button>
    </form>
    {messages.bonafide && <p style={styles.message}>{messages.bonafide}</p>}
  </div>

  {/* Transfer Certificate */}
  <div style={styles.card}>
    <h3>Request for Transfer Certificate</h3>
    <img src={student_id_card} alt="Transfer Certificate" style={styles.image} />
    <p style={styles.paragraph}>
      A Transfer Certificate is issued when a student leaves the institution. Please upload the necessary documents to request your TC.
    </p>
    <form onSubmit={(e) => handleFileUpload(e, "transfer")} style={styles.form}>
      <input type="file" name="image" onChange={(e) => handleFileChange(e, "transfer")} required style={styles.input} />
      <button type="submit" style={styles.button}>Upload File</button>
    </form>
    {messages.transfer && <p style={styles.message}>{messages.transfer}</p>}
  </div>
</div>



  </section>


     {/* What We Provide Section */}
<section id="services" style={styles.section}>
  <h2 style={styles.heading}>What We Provide</h2>
  <div style={styles.contentContainer}>
    <div style={styles.textContainer}>
      <p>
        Our platform offers the following services to make document requests simple and efficient.
      </p>
      <ul style={styles.serviceList}>
  <li style={styles.serviceItem}>✅ AI-powered document verification</li>
  <li style={styles.serviceItem}>📄 Optical Character Recognition (OCR) for enhanced accuracy</li>
  <li style={styles.serviceItem}>📌 Real-time tracking of document requests</li>
  <li style={styles.serviceItem}>🔒 Secure and automated approval system</li>
  <li style={styles.serviceItem}>📧 Email integration for seamless communication</li>
  <li style={styles.serviceItem}>📊 User-friendly dashboard for managing requests</li>
</ul>

    </div>
    <img src={wwp} alt="What We Provide" style={styles.image} />
  </div>
</section>




      {/* Contact Us Section */}
      <section id="contact" style={styles.formContainer}>
        <h2>Contact Us</h2>
        <p>Have any questions? Fill out the form below, and we’ll get back to you.</p>
        <form onSubmit={onSubmit} style={styles.formCard}>
          <label style={styles.label}>
            Name:
            <input type="text" name="name" required style={styles.input} />
          </label>
          <label style={styles.label}>
            Email:
            <input type="email" name="email" required style={styles.input} />
          </label>
          <label style={styles.label}>
            Message:
            <textarea name="message" required style={styles.textarea}></textarea>
          </label>
          <button type="submit" style={styles.button}>
            Send Message
          </button>
        </form>
      </section>

      {/* FAQ Section */}
<section id="faq" style={styles.faqSection}>
  <h2 style={styles.heading}>Frequently Asked Questions</h2>
  <div style={styles.faqContainer}>
    {faqs.map((faq, index) => (
      <div key={index} style={styles.faqItem}>
        <button style={styles.faqQuestion} onClick={() => toggleFAQ(index)}>
          {faq.question}
        </button>
        {faq.open && <p style={styles.faqAnswer}>{faq.answer}</p>}
      </div>
    ))}
  </div>
</section>


      {/* Footer */}
<footer style={styles.footer}>
  <div style={styles.footerContent}>
    <p>&copy; 2025 Digital Docs. All rights reserved.</p>
    <div style={styles.footerLinks}>
      <a href="/privacy-policy" style={styles.link}>Privacy Policy</a>
      <span style={styles.separator}>|</span>
      <a href="/terms-of-service" style={styles.link}>Terms of Service</a>
      <span style={styles.separator}>|</span>
      <a href="/contact-us" style={styles.link}>Contact Us</a>
    </div>
  </div>
</footer>

    </div>
  );
};

// Styles
const styles = {
  logo: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "ffffff",  // A professional blue color
    textAlign: "center",
    letterSpacing: "1px",  // Adds spacing between letters
    textTransform: "uppercase",  // Makes the text uppercase for emphasis
    marginBottom: "10px",
    fontFamily: "'Roboto', sans-serif",  // Clean, modern font
  },
  tagline: {
    fontSize: "10px",
    fontWeight: "400",  // Lighter weight for the tagline
    color: "#555",  // Dark grey for contrast
    fontStyle: "italic",  // Adds emphasis to the tagline
    display: "block",  // Displays on a new line
    marginTop: "5px",  // Adds space between the title and tagline
  },
 
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#333",
    color: "white",
  },

  navLinks: {
    display: "flex",
    listStyle: "none",
    gap: "20px",
    cursor: "pointer",
  },
  section: {
    padding: "50px 20px",
    textAlign: "center",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    backgroundColor: "#ffffff",
  },
  formCard: {
    width: "100%",
    maxWidth: "450px",
    padding: "30px",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: "16px",
    color: "#333",
    fontWeight: "500",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginTop: "8px",
    fontSize: "16px",
    transition: "border 0.3s ease",
  },
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginTop: "8px",
    minHeight: "120px",
    resize: "vertical",
    fontSize: "16px",
    transition: "border 0.3s ease",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "12px",
    fontSize: "18px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "15px",
    transition: "background 0.3s ease, transform 0.2s ease",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
 
  card: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "auto",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
 
  

  message: {
    marginTop: "10px",
    fontWeight: "bold",
    color: "#333",
  },
  
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "20px",
  },
  aboutSection: {
    padding: "80px 20px",
    backgroundColor: "#ffffff",
    color: "#333",
    display: "flex",
    justifyContent: "center",
  },
  aboutContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "1000px",
    width: "100%",
    gap: "40px",
  },
  aboutContent: {
    flex: 1,
    textAlign: "left",
  },
  aboutTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  aboutText: {
    fontSize: "18px",
    fontWeight: "500",
    lineHeight: "1.6",
  },
  aboutImage: {
    flex: 1,
    maxWidth: "450px",
    borderRadius: "12px",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
  },
  documentImage: {
    flex: 1,
    maxWidth: "1284px",
    borderRadius: "12px",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
  },
  
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  contentContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "left",
  },
  textContainer: {
    width: "55%",
  },
  
  image: {
    width: "40%",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  

  faqSection: {
    padding: "50px 10%",
    textAlign: "center",
    backgroundColor: "#ffffff",
  },
  faqContainer: {
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "left",
  },
  faqItem: {
    marginBottom: "10px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
  },
  faqQuestion: {
    width: "100%",
    background: "none",
    border: "none",
    textAlign: "left",
    fontSize: "1.2rem",
    fontWeight: "bold",
    cursor: "pointer",
    padding: "10px 0",
  },
  faqAnswer: {
    fontSize: "1rem",
    color: "#555",
    marginTop: "5px",
    transition: "all 0.3s ease-in-out",
  },
  
 profileButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "20px",
    fontSize: "16px",
  },
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    padding: "20px",
    marginTop: "30px",
    width: "100%",
    position: "relative",
    bottom: "0",
  },
  footerContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  footerLinks: {
    marginTop: "10px",
  },
  link: {
    color: "#00aaff",
    textDecoration: "none",
    fontSize: "16px",
    margin: "0 10px",
  },
  separator: {
    color: "#ccc",
  },
  serviceList: {
    listStyleType: "none", // Removes default bullet points
    padding: "0",
    margin: "20px 0",
    textAlign: "left",
    maxWidth: "700px",
  },
  serviceItem: {
    fontSize: "18px",
    color: "#333",
    backgroundColor: "#f4f4f4",
    padding: "10px 15px",
    marginBottom: "10px",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

export default Home;
