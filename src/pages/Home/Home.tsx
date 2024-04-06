import { useState } from 'react';
import logo from '../../assets/Integral_Ad_Science_Logo_.jpg';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import TextUploader from '../../components/TextUploader/TextUploader';
import VideoUploader from '../../components/VideoUploader/VideoUploader';
import './Home.css';

function Home(): JSX.Element {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [mediaType, setMediaType] = useState<string | null>(null);
    const [fileNames, setFileNames] = useState<string[]>([]);

    const openDialog = (type: string) => {
        setMediaType(type);
        setIsDialogOpen(true);
        setFileNames([]);
    };

    const closeDialog = () => {
        setMediaType(null);
        setIsDialogOpen(false);
    };

    return (
        <div id='root'>
<<<<<<< HEAD
            <div className='web-brand'>
=======
            <div className='web-brand' data-testid='logo-container'>
>>>>>>> main
                <img src={logo} style={{ height: 100, width: 200, mixBlendMode: 'color-burn' }} />
            </div>
            <p style={{ fontSize: 24 }}>
                Discover the power of brand recognition with IAS – the ultimate competitor-matching web app. Seamlessly
                identify brands within your content and elevate your media intelligence to new heights.
            </p>
            <div id='userInput'>
                <p style={{ fontSize: 20 }}>Choose the type of media you want to upload:</p>
            </div>
            <div id='buttons' className='media-type-options'>
                <button className='media-type-button' data-type='Text' onClick={() => openDialog('Text')}>
                    Text
                </button>
                <button className='media-type-button' data-type='Video' onClick={() => openDialog('Video')}>
                    Video
                </button>
                <button className='media-type-button' data-type='Images' onClick={() => openDialog('Images')}>
                    Images
                </button>
            </div>

            {isDialogOpen && (
                <div className='overlay'>
                    <div className='dialog-container'>
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
                    opacity: '0.618',
                }}
            >
                {fileNames.map((name: string, index: number) => (
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
