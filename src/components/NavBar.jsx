import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const NavBar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'var(--dark-blue)' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h4" fontWeight="bold">
                    World Cup 2026
                </Typography>
                <div>
                    <Button color="inherit" component={Link} to="/">Matchday List</Button>
                    <Button color="inherit" component={Link} to="/teams">Teams</Button>
                    <Button color="inherit" component={Link} to="/groups">Group Standings</Button>
                    <Button color="inherit" component={Link} to="/standings">Knockout Stages</Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar