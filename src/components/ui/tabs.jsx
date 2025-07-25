import React, { useState } from 'react';
import './tabs.css'; // Ensure you have a CSS file for styling
export const Tabs = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="tab-buttons">
        {React.Children.map(children, (child, index) => (
          <button
            className={`tab-btn ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {children[activeIndex]}
      </div>
    </div>
  );
};

export const Tab = ({ children }) => <>{children}</>;
