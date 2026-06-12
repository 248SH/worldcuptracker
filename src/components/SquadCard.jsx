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

const SquadCard = ({ name, fifa_code, group }) => {
    return (
        <Box sx={{
            backgroundColor: 'var(--light-green)',
            color: 'white',
            border: '5px solid white',
            borderRadius: '10px',
            padding: '16px',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        }}>
            <Box mb={1}>
                {getFlag(name)}
            </Box>
            <Typography variant="h6" fontWeight="bold" mb={1}>
                {name}
            </Typography>
            <Typography variant="body2" mb={0.5} sx={{ color: 'var(--light-green)' }}>
                {fifa_code}
            </Typography>
            <Typography variant="body2" mb={0.5}>
                Group {group}
            </Typography>
        </Box>
    )
}

export default SquadCard