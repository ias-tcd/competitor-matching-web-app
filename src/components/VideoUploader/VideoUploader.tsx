import React, { useState } from 'react';

interface VideoState {
    url: string;
    file: File;
}

interface VideoUploaderProps {
    onClose: () => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onClose }) => {
    const [videos, setVideos] = useState<VideoState[]>([]);
    const [fileList, setFileList] = useState<FileList | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            setFileList(e.target.files);
            const newVideos = Array.from(e.target.files).map(file => ({
                url: URL.createObjectURL(file),
                file: file,
            }));
            setVideos(prevVideos => [...prevVideos, ...newVideos]);
        }
    };

    const handleUpload = () => {
        if (fileList) {
            console.log('Uploading videos:', fileList);
            alert('Videos uploaded successfully!');
        }
        onClose();
    };

    const handleCancel = () => {
        setVideos([]);
        setFileList(null);
        onClose();
    };

    return (
        <div className='dialog-container'>
            <p>Upload multiple videos</p>
            <input type='file' accept='video/*' multiple onChange={handleFileChange} />
            <div>
                {videos.map((video, index) => (
                    <div key={index}>
                        <video controls width='100' height='100'>
                            <source src={video.url} type={`video/${video.file.type.split('/')[1]}`} />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                ))}
            </div>
            <p>Total Videos: {videos.length}</p>
            <button className='upload-button' onClick={handleUpload}>
                Upload Videos
            </button>
            <button className='cancel-button' onClick={handleCancel}>
                Cancel
            </button>
        </div>
    );
};

export default VideoUploader;
