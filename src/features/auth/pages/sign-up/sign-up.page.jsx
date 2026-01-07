import { Link } from "react-router-dom";
import { useState } from "react";
import { Input } from "../../../../shared/components/input";
import { Label } from "../../../../shared/components/label";
import { Button } from "../../../../shared/components/button";

export const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log("Дані SignUp (Controlled):", formData);
    
    if (formData.password !== formData.confirmPassword) {
      setError("Паролі не співпадають!");
      return;
    }
  };

  const [error, setError] = useState("");

  return (
    <div className="w-full max-w-sm">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Створити акаунт</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label text="Email" />
          <Input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label text="Пароль" />
          <Input
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label text="Підтвердження паролю" />
          <Input
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}      {/* might be deleted */}
        <Button text="Зареєструватися" />
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Вже є акаунт?{" "}
        <Link to="/auth/sign-in" className="text-blue-600 hover:underline font-medium">
          Увійти
        </Link>
      </div>
    </div>
  );
};