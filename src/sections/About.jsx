import React, { useState } from 'react'
import Globe from 'react-globe.gl';
import Button from '../components/Button';
import { Canvas } from '@react-three/fiber';
import Carousel from '../components/CubeGallery';
const About = () => {
    const [hasCopied, setHasCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('muzamiliqbalganaie@gmail.com');

        setHasCopied(true);

        setTimeout(() => {
            setHasCopied(false);
        }, 2000);
    }

    return (
        <section className="c-space my-20" id='about'>
            <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-1 gap-5 h-full">
                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <Canvas className="w-full h-[275px]">
                            <ambientLight intensity={0.5} />
                            <Carousel
                                images={[
                                    { 'id': '1', 'src': '/assets/me.jpg' },
                                    { 'id': '2', 'src': '/assets/me1.jpg' },
                                    { 'id': '3', 'src': '/assets/me2.jpg' },
                                    { 'id': '4', 'src': '/assets/me3.jpg' },
                                    {
                                        'id': '5', 'src':
                                            '/assets/me4.jpg'
                                    },
                                    { 'id': '6', 'src': '/assets/me5.jpg' },

                                ]}

                                position={[0, 0, 0]}
                            />
                        </Canvas>
                        <div>
                            <p className="grid-headtext">Hi, I'm Muzamil</p>
                            <p className="grid-subtext">
                                With 1 year of experience, I have honed my skills in frontend and backend development, with a focus on React, Next.js, Framer Motion, and TailwindCSS.
                            </p>
                        </div>
                    </div>
                </div>

                <div className='col-span-1 xl:row-span-3'>
                    <div className='grid-container'>
                        <img src='/assets/grid2.png ' alt='grid-2' className="w-full sm:h-[275px] h-fit object-contain" />

                        <div>
                            <p className='grid-headtext'>Tech Stack</p>
                            <p className="grid-subtext">I specialize in JavaScript/TypeScript with a focus on React and Next.js ecosytems and TailwindCSS and Framer Motion.</p>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 xl:row-span-4">
                    <div className='grid-container'>
                        <div className='rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center'>
                            <Globe
                                height={326}
                                width={326}
                                backgroundColor='rgba(0, 0, 0, 0)'
                                backgroundImageOpacity={0.5}
                                showAtmosphere
                                showGraticules
                                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                                labelsData={[{ lat: 40, lng: -100, text: 'Rjieka, Croatia', color: 'white', size: 15 }]}
                            />
                        </div>
                        <div>
                            <p className="grid-headtext">I’m very flexible with time zone communications & locations</p>
                            <p className="grid-subtext">I&apos;m based in Srinagar, Kashmir and open to remote work worldwide.</p>
                            <a href='#contact' className='w-fit'>
                                <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-2 xl:row-span-3">
                    <div className="grid-container">
                        <img src="assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain" />

                        <div>
                            <p className="grid-headtext">My Passion for Coding</p>
                            <p className="grid-subtext">
                                I love solving problems and building things through code. Programming isn&apos;t just my
                                profession—it&apos;s my passion. I enjoy exploring new technologies, and enhancing my skills.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-1 xl:row-span-2">
                    <div className="grid-container">
                        <img
                            src="assets/grid4.png"
                            alt="grid-4"
                            className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
                        />

                        <div className="space-y-2">
                            <p className="grid-subtext text-center">Contact me</p>
                            <div className="copy-container" onClick={handleCopy}>
                                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} width={24} height={14} alt="copy" />
                                <p className="lg:text-2xl md:text-xl  text-gray_gradient text-white ">muzamiliqbalganaie@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;