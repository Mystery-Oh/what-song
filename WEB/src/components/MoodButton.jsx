import React from 'react';
import './MoodButton.css'; // 버튼 전용 CSS 연결

export default function MoodButton({ text, active = false, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`mood-tag-button ${active ? 'active' : ''}`}
        >
            {text}
        </button>
    );
}