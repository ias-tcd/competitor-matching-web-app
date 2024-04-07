import { useState } from 'react';
import logo from '../../assets/Integral_Ad_Science_Logo_.jpg';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import TextUploader from '../../components/TextUploader/TextUploader';
import VideoUploader from '../../components/VideoUploader/VideoUploader';
import './Home.css';

function Home(): JSX.Element {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [mediaType, setMediaType] = useState<string | null>(null);

    const openDialog = (type: string) => {
        setMediaType(type);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setMediaType(null);
        setIsDialogOpen(false);
    };

    return (
        <div id='root'>
            <div className='web-brand' data-testid='logo-container'>
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
                        {mediaType === 'Images' && <ImageUploader onClose={closeDialog} />}
                        {mediaType === 'Text' && <TextUploader onClose={closeDialog} />}
                        {mediaType === 'Video' && <VideoUploader onClose={closeDialog} />}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
