import { FaEnvelope, FaXTwitter, FaDiscord, FaLinkedin, FaReddit, FaYoutube } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-black text-white py-10 border-t border-gray-700">
            <div className="max-w-7xl mx-auto px-6">
                {/* Stack everything on small screens, use grid for larger screens */}
                <div className="flex flex-col items-center text-center sm:text-left sm:items-start sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    
                    {/* Brand Section */}
                    <div className="w-full">
                        <div className="flex justify-center sm:justify-start items-center space-x-2">
                            <div className="w-8 h-8 bg-green-400 rounded-md"></div>
                            <span className="text-green-400 font-bold text-lg">CryptoWave</span>
                        </div>
                        <p className="text-white mt-4 text-sm">
                            Your modern coding superpowers.
                        </p>
                        <div className="flex justify-center sm:justify-start space-x-4 mt-4">
                            <FaEnvelope className="text-white hover:text-green-400 cursor-pointer text-2xl" />
                            <FaXTwitter className="text-white hover:text-green-400 cursor-pointer text-2xl" />
                            <FaDiscord className="text-white hover:text-green-400 cursor-pointer text-2xl" />
                            <FaLinkedin className="text-white hover:text-green-400 cursor-pointer text-2xl" />
                            <FaReddit className="text-white hover:text-green-400 cursor-pointer text-2xl" />
                            <FaYoutube className="text-white hover:text-green-400 cursor-pointer text-2xl" />
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div className="w-full">
                        <h3 className="text-white font-semibold mb-3">Product</h3>
                        <ul className="space-y-2 text-white text-sm">
                            <li className="hover:text-green-400 cursor-pointer">Windsurf Editor</li>
                            <li className="hover:text-green-400 cursor-pointer">Codeium Extension</li>
                            <li className="hover:text-green-400 cursor-pointer">Live</li>
                            <li className="hover:text-green-400 cursor-pointer">Forge</li>
                            <li className="hover:text-green-400 cursor-pointer">Pricing</li>
                            <li className="hover:text-green-400 cursor-pointer">Codeium for Enterprise</li>
                        </ul>
                    </div>

                    <div className="w-full">
                        <h3 className="text-white font-semibold mb-3">Capabilities</h3>
                        <ul className="space-y-2 text-white text-sm">
                            <li className="hover:text-green-400 cursor-pointer">Cascade</li>
                            <li className="hover:text-green-400 cursor-pointer">Supercomplete</li>
                            <li className="hover:text-green-400 cursor-pointer">Autocomplete</li>
                            <li className="hover:text-green-400 cursor-pointer">Codeium Chat</li>
                            <li className="hover:text-green-400 cursor-pointer">Command</li>
                        </ul>
                    </div>

                    <div className="w-full">
                        <h3 className="text-white font-semibold mb-3">Company</h3>
                        <ul className="space-y-2 text-white text-sm">
                            <li className="hover:text-green-400 cursor-pointer">About Us</li>
                            <li className="hover:text-green-400 cursor-pointer">Blog</li>
                            <li className="hover:text-green-400 cursor-pointer">Careers</li>
                            <li className="hover:text-green-400 cursor-pointer">Compare</li>
                            <li className="hover:text-green-400 cursor-pointer">Contact</li>
                            <li className="hover:text-green-400 cursor-pointer">Partnerships</li>
                            <li className="hover:text-green-400 cursor-pointer">Privacy Policy</li>
                        </ul>
                    </div>

                    <div className="w-full">
                        <h3 className="text-white font-semibold mb-3">Connect</h3>
                        <ul className="space-y-2 text-white text-sm">
                            <li className="hover:text-green-400 cursor-pointer">Contact</li>
                            <li className="hover:text-green-400 cursor-pointer">Events</li>
                            <li className="hover:text-green-400 cursor-pointer">Hackathons</li>
                            <li className="hover:text-green-400 cursor-pointer">Community</li>
                            <li className="hover:text-green-400 cursor-pointer">Students</li>
                        </ul>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-10 pt-5 text-center text-white text-sm border-t border-gray-700 w-full">
                    © 2025 All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
