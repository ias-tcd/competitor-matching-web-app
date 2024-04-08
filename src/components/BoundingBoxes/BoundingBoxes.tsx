import React from 'react';
import { BBox as IBoundingBox } from '../../types/interfaces';

type ColoursMap = {
    [key: string]: string;
};

interface BoundingBoxesProps {
    image: {
        src: string;
        alt?: string;
        file?: File;
    };
    boundingBoxes: IBoundingBox[];
    colours?: ColoursMap;
}

const BoundingBoxes: React.FC<BoundingBoxesProps> = ({ image, boundingBoxes, colours }) => {
    const getColour = (name: string | null) => {
        if (!name) {
            return 'red';
        }
        const colour = (colours ?? {})[name as keyof ColoursMap];
        return colour ?? 'red';
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <img src={image.src} alt={image.alt ?? 'Image'} style={{ maxWidth: '100%', maxHeight: '20rem' }} />
            {boundingBoxes?.map((box, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        left: `${(box.x - box.width / 2) * 100}%`,
                        top: `${(box.y - box.height / 2) * 100}%`,
                        width: `${box.width * 100}%`,
                        height: `${box.height * 100}%`,
                        border: `2px solid ${getColour(box?.brand)}`,
                        boxSizing: 'border-box',
                    }}
                />
            ))}
        </div>
    );
};

export default BoundingBoxes;
