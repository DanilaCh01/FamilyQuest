export const Input = ({ type, name, value, required, onChange, placeholder }) => {
  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    switch (type) {
      case 'email':
        return 'example@gmail.com';

      case 'password':
        return '·········';

      default:
        return 'Введіть дані';
    }
  };

  return (
    <input
      name={name}
      type={type}
      required={required}
      placeholder={getPlaceholder()}
      className="w-full px-3 py-2 text-accent border border-border-subtle rounded-md shadow-sm shadow-border-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
      value={value}
      onChange={onChange}
    />
  );
};
