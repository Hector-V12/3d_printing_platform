"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Order, useAuth } from "../_components/authContext/authContext";
import Header from "../_components/header";
import Footer from "../_components/footer";
import Email from "next-auth/providers/email";
import Image from "next/image";
import rightArrow from "~/assets/arrowRightIcon.svg";
import downArrow from "~/assets/downArrow.svg";

export default function AdminPanel() {
  const router = useRouter();
  const [inProgressOrders, setInProgressOrders] = useState<Order[]>([]);
  const [doneOrders, setDoneOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const [openCommands, setOpenCommands] = useState<number[]>([]); // Track open commands

  const fetchInProgressOrders = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("No token found");
      const response = await axios.get("/api/admin/inProgress", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInProgressOrders(response.data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const fetchDoneOrders = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("No token found");
      const response = await axios.get("/api/admin/done", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoneOrders(response.data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const toggleOpenCommand = (id: number) => {
    setOpenCommands((prevOpenCommands) =>
      prevOpenCommands.includes(id)
        ? prevOpenCommands.filter((orderId) => orderId !== id)
        : [...prevOpenCommands, id],
    );
  };

  const updateOrder = async (order: Order) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("No token found");
      const response = await axios.put("/api/admin", order, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedOrder = { ...response.data, status: true };
      console.log(updatedOrder);
      setDoneOrders((prevDoneOrders) => [...prevDoneOrders, updatedOrder]);
      setInProgressOrders((prevInProgressOrders) =>
        prevInProgressOrders.filter((o) => o.id !== order.id),
      );
    } catch (error) {
      setError("Failed to update order");
    }
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const inProgressOrders = await fetchInProgressOrders();
        const doneOrders = await fetchDoneOrders();

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch orders", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className=" flex h-screen w-full flex-col bg-gradient-to-t from-linear2 to-linear1 dark:bg-gradient-to-t dark:from-gray-900 dark:to-almostBlackGreen">
      <Header />
      <div className="flex h-full items-center justify-center p-10">
        <div className="flex w-full max-w-6xl rounded-2xl border-green-400 bg-whiteBackground p-10 dark:border dark:bg-gray-900 dark:text-green-400">
          <div className="flex w-1/2 flex-col items-center justify-between">
            <div className="text-2xl font-bold text-black">
              Commandes en cours
            </div>

            <div>
              {inProgressOrders.map((order: Order) => (
                <div key={order.id}>
                  <div className="flex flex-col space-y-4">
                    <div className="flex space-x-4">
                      <button onClick={() => toggleOpenCommand(order.id)}>
                        <Image
                          alt="rightArrow"
                          src={
                            openCommands.includes(order.id)
                              ? downArrow
                              : rightArrow
                          }
                          height={25}
                          width={25}
                        />
                      </button>

                      <div>
                        <div className="flex items-center space-x-4 text-xl font-bold">
                          <div>Commande</div>
                          <div>"{order.commandTitle}"</div>
                        </div>
                        <div className="flex items-center space-x-4 text-xl font-bold">
                          <div className="flex items-center space-x-2">
                            <div>{order.user.surname}</div>
                            <div>{order.user.name}</div>
                          </div>
                          <div>
                            <button
                              className="text-red-700 underline"
                              onClick={() => updateOrder(order)}
                            >
                              Terminer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {openCommands.includes(order.id) ? (
                      <div>
                        <div className="flex items-center space-x-4 text-xl font-bold">
                          <div>email: </div>
                          <div>{order.user.email}</div>
                        </div>
                        <div className="flex items-center space-x-4 text-xl font-bold">
                          <div>Technologie d'impression: </div>
                          <div>{order.usedSoftware}</div>
                        </div>
                        <div className="flex items-center space-x-4 text-xl font-bold">
                          <div>Type de materiaux: </div>
                          <div>{order.materialChoice}</div>
                        </div>
                        <div className="flex items-center space-x-4 text-xl font-bold">
                          <div>Quantité: </div>
                          <div>{order.quantity}</div>
                        </div>
                        <div className="flex items-center space-x-4 text-xl font-bold">
                          <div>Fichier: </div>
                          <div>?</div>
                        </div>
                      </div>
                    ) : (
                      false
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-8 w-px bg-black dark:bg-green-400"></div>

          <div className="flex w-1/2 flex-col items-center space-y-4 pl-5 pr-5">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-black">
                Commandes Terminées
              </div>
              <div>
                {doneOrders.map((order) => (
                  <div key={order.id}>
                    <div className="flex flex-col space-y-4">
                      <div className="flex space-x-4">
                        <button onClick={(e) => toggleOpenCommand(order.id)}>
                          <Image
                            alt="rightArrow"
                            src={
                              openCommands.includes(order.id)
                                ? downArrow
                                : rightArrow
                            }
                            height={25}
                            width={25}
                          />
                        </button>

                        <div>
                          <div className="flex items-center space-x-4 text-xl font-bold">
                            <div>Commande</div>
                            <div>"{order.commandTitle}"</div>
                          </div>
                          <div className="flex items-center space-x-4 text-xl font-bold">
                            <div className="flex items-center space-x-2">
                              <div>{order.user.surname}</div>
                              <div>{order.user.name}</div>
                            </div>
                            <div>
                              <div className="text-green-500 underline">
                                Terminer
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {openCommands.includes(order.id) ? (
                        <div>
                          <div className="flex items-center space-x-4 text-xl font-bold">
                            <div>email: </div>
                            <div>{order.user.email}</div>
                          </div>
                          <div className="flex items-center space-x-4 text-xl font-bold">
                            <div>Technologie d'impression: </div>
                            <div>{order.usedSoftware}</div>
                          </div>
                          <div className="flex items-center space-x-4 text-xl font-bold">
                            <div>Type de materiaux: </div>
                            <div>{order.materialChoice}</div>
                          </div>
                          <div className="flex items-center space-x-4 text-xl font-bold">
                            <div>Quantité: </div>
                            <div>{order.quantity}</div>
                          </div>
                          <div className="flex items-center space-x-4 text-xl font-bold">
                            <div>Fichier: </div>
                            <div>?</div>
                          </div>
                        </div>
                      ) : (
                        false
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
