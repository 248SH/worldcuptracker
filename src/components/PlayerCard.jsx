import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import teamNameToCountryCode from '../lib/teamNameToCountryCode'
import { shieldCard } from '../lib/cardStyles'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import useMediaQuery from '@mui/material/useMediaQuery'

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

    const getLogo = (pos) => {
        const isMobile = useMediaQuery('(max-width: 600px)')
        const lookup = {
            'GK': <SportsHandballIcon sx={{ fontSize: isMobile ? '5rem' : '7rem' }} />,
            'DF': <ShieldOutlinedIcon sx={{ fontSize: isMobile ? '5rem' : '7rem' }} />,
            'MF': <ZoomOutMapIcon sx={{ fontSize: isMobile ? '5rem' : '7rem' }} />,
            'FW': <SportsSoccerIcon sx={{ fontSize: isMobile ? '5rem' : '7rem' }} />
        }
        return lookup[pos] || <PersonOutlineOutlinedIcon sx={{ fontSize: isMobile ? '5rem' : '7rem' }} />
    }

    const getAge = (date_of_birth) => {
        const birthDate = new Date(date_of_birth)
        const ageDifMs = Date.now() - birthDate.getTime()
        const ageDate = new Date(ageDifMs)
        return Math.abs(ageDate.getUTCFullYear() - 1970)
    }

const PlayerCard = ({ name, number, pos, date_of_birth }) => {
    return (
        <Box sx={{
            ...shieldCard,
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '10px',
            gap: '8px',
        }}>
            <Box sx={{marginBottom: '15px'}}>
            {getLogo(pos)}
            </Box>
            <Typography variant="h5" mb={0.5} sx={{ color: 'white' }}>
                #{number}
            </Typography>
            <Typography variant="h4" fontWeight="bold" mb={1}>
                {name}
            </Typography>
            <Typography variant="body2" mb={0.5} sx={{ color: 'white' }}>
                {getAge(date_of_birth) ? `Age: ${getAge(date_of_birth)}` : 'Age: N/A'}
            </Typography>
        </Box>
    )
}

export default PlayerCard