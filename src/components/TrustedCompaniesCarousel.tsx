
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface Company {
  name: string;
  logo: string;
  testimonial: string;
}

const TrustedCompaniesCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const companies: Company[] = [
    {
      name: "TechCorp Solutions",
      logo: "🏢",
      testimonial: "AI Interviewer reduced our hiring time by 60% while maintaining quality."
    },
    {
      name: "InnovateHR",
      logo: "💼",
      testimonial: "The most comprehensive AI interview platform we've used."
    },
    {
      name: "DataDrive Inc",
      logo: "📊",
      testimonial: "Exceptional candidate insights and reporting capabilities."
    },
    {
      name: "CloudTech Systems",
      logo: "☁️",
      testimonial: "Seamless integration with our existing HR workflows."
    },
    {
      name: "NextGen Ventures",
      logo: "🚀",
      testimonial: "Professional, reliable, and incredibly user-friendly."
    },
    {
      name: "ScaleUp Partners",
      logo: "📈",
      testimonial: "Perfect for scaling our interview process efficiently."
    },
    {
      name: "FutureWork Labs",
      logo: "🔬",
      testimonial: "The AI analysis provides invaluable hiring insights."
    },
    {
      name: "GlobalTech Hub",
      logo: "🌐",
      testimonial: "Multi-language support made international hiring easier."
    }
  ];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % companies.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered, companies.length]);

  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Leading Companies
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of organizations worldwide who trust our AI-powered interviewing platform
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Duplicate companies for seamless infinite scroll */}
            {[...companies, ...companies].map((company, index) => (
              <div 
                key={`${company.name}-${index}`}
                className="flex-shrink-0 w-1/4 px-4"
              >
                <Card className="p-6 h-48 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <div className="flex flex-col items-center text-center h-full justify-between">
                    {/* Logo */}
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {company.logo}
                    </div>
                    
                    {/* Company Name */}
                    <h3 className="font-bold text-lg text-gray-900 mb-3">
                      {company.name}
                    </h3>
                    
                    {/* Testimonial - shown on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm text-gray-600 italic leading-relaxed">
                        "{company.testimonial}"
                      </p>
                    </div>
                    
                    {/* Default content when not hovered */}
                    <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-300 absolute bottom-6">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-1 h-1 bg-blue-500 rounded-full"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {companies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blue-600 scale-125'
                  : 'bg-blue-300 hover:bg-blue-400'
              }`}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Companies Trust Us</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">100K+</div>
            <div className="text-gray-600">Interviews Conducted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
            <div className="text-gray-600">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">60%</div>
            <div className="text-gray-600">Time Savings</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedCompaniesCarousel;
