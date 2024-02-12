import { Link } from "react-router-dom";
import { VscStarFull } from "react-icons/vsc";
import HomePageDegain from "../../../../componnents/HomePageDegain";
import backgroundImage from "../../../../assets/new-clouds-2.svg";
import HomePageDegainTwo from "../../../../componnents/HomePageDegainTwo";
import useContexts from "../../../../hooks/useContexts";
const Banner = () => {
  const { user } = useContexts();
  // call this function in style property for looking simple. Line No: 19
  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    height: "100%",
    width: "100%",
  };
  return (
    <div
      style={backgroundStyles}
      className="hero md:pt-[200px] pt-[150px] md:w-8/12 mx-auto"
    >
      <div className="hero-content text-center">
        <div className="hidden md:flex">
          <div>
            <VscStarFull className="text-[#0069ff] text-4xl animate-pulse absolute top-96 left-24" />
            <VscStarFull className="text-[#0069ff] text-4xl animate-pulse absolute bottom-24 left-[300px]" />
            <VscStarFull className="text-[#0069ff] text-4xl animate-pulse absolute top-24 left-80" />

            <VscStarFull className="text-[#0069ff] text-4xl animate-pulse absolute top-24 right-[300px]" />
            <VscStarFull className="text-[#0069ff] text-4xl animate-pulse absolute bottom-28 right-[300px]" />
            <VscStarFull className="text-[#0069ff] text-4xl animate-pulse absolute bottom-72 right-[100px]" />
          </div>
          <div className="animate-pulse absolute bottom-44 2xl:bottom-14 2xl:[100px] xl:bottom-14 xl:[100px] lg:block hidden left-[100px]">
            <HomePageDegain />
          </div>
          <div className="animate-pulse absolute bottom-40 2xl:bottom-14 xl:right-[10px] xl:bottom-14 2xl:right-[50px] lg:right-[10px] lg:top-[400px]  lg:block hidden right-[150px]">
            <HomePageDegainTwo />
          </div>
        </div>
        <div className="text-left md:text-center">
          {!user && (
            <h1 className="text-primary">
              Transforming Your Calendar into a{" "}
              <span className="text-[#0069ff] pt-2 ">Masterpiece</span>
            </h1>
          )}
          {user && (
            <h1 className="text-primary capitalize">
              Welcome back ,
              <span className="text-[#0069ff] pt-2 ml-4">
                {user?.displayName.split(" ")[0]}
              </span>
            </h1>
          )}
          <p className="py-8 text-secondary ">
            Welcome to the future of event scheduling. Dive into a curated
            selection of experiences, tailor your social calendar, and make
            every moment extraordinary. Ready to redefine the way you celebrate?
          </p>
          <div className="flex items-center justify-center">
            {/* if user is not exists/login, then this button will show */}
            {!user && (
              <Link to={"/sinup"}>
                <button className=" btn-primary">
                  Get started with free now
                </button>
              </Link>
            )}
          </div>
          {/* if user is exists/login, then this button will show */}
          {user && (
            <Link to={"/dashboard"}>
              <button className=" btn-primary">my account</button>
            </Link>
          )}
          {/* if user is exists/login, then this button will show */}
          {user && (
            <Link to={"/dashboard"}>
              <button className=" btn-fetures ml-4">
                create new event type
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
