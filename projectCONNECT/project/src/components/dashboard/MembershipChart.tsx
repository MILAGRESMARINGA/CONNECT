import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MembershipChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Visitantes',
        data: [45, 52, 38, 60, 43],
        backgroundColor: 'rgba(59, 89, 152, 0.6)',
      },
      {
        label: 'Novas Decisões',
        data: [18, 21, 15, 35, 25],
        backgroundColor: 'rgba(212, 175, 55, 0.6)',
      },
      {
        label: 'Batismos',
        data: [8, 12, 9, 15, 10],
        backgroundColor: 'rgba(60, 175, 87, 0.6)',
      },
    ],
  };

  return (
    <div className="h-64">
      <Bar options={options} data={data} />
    </div>
  );
};

export default MembershipChart;