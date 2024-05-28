import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import '../css/Progress.css';
import { ExerciseRoutine } from '../models/ExerciseRoutine';
import { getProgressRoutines } from '../api/data';
import { RingLoader } from 'react-spinners'; 

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ProgressRoutines() {
    const [isLoading, setIsLoading] = useState(true);
    const [exerciseRoutines, setExerciseRoutines] = useState<ExerciseRoutine[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProgressRoutines('664fdebd3c39f8df9cbfbc2c');
                setExerciseRoutines(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching progress routines:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
    };

    if (isLoading) {
        return (
            <div className='containerEs'>
                <div className="spinner-container">
                <RingLoader color={'#123abc'} loading={isLoading} /> 
                <p>Cargando</p>
            </div>
            </div>
        );
    }

    const benchPressData = exerciseRoutines.filter(routine => routine.exercise === 'Bench Press');
    const squatData = exerciseRoutines.filter(routine => routine.exercise === 'Squat');
    const deadliftData = exerciseRoutines.filter(routine => routine.exercise === 'Deadlift');

    const data = {
        labels: benchPressData.map(routine => formatDate(routine.date)),
        datasets: [
            {
                label: 'Bench Press (kg)',
                data: benchPressData.map(routine => routine.weight),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
                label: 'Squat (kg)',
                data: squatData.map(routine => routine.weight),
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
            },
            {
                label: 'Deadlift (kg)',
                data: deadliftData.map(routine => routine.weight),
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
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
                text: 'Progreso en Rutinas de Ejercicio',
            },
        },
    };

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
                            <th>Ejercicio</th>
                            <th>Sets</th>
                            <th>Reps</th>
                            <th>Peso (kg)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exerciseRoutines.map((routine, index) => (
                            <tr key={index}>
                                <td>{formatDate(routine.date)}</td>
                                <td>{routine.exercise}</td>
                                <td>{routine.sets}</td>
                                <td>{routine.reps}</td>
                                <td>{routine.weight}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProgressRoutines;

