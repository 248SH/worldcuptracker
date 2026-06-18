import { Box } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import teamNameToCountryCode from "../lib/teamNameToCountryCode"

const getFlagUrl = (teamName) => {
  const code = teamNameToCountryCode[teamName]
  if (!code) return null
  return `https://flagcdn.com/${code}.svg`
}

const buildFlagArray = (teams) => {
    return teams.map(team => {
        const flagUrl = getFlagUrl(team)
        return { team, flagUrl }
    })
}

const FlagBar = () => {
    const teamNames = Object.keys(teamNameToCountryCode)
    const flagData = buildFlagArray(teamNames)

    return (
        <Box sx={{ 
            overflow: 'hidden', 
            width: '100%',
            paddingTop: '5px',
            marginBottom: '10px',
        }}>
            <Box sx={{
                display: 'flex',
                width: 'max-content',
                animation: 'scroll-flags 120s linear infinite',
                '@keyframes scroll-flags': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            }}>
                {[...flagData, ...flagData].map((flag, i) => (
                    <img 
                        key={`${flag.team}-${i}`} 
                        src={flag.flagUrl} 
                        alt={flag.team} 
                        style={{ 
                            height: 'clamp(16px, 4vw, 24px)',
                            marginRight: '8px',
                        }}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default FlagBar