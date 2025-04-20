import { clientReviews } from '../constants/index.js';

const Clients = () => {
    return (
        <section className="c-space my-20">
            <h3 className="head-text">Hear from My Clients</h3>

            <div className="client-container">
                {clientReviews.map((item) => (
                    <div key={`review-${item.id}`} className="client-review">
                        <div>
                            <p className="text-white-800 font-light">{item.review}</p>

                            <div className="client-content">
                                <div className="flex gap-3">
                                    <a href={item.contact} target="_blank" rel="noopener noreferrer">
                                        <img src={item.img} alt="reviewer" className="w-12 h-12 rounded-full hover:opacity-80 transition-opacity" />
                                    </a>
                                    <div className="flex flex-col">
                                        <a href={item.contact} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                                            <p className="font-semibold text-white-800">{item.name}</p>
                                        </a>
                                        <p className="text-white-500 md:text-base text-sm font-light">{item.position}</p>
                                    </div>
                                </div>

                                <div className="flex self-end items-center gap-2">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <img key={index} src="/assets/star.png" alt="star" className="w-5 h-5" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Clients;