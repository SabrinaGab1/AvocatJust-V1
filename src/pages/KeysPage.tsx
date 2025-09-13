import React, { useState } from 'react';

export default function KeysPage() {
  const [privateKey, setPrivateKey] = useState('');
  const [showPrivateKeyModal, setShowPrivateKeyModal] = useState(false);
  const [generatedPrivateKey, setGeneratedPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [pastePrivateKey, setPastePrivateKey] = useState('');

  // Generate a key pair (example using Web Crypto API)
  const handleGenerateKeys = async () => {
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256"
      },
      true,
      ["encrypt", "decrypt"]
    );
    // Export keys
    const exportedPublicKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
    const exportedPrivateKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

    // Convert to base64
    const pubKeyB64 = btoa(String.fromCharCode(...new Uint8Array(exportedPublicKey)));
    const privKeyB64 = btoa(String.fromCharCode(...new Uint8Array(exportedPrivateKey)));

    setPublicKey(pubKeyB64);
    setGeneratedPrivateKey(privKeyB64);
    setShowPrivateKeyModal(true);

    // Send public key to backend
    const access_token = sessionStorage.getItem("access_token");
    await fetch("http://localhost:8000/user/public-key", {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pubKeyB64)
    });

    // Store private key in browser DB (localStorage)
    localStorage.setItem("private_key", privKeyB64);
    //localStorage.setItem("public_key", pubKeyB64);
  };

  // Handle user pasting their private key
  const handlePastePrivateKey = () => {
    localStorage.setItem("private_key", pastePrivateKey);
    setPastePrivateKey('');
    alert("Votre clé privée a été enregistrée dans le navigateur.");
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      <h2 className="text-2xl font-bold mb-6">Gestion des clés de chiffrement</h2>
      <button
        onClick={handleGenerateKeys}
        className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold mb-6"
      >
        Générer une paire de clés
      </button>

      {showPrivateKeyModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4 text-red-600">Votre clé privée</h3>
            <p className="mb-4 text-gray-700">
              <strong>Copiez et sauvegardez votre clé privée maintenant !</strong><br />
              Elle ne sera plus jamais affichée. Sans elle, vous ne pourrez pas lire vos anciens messages.
            </p>
            <textarea
              readOnly
              value={generatedPrivateKey}
              className="w-full h-32 border rounded-lg p-2 mb-4"
            />
            <button
              onClick={() => setShowPrivateKeyModal(false)}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg"
            >
              J'ai sauvegardé ma clé privée
            </button>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Importer votre clé privée</h3>
        <input
          type="text"
          value={pastePrivateKey}
          onChange={e => setPastePrivateKey(e.target.value)}
          className="w-full border rounded-lg p-2 mb-2"
          placeholder="Collez votre clé privée ici"
        />
        <button
          onClick={handlePastePrivateKey}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg"
        >
          Enregistrer la clé privée
        </button>
      </div>
    </div>
  );
}