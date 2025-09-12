import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { number, z } from 'zod';
import { BACKEND_URL } from "../../../config/constants";
import { b, data } from 'framer-motion/client';

const schema = z.object({
	name: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
	lastname: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
	siret: z.string().min(14, 'Le SIRET doit contenir 14 chiffres'),
	barreau: z.string().min(2, 'Le barreau doit contenir au moins 2 caractères'),
	address: z.object({
    street: z.string().min(3, 'Rue invalide'),
    city: z.string().min(2, 'Ville invalide'),
		state : z.string().min(2, 'Région invalide'),
    postal_code: z.string()
      .regex(/^\d{5}$/, 'Code postal invalide'),
    country: z.string().min(2, 'Pays invalide')
  }),
	description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
	expertises: z.array(z.string()), //.min(1, 'Sélectionnez au moins une expertise'),
	cabinet_price: z.number().min(0, 'Le tarif doit être au moins 0€'),
	phone_price: z.number().min(0, 'Le tarif doit être au moins 0€'),
	online_price: z.number().min(0, 'Le tarif doit être au moins 0€')
});

type AccountDetailsStepProps = {
  onNext: (data: z.infer<typeof schema>) => void;
};

export default function AccountDetailsStep({ onNext }: AccountDetailsStepProps) {
  const {
    register,
    handleSubmit,
		setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
			console.log("Hi hello");
			const access_token = sessionStorage.getItem("access_token");
			console.log(JSON.stringify(data.address))

			const address_response = await fetch(`${BACKEND_URL}/user/address/`, {
				method: "PUT",
				headers: {
					"Authorization": `Bearer ${access_token}`,
					"Content-Type": "application/json",
					"accept": "application/json"
				},
				body: JSON.stringify(data.address)
			});

			if (!address_response.ok) {
				const error = await address_response.json();
				throw new Error(error.message || 'Erreur serveur');
			}

			console.log(data.expertises);

			const payload = {
        name: data.name,
        lastname: data.lastname,
        siret: data.siret,
        barreau: data.barreau,
        description: data.description,
        cabinet_price: data.cabinet_price,
        phone_price: data.phone_price,
        online_price: data.online_price,
        expertises: data.expertises
      };

      const lawyer_details_response = await fetch(`${BACKEND_URL}/lawyer/me/`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${access_token}`, // if your API requires auth
				},

        body: JSON.stringify(payload)
      });

      if (!lawyer_details_response.ok) {
        const error = await lawyer_details_response.json();
        throw new Error(error.message || 'Erreur serveur');
      }

      onNext(data);
    } catch (err: any) {
      alert(err.message); // You can replace with a nicer UI error handling
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg mx-auto">
      {/* Name + Lastname */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prénom
          </label>
          <input
            type="text"
            {...register('name')}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
            placeholder="Entrez votre prénom"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom
          </label>
          <input
            type="text"
            {...register('lastname')}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
            placeholder="Entrez votre nom"
          />
        </div>
      </div>

      {/* SIRET + Barreau */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SIRET
          </label>
          <input
            type="text"
            {...register('siret')}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
            placeholder="14 chiffres"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Barreau
          </label>
          <input
            type="text"
            {...register('barreau')}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
            placeholder="Nom du barreau"
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Adresse</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rue
            </label>
            <input
              type="text"
							{...register('address.street')}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
              placeholder="Rue"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ville
              </label>
              <input
                type="text"
								{...register('address.city')}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
                placeholder="Ville"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Région
              </label>
              <input
                type="text"
								{...register('address.state')}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
                placeholder="Région"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Code Postal
              </label>
              <input
                type="text"
								{...register('address.postal_code')}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
                placeholder="75000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pays
              </label>
              <input
                type="text"
								{...register('address.country')}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
                placeholder="France"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          {...register('description')}
          maxLength={2000}
          rows={5}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
          placeholder="Décrivez votre profil (max 2000 caractères)"
        />
        <p className="text-sm text-gray-500 mt-1">
          Maximum 2000 caractères.
        </p>
      </div>

      {/* Expertises */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Expertises
        </label>
        <input
          type="text"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
          placeholder="Saisissez vos expertises séparées par des virgules"
          onBlur={e => {
            const arr = e.target.value
              .split(',')
              .map(s => s.trim())
              .filter(Boolean);
            setValue('expertises', arr, { shouldValidate: true });
          }}
        />
        {errors.expertises && (
          <p className="text-sm text-red-600 mt-1">{errors.expertises.message}</p>
        )}
        <p className="text-sm text-gray-500 mt-1">
          Vous pouvez ajouter plusieurs expertises.
        </p>
      </div>

      {/* Prices */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tarifs</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cabinet (€)
            </label>
            <input
              type="number"
              {...register('cabinet_price', { valueAsNumber: true })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
              placeholder="0"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone (€)
            </label>
            <input
              type="number"
              {...register('phone_price', { valueAsNumber: true })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
              placeholder="0"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              En ligne (€)
            </label>
            <input
              type="number"
              {...register('online_price', { valueAsNumber: true })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
              placeholder="0"
              min="0"
            />
          </div>
        </div>
      </div>

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
