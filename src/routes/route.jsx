import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/home/Home";
import SingIn from "../pages/login_and_sinup/login/SingIn";
import Sinup from "../pages/login_and_sinup/sinup/Sinup";
import Features from "../pages/features/Features";
import DashboardLayouts from "../layouts/DashbordLayouts";
import CreateEvent from "../pages/DashBoard/user/creatEvent/CreatEvent";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ScheduleEvents from "../pages/DashBoard/user/scheduleEvents/ScheduleEvents";
import Bookings from "../pages/home/home/bookings/Bookings";
import Sales from "../componnents/solutionsComponents/sales/Sales";
import Marketing from "../componnents/solutionsComponents/marketing/Marketing";
import Sucsses from "../componnents/solutionsComponents/Sucsses/Sucsses";
import Recruiting from "../componnents/solutionsComponents/recruiting/Recruiting";
import Technology from "../componnents/solutionsComponents/technology/Technology";
import Educations from "../componnents/solutionsComponents/education/Educations";
import ContactUs from "../pages/ContactUs/ContactUs";
import CreateMeet from "../pages/DashBoard/user/creatEvent/CreateEventForms";
import CreatRoom from "../pages/DashBoard/user/creatCustomMeet/CreatRoom";
import EventDtailsLayouts from "../layouts/EventDtailsLayouts";
import ConfirmBooking from "../pages/DashBoard/user/ConfirmBooking/ConfirmBooking";
import BookingDetails from "../pages/DashBoard/user/ConfirmBooking/BookingDetails";
import ScheduleConfirmed from "../pages/DashBoard/user/ConfirmBooking/ScheduleConfirmed";
import PrivateRoute from "./privetRoute/PrivateRoute";
import Overview from "../pages/DashBoard/admin/overview/Overview";
import AllUser from "../pages/DashBoard/admin/allUser/AllUser";
import AllEvents from "../pages/DashBoard/admin/allEvents/AllEvents";
import Payments from "../pages/DashBoard/user/Payment/Payments";
import PymentConfirm from "../pages/DashBoard/user/Payment/PymentConfirm";
import Workflows from "../pages/DashBoard/user/Workflows/Workflows";
import Routing from "../pages/DashBoard/user/Routing/Routing";
import Availability from "../pages/DashBoard/user/Availability/Availability";
import IntegrationsAndApps from "../pages/DashBoard/user/IntegrationsAndApps/IntegrationsAndApps";
import Message from "../pages/DashBoard/admin/messages.jsx/Message";
import SupportLayout from "../layouts/SupportLayout";
import SupportHome from "../pages/Support/SupportHome";
import AdminMainChat from "../componnents/AdminMessage/AdminMainChat";
import SupportChat from "../pages/Support/SupportChat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <SingIn />,
      },
      {
        path: "/sinup",
        element: <Sinup />,
      },
      {
        path: "/features",
        element: <Features></Features>,
      },
      {
        path: "/pricing",
        element: <Bookings></Bookings>,
      },
      {
        path: "/contactUs",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/room/:roomID",
        element: <CreatRoom />,
      },
      {
        path: "/solutions/sales",
        element: <Sales />,
      },
      {
        path: "/solutions/sales",
        element: <Sales />,
      },
      {
        path: "/solutions/marketing",
        element: <Marketing />,
      },
      {
        path: "/solutions/success",
        element: <Sucsses />,
      },
      {
        path: "/solutions/recruiting",
        element: <Recruiting />,
      },
      {
        path: "/solutions/technology",
        element: <Technology />,
      },
      {
        path: "/solutions/education",
        element: <Educations />,
      },
      {
        path: "/payment/:id",
        element: <Payments />,
      },
      {
        path: "/payment-success/:id",
        element: <PymentConfirm />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayouts />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <CreateEvent></CreateEvent>,
      },

      {
        path: "/dashboard/create-event",
        element: <CreateEvent />,
      },
      {
        path: "/dashboard/schedule-event",
        element: <ScheduleEvents></ScheduleEvents>,
      },
      {
        path: "/dashboard/subscription",
        element: <Bookings></Bookings>,
      },
      {
        path: "/dashboard/:eventType",
        element: <CreateMeet></CreateMeet>,
      },
      {
        path: "/dashboard/overview",
        element: <Overview />,
      },
      {
        path: "/dashboard/all-user",
        element: <AllUser />,
      },
      {
        path: "/dashboard/all-events",
        element: <AllEvents />,
      },
      {
        path: "/dashboard/workflows",
        element: <Workflows></Workflows>,
      },
      {
        path: "/dashboard/routing",
        element: <Routing></Routing>,
      },
      {
        path: "/dashboard/availability",
        element: <Availability></Availability>,
      },
      {
        path: "/dashboard/integrations",
        element: <IntegrationsAndApps></IntegrationsAndApps>,
      },
      {
        path: "/dashboard/messages",
        element: <Message />,
      },
    ],
  },
  {
    path: "/support",
    element: (
      <PrivateRoute>
        <SupportLayout></SupportLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/support",
        element: <SupportHome />,
      },
      {
        path: "/support/home",
        element: <SupportHome />,
      },
      {
        path: "/support/chat",
        element: <SupportHome />,
      },
      {
        path: "/support/:subCategory",
        element: <SupportChat />,
      },
    ],
  },

  {
    path: "/confirm-schedule",
    element: <EventDtailsLayouts />,
    children: [
      {
        path: "/confirm-schedule/:id",
        element: <ConfirmBooking />,
      },
      {
        path: "/confirm-schedule/bookingDetails/:id",
        element: <BookingDetails></BookingDetails>,
      },

      {
        path: "/confirm-schedule/bookingConfirmed/:id",
        element: <ScheduleConfirmed />,
      },
    ],
  },
]);

export default router;
