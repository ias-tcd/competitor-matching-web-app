import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import TextUploader from './TextUploader';
import VideoUploader from './VideoUploader'; // Import the VideoUploader component
import Navbar from './components/Navbar';
import './Home.css';

function Home(): JSX.Element {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [mediaType, setMediaType] = useState<string | null>(null);
    const [fileNames, setFileNames] = useState<string[]>([]);

    const openDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
        const type = event.currentTarget.dataset.type;

        if (type) {
            setMediaType(type);
            setIsDialogOpen(true);
            setFileNames([]);
        }
    };

    const closeDialog = () => {
        setMediaType(null);
        setIsDialogOpen(false);
    };

    return (
        <div>
            <div id='root'>
                <Navbar />
                <h1>IAS</h1>
                <p>
                    Discover the power of brand recognition with IAS – the ultimate competitor-matching web app.
                    Seamlessly identify brands within your content and elevate your media intelligence to new heights.
                </p>
                <div id='userInput'>
                    <p>Choose the type of media you want to upload:</p>
                </div>
                <div id='buttons' className='media-type-options'>
                    <button className='media-type-button' data-type='Text' onClick={openDialog}>
                        Text
                    </button>
                    <button className='media-type-button' data-type='Video' onClick={openDialog}>
                        Video
                    </button>
                    <button className='media-type-button' data-type='Images' onClick={openDialog}>
                        Images
                    </button>
                </div>
            </div>
            {isDialogOpen && (
                <div className='overlay'>
                    <div className='dialog-container'>
                        {/* Conditionally render the uploader based on the mediaType */}
                        {mediaType === 'Images' && <ImageUploader onClose={closeDialog} setFileNames={setFileNames} />}
                        {mediaType === 'Text' && <TextUploader onClose={closeDialog} />}
                        {mediaType === 'Video' && <VideoUploader onClose={closeDialog} />}
                    </div>
                </div>
            )}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '10px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '50px',
                }}
            >
                {fileNames &&
                    fileNames.map((name: string, index: number) => (
                        <div style={{ maxWidth: '400px' }} key={name + index}>
                            <img
                                alt={`result ${index}`}
                                src={`${process.env.VITE_APP_API_URL}/images/predictions/results?image_path=${name}`}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Home;
