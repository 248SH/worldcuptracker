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

const getFlag = (teamName) => {
    const code = teamNameToCountryCode[teamName]
    if (!code) return null
    return (
        <img
            src={`https://flagcdn.com/w40/${code}.png`}
            alt={teamName}
            style={{ width: '30px', height: '20px', objectFit: 'cover' }}
        />
    )
}

const GroupCard = ({ groupName, teams }) => {
    return (
        <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
        <Typography variant="h6" fontWeight="bold" mb={1}>
            {groupName}
        </Typography>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
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
                <TableRow key={team.name}>
                    <TableCell component="th" scope="row" sx={{ width: '40%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {getFlag(team.name)}
                            {team.name}
                        </Box>
                    </TableCell>
                    <TableCell align="right">{team.played}</TableCell>
                    <TableCell align="right">{team.won}</TableCell>
                    <TableCell align="right">{team.drawn}</TableCell>
                    <TableCell align="right">{team.lost}</TableCell>
                    <TableCell align="right">{team.points}</TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    )
}

export default GroupCard