"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Order, useAuth } from "../_components/authContext/authContext";

export default function AdminPanel() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchAllOrders = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("No token found");
      const response = await axios.get("/api/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
      console.log(orders);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await fetchAllOrders();

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch orders", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrder = async (order: Order) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("No token found");
      const response = await axios.put("/api/admin", order, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.map((o) => (o.id === order.id ? response.data : o)));
    } catch (error) {
      setError("Failed to update order");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleInputChange = (
    id: number,
    field: string | number,
    value: any,
  ) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, [field]: value } : order,
      ),
    );
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Quantity</th>
            <th>Software</th>
            <th>Material</th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>
                <input
                  type="text"
                  value={order.commandTitle}
                  onChange={(e) =>
                    handleInputChange(order.id, "commandTitle", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={order.quantity}
                  onChange={(e) => (order.quantity = e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={order.usedSoftware}
                  onChange={(e) => (order.usedSoftware = e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={order.materialChoice}
                  onChange={(e) => (order.materialChoice = e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={order.comment}
                  onChange={(e) => (order.comment = e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => updateOrder(order)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
