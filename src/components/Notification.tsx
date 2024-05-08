import React from "react";

const Notification = () => {
  return (
    <div
      className="h-12 bg-red-500 text-white p-2 flex justify-center items-center text-center assistant-regular text-xs md:text-base cursor-pointer"
      data-testid="notification"
    >
      Free delivery for all orders over 50$. Order your food now !
    </div>
  );
};

export default Notification;
