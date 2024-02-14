import { MdSupervisorAccount } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { BsGraphDownArrow } from "react-icons/bs";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { MdOutlinePageview } from "react-icons/md";
import { FaSquarePollVertical } from "react-icons/fa6";
import LiveVisitorChart from "../../componnents/chart/SupportHomeChart/LiveVisitorChart";
import Feedback from "../../componnents/chart/SupportHomeChart/Feedback";
import TotalMessage from "../../componnents/chart/SupportHomeChart/TotalMessage";

const SupportHome = () => {
  return (
    <div>
      <div className="flex gap-4  justify-between">
        <div className="w-[50%] mr-4  ">
          <div className=" ">
            <LiveVisitorChart />
          </div>
          <div className=" flex items-center mt-8">
            <Feedback />
            <TotalMessage />
          </div>
        </div>

        <div className="w-[50%] grid grid-cols-2 gap-4 max-h-44  mt-0">
          <div className=" border shadow-md  p-4 text-2xl bg-[#0066FF] text-white">
            <h1 className="flex items-center gap-2 ">
              <MdSupervisorAccount className="" /> visitors
            </h1>
            <p className="text-xl my-4">Today</p>
            <div className="flex items-center gap-4 text-xl my-4">
              <p>0</p>
              <p className="flex items-center gap-2 text-green-500">
                <BsGraphUpArrow /> 0.00%
              </p>
            </div>
            <div className="flex items-center gap-4 text-xl my-4">
              <p>Last 7 days</p>
              <p className="flex items-center gap-2 text-green-500">
                <FaArrowAltCircleUp /> 0
              </p>
              <p className="flex items-center gap-2 text-red-500">
                <FaArrowCircleDown /> 0
              </p>
            </div>
          </div>
          <div className=" border shadow-md  p-4 bg-[#0066FF] text-white">
            <h1 className="flex items-center gap-2 text-2xl">
              <HiOutlineChatBubbleOvalLeftEllipsis className="" /> chats
            </h1>

            <div className="items-center gap-4 text-xl my-4">
              <div className="flex items-center justify-between">
                <div>
                  <p>Answered</p>
                  <p className="flex items-center gap-2 text-green-500">
                    0 <BsGraphUpArrow /> 0.00%
                  </p>
                </div>
                <div>
                  <p>Missed</p>
                  <p className="flex items-center gap-2 text-red-500">
                    0 <BsGraphDownArrow /> 0.00%
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xl my-8">
              <p>Last 7 days</p>
              <p className="flex items-center gap-2 text-green-500">
                <FaArrowAltCircleUp /> 0
              </p>
              <p className="flex items-center gap-2 text-red-500">
                <FaArrowCircleDown /> 0
              </p>
            </div>
          </div>
          <div className=" border shadow-md  p-4 text-2xl bg-[#0066FF] text-white">
            <h1 className="flex items-center gap-2 ">
              <MdOutlinePageview className="" /> Page Views
            </h1>
            <p className="text-xl my-4">Today</p>
            <div className="flex items-center gap-4 text-xl my-4">
              <p>0</p>
              <p className="flex items-center gap-2 text-green-500">
                <BsGraphUpArrow /> 0.00%
              </p>
            </div>
            <div className="flex items-center gap-4 text-xl my-4">
              <p>Last 7 days</p>
              <p className="flex items-center gap-2 text-green-500">
                <FaArrowAltCircleUp /> 0
              </p>
              <p className="flex items-center gap-2 text-red-500">
                <FaArrowCircleDown /> 0
              </p>
            </div>
          </div>
          <div className=" border border-white shadow-md bg-[#0066FF] text-white  p-4 text-2xl">
            <h1 className="flex items-center gap-2 ">
              <FaSquarePollVertical className="" />
              Reporting
            </h1>

            <div className="flex items-center gap-4 text-xl my-4 justify-between">
              <p>Positive Sentiment </p>
              <p className="flex items-center gap-2 text-green-500">
                0 <BsGraphUpArrow /> 0.00%
              </p>
            </div>
            <div className="flex items-center gap-4 text-xl my-4 justify-between">
              <p>Negative Sentiment </p>
              <p className="flex items-center gap-2 text-red-500">
                0 <BsGraphDownArrow /> 0.00%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportHome;
