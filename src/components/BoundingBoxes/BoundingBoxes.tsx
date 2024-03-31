import React from 'react';
import { BoundingBox as IBoundingBox } from '../../types/interfaces';

interface BoundingBoxesProps {
    image: {
        src: string;
        alt?: string;
        file?: File;
    };
    boundingBoxes: IBoundingBox[];
}

const BoundingBoxes: React.FC<BoundingBoxesProps> = ({ image, boundingBoxes }) => {
    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <img src={image.src} alt={image.alt ?? 'Image'} style={{ maxWidth: '100%' }} />
            {boundingBoxes?.map((box, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        left: `${(box.x - box.width / 2) * 100}%`,
                        top: `${(box.y - box.height / 2) * 100}%`,
                        width: `${box.width * 100}%`,
                        height: `${box.height * 100}%`,
                        border: '2px solid red',
                        boxSizing: 'border-box',
                    }}
                />
            ))}
        </div>
    );
};

export default BoundingBoxes;
