import { Link } from "react-router-dom";
import { Input } from "../../../../shared/components/input";
import { Label } from "../../../../shared/components/label";
import { Button } from "../../../../shared/components/button";


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
          <Label text="Email" />
          <Input
            name="email"
            type="email"
            required
          />
        </div>

        <div>
          <Label text="Пароль" />
          <Input
            name="password"
            type="password"
            required
          />
        </div>

        <Button text="Увійти" />
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