import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaMinus } from "react-icons/fa";
import { FaHandsClapping } from "react-icons/fa6";
import useContexts from "../../../hooks/useContexts";

const ChatModal = ({ name, isOpen, setIsOpen, children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const email = storedUser?.userEmail;
  const { user } = useContexts();
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto z-50"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transform transition ease-out duration-500"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="transform transition ease-in duration-200"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
          >
            <div className="fixed inset-y-0 right-0 max-w-md w-full flex justify-end mr-8  my-4 px-4">
              <div className="bg-white border border-[#0069ff] w-full max-w-md  rounded-2xl ">
                <div className=" bg-[#0066FF] p-4">
                  <div className="flex justify-end">
                    <button
                      className="p-2 text-white hover:text-gray-700"
                      onClick={closeModal}
                    >
                      <FaMinus />
                    </button>
                  </div>
                  <div className="pl-6">
                    <h1 className="text-white text-4xl flex gap-4 font-bold capitalize">
                      <FaHandsClapping className="text-yellow-500" />
                      {` hi ${
                        user
                          ? user?.displayName.split(" ")[0]
                          : email
                          ? name?.split(" ")[0]
                          : "please let me know who you"
                      } `}
                    </h1>
                    <p className="text-white text-xl ml-14 mt-4">
                      Welcome to Support! team <br /> We’re ready to help you{" "}
                    </p>
                  </div>
                </div>

                <div className=" mt-4">{children}</div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default ChatModal;
