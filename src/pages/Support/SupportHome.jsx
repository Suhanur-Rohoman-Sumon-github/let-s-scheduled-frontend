import { MdSupervisorAccount } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { BsGraphDownArrow } from "react-icons/bs";
import { FaArrowAltCircleUp } from "react-icons/fa";

import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

import { FaSquarePollVertical } from "react-icons/fa6";
import LiveVisitorChart from "../../componnents/chart/SupportHomeChart/LiveVisitorChart";
import Feedback from "../../componnents/chart/SupportHomeChart/Feedback";
import TotalMessage from "../../componnents/chart/SupportHomeChart/TotalMessage";
import { useEffect } from "react";
import useAllMessages from "../../hooks/useAllMessages";
import useAllVistors from "../../hooks/useAllVistors";
import {
  useAllTodaysVisitors,
  useMyOpenes,
  useSolvedes,
  useUnseens,
} from "../../hooks/GettAllTodaysData/GetTodaysData";

const SupportHome = () => {
  const { unSeen, unSeenRefetch } = useUnseens();
  const { myOpen, myOpenRefetch } = useMyOpenes();
  const { solved, solvedRefetch } = useSolvedes();
  useEffect(() => {
    unSeenRefetch();
    myOpenRefetch();
    solvedRefetch();
  }, [unSeenRefetch, myOpenRefetch, solvedRefetch]);
  const { allMessage } = useAllMessages();
  const { allVisitors } = useAllVistors();
  const { todaysVisitors } = useAllTodaysVisitors();

  return (
    <div>
      <div className=" ">
        <div className=" grid grid-cols-3 gap-4 max-h-44  mt-0">
          <div className=" border shadow-md  p-4 text-2xl bg-[#0066FF] text-white">
            <h1 className="flex items-center gap-2 ">
              <MdSupervisorAccount className="" /> visitors
            </h1>
            <p className="text-xl my-4">Today</p>
            <div className="flex items-center gap-4 text-xl my-4">
              <p>{todaysVisitors.length}</p>
            </div>
            <div className="flex items-center gap-4 text-xl my-4">
              <p>Total visitors</p>
              <p className="flex items-center gap-2 text-green-500">
                <FaArrowAltCircleUp /> {allVisitors.length}
              </p>
            </div>
          </div>
          <div className=" border shadow-md  p-4 bg-[#0066FF] text-white">
            <h1 className="flex items-center gap-2 text-2xl">
              <HiOutlineChatBubbleOvalLeftEllipsis className="" /> chats
            </h1>

            <div className="items-center gap-4 text-xl my-4">
              <div className="flex gap-4 justify-between">
                <div>
                  <p>Answered</p>
                  <p className="flex items-center gap-2 text-green-500">
                    {myOpen?.length}
                  </p>
                  <div className="mt-4">
                    <p>Missed</p>
                    <p className="flex items-center gap-2 text-red-500">
                      {unSeen?.length}
                    </p>
                  </div>
                </div>

                <div>
                  <p>solved</p>
                  <p className="flex items-center gap-2 text-green-500">
                    {solved?.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xl my-8">
              <p>Total Message</p>
              <p className="flex items-center gap-2 text-green-500">
                <FaArrowAltCircleUp /> {allMessage?.data?.length}
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
            </div>
            <div className="flex items-center gap-4 text-xl my-4 justify-between">
              <p>Negative Sentiment </p>
            </div>
          </div>
        </div>
        <div className="mt-32 mr-4  ">
          <div className=" grid grid-cols-2 ">
            <LiveVisitorChart
              messageData={allMessage}
              allVisitors={allVisitors}
            />
            <TotalMessage />
          </div>
          <div className=" flex items-center mt-8">
            <Feedback />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportHome;
