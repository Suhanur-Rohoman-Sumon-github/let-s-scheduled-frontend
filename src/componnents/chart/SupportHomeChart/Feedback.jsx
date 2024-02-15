import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Feedback = () => {
  const chartRef = useRef(null);
  const [feedbackData, setFeedbackData] = useState({
    positive: 14,
    negative: 25,
  });

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Create the chart
    const feedbackChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Positive Sentiment", "Negative Sentiment"],
        datasets: [
          {
            label: "Feedback",
            data: [feedbackData.positive, feedbackData.negative],
            backgroundColor: ["#0b3558", "#0066FF"],
            borderColor: ["#0066FF", "#0b3558"],
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
            text: "Feedback Sentiment Chart",
          },
        },
      },
    });

    return () => {
      feedbackChart.destroy(); // Cleanup chart to prevent memory leaks
    };
  }, [feedbackData]);
  return (
    <div className="w-50%">
      <canvas ref={chartRef} width="400" height="400"></canvas>
    </div>
  );
};

export default Feedback;
