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
import { MdSupervisorAccount } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";

import {
  LiveOverviewChart,
  TotalSalesChart,
} from "../../../../componnents/chart/AdminDashBoardChart/AllChart";
import useAllVistors from "../../../../hooks/useAllVistors";
import {
  useAllTodaysPayments,
  useAllTodaysProUser,
  useAllTodaysSchedule,
  useAllTodaysUsers,
  useAllTodaysVisitors,
} from "../../../../hooks/GettAllTodaysData/GetTodaysData";

const Overview = () => {
  const { allUser } = useAllUsers();
  const { allEvents } = useAllSchedule();
  const { allProUser } = useAllProUser();
  const { allPayments } = useAllPayments();
  const { allVisitors } = useAllVistors();
  const { todaysVisitors } = useAllTodaysVisitors();
  const { todaysAllUsers } = useAllTodaysUsers();
  const { todaysSchedule } = useAllTodaysSchedule();
  const { todaysAllProUser } = useAllTodaysProUser();
  const { todaysAllPayments } = useAllTodaysPayments();

  const totalAmount = allPayments?.reduce(
    (total, item) => total + item.amount,
    0
  );
  const todayPurchase = todaysAllPayments?.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <>
      <div>
        <div className="md:grid grid-cols-5 gap-2  mt-0">
          <div className=" border shadow-md  p-4 text-2xl bg-[#0066FF] text-white">
            <h1 className="flex items-center gap-2 ">
              <MdSupervisorAccount className="" /> visitors
            </h1>
            <p className="text-xl my-4">Today</p>
            <div className="flex items-center gap-4 text-xl my-4">
              <p>{todaysVisitors?.length}</p>
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
              <p>{todaysAllUsers?.length}</p>
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
              <p>{todaysAllProUser?.length}</p>
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
              <p>{todayPurchase}</p>
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
              <p>{todaysSchedule.length}</p>
            </div>
            <div className=" text-xl my-4">
              <p>Total events</p>
              <p className="flex items-center gap-2 text-green-500">
                <FaArrowAltCircleUp /> {allEvents?.length}
              </p>
            </div>
          </div>
        </div>
        <div className=" mt-5 ">
          <div className="grid grid-cols-2">
            <LiveOverviewChart
              allUser={allUser}
              allEvents={allEvents}
              allProUser={allProUser}
              allVisitors={allVisitors}
            />
            <TotalSalesChart allPayments={allPayments} />
          </div>
          <div className="grid grid-cols-2">
            <Feedback />
          </div>
          <div className=" "></div>
        </div>
      </div>
    </>
  );
};

export default Overview;
