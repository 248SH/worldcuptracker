import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import teamNameToCountryCode from '../lib/teamNameToCountryCode'
import { TableContainer } from '@mui/material'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Paper from '@mui/material/Paper'
import { baseCard } from '../lib/cardStyles'

const getFlag = (teamName) => {
  const code = teamNameToCountryCode[teamName]
  if (!code) return null
  return (
    <img
      src={`https://flagcdn.com/${code}.svg`}
      alt={teamName}
      style={{ width: '40px', height: '25px', objectFit: 'cover', border: '1px solid white', borderRadius: '4px' }}
    />
  )
}

const GroupCard = ({ groupName, teams }) => {
    return (
        <Box sx={{
            padding: 'clamp(16px, 4vw, 80px)',
            marginBottom: '50px',
            ...baseCard,
            }}>
        <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: '16px', color: 'white' }}>
            {groupName}
        </Typography>
        <TableContainer sx={{ overflowX: 'auto' }}>
    <Table sx={{ 
        background: 'rgba(255, 255, 255, 0.1)', 
        border: '1px solid #ccc',
        minWidth: 0,
    }} size="small">
        <TableHead sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)'}}>
          <TableRow sx={{ '& th': { color: 'white', fontWeight: 'bold' } }}>
            <TableCell>Team</TableCell>
            <TableCell align="right">Played</TableCell>
            <TableCell align="right">Won</TableCell>
            <TableCell align="right">Drawn</TableCell>
            <TableCell align="right">Lost</TableCell>
            <TableCell align="right">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {teams.map((team) => (
                <TableRow key={team.name} sx={{ '& th': { color: 'white'} }}>
                    <TableCell component="th" scope="row" sx={{ width: '40%'}}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '25px' }} >
                            {getFlag(team.name)}
                            {team.name}
                        </Box>
                    </TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">{team.played}</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">{team.won}</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">{team.drawn}</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">{team.lost}</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">{team.points}</TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    )
}

export default GroupCard