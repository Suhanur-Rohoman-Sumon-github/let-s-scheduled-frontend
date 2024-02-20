import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import {
  useMyOpenes,
  useSolvedes,
  useUnseens,
} from "../../../utils/CatagoryData";
const TotalMessage = () => {
  const [unSeenmessagedata, setunSeenmessagedata] = useState();
  const [myOpenmessagedata, setmyOpenmessagedata] = useState();
  const [solvedmessagedata, setsolvedmessagedata] = useState();
  const { unSeen, unSeenRefetch } = useUnseens();
  const { myOpen, myOpenRefetch } = useMyOpenes();
  const { solved, solvedRefetch } = useSolvedes();
  useEffect(() => {
    unSeenRefetch(), myOpenRefetch(), solvedRefetch();
    setunSeenmessagedata(unSeen),
      setmyOpenmessagedata(myOpen),
      setsolvedmessagedata(solved);
  }, [
    unSeen,
    myOpen,
    solved,
    unSeenRefetch,
    myOpenRefetch,
    solvedRefetch,
    setunSeenmessagedata,
    setmyOpenmessagedata,
    setsolvedmessagedata,
  ]);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Create the chart
    const messageChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["unSeen", "myOpen", "solved"],
        datasets: [
          {
            label: "messages",
            data: [
              unSeenmessagedata?.length,
              myOpenmessagedata?.length,
              solvedmessagedata?.length,
            ],
            backgroundColor: ["rgba(75, 192, 192, 1)", "#0066FF", "#0b3558"],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(255, 99, 132, 1)",
              "#0066FF",
            ],
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "message data",
          },
        },
      },
    });

    return () => {
      messageChart.destroy(); // Cleanup chart to prevent memory leaks
    };
  }, [solvedmessagedata, myOpenmessagedata, unSeenmessagedata]);
  return (
    <div className="">
      <canvas ref={chartRef} width="400" height="400"></canvas>
    </div>
  );
};

export default TotalMessage;
