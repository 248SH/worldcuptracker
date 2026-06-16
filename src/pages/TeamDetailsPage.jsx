import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import TeamCard from '../components/TeamCard'
import PlayerCard from '../components/PlayerCard'
import { Typography } from '@mui/material'
import PageHeader from '../components/PageHeader'
import PageContainer from '../components/PageContainer'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import useMediaQuery from '@mui/material/useMediaQuery'

const getPosition = (pos) => {
    const lookup = {
        'GK': 'Goalkeeper',
        'DF': 'Defender',
        'MF': 'Midfielder',
        'FW': 'Forward'
    }
    return lookup[pos] || pos
    }

const TeamDetailsPage = () => {
    const { id } = useParams()
    const [squad, setSquad] = useState(null)
    const [teamInfo, setTeamInfo] = useState(null)

useEffect(() => {
    const getData = async () => {
        const [squadsRes, teamsRes] = await Promise.all([
            fetch('https://raw.githubusercontent.com/openfootball/worldcup.json/refs/heads/master/2026/worldcup.squads.json'),
            fetch('https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.teams.json')
        ])
        const squadsData = await squadsRes.json()
        const teamsData = await teamsRes.json()

        const foundSquad = squadsData.find(t => t.fifa_code === id)
        const foundTeam = teamsData.find(t => t.fifa_code === id)
        setSquad(foundSquad)
        setTeamInfo(foundTeam)
    }
    getData()
}, [id])

    const playerOrder = ['GK', 'DF', 'MF', 'FW']

    const playerGroups = squad ? squad.players.reduce((acc, player) => {
        if (!acc[player.pos]) acc[player.pos] = []
        acc[player.pos].push(player)
        return acc
    }, {}) : {}

    return (
        <PageContainer>
            <PageHeader title={squad?.name || 'Team Details'} subtitle="View the squad and player information for this team." />
            <Box sx={{ display: 'flex', justifyContent: 'center', transform: 'scale(0.65)', height: '300px',transformOrigin: 'top center'}}>
                {squad && <TeamCard {...teamInfo} />}
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {playerOrder.map(pos => (
                    playerGroups[pos] && (
                        <Box key={pos} sx={{ width: '100%', mb: 6 }}>
                            <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 3, mb: 2, textAlign: 'center' }}>
                                {getPosition(pos)}s
                            </Typography>
                            <Divider sx={{ mb: 2, backgroundColor: 'white', width: '50%', margin: '0 auto' }} />
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                            {playerGroups[pos].map(player => (
                                <PlayerCard key={player.number} {...player} />
                            ))}
                            </Box>
                        </Box>
                    )
                ))}
            </Box>
        </PageContainer>
     )
}

export default TeamDetailsPage