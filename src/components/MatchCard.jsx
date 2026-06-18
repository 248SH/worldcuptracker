import teamNameToCountryCode from '../lib/teamNameToCountryCode'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'

const getFlag = (teamName) => {
  const code = teamNameToCountryCode[teamName]
  if (!code) return null
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      alt={teamName}
      style={{ width: '40px', height: '27px' }}
    />
  )
}

const MatchCard = ({ round, date, time, team1, team2, group, ground, score, goals1, goals2 }) => {
  return (
    <Card sx={{
      backgroundColor: 'var(--light-green)',
      color: 'white',
      border: '5px solid white',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
      height: '100%',
    }}>
      <CardContent>

        {/* Round */}
        <Typography variant="h6" align="center" fontWeight="bold" mb={2}>
          {round}
        </Typography>

        {/* Teams and flags */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%' }}>
            {getFlag(team1)}
            <Typography variant="body2" mt={1} align="center">{team1}</Typography>
          </Box>
          <Typography variant="h6" fontWeight="bold">
            {score ? `${score.ft[0]} - ${score.ft[1]}` : 'vs'}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%' }}>
            {getFlag(team2)}
            <Typography variant="body2" mt={1} align="center">{team2}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2, backgroundColor: 'white' }} />

        {/* Details */}
        <Box sx={{ textAlign: 'center', paddingBottom: '8px' }}>
          <Typography variant="body2">{date} at {time}</Typography>
          {group && <Typography variant="body2">{group}</Typography>}
          <Typography variant="body2">{ground}</Typography>
        </Box>

        {/* Goals */}
        {(goals1?.length > 0 || goals2?.length > 0) && (
  <Box mt={1}
  sx={{ backgroundColor: 'var(--dark-black-fade)', padding: '8px', borderRadius: '8px' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ width: '40%', textAlign: 'left' }}>
        {goals1?.map((g, i) => (
          <Typography key={i} variant="body2">⚽ {g.name} {g.minute}'</Typography>
        ))}
      </Box>
      <Box sx={{ width: '40%', textAlign: 'right' }}>
        {goals2?.map((g, i) => (
          <Typography key={i} variant="body2">{g.name} {g.minute}' ⚽</Typography>
        ))}
      </Box>
    </Box>
  </Box>
)}
      </CardContent>
    </Card>
  )
}

export default MatchCard