import React, { useState, useEffect } from 'react';

const LiveActivity = () => {
  const [recentBookings, setRecentBookings] = useState([
    { user: 'John M.', location: 'Harare CBD', time: '2 mins ago', type: 'booked' },
    { user: 'Maria S.', location: 'Victoria Falls Airport', time: '5 mins ago', type: 'completed' },
    { user: 'David K.', location: 'Bulawayo Hospital', time: '8 mins ago', type: 'booked' },
    { user: 'Lisa R.', location: 'Mutare Station', time: '12 mins ago', type: 'completed' },
    { user: 'Peter N.', location: 'Harare Sports Club', time: '15 mins ago', type: 'booked' }
  ]);

  const locations = ['Harare CBD', 'Victoria Falls Airport', 'Bulawayo Mall', 'Mutare Hospital', 'Gweru Station', 'Masvingo Hotel'];
  const names = ['Alex M.', 'Grace K.', 'Robert T.', 'Jane D.', 'Mike B.', 'Sarah L.', 'Chris W.', 'Linda P.'];

  useEffect(() => {
    const interval = setInterval(() => {
      const newBooking = {
        user: names[Math.floor(Math.random() * names.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        time: 'just now',
        type: Math.random() > 0.5 ? 'booked' : 'completed'
      };

      setRecentBookings(prev => [newBooking, ...prev.slice(0, 4)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="live-activity">
      <div className="activity-container">
        <h4>Live Activity</h4>
        <p className="activity-subtitle">See what's happening right now on SpotOn</p>
        
        <div className="activity-feed">
          <div className="activity-header">
            <div className="pulse-indicator"></div>
            <span>Recent Bookings</span>
          </div>
          
          <div className="activity-list">
            {recentBookings.map((booking, index) => (
              <div key={index} className={`activity-item ${booking.type}`}>
                <div className="activity-avatar">
                  {booking.user.charAt(0)}
                </div>
                <div className="activity-content">
                  <p>
                    <strong>{booking.user}</strong> {booking.type === 'booked' ? 'reserved' : 'completed'} parking at{' '}
                    <strong>{booking.location}</strong>
                  </p>
                  <span className="activity-time">{booking.time}</span>
                </div>
                <div className={`activity-status ${booking.type}`}>
                  <i className={booking.type === 'booked' ? 'fa-solid fa-clock' : 'fa-solid fa-check'}></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveActivity;