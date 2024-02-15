import useAllUsers from "../../../../hooks/useAllUsers";
import useAllSchedule from "../../../../hooks/useAllSchedule";
import {
  FaArrowAltCircleUp,
  FaCalendarAlt,
  FaChessKing,
  FaMoneyCheckAlt,
  FaUsers,
} from "react-icons/fa";
import useAllProUser from "../../../../hooks/useAllProUser";
import useAllPayments from "../../../../hooks/useAllPayments";

import Feedback from "../../../../componnents/chart/SupportHomeChart/Feedback";
import TotalMessage from "../../../../componnents/chart/SupportHomeChart/TotalMessage";
import { MdSupervisorAccount } from "react-icons/md";
import { BsGraphUpArrow, BsChatRightDots } from "react-icons/bs";

import {
  LiveOverviewChart,
  TotalSalesChart,
} from "../../../../componnents/chart/AdminDashBoardChart/AllChart";
import useAllMessages from "../../../../hooks/useAllMessages";
import useAllVistors from "../../../../hooks/useAllVistors";

const Overview = () => {
  const { allUser } = useAllUsers();
  const { allEvents } = useAllSchedule();
  const { allProUser } = useAllProUser();
  const { allPayments } = useAllPayments();
  const { allMessage } = useAllMessages();
  const { allVisitors } = useAllVistors();

  const totalAmount = allPayments?.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <>
      <div>
        <div className="md:grid grid-cols-6 gap-2  mt-0">
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
            <div className=" text-xl my-4">
              <p>Total visitor</p>
              <p className="flex items-center gap-2 text-green-500">
                <FaArrowAltCircleUp />
                {allVisitors?.length}
              </p>
            </div>
          </div>

          <div className=" border shadow-md  p-4 text-2xl bg-[#0066FF] text-white">
            <h1 className="flex items-center gap-2 ">
              <FaUsers className="" /> users
            </h1>
            <p className="text-xl my-4">Today</p>
            <div className="flex items-center gap-4 text-xl my-4">
              <p>0</p>
              <p className="flex items-center gap-2 text-green-500">
                <BsGraphUpArrow /> 0.00%
              </p>
            </div>
            <div className=" text-xl my-4">
              <p>Total users</p>
              <p className="flex items-center gap-2 text-green-500">
                <FaArrowAltCircleUp /> {allUser?.length}
              </p>
            </div>
          </div>
          <div className=" border shadow-md  p-4 text-2xl bg-[#0066FF] text-white">
            <h1 className="flex items-center gap-2 ">
              <FaChessKing className="" /> pro users
            </h1>
            <p className="text-xl my-4">Today</p>
            <div className="flex items-center gap-4 text-xl my-4">
              <p>0</p>
              <p className="flex items-center gap-2 text-green-500">
                <BsGraphUpArrow /> 0.00%
              </p>
            </div>
            <div className=" text-xl my-4">
              <p>Total pro users</p>
              <p className="flex items-center gap-2 text-green-500">
                <FaArrowAltCircleUp /> {allProUser?.length}
              </p>
            </div>
          </div>
          <div className=" border shadow-md  p-4 text-2xl bg-[#0066FF] text-white">
            <h1 className="flex items-center gap-2 ">
              <FaMoneyCheckAlt className="" /> purchase
            </h1>
            <p className="text-xl my-4">Today</p>
            <div className="flex items-center gap-4 text-xl my-4">
              <p>0</p>
              <p className="flex items-center gap-2 text-green-500">
                <BsGraphUpArrow /> 0.00%
              </p>
            </div>
            <div className=" text-xl my-4">
              <p>Total purchase</p>
              <p className="flex items-center gap-2 text-green-500">
                <FaArrowAltCircleUp /> {`${totalAmount} $`}
              </p>
            </div>
          </div>
          <div className=" border shadow-md  p-4 text-2xl bg-[#0066FF] text-white">
            <h1 className="flex items-center gap-2 ">
              <FaCalendarAlt className="" /> events
            </h1>
            <p className="text-xl my-4">Today</p>
            <div className="flex items-center gap-4 text-xl my-4">
              <p>0</p>
              <p className="flex items-center gap-2 text-green-500">
                <BsGraphUpArrow /> 0.00%
              </p>
            </div>
            <div className=" text-xl my-4">
              <p>Total events</p>
              <p className="flex items-center gap-2 text-green-500">
                <FaArrowAltCircleUp /> {allEvents?.length}
              </p>
            </div>
          </div>
          <div className=" border shadow-md  p-4 text-2xl bg-[#0066FF] text-white">
            <h1 className="flex items-center gap-2 ">
              <BsChatRightDots className="" /> messages
            </h1>
            <p className="text-xl my-4">Today</p>
            <div className="flex items-center gap-4 text-xl my-4">
              <p>0</p>
              <p className="flex items-center gap-2 text-green-500">
                <BsGraphUpArrow /> 0.00%
              </p>
            </div>
            <div className=" text-xl my-4">
              <p>Total messages</p>
              <p className="flex items-center gap-2 text-green-500">
                <FaArrowAltCircleUp />
                {allMessage?.data?.length}
              </p>
            </div>
          </div>
        </div>
        <div className=" mt-5 ">
          <div className="grid grid-cols-2">
            <LiveOverviewChart />
            <TotalSalesChart allPayments={allPayments} />
          </div>
          <div className="grid grid-cols-2">
            <Feedback />
            <TotalMessage />
          </div>
          <div className=" "></div>
        </div>
      </div>
    </>
  );
};

export default Overview;
