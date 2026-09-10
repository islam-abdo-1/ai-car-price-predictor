import { AppRoutes } from './routes';
import { FormProvider } from './context/FormContext';

function App() {
  return (
    <FormProvider>
      <AppRoutes />
    </FormProvider>
  );
}

export default App;