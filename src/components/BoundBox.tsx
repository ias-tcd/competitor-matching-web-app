import React from 'react';

interface BBox {
    x: number;
    y: number;
    width: number;
    height: number;
    confidence: number;
}

interface BoundBoxProps {
    boxes: BBox[];
    imageDimensions: { width: number; height: number };
}

const BoundBox: React.FC<BoundBoxProps> = ({ boxes }) => {
    return (
        <>
            {boxes.map((box, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        left: `${box.x}%`,
                        top: `${box.y}%`,
                        width: `${box.width}%`,
                        height: `${box.height}%`,
                        border: '2px solid red',
                        pointerEvents: 'none',
                    }}
                >
                    <span style={{ color: 'yellow', fontSize: 'small' }}>
                        Confidence: {Math.round(box.confidence * 100)}%
                    </span>
                </div>
            ))}
        </>
    );
};

export default BoundBox;
