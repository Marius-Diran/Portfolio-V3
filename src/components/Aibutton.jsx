const Button = ({ className = "", size = "default", children, ...props }) => {
  const baseClasses =
    "rounded-full glass-blue text-white font-semibold hover:bg-[#3B82F6]/90 transition-colors duration-300 focus:outline-none focus:visible:ring-2 focus-visible:ring-[#3B82F6]/50 focus-visible:ring-offset-2 shadow-lg shadow-[#3B82F6]/20 hover:cursor-pointer";
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${className}`;
  return (
    <button className={classes} {...props}>
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default Button;
