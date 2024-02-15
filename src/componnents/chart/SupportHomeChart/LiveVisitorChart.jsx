import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

const LiveVisitorChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Sample data (replace this with your actual data)
    const visitorsData = {
      labels: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
      ],
      datasets: [
        {
          label: "Pageviews",
          data: [
            50, 60, 70, 65, 75, 80, 90, 85, 95, 100, 120, 110, 105, 115, 130,
            125, 135, 140, 150, 155, 160, 165, 170, 180, 175, 185, 190, 200,
            195, 205, 210,
          ],
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          fill: false,
        },
        {
          label: "Visitors",
          data: [
            30, 40, 50, 45, 55, 60, 70, 65, 75, 80, 100, 90, 85, 95, 110, 105,
            115, 120, 130, 135, 140, 145, 150, 160, 155, 165, 170, 175, 180,
            190, 185,
          ],
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          fill: false,
        },
        {
          label: "Chats",
          data: [
            20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
            105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165,
            170,
          ],
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          fill: false,
        },
      ],
    };

    // Create the chart
    const visitorChart = new Chart(ctx, {
      type: "line",
      data: visitorsData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup function
    return () => {
      visitorChart.destroy(); // Cleanup chart to prevent memory leaks
    };
  }, []);

  return (
    <div>
      <div className=" mr-4 ">
        <h2>Website Visitors Chart for Current Month</h2>
        <canvas ref={chartRef} height={400} width={600}></canvas>
      </div>
    </div>
  );
};

export default LiveVisitorChart;
