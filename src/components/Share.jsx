import React, { useEffect, useState } from "react";
import "../style/share.css";
import ShareNavbar from "./ShareNavbar";

const Share = () => {
  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    console.log("UseEffect for fetching profile and links");
    const savedProfile = JSON.parse(localStorage.getItem("profile"));
    const savedLinks = JSON.parse(localStorage.getItem("links")) || [];
    setProfile(savedProfile);
    setLinks(savedLinks);
  }, []);

  const handleShareLinkClick = (event) => {
    event.preventDefault();
    const pageUrl = window.location.href;

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(pageUrl)
        .then(() => {
          alert("Page URL has been copied to the clipboard!");
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
        });
    }
  };

  return (
    <>
      <ShareNavbar />
      <div className="left">
        <div className="smartphone">
          <div className="profile-container" id="profile-details">
            {profile && (
              <>
                <div className="profile-details-2">
                  <img
                    src={profile.picture || ""}
                    alt="Profile"
                    id="profile-picture"
                  />
                  <span className="name" id="profile-name">
                    {profile.firstName} {profile.lastName}
                  </span>
                  <span className="email" id="profile-email">
                    {profile.email}
                  </span>
                </div>
                <div>
                  <ul className="links" id="links-list">
                    {links.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.link}
                          className={link.platform}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.platform}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Share;
