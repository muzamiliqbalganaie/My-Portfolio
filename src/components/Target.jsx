import { useGSAP } from '@gsap/react';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import React, { useRef } from 'react';

const Target = (props) => {
    const targetRef = useRef();
    let scene;

    // Always call useGLTF, even if it fails
    try {
        const gltf = useGLTF(
            'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf',
        );
        scene = gltf.scene;
    } catch (error) {
        console.error('Error loading GLTF model:', error);
    }

    // Always call useGSAP
    useGSAP(() => {
        gsap.to(targetRef.current.position, {
            y: targetRef.current.position.y + 0.5,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
        });
    });

    return (
        <mesh {...props} ref={targetRef} rotation={[0, Math.PI / 5, 0]} scale={1.5}>
            {scene ? <primitive object={scene} /> : null} {/* Conditional rendering */}
        </mesh>
    );
};

export default Target;