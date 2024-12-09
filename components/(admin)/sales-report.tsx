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
import { Line } from "react-chartjs-2";
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

interface SalesReportProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export const SalesReport = ({ data }: SalesReportProps) => {
  const salesData = {
    labels: data.map((x: { _id: string }) => x._id),
    datasets: [
      {
        fill: true,
        label: "Продажі",
        data: data.map((x: { totalSales: number }) => x.totalSales),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-x-2">
          <ChartNoAxesCombined size={24} />
          Звіт з продаж
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Line data={salesData} />
      </CardContent>
    </Card>
  );
};
