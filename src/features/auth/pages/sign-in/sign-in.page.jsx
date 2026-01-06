import { Link } from "react-router-dom";


export const SignInPage = () => {

    const handleSubmit = (event) => {

    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Дані форми в JSON:", data);
  };

  return (
    <div className="w-full max-w-sm">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Увійти у FamilyQuest</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            name="email"
            type="email"
            required
            placeholder="example@gmail.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
          <input
            name="password"
            type="password"
            required
            placeholder="·········"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition duration-200"
        >
          Увійти
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        {"Нема аккаунту? "}
        <Link to="/auth/sign-up" className="text-blue-600 hover:underline font-medium">
          Зареєструватися
        </Link>
      </div>
    </div>
  );
};


// export const SignInPage = () => {
//     return (
//         <div>
//             <h1 style={{ fontSize: "2rem" }}>Sign In Page</h1>
//             <Link to="/" style={{color: "blue"}}>Return to Main page</Link>
//         </div>
//     );
// };