"use client";

import React, { useState } from "react";
import Header from "../_components/header";
import Footer from "../_components/footer";
import Image from "next/image";

import boxIcon from "../../../public/boxIcon.svg";
import whiteCartIcon from "../../../public/cartWhiteIcon.svg";
import arrowRightIcon from "../../../public/arrowRightIcon.svg";
import eyeFillIcon from "../../../public/eyeFill.svg";
import paypalIcon from "../../../public/paypalIcon.svg";

export interface Payment {
  CardNumber: string;
  ExpirationDate: string | Date;
  Cvc: string;
  Address: string;
  City: string;
}

export default function PaymentDesktop() {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      cardNumber,
      expirationDate,
      cvc,
      address,
      city,
    };

    console.log(data);
  };

  return (
    <div className="flex h-screen flex-col gap-10 bg-gradient-to-t from-linear2 to-linear1">
      <Header />
      <div className="flex h-full  items-center justify-center">
        <div className="flex w-5/6  rounded-2xl bg-whiteBackground p-10">
          <div className="flex w-1/2 flex-col justify-between space-y-6">
            <div className="text-2xl font-extrabold">
              Entrez vos détails de paiement
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <div className="flex items-center space-x-4">
                  <div className="w-1/2">
                    <div className="text-xl font-extrabold text-fontBlack">
                      Numéro de carte
                    </div>
                    <div className="border-1 flex flex-row space-x-2 border-b border-fontBlack p-1">
                      <Image alt="boxIcon" src={boxIcon} width={25} />
                      <input
                        className="border-0 bg-whiteBackground text-fontBlack outline-none"
                        placeholder="Dites nous en plus"
                        type="string"
                        name="CardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <div className="">
                      <div className="text-xl font-extrabold text-fontBlack">
                        Date d'expiration
                      </div>
                      <div className="border-1 flex flex-row space-x-2 border-b border-fontBlack p-1">
                        <Image alt="boxIcon" src={boxIcon} width={25} />
                        <input
                          className="border-0 bg-whiteBackground text-fontBlack outline-none"
                          placeholder="Dites nous en plus"
                          type="string"
                          name="ExpirationDate"
                          value={expirationDate}
                          onChange={(e) => setExpirationDate(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-1/4">
                    <div className="text-xl font-extrabold text-fontBlack">
                      CVC
                    </div>
                    <div className="border-1 flex flex-row space-x-2 border-b border-fontBlack p-1">
                      <Image alt="boxIcon" src={boxIcon} width={25} />
                      <input
                        className="border-0 bg-whiteBackground text-fontBlack outline-none"
                        placeholder="Dites nous en plus"
                        type="string"
                        name="Cvc"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <div className="w-1/2">
              <div className="text-xl font-extrabold text-fontBlack">
                Adresse
              </div>
              <div className="border-1 flex flex-row space-x-2 border-b border-fontBlack p-1">
                <Image alt="boxIcon" src={boxIcon} width={25} />
                <input
                  className="border-0 bg-whiteBackground text-fontBlack outline-none"
                  placeholder="Dites nous en plus"
                  type="string"
                  name="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="text-xl font-extrabold text-fontBlack">Ville</div>
              <div className="border-1 flex flex-row space-x-2 border-b border-fontBlack p-1">
                <Image alt="boxIcon" src={boxIcon} width={25} />
                <input
                  className="border-0 bg-whiteBackground text-fontBlack outline-none"
                  placeholder="Dites nous en plus"
                  type="string"
                  name="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
            </div>
            <button className="mb-3 flex w-1/2  flex-row items-center space-x-12 bg-fontBlack p-2">
              <Image alt="whiteCartIcon" src={whiteCartIcon} />
              <div className="font-extrabold text-fontWhite">
                Ajouter au panier
              </div>
            </button>
            <div>OU</div>
            <button>
              <Image
                alt="paypalIcon"
                src={paypalIcon}
                height={50}
                width={200}
              />
            </button>
          </div>
          <div className="mx-8 w-px bg-black"></div>
          <div className="flex w-1/2 flex-col space-y-8 pl-5 pr-5">
            <div className="flex flex-col items-center text-2xl font-extrabold">
              <div>Récapitulatif de commande</div>
            </div>
            <div className="space-8 flex flex-col">
              <div className="flex space-x-4 font-extrabold">
                <Image alt="rightArrow" src={arrowRightIcon} height={25} />
                <div className="text-2xl">Commande "Bateau Miniature"</div>
              </div>
              <div className="pl-5 pt-2 text-lg font-bold">
                <div className="flex space-x-1">
                  <Image alt="rightArrow" src={arrowRightIcon} height={25} />
                  <div>Technologie d'impression:?</div>
                </div>

                <div className="flex space-x-1">
                  <Image alt="rightArrow" src={arrowRightIcon} height={25} />
                  <div>Type de materiaux:?</div>
                </div>

                <div className="flex space-x-1">
                  <Image alt="rightArrow" src={arrowRightIcon} height={25} />
                  <div>Quantité:?</div>
                </div>

                <div className="flex space-x-1">
                  <Image alt="rightArrow" src={arrowRightIcon} height={25} />
                  <div className="flex space-x-2">
                    <div> Fichier:</div>
                    <button>
                      <div className="underline">Petit bateau.stl</div>
                    </button>
                    <button>
                      <Image
                        alt="eye"
                        src={eyeFillIcon}
                        height={25}
                        width={25}
                      />
                    </button>
                    <button className="text-red-700 underline">Modifier</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
