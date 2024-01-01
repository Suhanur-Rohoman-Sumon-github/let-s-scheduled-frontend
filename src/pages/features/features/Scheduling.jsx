const Scheduling = () => {
  const schedulingWorkflows = [
    {
      img: "https://www.appointlet.com/wp-content/uploads/2022/06/share-network.svg",
      heading: "Share your meeting availability with a single link",
      para: "Generate a link to your scheduling page and share it with people via email, sms, and more",
    },
    {
      img: "https://www.appointlet.com/wp-content/uploads/2022/06/cursor.svg",
      heading: "Manage your existing meetings",
      para: "Review scheduled meetings, take internal notes, and filter through your booking records",
    },
    {
      img: "https://www.appointlet.com/wp-content/uploads/2022/06/clock-counter-clockwise.svg",
      heading: "Cancellation and rescheduling",
      para: "Change your meeting plans with the click of a button and we'll make sure your attendees are notified by email",
    },
    {
      img: "https://www.appointlet.com/wp-content/uploads/2022/06/desktop.svg",
      heading: "Add a scheduling page to your website",
      para: "Use a code snippet generated by Appointlet to embed your scheduling page on any website",
    },
  ];

  return (
    <div className=" bg-gray-50">
      <div className="lg:w-[70%] px-5 lg:px-0 mx-auto py-24">
      <h1 className="text-primary font-cursive text-center tracking-tighter mb-24 ">Streamline your scheduling workflow</h1>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-x-10">
        <img
          src="https://www.appointlet.com/wp-content/uploads/2022/06/section-visual-8-768x749-1.png"
          className="lg:h-[424px] lg:w-[413px]"
          alt=""
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {schedulingWorkflows.map((schedulingWorkflow) => (
            <div key={schedulingWorkflow.heading} className="flex gap-x-5">
              <img src={schedulingWorkflow.img} className="w-[48px] h-[48px] mt-2" alt="" />
              <div>
                <h5 className="text-2xl font-cursive tracking-tighter mb-3">{schedulingWorkflow.heading}</h5>
                <p className="font-cursive text-gray-500 text-lg">{schedulingWorkflow.para}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Scheduling;