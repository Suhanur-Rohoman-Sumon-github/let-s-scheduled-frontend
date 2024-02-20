import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

const LiveVisitorChart = ({ messageData, allVisitors }) => {
  const chartRef = useRef(null);
  console.log(allVisitors);

  useEffect(() => {
    if (chartRef && chartRef.current && messageData && allVisitors) {
      const ctx = chartRef.current.getContext("2d");

      // Prepare data for chart
      const messageCounts = {};
      const visitorCounts = {};

      // Get the current date
      const currentDate = new Date();

      // Get the current month and year
      const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
      const currentYear = currentDate.getFullYear();

      // Count messages for each date in the current month
      messageData?.data?.forEach((message) => {
        const messageDate = new Date(message.date);
        const messageMonth = messageDate.getMonth() + 1;
        const messageYear = messageDate.getFullYear();

        if (messageMonth === currentMonth && messageYear === currentYear) {
          const messageDay = messageDate.getDate();
          messageCounts[messageDay] = (messageCounts[messageDay] || 0) + 1;
        }
      });

      // Count all visitors for each date in the current month
      allVisitors?.forEach((visitor) => {
        const visitorDate = new Date(visitor.date);
        const visitorMonth = visitorDate.getMonth() + 1;
        const visitorYear = visitorDate.getFullYear();

        if (visitorMonth === currentMonth && visitorYear === currentYear) {
          const visitorDay = visitorDate.getDate();
          visitorCounts[visitorDay] = (visitorCounts[visitorDay] || 0) + 1;
        }
      });

      const chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: Array.from({ length: 31 }, (_, i) => i + 1), // Dates from 1 to 31
          datasets: [
            {
              label: "Message Count",
              data: Array.from(
                { length: 31 },
                (_, i) => messageCounts[i + 1] || 0
              ), // Message counts for each date
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Visitor Count",
              data: Array.from(
                { length: 31 },
                (_, i) => visitorCounts[i + 1] || 0
              ), // Visitor counts for each date
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              fill: false,
            },
          ],
        },
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
        chart.destroy(); // Cleanup chart to prevent memory leaks
      };
    }
  }, [messageData, allVisitors]);

  return (
    <div>
      <div className="mr-4">
        <h2>Message and Visitor Counts by Day</h2>
        <canvas ref={chartRef} height={400} width={600}></canvas>
      </div>
    </div>
  );
};

export default LiveVisitorChart;
