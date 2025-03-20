import { CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import HoverCard from './HoverCard';

const HomeMiddle = () => {
    const [trustedUsers, setTrustedUsers] = useState(1000); // Initial value

    useEffect(() => {
        const interval = setInterval(() => {
            setTrustedUsers((prev) => prev + Math.floor(Math.random() * 10) + 1); // Increase by 1 to 10 randomly
        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container mx-auto p-4 mt-0 lg:mt-0"> {/* Added top margin for mobile */}
            {/* Top Section */}
            <div className="flex flex-col lg:flex-row-reverse items-center justify-center gap-8 mt-12 mb-12">
                {/* Image on Top in Mobile */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-start mb-6 lg:mb-0">
                    <img 
                        src="https://www.oanda.com/media/images/03_crypto.format-webp.webpquality-90.height-752.webp" 
                        alt="Crypto Trading" 
                        className="w-full h-auto object-contain"
                    />
                </div>

                {/* Right Side - Content */}
                <div className="w-full lg:w-1/2 px-4 lg:px-0 lg:ml-24 text-center lg:text-left flex flex-col justify-center">
                    <h2 className="text-sm lg:text-4xl font-bold text-white mb-4">
                        The user-friendly platform for crypto trading
                    </h2>
                    <p className="text-xs lg:text-lg text-gray-300 font-bold mb-4">
                        You can now buy and sell crypto with our powerful app. Here are some of the reasons why you should trade with us:
                    </p>
                    
                    {/* Feature List */}
                    <ul className="flex flex-col items-start justify-center lg:justify-start gap-4 mt-4 text-xs lg:text-lg text-gray-300">
                        <li className="flex items-center gap-2">
                            <CheckCircle className="text-green-400" size={16} />
                            No mark-up on your crypto trades
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle className="text-green-400" size={16} />
                            Excellent customer service
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle className="text-green-400" size={16} />
                            Easy, low-cost account funding and withdrawal
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Section - Cards */}
            <div className="px-4">
                <div className="text-center">
                    <h1 className="text-sm lg:text-4xl font-bold text-green-400">
                        {trustedUsers.toLocaleString()}+ users trust us – be one of them!
                    </h1>
                </div>

                <HoverCard />
            </div>
        </div>
    );
}

export default HomeMiddle;