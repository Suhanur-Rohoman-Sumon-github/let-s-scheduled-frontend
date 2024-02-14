import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
const TotalMessage = () => {
  const chartRef = useRef(null);
  const [messagedata, setmessageData] = useState({
    unSeen: 14,
    myOpen: 25,
    solved: 10,
  });

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
            data: [messagedata.unSeen, messagedata.myOpen, messagedata.solved],
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
  }, [messagedata]);
  return (
    <div className="w-[50%] mr-4 border">
      <canvas ref={chartRef} width="400" height="400"></canvas>
    </div>
  );
};

export default TotalMessage;
