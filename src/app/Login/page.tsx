import Image from 'next/image'
import illustrationLogin from '../../assets/IllustrationLogin.png'
import logoGarage from '../../assets/LogoGarage.png'
import franceFlag from '../../assets/france.png'
import englandFlag from '../../assets/angleterre.png'
import chinaFlag from '../../assets/chine.png'
import spainFlag from '../../assets/espagne.png'

export default function Home() {
  return (
    <div className="min-h-screen flex justify-end items-center bg-gradient-to-r from-gray-800 to-black p-10">
      <div className="flex flex-col items-center space-y-6">
        <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-2">Connexion</h1>
          <h2 className="text-xl font-light text-center text-gray-500 mb-6">Moodle</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Identifiant
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Insérez votre identifiant"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Mot de passe
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Insérez votre mot de passe"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Connexion
              </button>
            </div>
          </form>
          <div className="flex justify-center mt-6">
            <Image src={illustrationLogin} alt="Illustration" width={300} height={150} />
          </div>
          <div className="mt-6 flex justify-center">
            <Image src={logoGarage} alt="Garage ISEP" width={100} height={50} />
          </div>
        </div>
        <div className="flex space-x-4 mt-6">
          <Image src={franceFlag} alt="Français" width={30} height={20} />
          <Image src={englandFlag} alt="Anglais" width={30} height={20} />
          <Image src={spainFlag} alt="Espagnol" width={30} height={20} />
          <Image src={chinaFlag} alt="Chinois" width={30} height={20} />
        </div>
      </div>
    </div>
  )
}
