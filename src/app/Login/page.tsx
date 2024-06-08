import Image from "next/image";
import illustrationLogin from "../../assets/IllustrationLogin.png";
import logoGarage from "../../assets/LogoGarage.png";
import franceFlag from "../../assets/france.png";
import englandFlag from "../../assets/angleterre.png";
import chinaFlag from "../../assets/chine.png";
import spainFlag from "../../assets/espagne.png";
import { auth } from "lib/auth";

export default async function LoginPage() {
  const session = await auth();

  return (
    <div className="flex min-h-screen items-center justify-end bg-gradient-to-r from-gray-800 to-black p-10">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-full max-w-md rounded-lg bg-white p-10 shadow-lg">
          <h1 className="mb-2 text-center text-3xl font-bold">Connexion</h1>
          <h2 className="mb-6 text-center text-xl font-light text-gray-500">
            Moodle
          </h2>
          <form>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="username"
              >
                Identifiant
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="username"
                type="text"
                placeholder="Insérez votre identifiant"
              />
            </div>
            <div className="mb-6">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Mot de passe
              </label>
              <input
                className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="password"
                type="password"
                placeholder="Insérez votre mot de passe"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="button"
              >
                Connexion
              </button>
            </div>
          </form>
          <div className="mt-6 flex justify-center">
            <Image
              src={illustrationLogin}
              alt="Illustration"
              width={300}
              height={150}
            />
          </div>
          <div className="mt-6 flex justify-center">
            <Image src={logoGarage} alt="Garage ISEP" width={100} height={50} />
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          <Image src={franceFlag} alt="Français" width={30} height={20} />
          <Image src={englandFlag} alt="Anglais" width={30} height={20} />
          <Image src={spainFlag} alt="Espagnol" width={30} height={20} />
          <Image src={chinaFlag} alt="Chinois" width={30} height={20} />
        </div>
      </div>
    </div>
  );
}
