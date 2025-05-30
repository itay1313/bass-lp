import React from 'react';

const MiddleSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col lg:flex-row items-center justify-center overflow-hidden [background:var(--bg)]">
      {/* Text Content - Now on top for mobile */}
      <div className="relative lg:absolute lg:left-0 w-full lg:w-1/2 h-1/2 lg:h-full flex items-center justify-center p-6 lg:p-12 order-1 lg:order-none">
        <div className="[color:var(--text)] space-y-4 lg:space-y-6 text-center lg:text-left">
          <h2 className="text-4xl lg:text-7xl font-bold leading-tight">
            Playing on our bass will feel{' '}
            <span className="[color:var(--primary)]">out of this world</span>
          </h2>
          <p className="text-lg lg:text-xl [color:var(--text-subtle)]">
            Experience music like never before with our revolutionary bass technology
          </p>
        </div>
      </div>

      {/* Video Container - Now below for mobile */}
      <div className="relative lg:absolute lg:right-0 w-full lg:w-1/2 h-1/2 lg:h-full order-2 lg:order-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full rounded-[12.5rem] object-cover"
        >
          <source src="/alien.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient Overlay - Adjusted for mobile */}
      <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r [from:var(--bg)] to-transparent" />
    </section>
  );
};

export default MiddleSection;
