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
import { Bar } from "react-chartjs-2";
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

interface UsersReportProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export const UsersReport = ({ data }: UsersReportProps) => {
  const usersData = {
    labels: data.map((x: { _id: string }) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: "Користувачі",
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        data: data.map((x: { totalUsers: number }) => x.totalUsers),
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-x-2">
          <ChartNoAxesCombined size={24} />
          Звіт по користувачах
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full flex items-center justify-center">
        <Bar data={usersData} />
      </CardContent>
    </Card>
  );
};
