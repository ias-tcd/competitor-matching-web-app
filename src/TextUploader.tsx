import React, { useState } from 'react';
import './App.css';

interface TextUploaderProps {
    onClose: () => void;
}

const TextUploader: React.FC<TextUploaderProps> = ({ onClose }) => {
    const [text, setText] = useState<string>('');

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleUpload = () => {
        if (text.trim() !== '') {
            alert(`Text uploaded: ${text}`);
        } else {
            alert('Please enter some text before uploading.');
        }
        setText('');
        onClose();
    };

    return (
        <div>
            <h2>Text Uploader</h2>
            <textarea
                placeholder='Enter your text here...'
                value={text}
                onChange={handleTextChange}
                rows={4}
                cols={50}
            />
            <br />
            <button className='text-uploader-button' onClick={handleUpload}>
                Upload Text
            </button>
            <button className='cancel-button' onClick={onClose}>
                Cancel
            </button>
        </div>
    );
};

export default TextUploader;
