const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/Hero-bg.png"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Red Dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            className="absolute w-2 h-2 bg-green-500 rounded-full opacity-60"
            style={{
              backgroundColor: "#E63946",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `slow-drift ${20 + Math.random() * 30}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
            key={i}
          />
        ))}
      </div>

      {/* Contents */}
      <div className="container mx-auto pt-30 text-white relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 animate-fadeIn">
            <span className="inline-flex items-center gap-2 text-sm uppercase tracking-wide px-4 py-2 rounded-full glass text-[#F87171]">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Software Engineer × LLM Engineer • Problem Solver
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </span>

            {/* HeadLine */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight">
                Building{" "}
                <span className="text-[#F87171] glow-text">Intelligent</span>
                <br />
                systems with
                <br />
                <span className="font-serif italic font-normal text-white">
                  precision and purpose
                </span>
              </h1>
              <p className="text-lg text-gray-300">
                Hi, I'm Marius Odediran — a Software/LLM Engineer specializing
                in React, Node.js, and Machine Learning. I love creating
                innovative solutions that bridge the gap between technology and
                user experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
