import { FaRegTrashAlt } from "react-icons/fa";
import useAllSchedule from "../../../../hooks/useAllSchedule";
import axios from "axios";
import Swal from "sweetalert2";

const AllEvents = () => {
  // received allEvents data from useAllSchedule hooks
  const { allEvents, refetch } = useAllSchedule();

  // handle delete a event from database
  const handleDelete = async (id) => {
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
          // use refetch to show the current change instantly  withe out page refresh
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
  return (
    <div>
      <div className="">
        <div className="overflow-x-auto">
          <table className="table ">
            {/* head */}
            <thead>
              <tr className="text-2xl text-[#0b3558] ">
                <th>No</th>
                <th>Event Name</th>
                <th>User email</th>
                <th>Schedule Date</th>
                <th>Delete event</th>
              </tr>
            </thead>
            <tbody>
              {allEvents?.map((events, index) => (
                <tr className="text-secondary" key={events._id}>
                  <td>{index + 1}</td>
                  <td>{events.eventName}</td>
                  <td>{events.userEmail}</td>
                  <td>
                    {events.dateAndTime
                      ? events.dateAndTime
                      : "event not booked yet"}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(events.scheduleId)}
                      className={"flex items-center   btn-delete"}
                    >
                      <FaRegTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
