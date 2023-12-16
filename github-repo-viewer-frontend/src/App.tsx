import './App.css';
import NavBar from './components/NavBar';
import { Container } from '@mui/material';
import DashBoard from './pages/dashborad';

function App() {
  return (
    <Container className="mx-auto max-w-7xl">
      <NavBar></NavBar>
      <DashBoard></DashBoard>
    </Container>
  );
}


export default App;
