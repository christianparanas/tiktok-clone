import React from "react";
import Link from "next/link";

import SearchBar from "./SearchBar";
import UploadIcon from "./icons/UploadIcon";
import MessageIcon from "./icons/MessageIcon";
import InboxIcon from "./icons/InboxIcon";
import useAuthUser from "context/userContext";

export default function Header() {
  const [user] = useAuthUser();

  console.log(user);

  return (
    <div className="h-container">
      <div className="h-content">
        <div className="h-wrapper">
          <Link href="/" className="h-link">
            <img src="/assets/tiktok-logo.svg" alt="Logo" className="h-icon" />
          </Link>
        </div>
        <SearchBar />

        <div className="h-menu-right">
          <Link href="/" className="h-menu-upload">
            <UploadIcon />
          </Link>

          <MessageIcon />
          <InboxIcon />

          <div className="h-avatar-container">
            <img src={user.photoURL} alt={user.username} className="h-avatar" />
          </div>
        </div>
      </div>
    </div>
  );
}
