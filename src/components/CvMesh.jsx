
// CvMesh.jsx
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react';
import { Float, Html } from '@react-three/drei';
import { useMediaQuery } from 'react-responsive';

const CvMesh = ({ ...props }) => {
    // Ref for the mesh to animate rotation
    const meshRef = useRef();
    // Hover state for interaction
    const [hovered, setHovered] = useState(false);

    // Detect mobile and small screens
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isSmall = useMediaQuery({ maxWidth: 440 });

    // Animate rotation like Cube
    useGSAP(() => {
        gsap
            .timeline({
                repeat: -1,
                repeatDelay: 0.5,
            })
            .to(meshRef.current.rotation, {
                y: hovered ? '+=2' : `+=${Math.PI * 2}`,
                x: hovered ? '+=2' : `-=${Math.PI * 2}`,
                duration: 2.5,
                stagger: { each: 0.15 },
            });
    });

    return (
        // Float effect for premium look
        <Float floatIntensity={2}>
            {/*
                Premium floating CV mesh:
                - Animated gradient material for luxury feel
                - Subtle glow and smooth shadow
                - Animated button with gradient and hover effect
            */}
            <mesh
                ref={meshRef}
                castShadow
                receiveShadow
                position={[9, -4, 0]}
                rotation={[2.6, 0.8, -1.8]}
                scale={0.74}
                {...props}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
            >
                <boxGeometry args={[2, 2, 0.1]} />
                {/* Gradient material using meshStandardMaterial with premium color */}
                <meshStandardMaterial
                    color={hovered ? "#2563eb" : "#fff"}
                    metalness={0.7}
                    roughness={0.25}
                    emissive="#3b82f6"
                    emissiveIntensity={hovered ? 0.5 : 0.15}
                />
                {/* Subtle glow effect using Html overlay */}
                <Html center style={{ pointerEvents: 'none' }}>
                    <div style={{
                        position: 'absolute',
                        width: '280px',
                        height: '60px',
                        top: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
                        filter: 'blur(16px)',
                        // opacity: hovered ? 0.5 : 0.25,
                        zIndex: 0,
                        cursor: isMobile || isSmall ? 'not-allowed' : 'pointer',
                        opacity: isMobile || isSmall ? 0 : 1,
                        pointerEvents: isMobile || isSmall ? 'none' : 'auto',
                    }} />
                </Html>
                {/* Download button overlays on the mesh */}
                <Html center style={{ zIndex: 1 }}>
                    <a
                        href="/assets/cv.pdf"
                        download="Muzamil_Iqbal_CV.pdf"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '16px 36px',
                            color: '#fff',
                            borderRadius: '28px',
                            fontWeight: 'bold',
                            fontSize: '1.15rem',
                            textDecoration: 'none',
                            boxShadow: hovered
                                ? '0 8px 36px rgba(59,130,246,0.35), 0 2px 16px rgba(0,0,0,0.14)'
                                : '0 2px 8px rgba(0,0,0,0.15)',
                            transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
                            letterSpacing: '0.05em',
                            border: hovered ? '2px solid #ff0000' : '2px solid #2563eb',
                            boxSizing: 'border-box',
                            cursor: isMobile || isSmall ? 'not-allowed' : 'pointer',
                            opacity: isMobile || isSmall ? 0 : 1,
                            pointerEvents: isMobile || isSmall ? 'none' : 'auto',
                        }}
                        aria-disabled={isMobile || isSmall}
                        tabIndex={isMobile || isSmall ? -1 : 0}
                    >
                        {/* Download SVG icon, themed to main gradient */}
                        <img
                            src="/assets/download.svg"
                            alt="Download"
                            style={{
                                width: '32px',
                                height: '32px',
                                filter: hovered
                                    ? 'drop-shadow(0 0 10px #ff0000)'
                                    : 'drop-shadow(0 0 8px #2563eb)',
                                transition: 'filter 0.3s cubic-bezier(.4,0,.2,1)',
                                opacity: isMobile || isSmall ? 0.5 : 1,
                            }}
                        />
                        <span style={{
                            background: hovered
                                ? 'linear-gradient(90deg, #ff0000 0%, #2563eb 100%)'
                                : 'linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 'bold',
                            fontSize: '24px',
                            letterSpacing: '0.05em',
                            transition: 'background 0.3s cubic-bezier(.4,0,.2,1)',
                            textShadow: hovered
                                ? '0 2px 12px #ff0000, 0 1px 2px #2563eb'
                                : '0 1px 4px #2563eb',
                            opacity: isMobile || isSmall ? 0.0 : 1,
                        }}>
                            Download CV
                        </span>
                    </a>
                </Html>
            </mesh>
        </Float>
    );
};

export default CvMesh;

