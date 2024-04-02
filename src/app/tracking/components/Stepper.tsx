import React from "react";
import { GoChecklist } from "react-icons/go";
import { PiCookingPot } from "react-icons/pi";
import { GrDeliver } from "react-icons/gr";
import { TbHomeCheck } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";
import styles from "../page.module.css";

const Stepper = ({ step }: { step: number }) => {
  return (
    <div className="w-full h-full flex justify-center ">
      {/* container */}
      <div className="w-[90vh] h-[30vh] mt-20">
        <div className="flex justify-between mb-7">
          <GoChecklist size={40} />
          <PiCookingPot size={40} />
          <GrDeliver size={40} />
          <TbHomeCheck size={40} />
        </div>
        <div className="flex justify-between items-center">
          {/* elements */}
          {new Array(3).fill("_").map((e, i) => (
            <div className="flex flex-1 items-center" key={i}>
              <div
                className={`h-[25px] min-w-[25px]  md:h-[30px] md:min-w-[30px]  rounded-full  ${
                  step >= i ? `bg-green-500` : "bg-red-500 "
                } block`}
              >
                {step >= i ? (
                  <div className="relative  left-2 top-1 md:top-0 md:text-lg text-xs text-white">
                    <span>✔</span>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <hr
                className={`w-full h-[5px] md:h-[8px] relative  ${
                  step >= i ? `bg-green-500` : "bg-red-500 "
                } ${step === i ? styles.shimmer : null}`}
              />
            </div>
          ))}

          <div
            className={`h-[25px] min-w-[25px]  md:h-[30px] md:min-w-[30px]   rounded-full  ${
              step === 3 ? "bg-green-500" : "bg-red-500 "
            } block`}
          >
            {step === 3 ? (
              <div className="relative  left-2 top-1 md:top-0 md:text-lg text-xs text-white">
                <span>✔</span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex justify-between py-10 font-semibold text-xs md:text-sm">
          <h1>Order Placed</h1>
          <h1>Preparing</h1>
          <h1>On the way</h1>
          <h1>Delivered</h1>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
