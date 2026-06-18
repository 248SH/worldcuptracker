import MatchesPage from './pages/MatchesPage'
import TeamsPage from './pages/TeamsPage'
import TeamDetailsPage from './pages/TeamDetailsPage'
import GroupStandingsPage from './pages/GroupStandingsPage'
import KnockoutStandingsPage from './pages/KnockoutStandingsPage'
import NavBar from './components/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const theme = createTheme({
  typography: {
    fontFamily: 'DM Sans, sans-serif',
    h1: { fontFamily: 'Oswald, sans-serif', fontWeight: 300, letterSpacing: '0.02em' },
    h2: { fontFamily: 'Oswald, sans-serif', fontWeight: 300, letterSpacing: '0.02em' },
    h3: { fontFamily: 'Oswald, sans-serif', fontWeight: 300, letterSpacing: '0.02em' },
    h4: { fontFamily: 'Bebas Neue, sans-serif', fontWeight: 300 },
    h5: { fontFamily: 'Oswald, sans-serif', fontWeight: 300, letterSpacing: '0.02em' },
    h6: { fontFamily: 'Oswald, sans-serif', fontWeight: 300, letterSpacing: '0.02em' },
  },
  components: {
  MuiTextField: {
  styleOverrides: {
    root: {
      '& .MuiOutlinedInput-root': {
        color: 'white',
        '& fieldset': {
          borderColor: 'white',
        },
        '&:hover fieldset': {
          borderColor: 'var(--light-green)',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white',
        },
      },
      '& .MuiInputBase-input::placeholder': {
        color: 'rgba(255,255,255,0.5)',
        opacity: 1,
      },
    }
  }
},
MuiSelect: {
  styleOverrides: {
    root: {
      color: 'white',
      '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--light-green)' },
      '.MuiSvgIcon-root': { color: 'white' },
    }
  }
},
MuiInputLabel: {
  styleOverrides: {
    root: {
      color: 'white',
      '&.Mui-focused': {
        color: 'white',
      }
    }
  }
},
}
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<MatchesPage />} />
            <Route path='/teams' element={<TeamsPage />} />
            <Route path='/team-details/:id' element={<TeamDetailsPage />} />
            <Route path='/groups' element={<GroupStandingsPage />} />
            <Route path='/standings' element={<KnockoutStandingsPage />} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App