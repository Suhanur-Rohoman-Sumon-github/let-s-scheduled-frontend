import { useState } from "react";
import axios from "axios";
import copy from "clipboard-copy";
import { CiSettings } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdContentCopy, MdModeEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useSingleEventData from "../../../../hooks/useSingleEventData";

const BookedMeet = () => {
  const { events, refetch } = useSingleEventData();
  const [copied, setCopied] = useState(false);
  // copy meeting link/id
  const copyToClipboard = (customLink) => {
    copy(customLink)
      .then(() => {
        toast.success("Link copy to the clipboard!");
        setCopied(true);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  // delete an event
  const handleDeleteEvents = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0069ff",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(
            `https://lets-sheduleit-backend.vercel.app/api/v1/events/delete-event?id=${id}`
          );
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // it will handle the redirect when user click vew details button
  const handleRedirect = (id) => {
    const curentUrl = `https://let-s-scheduled-frontend.vercel.app/confirm-schedule/${id}`;

    window.open(curentUrl, "_blank");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-5">
      {/* show all events which already created */}
      {events ? (
        events.map((event) => {
          // this is custom schedule which is creating the user
          const customLink = `https://let-s-scheduled-frontend.vercel.app/confirm-schedule/${event.scheduleId}`;

          return (
            <div
              key={event._id}
              className="lg:w-[320px] 2xl:w-[370px] h-full rounded-md border border-gray-200 border-t-8 border-t-[#912DEF] shadow-xl "
            >
              <div className="px-5 py-3">
                <div className="flex justify-between items-center mb-3">
                  <input
                    type="checkbox"
                    className="checkbox w-4 h-4 rounded-sm"
                  />
                  <div className="dropdown relative">
                    <div
                      className="flex items-center text-xl cursor-pointer"
                      tabIndex={0}
                      role="button"
                    >
                      <CiSettings></CiSettings>
                      <IoMdArrowDropdown></IoMdArrowDropdown>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-md border border-gray-300 w-32 absolute -left-[94px] mt-2"
                    >
                      <li>
                        <span>
                          <MdModeEdit></MdModeEdit>
                          <Link>Edit</Link>
                        </span>
                      </li>
                      <li>
                        <span>
                          <MdDelete></MdDelete>
                          <Link
                            onClick={() =>
                              handleDeleteEvents(event?.scheduleId)
                            }
                          >
                            Delete
                          </Link>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="border-b-2 border-gray-300 pb-3 mb-5">
                  <h1 className="text-lg font-cursive mb-3">
                    {event.eventName}
                  </h1>

                  <p className="text-gray-500 mb-3">{`${event.duration} minute, ${event.eventTypes}`}</p>
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleRedirect(event.scheduleId)}
                  >
                    View booking page
                  </button>
                </div>
                <div className="flex justify-between items-center gap-x-2">
                  <div
                    className="flex justify-center items-center gap-x-1 text-blue-500 cursor-pointer"
                    onClick={() => copyToClipboard(customLink)}
                  >
                    <MdContentCopy></MdContentCopy>
                    <p className="hover:underline">
                      {copied ? "Link Copied!" : "Copy Link"}
                    </p>
                  </div>
                  <button className="px-3 border border-blue-500 rounded-full uppercase text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200">
                    Share
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500 mb-3">loading</p>
      )}
    </div>
  );
};

export default BookedMeet;
