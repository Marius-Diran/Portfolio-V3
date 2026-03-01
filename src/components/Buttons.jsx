const Button = ({className = "", size = "default", children}) => {
    const baseClasses = "rounded-full bg-[#E85D5D] text-white font-semibold hover:bg-[#E85D5D]/90 transition-colors duration-300 focus:outline-none focus:visible:ring-2 focus-visible:ring-[#E85D5D]/50 focus-visible:ring-offset-2 shadow-lg shadow-[#E85D5D]/20 hover:cursor-pointer";
    const sizeClasses = {
        sm: "px-4 py-2 text-sm",
        default: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    }

    const classes = `${baseClasses} ${sizeClasses[size]} ${className}`;
    return (
        <button className={classes}>
            <span className="relative flex items-center justify-center gap-2">{children}</span>
        </button>
    )
}

export default Button