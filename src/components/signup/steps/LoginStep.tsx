import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères')
});

type LoginFormData = z.infer<typeof loginSchema>;

type LoginStepProps = {
  onNext: (data: LoginFormData) => void;
  onBack: () => void;
};

export default function LoginStep({ onNext, onBack }: LoginStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("username", data.email);
    formData.append("password", data.password);
    const response = await fetch("http://localhost:8000/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData.toString()
    });

    if (response.ok) {
      const data = await response.json();
      if (data) {
        // Login successful
        console.log("Login successful!");
        sessionStorage.setItem("access_token", data.access_token);
      } else {
        // Unexpected response
        console.log("Unexpected response:", data);
      }
    } else {
      // Login failed
      const error = await response.json();
      console.log("Login failed:", error.detail);
    }
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-center mb-4">Connexion Avocat</h2>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email professionnel
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className="mt-1 block w-full h-14 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 px-6"
          placeholder="exemple@cabinet-avocat.fr"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          {...register('password')}
          className="mt-1 block w-full h-14 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 px-6"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Retour
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Connexion...' : 'Se connecter'}
        </button>
      </div>
    </form>
  );
}