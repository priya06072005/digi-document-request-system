import React from "react";
import carousel1 from "./carousel1.png"; 
import home from "./home1.png"; 

const Welcome = () => {
  return (
    <div style={styles.container}>
      {/* First Section - Side-by-Side Layout */}
      <div style={styles.content}>
        <div style={styles.textContainer}>
          <h1 style={styles.title}>Welcome to DIGIDOC</h1>
          <p style={styles.subtitle}>Smart. Secure. Seamless.</p>
          <p style={styles.description}>
            🔒 Secure your documents with advanced encryption.<br />
            📜 AI-powered document verification for accuracy.<br />
            📁 Go paperless, stay organized, and save time!
          </p>
        </div>

        <div style={styles.imageContainer}>
          <img src={carousel1} alt="DIGIDOC" style={styles.image} />
        </div>
      </div>

      {/* Second Section - Full-Width Centered Image */}
      <div style={styles.fullWidthImageContainer}>
        <img src={home} alt="For Organizations" style={styles.fullWidthImage} />
      </div>

      {/* Text Content Below Image */}
      <div style={styles.contentColumn}>
        <div style={styles.textContainer}>
          <p style={styles.subtitle}>For Organizations</p>
          <p style={styles.description}>
            ✅ **Efficiency through Paperless Governance**  
            Streamline processes with real-time access to verified documents and eliminate paperwork.<br /><br />
            ✅ **Trusted Digital Transformation**  
            Get authenticated documents directly from issuers, ensuring reliability.<br /><br />
            ✅ **Secure Digital Gateway**  
            Serve as a trusted link for document exchange between issuers and requesters.<br /><br />
            ✅ **Instant Verification**  
            Verify documents in seconds, enabling faster and more user-friendly services.
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#f8f9fa",
    padding: "30px 20px",
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "30px",
    maxWidth: "2000px",
    width: "100%",
    marginBottom: "40px",
    flexWrap: "wrap", // Makes it responsive
  },
  contentColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    maxWidth: "900px",
    width: "100%",
    marginBottom: "50px",
  },
  textContainer: {
    padding: "10px",
    textAlign: "center",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#444",
    marginBottom: "15px",
  },
  description: {
    fontSize: "18px",
    color: "#555",
    lineHeight: "1.5",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50%", // Adjust width
  },
  image: {
    width: "100%", // Adjusted for responsiveness
    maxWidth: "550px",
    borderRadius: "10px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
  },
  fullWidthImageContainer: {
    width: "80%", // Full width of the page
    display: "flex",
    justifyContent: "center", // Centers the image
    alignItems: "center",
    overflow: "hidden",
    marginBottom: "20px",
  },
  fullWidthImage: {
    width: "90%", // Centers the image and takes most of the width
    maxWidth: "1000px", // Prevents it from being too large
    height: "auto",
  },
};

export default Welcome;