import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { shieldCard } from '../lib/cardStyles'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import useMediaQuery from '@mui/material/useMediaQuery'

    const getLogo = (pos, isMobile) => {
        const lookup = {
            'GK': <SportsHandballIcon sx={{ fontSize: isMobile ? '4rem' : '6rem' }} />,
            'DF': <ShieldOutlinedIcon sx={{ fontSize: isMobile ? '4rem' : '6rem' }} />,
            'MF': <ZoomOutMapIcon sx={{ fontSize: isMobile ? '4rem' : '6rem' }} />,
            'FW': <SportsSoccerIcon sx={{ fontSize: isMobile ? '4rem' : '6rem' }} />
        }
        return lookup[pos] || <PersonOutlineOutlinedIcon sx={{ fontSize: isMobile ? '4rem' : '6rem' }} />
    }

    const getAge = (date_of_birth) => {
        const birthDate = new Date(date_of_birth)
        const ageDifMs = Date.now() - birthDate.getTime()
        const ageDate = new Date(ageDifMs)
        return Math.abs(ageDate.getUTCFullYear() - 1970)
    }

const PlayerCard = ({ name, number, pos, date_of_birth }) => {
        const isMobile = useMediaQuery('(max-width: 600px)')
    return (
        <Box sx={{
            ...shieldCard,
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '15px',
            paddingTop: '0px',
            gap: '8px',
        }}>
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.04) 100%)",
          pointerEvents: "none",
          zIndex: 1,
          borderRadius: '20px 20px 100px 100px',
        },
            }}></Box>
            <Box sx={{marginBottom: '10px'}}>
            {getLogo(pos, isMobile)}
            </Box>
            <Typography variant="h5" component="div" mb={0.5} sx={{ color: 'white' }}>
                #{number}
            </Typography>
            <Typography variant="h4" component="h3" fontWeight="bold" mb={1}>
                {name}
            </Typography>
            <Typography variant="body2" mb={0.5} sx={{ color: 'white' }}>
                {getAge(date_of_birth) ? `Age: ${getAge(date_of_birth)}` : 'Age: N/A'}
            </Typography>
        </Box>
    )
}

export default PlayerCard