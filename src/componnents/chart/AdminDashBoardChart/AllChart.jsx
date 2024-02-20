/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export const UserSignupChart = ({ allUsers }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (allUsers.length === 0) return;

    const userSignups = allUsers.map((user) => user.signupDate);
    const labels = userSignups.map((date) => {
      const d = new Date(date);
      return `${d.getMonth() + 1}/${d.getDate()}`;
    });

    const ctx = chartRef.current.getContext("2d");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "User Signups",
            data: userSignups,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "timeseries",
            time: {
              unit: "day",
            },
          },
        },
      },
    });
  }, [allUsers]);

  return (
    <div>
      <h2>User Signups</h2>
      <canvas ref={chartRef} width={400} height={300}></canvas>
    </div>
  );
};

export const TotalSalesChart = ({ allPayments }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (allPayments.length === 0) return;

    const paymentDates = allPayments.map((payment) => new Date(payment.date));
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;

    const salesByDay = Array.from({ length: 31 }, (_, i) => {
      const day = i + 1;
      const totalSales = allPayments.reduce((total, payment) => {
        const paymentDate = new Date(payment.date);
        if (
          paymentDate.getMonth() + 1 === currentMonth &&
          paymentDate.getDate() === day
        ) {
          return total + payment.amount;
        }
        return total;
      }, 0);
      return totalSales;
    });

    const ctx = chartRef.current.getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: Array.from({ length: 31 }, (_, i) => i + 1),
        datasets: [
          {
            label: "Total Sales",
            data: salesByDay,
            backgroundColor: "#0066FF",
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 1,
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
  }, [allPayments]);

  return (
    <div className="">
      <h2>Total Sales</h2>
      <canvas ref={chartRef} width={400} height={300}></canvas>
    </div>
  );
};

export const LiveOverviewChart = ({
  allVisitors,
  allProUser,
  allEvents,
  allUser,
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && allUser && allVisitors && allProUser && allEvents) {
      const ctx = chartRef.current.getContext("2d");

      // Prepare data for chart

      const visitorCounts = {};
      const proUserCounts = {};
      const eventCounts = {};
      const userCount = {};

      // Get the current date
      const currentDate = new Date();
      // Get the current month and year
      const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
      const currentYear = currentDate.getFullYear();

      // Count messages for each date in the current month
      allUser.forEach((message) => {
        const messageDate = new Date(message.createdAt);
        const messageMonth = messageDate.getMonth() + 1;
        const messageYear = messageDate.getFullYear();

        if (messageMonth === currentMonth && messageYear === currentYear) {
          const messageDay = messageDate.getDate();
          userCount[messageDay] = (userCount[messageDay] || 0) + 1;
        }
      });

      // Count all visitors for each date in the current month
      allVisitors.forEach((visitor) => {
        const visitorDate = new Date(visitor.date);
        const visitorMonth = visitorDate.getMonth() + 1;
        const visitorYear = visitorDate.getFullYear();

        if (visitorMonth === currentMonth && visitorYear === currentYear) {
          const visitorDay = visitorDate.getDate();
          visitorCounts[visitorDay] = (visitorCounts[visitorDay] || 0) + 1;
        }
      });

      // Count all pro users for each date in the current month
      allProUser.forEach((proUser) => {
        const proUserDate = new Date(proUser.createdAt);
        const proUserMonth = proUserDate.getMonth() + 1;
        const proUserYear = proUserDate.getFullYear();

        if (proUserMonth === currentMonth && proUserYear === currentYear) {
          const proUserDay = proUserDate.getDate();
          proUserCounts[proUserDay] = (proUserCounts[proUserDay] || 0) + 1;
        }
      });

      // Count all events for each date in the current month
      allEvents.forEach((event) => {
        const eventDate = new Date(event?.createdAt);
        const eventMonth = eventDate.getMonth() + 1;
        const eventYear = eventDate.getFullYear();

        if (eventMonth === currentMonth && eventYear === currentYear) {
          const eventDay = eventDate.getDate();
          eventCounts[eventDay] = (eventCounts[eventDay] || 0) + 1;
        }
      });

      const chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: Array.from({ length: 31 }, (_, i) => i + 1), // Dates from 1 to 31
          datasets: [
            {
              label: "Message Count",
              data: Array.from({ length: 31 }, (_, i) => userCount[i + 1] || 0),
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Visitor Count",
              data: Array.from(
                { length: 31 },
                (_, i) => visitorCounts[i + 1] || 0
              ),
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Pro User Count",
              data: Array.from(
                { length: 31 },
                (_, i) => proUserCounts[i + 1] || 0
              ),
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Event Count",
              data: Array.from(
                { length: 31 },
                (_, i) => eventCounts[i + 1] || 0
              ),
              borderColor: "rgba(255, 159, 64, 1)",
              borderWidth: 1,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: false,
            },
          },
        },
      });

      // Cleanup function
      return () => {
        chart.destroy(); // Cleanup chart to prevent memory leaks
      };
    }
  }, [allUser, allVisitors, allProUser, allEvents]);

  return (
    <div>
      <div className=" mr-4 ">
        <h2>Website Visitors Chart for Current Month</h2>
        <canvas ref={chartRef} height={400} width={600}></canvas>
      </div>
    </div>
  );
};
