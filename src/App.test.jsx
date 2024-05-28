import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from './components/Register';
import * as authApi from './api/auth';
import App from './App';
import * as dataApi from './api/data';
import ProgressRoutines from './components/progressRoutines';

test('renderizar el enlace "Registrarme"', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText('Registrarme')).toBeInTheDocument();
});

test('Verificar envío del formulario', async () => {
  const mockResponse = {
    id: '123',
    username: 'John',
    phone: '1234567890',
    email: 'john@example.com',
    createAt: '2021-05-24',
    UpdateAt: '2021-05-24',
  };

  // Mockear registerUser
  vi.spyOn(authApi, 'registerUser').mockResolvedValue(mockResponse);

  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  // Simula el llenado del formulario
  fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'John' } });
  fireEvent.change(screen.getByPlaceholderText('Número de Teléfono'), { target: { value: '1234567890' } });
  fireEvent.change(screen.getByPlaceholderText('Correo'), { target: { value: 'john@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'password123' } });

  // Simula el envío del formulario
  fireEvent.submit(screen.getByRole('button', { name: /registrate aquí/i }));

  // Espera a que se complete la llamada asincrónica del envío del formulario y que aparezca el mensaje de éxito
  await waitFor(() => {
    expect(screen.getByText('¡Registrado correctamente!.')).toBeInTheDocument();
  });
});

test('Verificar obtención de datos', async () => {
  const mockData = [
    { date: '2023-05-01', exercise: 'Bench Press', sets: 3, reps: 10, weight: 80 },
    { date: '2023-05-02', exercise: 'Squat', sets: 3, reps: 10, weight: 100 },
    { date: '2023-05-03', exercise: 'Deadlift', sets: 3, reps: 10, weight: 120 },
  ];

  // Mockear getProgressRoutines
  vi.spyOn(dataApi, 'getProgressRoutines').mockResolvedValue(mockData);

  render(
    <MemoryRouter>
      <ProgressRoutines />
    </MemoryRouter>
  );
  // Verificar que se muestra el indicador de carga
  expect(screen.getByText('Cargando')).toBeInTheDocument();

  // Esperar a que los datos se carguen y verificar que la gráfica y la tabla se renderizan
  await waitFor(() => {
    // Verificar que la grafica se renderizo
    const canvas = screen.getByRole('img');
    expect(canvas).toBeInTheDocument();

    // Verificar que los datos de la tabla se han renderizado
    expect(screen.getByText('Bench Press')).toBeInTheDocument();
    expect(screen.getByText('Squat')).toBeInTheDocument();
    expect(screen.getByText('Deadlift')).toBeInTheDocument();
  });
});
