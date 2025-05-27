import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),
  phone: z.string()
    .regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, 'Numéro de téléphone invalide')
});

type AccountStepProps = {
  onNext: (data: z.infer<typeof schema>) => void;
  onBack: () => void;
};

export default function AccountStep({ onNext, onBack }: AccountStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6 max-w-lg mx-auto">
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

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Téléphone professionnel
        </label>
        <input
          type="tel"
          id="phone"
          {...register('phone')}
          className="mt-1 block w-full h-14 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 px-6"
          placeholder="06 12 34 56 78"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="px-6 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
        >
          Continuer
        </button>
      </div>
    </form>
  );
}