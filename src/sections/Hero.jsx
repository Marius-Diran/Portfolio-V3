const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img src="/Hero-bg.png" alt="Hero Background" className="w-full h-full object-cover opacity-40" />
            </div>
        </section>
    )
}

export default Hero