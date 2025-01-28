import { generateRandomColors } from "@/utilities/mixins";
export const columnsChart = {
  series: [
    {
      data: [21, 22, 10, 28, 16, 21, 13, 30],
    },
  ],
  chartOptions: {
    chart: {
      height: 350,
      type: "bar",
      events: {
        // click: function (chart, w, e) {
        //   // console.log(chart, w, e)
        // },
      },
    },
    colors: generateRandomColors(8),
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [
        ["John", "Doe"],
        ["Joe", "Smith"],
        ["Jake", "Williams"],
        "Amber",
        ["Peter", "Brown"],
        ["Mary", "Evans"],
        ["David", "Wilson"],
        ["Lily", "Roberts"],
      ],
      labels: {
        style: {
          colors: generateRandomColors(8),
          fontSize: "12px",
        },
      },
    },
  },
};

export const donutChart = {
  series: [],
  chartOptions: {
    chart: {
      type: "donut",
    },
    labels: [],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  },
};
