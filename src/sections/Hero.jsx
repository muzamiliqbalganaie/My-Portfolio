import { PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense, useState } from 'react'
import HackerRoom from '../components/HackerRoom'
import CanvasLoader from '../components/CanvasLoader';
import { useMediaQuery } from 'react-responsive';
import { calculateSizes } from '../constants';
import Target from '../components/Target';
import ReactLogo from '../components/ReactLogo';
import Cube from '../components/Cube';
import Rings from '../components/Ring';
import HeroCamera from '../components/HeroCamera';
import Button from '../components/Button';
import CvMesh from '../components/CvMesh';

const Hero = () => {
    const isSmall = useMediaQuery({ maxWidth: 440 });
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

    const sizes = calculateSizes(isSmall, isMobile, isTablet);
    const [showCV, setShowCV] = useState(false); // State to track CV hover
    const [cvTimeout, setCvTimeout] = useState(null); // Timeout to delay hiding

    const handleHoverCV = (isHovered) => {
        if (isHovered) {
            if (cvTimeout) clearTimeout(cvTimeout); // Clear any existing timeout
            setShowCV(true);
        } else {
            const timeout = setTimeout(() => setShowCV(false), 10000); // Delay hiding by 3 seconds
            setCvTimeout(timeout);
        }
    };

    return (
        <section className='min-h-screen max-w-full flex flex-col relative'>
            <div className='w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-1'>
                <p className='sm:text-3xl text-2xl font-medium text-center font-generalsans text-transparent bg-clip-text bg-gradient-to-r from-[#545353] to-[#f9f9ff]'> Hi, I Am <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#545353] to-[#f9f9ff]">Muzamil Iqbal Ganaie
                </span>   <span className="waving-hand">👋🏼</span> </p>
                <p className='hero_tag text-transparent bg-clip-text bg-gradient-to-r from-[#545353] to-[#f9f9ff]'>Buiding Products and Brands</p>
            </div>

            <div className='min-w-full h-full absolute inset-3'>
                {/*<Leva/>*/}
                <Canvas className='w-full h-full '>
                    <Suspense fallback={<CanvasLoader />}>
                        <PerspectiveCamera
                            makeDefault
                            position={[0, 0, 20]}
                        />
                        <HeroCamera>
                            <HackerRoom
                                scale={sizes.deskScale}
                                position={sizes.deskPosition}
                                rotation={[0, -Math.PI, 0]}
                            />
                        </HeroCamera>
                        <group>
                            <Target position={sizes.targetPosition} />
                            <CvMesh position={sizes.cvPosition} onHoverCV={handleHoverCV} /> {/* Pass hover handler */}
                            <ReactLogo position={sizes.reactLogoPosition} />
                            <Cube position={sizes.cubePosition} />
                            <Rings position={sizes.ringPosition} />
                        </group>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 10]} intensity={3} />
                    </Suspense>
                </Canvas>
            </div>

            {showCV && ( // Conditionally render CV preview
                <div className='absolute top-20 left-1/2 transform -translate-x-1/2 w-3/4 h-1/2 z-10 border-2 border-yellow-500 bg-white shadow-lg'>
                    <iframe
                        src="/assets/muzamil iqbal Ganaie.pdf"
                        title="CV Preview"
                        className='w-full h-full border-none'
                    />
                </div>
            )}

            <div className='absolute bottom-7 left-0 right-0 w-full z-10 c-space'>
                <a href='#about' className='w-fit'>
                    <Button name="Let's work together" isBeam containerClass="sm:w-fit w-full sm:min-w-96" />
                </a>
            </div>
        </section>
    )
}

export default Hero