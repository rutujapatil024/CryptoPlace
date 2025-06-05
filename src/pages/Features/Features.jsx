import React from 'react';
import './Features.css';
import { FaChartLine, FaCoins, FaShieldAlt, FaGlobe } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaChartLine />,
      title: "Live Price Tracking",
      description: "Get real-time updates on cryptocurrency prices across multiple currencies."
    },
    {
      icon: <FaCoins />,
      title: "Top Coins Dashboard",
      description: "Explore the top-performing coins with detailed analytics and history."
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure & Reliable",
      description: "Your data is protected with industry-standard security and privacy."
    },
    {
      icon: <FaGlobe />,
      title: "Global Currency Support",
      description: "Track prices in USD, EUR, INR and more – tailored to your region."
    },
    {
      icon: <FaChartLine />,
      title: "Advanced Charting Tools",
      description: "Analyze market trends with our comprehensive charting tools."
    },
    {
      icon: <FaCoins />,
      title: "Portfolio Management",
      description: "Manage your crypto portfolio with ease and track your investments."
    }

  ];

  return (
    <div className="features">
      <h2>Why Choose Our Platform?</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
