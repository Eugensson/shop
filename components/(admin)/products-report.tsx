import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ChartNoAxesCombined } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement
);

interface ProductsReportProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export const ProductsReport = ({ data }: ProductsReportProps) => {
  const productsData = {
    labels: data.map((x: { _id: string }) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: "Category",
        data: data.map((x: { totalProducts: number }) => x.totalProducts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };

  return (
    <Card className="aspect-square">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-x-2">
          <ChartNoAxesCombined size={24} />
          Products Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Doughnut data={productsData} />
      </CardContent>
    </Card>
  );
};
