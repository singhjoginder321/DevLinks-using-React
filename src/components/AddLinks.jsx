import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profilePictureImage from "../assets/images/profile-picture.jpeg";
import "../style/add-links.css";
import Navbar from "./Navbar";

const AddLinks = () => {
  const [links, setLinks] = useState([]);
  const [linkIndex, setLinkIndex] = useState(0);

  useEffect(() => {
    const savedLinks = JSON.parse(localStorage.getItem("links")) || [];
    setLinks(savedLinks);
  }, []);

  const handleAddLink = () => {
    setLinkIndex(linkIndex + 1);
    setLinks([...links, { platform: "", link: "" }]);
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = links.map((link, i) =>
      i === index ? { ...link, [field]: value } : link
    );
    setLinks(updatedLinks);
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };

  const handleSave = () => {
    localStorage.setItem("links", JSON.stringify(links));
    toast.success("Links saved!");
  };

  return (
    <>
      <Navbar />
      <div className="full-section">
        <div className="main-section">
          <div className="left">
            <div className="smartphone">
              <div className="profile-container">
                <div className="profile-details-section">
                  <img src={profilePictureImage} alt="Profile Picture" />
                  <span className="name">Joginder Singh</span>
                  <span className="email">jogidnersingh@gmail.com</span>
                </div>
                <ul className="links">
                  <li>
                    <a href="#" className="github">
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a href="#" className="linkedin">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="#" className="youtube">
                      YouTube
                    </a>
                  </li>
                  <li>
                    <a href="#" className="facebook">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#" className="gitlab">
                      GitLab
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="container">
              <h2>Customize your links</h2>
              <span className="add-remove-para">
                Add/edit/remove links below and then share all your profiles
                with the world!
              </span>
              <button id="add-link-btn" onClick={handleAddLink}>
                + Add new link
              </button>
              <form id="links-form">
                {links.map((link, index) => (
                  <div className="link" key={index}>
                    <label htmlFor={`platform-${index}`}>Platform</label>
                    <select
                      id={`platform-${index}`}
                      value={link.platform}
                      onChange={(e) =>
                        handleLinkChange(index, "platform", e.target.value)
                      }
                    >
                      <option value="github">GitHub</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="facebook">Facebook</option>
                      <option value="youtube">YouTube</option>
                      <option value="gitlab">GitLab</option>
                    </select>
                    <label htmlFor={`link-${index}`}>Link</label>
                    <input
                      type="url"
                      id={`link-${index}`}
                      value={link.link}
                      onChange={(e) =>
                        handleLinkChange(index, "link", e.target.value)
                      }
                      required
                    />
                    <button
                      type="button"
                      className="remove-link-btn"
                      onClick={() => handleRemoveLink(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </form>
              <button type="button" className="save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default AddLinks;
