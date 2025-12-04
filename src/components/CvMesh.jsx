// CvMesh.jsx
import { useRef, useState } from 'react';
import { Float, Html, Sphere, Stars, OrbitControls } from '@react-three/drei';
// import { useMediaQuery } from 'react-responsive';
import { useFrame } from '@react-three/fiber';

const CvMesh = ({ onHoverCV, ...props }) => {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    // Floating animation for a smoother effect
    useFrame(({ clock }) => {
        if (meshRef.current) {
            const time = clock.getElapsedTime();
            meshRef.current.position.y = -4 + 0.2 * Math.sin(time * 2); // Floating motion
        }
    });

    return (
        <Float floatIntensity={3} speed={2}> {/* Floating effect */}
            <mesh
                ref={meshRef}
                castShadow
                receiveShadow
                position={[9, -4, 0]}
                scale={1.5}
                {...props}
                onPointerEnter={() => {
                    setHovered(true);
                    onHoverCV(true); // Notify Hero section
                }}
                onPointerLeave={() => {
                    setHovered(false);
                    onHoverCV(false); // Notify Hero section
                }}
            >
                <Sphere args={[1.5, 64, 64]} /> {/* Star sphere */}
                <meshStandardMaterial
                    color={hovered ? "#FFD700" : "#FFA500"} // Star color
                    metalness={0.8}
                    roughness={0.2}
                    emissive={hovered ? "#FFFF00" : "#FF8C00"}
                    emissiveIntensity={hovered ? 1 : 0.5}
                />
                <Html center>
                    <a
                        href="/assets/muzamil iqbal Ganaie.pdf"
                        download="Muzamil_Iqbal_CV.pdf"
                        style={{
                            display: 'block',
                            padding: '12px 28px',
                            color: '#000',
                            background: hovered
                                ? 'linear-gradient(90deg, #FFD700 0%, #FFA500 100%)'
                                : 'linear-gradient(90deg, #FFA500 0%, #FF8C00 100%)',
                            borderRadius: '24px',
                            fontWeight: '600',
                            fontSize: '14px',
                            textAlign: 'center',
                            textDecoration: 'none',
                            boxShadow: hovered
                                ? '0 8px 36px rgba(255,215,0,0.5)'
                                : '0 2px 8px rgba(255,140,0,0.2)',
                            transition: 'all 0.2s ease-in-out',
                        }}
                    >
                        Download My CV
                    </a>
                </Html>
            </mesh>
        </Float>
    );
};

export default CvMesh;

