export const Button = ({ text }) => {
  return (
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition duration-200"
    >
      {text}
    </button>
  );
};
