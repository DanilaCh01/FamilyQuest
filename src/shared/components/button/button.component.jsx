export const Button = ({ Tag, children, to, variant = "primary", className = "", ...props }) => {
  const Component = Tag || "button";

  const baseStyles = "w-full inline-block text-center py-2 px-4 rounded-md font-semibold transition duration-200";
  
  const variants = {
    primary: "bg-btn-main-bg text-btn-main-text hover:bg-btn-main-bg/90",
    secondary: "bg-btn-alt-bg text-btn-alt-text hover:bg-btn-alt-bg/80"
  };

  return (
    <Component
      type={Tag === "button" ? "submit" : undefined}
      to={to}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
