import { FC, useMemo } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Visitor {
  gender: 'M' | 'F';
  age: number;
  city: string;
}

interface VisitorDemographicsProps {
  visitors: Visitor[];
  onDemographicClick: (demographic: string) => void;
  selectedDemographic: string | null;
}

const VisitorDemographics: FC<VisitorDemographicsProps> = ({ 
  visitors,
  onDemographicClick,
  selectedDemographic
}) => {
  const demographics = useMemo(() => {
    const genderData = visitors.reduce(
      (acc, visitor) => {
        acc[visitor.gender === 'M' ? 'male' : 'female']++;
        return acc;
      },
      { male: 0, female: 0 }
    );

    const ageGroups = visitors.reduce(
      (acc, visitor) => {
        if (visitor.age < 18) acc['0-17']++;
        else if (visitor.age < 30) acc['18-29']++;
        else if (visitor.age < 50) acc['30-49']++;
        else acc['50+']++;
        return acc;
      },
      { '0-17': 0, '18-29': 0, '30-49': 0, '50+': 0 }
    );

    const cities = visitors.reduce(
      (acc, visitor) => {
        acc[visitor.city] = (acc[visitor.city] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return { genderData, ageGroups, cities };
  }, [visitors]);

  const genderChartData = {
    labels: ['Masculino', 'Feminino'],
    datasets: [
      {
        data: [demographics.genderData.male, demographics.genderData.female],
        backgroundColor: ['rgba(54, 162, 235, 0.8)', 'rgba(255, 99, 132, 0.8)'],
      },
    ],
  };

  const ageChartData = {
    labels: Object.keys(demographics.ageGroups),
    datasets: [
      {
        data: Object.values(demographics.ageGroups),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
      },
    ],
  };

  const cityChartData = {
    labels: Object.keys(demographics.cities),
    datasets: [
      {
        label: 'Visitantes por cidade',
        data: Object.values(demographics.cities),
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
      },
    ],
  };

  const handleChartClick = (chart: string, element: any) => {
    if (!element.length) return;
    
    const index = element[0].index;
    let demographic = '';
    
    switch (chart) {
      case 'gender':
        demographic = `gender-${index === 0 ? 'M' : 'F'}`;
        break;
      case 'city':
        demographic = `city-${cityChartData.labels[index]}`;
        break;
      default:
        return;
    }
    
    onDemographicClick(demographic === selectedDemographic ? null : demographic);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h4 className="text-lg font-medium mb-4">Gênero</h4>
        <div className="h-64">
          <Pie
            data={genderChartData}
            options={{
              onClick: (_, element) => handleChartClick('gender', element),
            }}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h4 className="text-lg font-medium mb-4">Faixa Etária</h4>
        <div className="h-64">
          <Pie data={ageChartData} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h4 className="text-lg font-medium mb-4">Cidades</h4>
        <div className="h-64">
          <Bar
            data={cityChartData}
            options={{
              indexAxis: 'y' as const,
              responsive: true,
              maintainAspectRatio: false,
              onClick: (_, element) => handleChartClick('city', element),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VisitorDemographics;