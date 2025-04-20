import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const Carousel = ({ images, position }) => {
    const groupRef = useRef();
    const textures = useLoader(TextureLoader, images.map((img) => img.src));
    const [hovered, setHovered] = useState(false); // Track hover state
    const [groupPosition, setGroupPosition] = useState(position); // Track group position

    // Rotate the carousel only when hovered
    useFrame(() => {
        if (groupRef.current && hovered) {
            groupRef.current.rotation.y += 0.005; // Rotate the group on the Y-axis
        }
    });

    const handleMouseOver = () => {
        setHovered(true); // Start rotation and 3D effect
        setGroupPosition([-4, 0, 0]); // Move the group to [-2, 0, 0]
    };

    const handleMouseOut = () => {
        setHovered(false); // Stop rotation and reset
        setGroupPosition([0, 0, 0]); // Reset the group position to [0, 0, 0]
        if (groupRef.current) {
            groupRef.current.rotation.y = 0; // Reset rotation
        }
    };

    return (
        <group
            ref={groupRef}
            position={groupPosition} // Dynamically update the position
            onPointerOver={handleMouseOver}
            onPointerOut={handleMouseOut}
        >
            {textures.map((texture, index) => {
                const image = images[index];
                const angle = (index / textures.length) * Math.PI * 2; // Calculate angle for each image
                const x = Math.cos(angle) * 5; // X position based on angle and radius
                const z = Math.sin(angle) * 5; // Z position based on angle and radius

                // Always render the image with id: 1 when not hovered
                if (!hovered && image.id !== '1') return null;

                return (
                    <mesh
                        key={image.id}
                        position={hovered ? [x, 0, z] : [0, 0, 0]} // Arrange in a circle when hovered, otherwise center
                        rotation={hovered ? [0, -angle, 0] : [0, 0, 0]} // Rotate each image to face outward
                        scale={hovered || image.id === '1' ? [2, 2, 2] : [0, 0, 0]} // Scale up the image with id: 1 when not hovered
                    >
                        <planeGeometry args={[4, 4]} /> {/* Adjust size of the images */}
                        <meshBasicMaterial map={texture} />
                    </mesh>
                );
            })}
        </group>
    );
};

export default Carousel;