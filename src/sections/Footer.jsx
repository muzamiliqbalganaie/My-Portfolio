import React from "react";

const Footer = () => {

    const [sliderIndex, setSliderIndex] = React.useState(0);
    const socialLinks = [
        { href: "https://github.com/muzamiliqbalganaie", icon: "/assets/github.svg", title: "GitHub", className: "transition-transform hover:scale-110 hover:bg-purple-600 p-2 rounded-full" },
        // { href: "https://x.com/muzamiliqbalganaie", icon: "/assets/x.svg", title: "X (Twitter)", className: "transition-transform hover:scale-110 hover:bg-black p-2 rounded-full" },
        // { href: "https://instagram.com/muzaraj", icon: "/assets/instagram.svg", title: "Instagram", className: "transition-transform hover:scale-110 hover:bg-pink-500 p-2 rounded-full" },
        // { href: "https://www.linkedin.com/in/muzamil-iqbal-ganaie-017223268/", icon: "/assets/linkedin.svg", title: "LinkedIn", className: "transition-transform hover:scale-110 hover:bg-blue-700 p-2 rounded-full" },
        { href: "https://discord.com/users/1147560922680938597", icon: "/assets/discord.svg", title: "Discord", className: "transition-transform hover:scale-110 hover:bg-indigo-600 p-2 rounded-full" },
        { href: "https://stackoverflow.com/users/21841228", icon: "/assets/stackoverflow.svg", title: "Stack Overflow", className: "transition-transform hover:scale-110 hover:bg-yellow-500 p-2 rounded-full" },
        { href: "https://dev.to/mig", icon: "/assets/devto.svg", title: "Dev.to", className: "transition-transform hover:scale-110 hover:bg-gray-900 p-2 rounded-full" },
        //  { href: "https://hashnode.com/@muzamiliqbalganaie", icon: "/assets/hashnode.svg", title: "Hashnode", className: "transition-transform hover:scale-110 hover:bg-blue-500 p-2 rounded-full" },
        // { href: "https://polywork.com/muzamiliqbalganaie", icon: "/assets/polywork.svg", title: "Polywork", className: "transition-transform hover:scale-110 hover:bg-purple-700 p-2 rounded-full" },
        //{ href: "https://gitlab.com/muzamiliqbalganaie", icon: "/assets/gitlab.svg", title: "GitLab", className: "transition-transform hover:scale-110 hover:bg-orange-500 p-2 rounded-full" },
        //{ href: "https://medium.com/@muzamiliqbalganaie", icon: "/assets/medium.svg", title: "Medium", className: "transition-transform hover:scale-110 hover:bg-green-600 p-2 rounded-full" },
        // { href: "https://producthunt.com/@muzamiliqbalganaie", icon: "/assets/producthunt.svg", title: "Product Hunt", className: "transition-transform hover:scale-110 hover:bg-orange-600 p-2 rounded-full" },
        // { href: "https://codepen.io/muzamiliqbalganaie", icon: "/assets/codepen.svg", title: "CodePen", className: "transition-transform hover:scale-110 hover:bg-black p-2 rounded-full" },
        // { href: "https://muzamil.tech", icon: "/assets/tech.svg", title: "Personal Tech Site", className: "transition-transform hover:scale-110 hover:bg-green-500 p-2 rounded-full" },
        // { href: "https://www.hackthebox.com/", icon: "/assets/HTB.svg", title: "Hack The Box", className: "transition-transform hover:scale-110 hover:bg-lime-500 p-2 rounded-full" },
        // { href: "https://tryhackme.com/", icon: "/assets/THM.svg", title: "TryHackMe", className: "transition-transform hover:scale-110 hover:bg-pink-600 p-2 rounded-full" }
    ];
    return (
        <section className="c-space my-20">
            <footer className="max-w-full bg-black-900 py-8 px-6 mb-3 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border-t border-black-300 rounded-[16px] relative bg-black-200  " style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
                <div className="flex flex-col items-start md:items-center gap-2">
                    <div className="flex items-center gap-3">
                        <img src="/assets/hacker.svg" alt="Muzamil Iqbal" className="w-10 h-10 rounded-full border-2 border-purple-500 shadow-lg" />
                        <span className="font-extrabold text-xl text-white tracking-wide">Muzamil Iqbal</span>
                    </div>
                    <span className="text-[12px] text-purple-300 bg-white bg-opacity-10 px-3 py-1 rounded-full shadow-sm mt-1">Curious •  Designer & Developer</span>
                </div>

                <div className="relative w-full max-w-xl mx-auto">
                    <div className="overflow-hidden bg-white bg-opacity-5 rounded-xl pl-32 py-2 shadow-lg">
                        <div id="footer-slider-track" className="flex gap-5 items-center transition-transform duration-500">
                            {socialLinks.slice(sliderIndex, sliderIndex + 6).map((link,) => (
                                <a key={link.title} href={link.href} target="_blank" rel="noopener noreferrer" className={link.className} title={link.title}>
                                    <img src={link.icon} alt={link.title} className="min-w-7 min-h-7" />
                                </a>
                            ))}
                        </div>
                    </div>
                    <button type="button" onClick={() => setSliderIndex(Math.max(0, sliderIndex - 1))} className="absolute left-1 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-80 text-white rounded-full p-2 shadow-lg transition-all duration-300 z-10 hover:scale-110" style={{ display: sliderIndex === 0 ? 'none' : 'block' }}>
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <button type="button" onClick={() => setSliderIndex(Math.min(socialLinks.length - 6, sliderIndex + 1))} className="absolute right-1 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-80 text-white rounded-full p-2 shadow-lg transition-all duration-300 z-10 hover:scale-110" style={{ display: sliderIndex >= socialLinks.length - 6 ? 'none' : 'block' }}>
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
                    </button>
                </div>


                <div className="flex flex-col items-end gap-1">
                    <p className="text-white text-sm font-medium footer-3dtech ">© 2021-2025 MIG</p>
                    <span className="text-[12px] text-gray-400 crafted-footer-text">
                        Crafted with <span className="animated-heart">❤️</span>
                        <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="footer-link-gradient">React</a>,
                        <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="footer-link-gradient">TailwindCSS</a>
                        &amp; <span className="footer-3dtech">Next-level 3DTech</span>
                    </span>
                    <style>{`
                    .crafted-footer-text {
                        display: inline-block;
                        color: #9ca3af;
                        animation: fadeInText 2s ease;
                    }
                    @keyframes fadeInText {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animated-heart {
                        animation: pulse 1.2s infinite;
                        display: inline-block;
                    }
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.2); color: #ff69b4; }
                        100% { transform: scale(1); }
                    }
                    .footer-link-gradient {
                        background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
                        background-clip: text;
                        -webkit-background-clip: text;
                        color: transparent;
                        -webkit-text-fill-color: transparent;
                        position: relative;
                        text-decoration: none;
                        margin: 0 2px;
                        transition: background 0.5s;
                    }
                    .footer-link-gradient:hover {
                        background: linear-gradient(90deg, #f7971e 0%, #ffd200 100%);
                         -webkit-background-clip: text;
                        background-clip: text;
                        -webkit-text-fill-color: transparent;
                        color: transparent;
                    }
                    .footer-3dtech {
                        background: linear-gradient(90deg, #43cea2 0%, #185a9d 100%);
                        background-clip: text;
                        -webkit-background-clip: text;
                        color: transparent;
                        -webkit-text-fill-color: transparent;
                        font-weight: bold;
                        letter-spacing: 1px;
                        text-shadow: 0 1px 8px rgba(67,206,162,0.2);
                        transition: background 0.5s;
                    }
                    .footer-3dtech:hover {
                        background: linear-gradient(90deg, #ff512f 0%, #dd2476 100%);
                         -webkit-background-clip: text;
                        background-clip: text;
                        -webkit-text-fill-color: transparent;
                        color: transparent;
                    }
                `}</style>
                </div>
            </footer>
        </section>
    );
};

export default Footer;