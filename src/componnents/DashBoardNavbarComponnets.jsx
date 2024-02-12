import { Link } from "react-router-dom";
import useContexts from "../hooks/useContexts";

const DashBoardNavbarComponnets = () => {
  const { user, handleLogout } = useContexts();

  const handleLogouts = () => {
    handleLogout();
  };
  return (
    <div className="flex">
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt=""
                  src={
                    user?.photoURL
                      ? user?.photoURL
                      : "data:image/png;base64,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"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link
                  to={"/dashboard/create-event"}
                  className="justify-between"
                >
                  My Accounts
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={handleLogouts} className="">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to={"/login"}>
            {" "}
            <button className="btn-nav">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default DashBoardNavbarComponnets;
