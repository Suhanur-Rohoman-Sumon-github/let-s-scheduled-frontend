import { Link } from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa";
import DasboardNavbar from "../pages/shered/navbar/DasboardNavbar";
import useAdmin from "../hooks/useAdmin";
import Loading from "../componnents/loading/Loading";
import { MdChat } from "react-icons/md";
import { useEffect, useState } from "react";
import useSingleMessage from "../hooks/useSingleMessage";
import MessageSidebar from "../componnents/AdminMessage/MessageSidebar";
import AdminMainChat from "../componnents/AdminMessage/AdminMainChat";

const SupportLayout = () => {
  // received isAdmin from src/hooks/useAdmin file
  const { isAdmin } = useAdmin();
  // use loading stat to handle smooth facing
  <Loading data={isAdmin} />;

  const [email, setEmail] = useState("");

  const { messages, refetch } = useSingleMessage(email);
  useEffect(() => {
    refetch();
  }, [email, refetch]);
  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content  ">
        <div className="flex items-center justify-between pl-4 pt-2">
          <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden">
            <FaAlignJustify className="text-2xl" />
          </label>

          <div className="lg:ml-auto 2xl:mr-10">
            {/* use DasboardNavbar component to make our code more cleaner */}
            <DasboardNavbar />
          </div>
        </div>
        {/* <div className="w-full"> */}
        <div className="px-2">
          {/* outlet is reeved all the children path have in the /dashboard route  */}
          <AdminMainChat messages={messages} refetch={refetch} />
        </div>
        {/* </div> */}
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu min-h-full bg-base-200 text-base-content">
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-center font-cursive uppercase text-2xl p-4 ">
              <Link to={"/"}>lets schedule</Link>
            </h1>
          </div>
          {isAdmin?.isAdmin && (
            <li>
              <button className="bg-gray-200 rounded-md py-2 px-4 uppercase font-cursive text-2xl w-full flex items-center justify-center gap-2">
                <MdChat></MdChat> Chats
              </button>
            </li>
          )}
          <MessageSidebar refetches={refetch} setEmail={setEmail} />
        </div>
      </div>
    </div>
  );
};

export default SupportLayout;
