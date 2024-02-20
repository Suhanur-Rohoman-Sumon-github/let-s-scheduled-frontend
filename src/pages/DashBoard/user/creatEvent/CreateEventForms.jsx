import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import useContexts from "../../../../hooks/useContexts";
const CreateEventForms = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, watch, setValue } = useForm();

  // get dynamic eventType from the params
  const { eventType } = useParams();
  const eventTypes = eventType;
  const selectedMethod = watch("method");

  // get user from custom made useContexts() hook
  const { user } = useContexts();
  const email = user?.email;
  const scheduleId = uuidv4();
  const userName = user?.displayName;

  // handle the logic of create new events
  const onSubmit = (data) => {
    const { date, descriptions, duration, eventName, meetLink, method } = data;
    const userEmail = email;
    const events = {
      scheduleId,
      date,
      descriptions,
      duration,
      eventTypes,
      meetLink,
      method,
      userEmail,
      eventName,
      userName,
    };
    axios
      .post(
        "https://lets-sheduleit-backend.vercel.app/api/v1/events/creat-event",
        {
          event: events,
        }
      )
      .then((data) => {
        console.log(data);
        if (data.data.success) {
          navigate("/dashboard");
          toast.success("Schedule added!");
          reset();
        }
      });
  };

  return (
    <div>
      <h1 className="text-third">
        Creat a new <span className="text-[#0069ff]">{eventType}</span> Meet
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-gray-200 p-5 mt-5 rounded-lg"
      >
        <div>
          <label
            className="text-xl font-cursive my-5 block mb-3 text-[#3e5063]"
            htmlFor="eventName"
          >
            Event Name:*
          </label>
          <input
            placeholder="Event Name..."
            required
            className="input block w-full input-bordered"
            id="eventName"
            {...register("eventName")}
          />
        </div>
        <div>
          <label
            className="text-xl font-cursive my-5 block mt-8 mb-3 text-[#3e5063]"
            htmlFor="select method"
          >
            select method:*
          </label>
          <select
            id="duration"
            defaultValue={15}
            className="select select-bordered w-full "
            {...register("method")}
          >
            <option className="flex items-center text-xl" value="">
              slect method
            </option>
            <option className="flex items-center text-xl" value="custom-meet">
              custom meet event
            </option>
            <option className="flex items-center text-xl" value="google-meet">
              Google Meet
            </option>
            <option className="flex items-center text-xl" value="zoom">
              zoom
            </option>
            <option className="flex items-center text-xl" value="In-person">
              In person
            </option>
          </select>
        </div>
        {selectedMethod === "zoom" && (
          <div>
            <label
              className="text-xl font-cursive my-5 block mt-8 mb-3 text-[#3e5063]"
              htmlFor="zoomLink"
            >
              Zoom Link:*
            </label>
            <input
              placeholder="Enter Zoom Link..."
              required
              className="input block w-full input-bordered"
              id="zoomLink"
              {...register("meetLink")}
            />
          </div>
        )}
        {selectedMethod === "custom-meet" && (
          <div>
            <label
              className="text-xl font-cursive my-5 block mt-8 mb-3 text-[#3e5063]"
              htmlFor="zoomLink"
            >
              Room id:*
            </label>
            <input
              placeholder="Enter Room id..."
              required
              className="input block w-full input-bordered"
              id="zoomLink"
              {...register("meetLink")}
            />
          </div>
        )}
        {selectedMethod === "google-meet" && (
          <div>
            <label
              className="text-xl font-cursive my-5 block mt-8 mb-3 text-[#3e5063]"
              htmlFor="googleMeetLink"
            >
              Google Meet Link:*
            </label>
            <input
              placeholder="Enter Google Meet Link..."
              required
              className="input block w-full input-bordered"
              id="googleMeetLink"
              {...register("meetLink")}
            />
          </div>
        )}
        <div>
          <label
            className="text-xl font-cursive my-5 block mt-8 mb-3 text-[#3e5063]"
            htmlFor="descriptions"
          >
            Description:
          </label>
          <textarea
            placeholder="Write your schedule details...."
            id="descriptions"
            className="input block w-full input-bordered min-h-[200px] resize-none"
            {...register("descriptions")}
          ></textarea>
        </div>
        <div>
          <label
            className="text-xl font-cursive my-5 block mt-8 mb-3 text-[#3e5063]"
            htmlFor="duration"
          >
            Duration:*
          </label>
          <select
            id="duration"
            defaultValue={15}
            className="select select-bordered w-full "
            {...register("duration")}
          >
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
            <option value="60">60</option>
          </select>
        </div>
        <div>
          <label
            className="text-xl font-cursive my-5 block mt-8 mb-3 text-[#3e5063]"
            htmlFor="datePicker"
          >
            Select Date:*
          </label>
          <div className="w-full">
            <ReactDatePicker
              id="datePicker"
              selected={watch("date")}
              onChange={(date) => setValue("date", date)}
              dateFormat="dd/MM/yyyy"
              className="input block w-full input-bordered resize-none"
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div></div>
        <button className="btn-event">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEventForms;
