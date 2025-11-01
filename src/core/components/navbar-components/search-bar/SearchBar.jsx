import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./searchBar.scss";
import { getAllUsers } from "../../../../services/userService";

const SearchBar = ({ darkMode }) => {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔹 Fetch users from API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const users = await getAllUsers();
                setAllUsers(users);
            } catch (error) {
                console.error("❌ Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // 🔹 Filter users based on full_name or username
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setSearchResults([]);
            setShowDropdown(false);
            return;
        }

        const filtered = allUsers.filter((user) => {
            const nameMatch = user.full_name
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase());
            const usernameMatch = user.username
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase());
            return nameMatch || usernameMatch;
        });

        setSearchResults(filtered);
        setShowDropdown(true);
    }, [searchTerm, allUsers]);

    const handleUserClick = (id) => {
        navigate(`users/view-user/${id}`);
        setShowDropdown(false);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search User..."   // 👈 Fixed placeholder (no loading text)
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 300)}
                disabled={loading}
            />

            <FontAwesomeIcon icon={faSearch} className="search-icon" />

            {/* ✅ Results Dropdown */}
            {showDropdown && searchResults.length > 0 && (
                <div className={`search-dropdown ${darkMode ? "dark" : ""}`}>
                    {searchResults.map((user) => (
                        <div
                            key={user.id}
                            className="search-item"
                            onMouseDown={() => handleUserClick(user.id)}
                        >
                            <img
                                src={user.profile_image || "/no-avatar.png"}
                                alt={user.full_name}
                                className="search-avatar"
                            />
                            <div className="search-info">
                                <span className="search-name">{user.full_name}</span>
                                <span className="search-username">@{user.username}</span>
                                <span className="search-email">{user.email}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ❌ No result found */}
            {showDropdown && searchResults.length === 0 && searchTerm && (
                <div className={`search-dropdown no-result ${darkMode ? "dark" : ""}`}>
                    <p>No users found</p>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
