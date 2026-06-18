import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import teamNameToCountryCode from '../lib/teamNameToCountryCode'

const getFlag = (teamName) => {
    const code = teamNameToCountryCode[teamName]
    if (!code) return null
    return (
        <img
            src={`https://flagcdn.com/w40/${code}.png`}
            alt={teamName}
            style={{ width: '60px', height: '40px', objectFit: 'cover' }}
        />
    )
}

const getPosition = (pos) => {
    const lookup = {
        'GK': 'Goalkeeper',
        'DF': 'Defender',
        'MF': 'Midfielder',
        'FW': 'Forward'
    }
    return lookup[pos] || pos
    }

const PlayerCard = ({ name, number, pos, date_of_birth }) => {
    return (
        <Box sx={{
            backgroundColor: 'var(--light-green)',
            color: 'white',
            border: '5px solid white',
            borderRadius: '10px',
            padding: '16px',
            width: '20vw',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        }}>
            <Box mb={1}>
                {getFlag(name)}
            </Box>
            <Typography variant="h6" fontWeight="bold" mb={1}>
                {name}
            </Typography>
            <Typography variant="body2" mb={0.5} sx={{ color: 'white' }}>
                #{number} - {getPosition(pos)}
            </Typography>
            <Typography variant="body2" mb={0.5} sx={{ color: 'white' }}>
                Born: {date_of_birth}
            </Typography>
        </Box>
    )
}

export default PlayerCard