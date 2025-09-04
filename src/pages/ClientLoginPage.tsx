import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Scale, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères')
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function ClientLoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data: LoginFormData) => {
    // TODO: Implement actual authentication
    console.log('Client login data:', data);
    navigate('/client-dashboard');
  };

  const handleDirectLogin = () => {
    // Bypass authentication and go directly to client dashboard
    navigate('/client-dashboard');
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center">
                <Scale className="h-8 w-8 text-orange-500" />
                <span className="ml-2 text-xl font-semibold text-gray-900">AvocaJust</span>
              </Link>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleDirectLogin}
                  className="flex items-center px-4 py-2 text-orange-500 hover:text-orange-600 transition-colors"
                >
                  <User className="h-5 w-5 mr-2" />
                  <span>Accès direct</span>
                </button>

                <Link 
                  to="/connexion-avocat"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Connexion Avocat
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-md mx-auto px-4 py-12">
          <div className="bg-white shadow-lg rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-orange-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Connexion Client</h2>
              <p className="mt-2 text-gray-600">
                Accédez à votre espace personnel
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className="mt-1 block w-full h-14 rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 px-4"
                  placeholder="votre@email.com"
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
                  className="mt-1 block w-full h-14 rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 px-4"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Se souvenir de moi
                  </label>
                </div>

                <a href="#" className="text-sm font-medium text-orange-500 hover:text-orange-600">
                  Mot de passe oublié ?
                </a>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Se connecter
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Vous n'avez pas encore de compte ?{' '}
                <Link to="/recherche" className="font-medium text-orange-500 hover:text-orange-600">
                  Trouvez un avocat
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}