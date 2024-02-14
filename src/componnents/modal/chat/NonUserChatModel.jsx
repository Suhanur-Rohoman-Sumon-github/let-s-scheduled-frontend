import { useForm } from "react-hook-form";
import MyModal from "../modal";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const NonUserChatModel = ({ isOpen, setIsOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const messageId = uuidv4();
  const onSubmit = async (data) => {
    const subCategory = "unSeen";
    console.log(data);
    const photoUrls = "https://i.ibb.co/NWsYPZM/download.jpg";
    const { userName, userEmail } = data;

    const message = {
      messageId,
      userName,
      userEmail,
      photoUrls,
      subCategory,
    };
    const post = await axios.post(
      "http://localhost:3000/api/v1/message/save-message",
      {
        messages: message,
      }
    );
    localStorage.setItem("user", JSON.stringify({ userEmail }));
    reset();
  };
  return (
    <div>
      <MyModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center text-[#0066FF]">
            Enter Your Details
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="mb-4">
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-[#0066FF]"
                >
                  Your Name
                </label>
                <input
                  {...register("userName", {
                    required: "User Name is required",
                  })}
                  type="text"
                  id="userName"
                  className="input input-bordered w-full "
                />
              </div>
              {errors.userName && (
                <span className="text-red-500 text-sm">
                  {errors.userName.message}
                </span>
              )}
              <div className="mb-4">
                <label
                  htmlFor="userEmail"
                  className="block text-sm font-medium text-[#0066FF] "
                >
                  Your Email
                </label>
                <input
                  {...register("userEmail", {
                    required: "User Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  id="userEmail"
                  className="input input-bordered w-full "
                />
              </div>
              {errors.userEmail && (
                <span className="text-red-500 text-sm">
                  {errors.userEmail.message}
                </span>
              )}
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="submit"
              className="btn-primary w-full"
            >
              Submit
            </button>
          </form>
        </div>
      </MyModal>
    </div>
  );
};

export default NonUserChatModel;
