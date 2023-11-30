import React from "react";

const OrdersPage = () => {
  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-3">
        <thead className="">
          <tr className="text-left">
            <th className="hidden md:block">Order Id</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-sm md:text-base odd:bg-red-50">
            <td className="hidden md:block py-6 px-1">1234567</td>
            <td className="py-6 px-1">10.09.23</td>
            <td className="py-6 px-1">89.90</td>
            <td className="hidden md:block py-6 px-1">
              Big Burger Menu(2), Veggie Pizza, Coca Cola 1L(2)
            </td>
            <td>Delivered</td>
          </tr>
          <tr className="text-sm md:text-base odd:bg-gray-50">
            <td className="hidden md:block py-6 px-1">1234567</td>
            <td className="py-6 px-1">10.09.23</td>
            <td className="py-6 px-1">89.90</td>
            <td className="hidden md:block py-6 px-1">
              Big Burger Menu(2), Veggie Pizza, Coca Cola 1L(2)
            </td>
            <td>Delivered</td>
          </tr>
          <tr className="text-sm md:text-base odd:bg-gray-50">
            <td className="hidden md:block py-6 px-1">1234567</td>
            <td className="py-6 px-1">10.09.23</td>
            <td className="py-6 px-1">89.90</td>
            <td className="hidden md:block py-6 px-1">
              Big Burger Menu(2), Veggie Pizza, Coca Cola 1L(2)
            </td>
            <td>Delivered</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
