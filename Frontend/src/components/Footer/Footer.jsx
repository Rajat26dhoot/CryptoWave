import { FaEnvelope, FaXTwitter, FaDiscord, FaLinkedin, FaReddit, FaYoutube } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-black text-white py-12 border-t border-gray-700">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-5 gap-8">
                    {/* Left Section */}
                    <div>
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-green-400 rounded-md"></div>
                            <span className="text-green-400 font-bold text-lg">CryptoWave</span>
                        </div>
                        <p className="text-gray-400 mt-4 text-sm">
                            Your modern coding superpowers.
                        </p>
                        <div className="flex space-x-4 mt-4">
                            <FaEnvelope className="text-gray-400 hover:text-green-400 cursor-pointer text-xl" />
                            <FaXTwitter className="text-gray-400 hover:text-green-400 cursor-pointer text-xl" />
                            <FaDiscord className="text-gray-400 hover:text-green-400 cursor-pointer text-xl" />
                            <FaLinkedin className="text-gray-400 hover:text-green-400 cursor-pointer text-xl" />
                            <FaReddit className="text-gray-400 hover:text-green-400 cursor-pointer text-xl" />
                            <FaYoutube className="text-gray-400 hover:text-green-400 cursor-pointer text-xl" />
                        </div>
                    </div>

                    {/* Middle Sections */}
                    <div>
                        <h3 className="text-white font-semibold mb-3">Product</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li className="hover:text-green-400 cursor-pointer">Windsurf Editor</li>
                            <li className="hover:text-green-400 cursor-pointer">Codeium Extension</li>
                            <li className="hover:text-green-400 cursor-pointer">Live</li>
                            <li className="hover:text-green-400 cursor-pointer">Forge</li>
                            <li className="hover:text-green-400 cursor-pointer">Pricing</li>
                            <li className="hover:text-green-400 cursor-pointer">Codeium for Enterprise</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-3">Capabilities</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li className="hover:text-green-400 cursor-pointer">Cascade</li>
                            <li className="hover:text-green-400 cursor-pointer">Supercomplete</li>
                            <li className="hover:text-green-400 cursor-pointer">Autocomplete</li>
                            <li className="hover:text-green-400 cursor-pointer">Codeium Chat</li>
                            <li className="hover:text-green-400 cursor-pointer">Command</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-3">Company</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li className="hover:text-green-400 cursor-pointer">About Us</li>
                            <li className="hover:text-green-400 cursor-pointer">Blog</li>
                            <li className="hover:text-green-400 cursor-pointer">Careers</li>
                            <li className="hover:text-green-400 cursor-pointer">Compare</li>
                            <li className="hover:text-green-400 cursor-pointer">Contact</li>
                            <li className="hover:text-green-400 cursor-pointer">Partnerships</li>
                            <li className="hover:text-green-400 cursor-pointer">Privacy Policy</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-3">Connect</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li className="hover:text-green-400 cursor-pointer">Contact</li>
                            <li className="hover:text-green-400 cursor-pointer">Events</li>
                            <li className="hover:text-green-400 cursor-pointer">Hackathons</li>
                            <li className="hover:text-green-400 cursor-pointer">Community</li>
                            <li className="hover:text-green-400 cursor-pointer">Students</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-5 pt-4 text-center text-gray-500 text-sm">
                    © 2025 All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
