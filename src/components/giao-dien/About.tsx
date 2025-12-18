import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <div className="absolute top-0 left-0 w-32 h-32 bg-amber-100 rounded-full -translate-x-10 -translate-y-10 z-0 opacity-50"></div>
            <img 
              src="https://images.unsplash.com/photo-1442975631115-c4f7b05b8a2c?auto=format&fit=crop&q=80"
              alt="Coffee Brewing" 
              className="relative z-10 rounded-2xl shadow-2xl w-full h-[500px] object-cover"
            />
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-xl z-20 max-w-xs border border-gray-100">
              <p className="font-serif font-bold text-xl text-coffee-900 mb-2">"Coffee is a language in itself."</p>
              <p className="text-amber-600 text-sm font-semibold">- Gerry, Founder</p>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-serif font-bold text-coffee-900 mb-6">A Story in Every Cup</h2>
            <div className="w-20 h-1 bg-amber-600 rounded-full mb-8"></div>
            <p className="text-lg text-coffee-700 leading-relaxed mb-6">
              At Gerry Coffee, we believe that coffee is more than just a drink; it's a ritual, a comfort, and a catalyst for connection. 
              Founded in 2024, we set out on a mission to blend the ancient art of roasting with the cutting-edge precision of modern technology.
            </p>
            <p className="text-lg text-coffee-700 leading-relaxed mb-8">
              We source our beans directly from sustainable farms across the coffee belt, ensuring fair wages and exceptional quality. 
              Whether you're sipping our signature espresso or enjoying a pastry, you're tasting passion, dedication, and innovation.
            </p>
            <ul className="grid grid-cols-2 gap-4 mb-8">
              {['Ethically Sourced', 'Expertly Roasted', 'AI Assisted Service', 'Community Focused'].map(item => (
                <li key={item} className="flex items-center gap-2 text-coffee-800 font-medium">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

