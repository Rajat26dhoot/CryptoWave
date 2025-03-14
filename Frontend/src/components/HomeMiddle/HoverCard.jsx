
import { Star, CheckCircle, Shield, Award, Rocket, Globe } from 'lucide-react';

const HoverCard = () => {
  

  const cards = [
    { 
      title: 'Fast Performance', 
      description: 'Experience blazing fast load times and smooth interactions for a seamless user experience.', 
      icon: <Star /> 
    },
    { 
      title: 'Reliable Security', 
      description: 'Your data is protected with industry-leading encryption and multi-factor authentication.', 
      icon: <Shield /> 
    },
    { 
      title: 'User Friendly', 
      description: 'An intuitive interface designed for ease of use, ensuring a comfortable user journey.', 
      icon: <CheckCircle /> 
    },
    { 
      title: 'Award Winning', 
      description: 'Recognized globally for outstanding performance and innovation.', 
      icon: <Award /> 
    },
    { 
      title: 'High Scalability', 
      description: 'Designed to grow with your needs, handling high traffic with ease.', 
      icon: <Rocket /> 
    },
    { 
      title: 'Global Reach', 
      description: 'Available worldwide with optimized performance across different regions.', 
      icon: <Globe /> 
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black">
      
      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-70 h-50 border border-gray-700 text-white rounded-2xl shadow-lg transition-transform transform hover:-translate-y-2 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,128,0.9)] p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              {card.icon}
              <h2 className="text-xl font-semibold">{card.title}</h2>
            </div>
            <p className="text-gray-400 text-sm">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoverCard;
