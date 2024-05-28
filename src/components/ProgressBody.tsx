import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import '../css/Progress.css';
import { getProgressBody } from '../api/data';
import { BodyMeasurement } from '../models/BodyMeasurement';
import { RingLoader } from 'react-spinners'; 

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ProgressBody() {
    const [isLoading, setIsLoading] = useState(true);
    const [bodyMeasurements, setBodyMeasurements] = useState<BodyMeasurement[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProgressBody('664fdebd3c39f8df9cbfbc2c');
                setBodyMeasurements(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching progress body measurements:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []); 

    const data = {
        labels: bodyMeasurements.map(measurement => {
            const date = new Date(measurement.date);
            return date.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
        }),
        datasets: [
            {
                label: 'Peso (kg)',
                data: bodyMeasurements.map(measurement => measurement.weight),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
                label: 'Pecho (cm)',
                data: bodyMeasurements.map(measurement => measurement.chest),
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
            },
            {
                label: 'Cintura (cm)',
                data: bodyMeasurements.map(measurement => measurement.waist),
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
            },
            {
                label: 'Caderas (cm)',
                data: bodyMeasurements.map(measurement => measurement.hips),
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },
            {
                label: 'Muslo (cm)',
                data: bodyMeasurements.map(measurement => measurement.thigh),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
                text: 'Progreso de Medidas Corporales',
            },
        },
    };

    if (isLoading) {
        return (
            <div className="container">
                <div className="spinner-container">
                    <RingLoader color={'#123abc'} loading={isLoading} /> 
                    <p>Cargando</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="chart">
                <h3>Gráfica</h3>
                <Line data={data} options={options} />
            </div>
            <div className="table">
                <h3>Historial</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Peso (kg)</th>
                            <th>Pecho (cm)</th>
                            <th>Cintura (cm)</th>
                            <th>Caderas (cm)</th>
                            <th>Muslo (cm)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bodyMeasurements.map((measurement, index) => (
                            <tr key={index}>
                                <td>{new Date(measurement.date).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                                <td>{measurement.weight}</td>
                                <td>{measurement.chest}</td>
                                <td>{measurement.waist}</td>
                                <td>{measurement.hips}</td>
                                <td>{measurement.thigh}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProgressBody;
