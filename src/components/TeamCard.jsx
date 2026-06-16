import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import teamNameToCountryCode from '../lib/teamNameToCountryCode'
import useMediaQuery from '@mui/material/useMediaQuery'
import teamColours from '../lib/teamColours'

const getFlagUrl = (teamName) => {
    const code = teamNameToCountryCode[teamName]
    if (!code) return null
    return `https://flagcdn.com/${code}.svg`
}

const TeamCard = ({ name, fifa_code, group, confed }) => {
    const colours = teamColours[name] || { primary: 'var(--dark-green)', secondary: 'white' }

    return (
        <Box mb={4} sx={{ marginBottom: '24px', backgroundColor: `rgba(10, 10, 10, 0.5)`,
                   border: '7px solid rgba(255, 255, 255, 0.8)',
                   borderRadius: '10px 10px 50px 50px',
                   display: 'flex', height: '25vw',
                   flexDirection: 'column',
                   width: 'clamp(280px, 45vw, 350px)',
                   height: 'clamp(300px, 40vw, 450px)',
                   transform: 'scale(0.95)',
                   boxShadow: '5px 4px 8px rgba(0, 0, 0, 0.5)',
                   transition: 'border-color 0.3s ease, transform 0.3s ease',
                    '&:hover': {
                                 borderColor: colours.primary === '#FFFFFF' ? colours.secondary : colours.primary,
                                 transform: 'scale(1)',
                                 boxShadow: '10px 10px 50px rgba(0, 0, 0, 0.5)',
                    }
                }}>
            <Box sx={{ padding: '16px', height: '50%' }}>
            <Typography 
                variant="h2" 
                fontWeight="bold"
                sx={{ 
                    textAlign: 'left',
                    color: colours.primary === '#000000' ? colours.secondary : colours.primary,
                    fontSize: 'clamp(2.5rem, 5vw, 3rem)',
                    lineHeight: 0.8,
                    fontFamily: "Bebas Neue, sans-serif",
                }}
>
    {name}
</Typography>
            <Typography variant="h6" mb={0.5} sx={{ color: 'white' }}>
                Group {group}
            </Typography>
            <Typography variant="h6" mb={0.5} sx={{ color: 'white' }}>
                {confed}
            </Typography>
            </Box>
            <Box sx={{height: '50%', marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '0 0 43px 43px', overflow: 'hidden' }}>
                <img src={getFlagUrl(name)} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
        </Box>
    )
}

export default TeamCard