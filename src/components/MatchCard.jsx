import teamNameToCountryCode from '../lib/teamNameToCountryCode'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import { baseCard } from '../lib/cardStyles'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import React from 'react'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import GroupsIcon from '@mui/icons-material/Groups';
import StadiumIcon from '@mui/icons-material/Stadium';


const getFlag = (teamName) => {
  const code = teamNameToCountryCode[teamName]
  if (!code) return null
  return (
    <img
      src={`https://flagcdn.com/${code}.svg`}
      alt={teamName}
      style={{ width: '60px', height: '40px', objectFit: 'cover', border: '1px solid white', borderRadius: '4px' }}
    />
  )
}

const MatchCard = ({ round, date, time, team1, team2, group, ground, score, goals1, goals2 }) => {
  const id = React.useId();
  return (
    <Card sx={{
      color: 'white',
      ...baseCard,
      width: '100%',
      maxWidth: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      <CardContent>

        {/* Round */}
        <Typography variant="h6" align="center" fontWeight="bold" mb={2}>
          {round}
        </Typography>

        {/* Teams and flags */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%', transition: 'transform 0.3s', ':hover': { cursor: 'pointer', transform: 'scale(1.1)' } }}>
            {getFlag(team1)}
            <Typography variant="body3" mt={1} align="center" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {team1}
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight="bold">
            {score ? `${score.ft[0]} - ${score.ft[1]}` : 'vs'}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%', transition: 'transform 0.3s', ':hover': { cursor: 'pointer', transform: 'scale(1.1)' } }}>
            {getFlag(team2)}
            <Typography variant="body3" mt={1} align="center" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {team2}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2, backgroundColor: 'white' }} />

        {/* Details */}
        <Box sx={{ width: '75%', textAlign: 'left', marginBottom: '10px',padding: '15px', overflow: 'hidden' }}>
  <Typography variant="body2" noWrap>
    <AccessAlarmIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> {time}
  </Typography>
  {group && (
    <Typography variant="body2" noWrap>
      <GroupsIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> {group}
    </Typography>
  )}
  <Typography variant="body2" noWrap>
    <StadiumIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> {ground}
  </Typography>
</Box>

        {/* Goals */}
        {(goals1?.length > 0 || goals2?.length > 0) && (
          <Accordion disableGutters sx={{
  backgroundColor: 'rgba(10, 10, 10, 0.5)',
  color: 'white',
  boxShadow: 'none',
  border: '1px solid rgba(255,255,255,0.3)',
  borderRadius: '4px !important',
  '&:before': { display: 'none' },
}}>
  <AccordionSummary
  expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
  sx={{ 
    minHeight: '36px',
    padding: '0 8px',
    '& .MuiAccordionSummary-content': {
      margin: '6px 0',
    }
  }}
>
    <Typography variant="body2">Show Goals</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ width: '48%' }}>
        {goals1?.sort((a, b) => a.minute - b.minute).map((g, i) => (
          <Typography key={i} variant="body2">⚽ {g.name} {g.minute}'</Typography>
        ))}
      </Box>
      <Box sx={{ width: '48%', textAlign: 'right' }}>
        {goals2?.sort((a, b) => a.minute - b.minute).map((g, i) => (
          <Typography key={i} variant="body2">{g.name} {g.minute}' ⚽</Typography>
        ))}
      </Box>
    </Box>
  </AccordionDetails>
</Accordion>
)}
      </CardContent>
    </Card>
  )
}

export default MatchCard