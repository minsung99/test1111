import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import "./chatgroup.css";

const ChatGroup = ({ user, group, isCurRoom, onClick, onDisconnected }) => {
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const onClickQuit = async () => {
        const response = await axios.get(`/chatrooms/${group.id}`);
        if (!response.data.state) {
            await axios.delete(`/chatparts/delete/${user.id}/${group.id}`);
            setIsPopupOpen(false);
            navigate("/rating");
            onDisconnected();
        } else {
            await axios.delete(`/chatparts/delete/${user.id}/${group.id}`);
            setIsPopupOpen(false);
            window.location.replace('/chatroom');
            onDisconnected();
        }
    };

    return (
        <div className={`${isCurRoom ? "current-group-item" : "group-item"}`} key={group.id} onClick={onClick}>
            <div className="group-icon">{group.icon}</div>
            <div className="group-name">{group.name}</div>
            <button className="group-close-button" onClick={() => setIsPopupOpen(true)}>
                ×
            </button>
            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3 className="group-name">{group.name}</h3>
                        <h3>채팅방을 정말로 나가시겠습니까?</h3>
                        <button
                            onClick={onClickQuit}
                            className="yes-button">
                            예
                        </button>
                        <button
                            onClick={() => setIsPopupOpen(false)}
                            className="no-button">
                            아니오
                        </button>
                    </div>
                </div>
            )}
        </div>


    );
};

export default ChatGroup;