import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { number, z } from 'zod';
import { BACKEND_URL } from "../../../config/constants";

const schema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),
  phone: z.string()
    .regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, 'Numéro de téléphone invalide'),
  // address: z.object({
  //   number: number().min(1, 'Numéro de rue invalide'),
  //   street: z.string().min(3, 'Rue invalide'),
  //   city: z.string().min(2, 'Ville invalide'),
  //   postalCode: z.string()
  //     .regex(/^\d{5}$/, 'Code postal invalide'),
  //   country: z.string().min(2, 'Pays invalide')
  // })
});

type AccountStepProps = {
  onNext: (data: z.infer<typeof schema>) => void;
};

export default function AccountStep({ onNext }: AccountStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const payload = {
        email: data.email,
        public_key: "string",
        name: "string",
        lastname: "string",
        siret: 0,
        barreau: "string",
        password: data.password,
        description: "string",
        profile_picture: "string",
        cabinet_price: 0,
        phone_price: 0,
        online_price: 0,
        phone: data.phone,
        expertises: []
      };

      const response = await fetch(`${BACKEND_URL}/lawyer/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur serveur');
      }

      const result = await response.json();
      console.log(result);

      onNext(result);
    } catch (err: any) {
      alert(err.message); // You can replace with a nicer UI error handling
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg mx-auto">
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

      {/* <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Adresse du cabinet
        </label>

        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <label htmlFor="number" className="block text-xs font-medium text-gray-500">
              Numéro
            </label>
            <input
              type="number"
              id="number"
              {...register('address.number', { valueAsNumber: true })}
              className="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 px-3"
              placeholder="10"
            />
            {errors.address?.number && (
              <p className="mt-1 text-sm text-red-600">{errors.address.number.message}</p>
            )}
          </div>

          <div className="col-span-3">
            <label htmlFor="street" className="block text-xs font-medium text-gray-500">
              Rue
            </label>
            <input
              type="text"
              id="street"
              {...register('address.street')}
              className="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 px-3"
              placeholder="Rue de la Paix"
            />
            {errors.address?.street && (
              <p className="mt-1 text-sm text-red-600">{errors.address.street.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-6 gap-4 mt-4">
          <div className="col-span-2">
            <label htmlFor="city" className="block text-xs font-medium text-gray-500">
              Ville
            </label>
            <input
              type="text"
              id="city"
              {...register('address.city')}
              className="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 px-3"
              placeholder="Paris"
            />
            {errors.address?.city && (
              <p className="mt-1 text-sm text-red-600">{errors.address.city.message}</p>
            )}
          </div>

          <div className="col-span-2">
            <label htmlFor="postalCode" className="block text-xs font-medium text-gray-500">
              Code postal
            </label>
            <input
              type="text"
              id="postalCode"
              {...register('address.postalCode')}
              className="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 px-3"
              placeholder="75002"
            />
            {errors.address?.postalCode && (
              <p className="mt-1 text-sm text-red-600">{errors.address.postalCode.message}</p>
            )}
          </div>

          <div className="col-span-2">
            <label htmlFor="country" className="block text-xs font-medium text-gray-500">
              Pays
            </label>
            <input
              type="text"
              id="country"
              {...register('address.country')}
              className="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 px-3"
              placeholder="France"
            />
            {errors.address?.country && (
              <p className="mt-1 text-sm text-red-600">{errors.address.country.message}</p>
            )}
          </div>
        </div>
      </div> */}


      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'En cours...' : 'Continuer'}
        </button>
      </div>
    </form>
  );
}
