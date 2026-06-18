import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SquadCard from '../components/SquadCard'
import PlayerCard from '../components/PlayerCard'
import { Typography } from '@mui/material'
import PageHeader from '../components/PageHeader'
import PageContainer from '../components/PageContainer'

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

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://raw.githubusercontent.com/openfootball/worldcup.json/refs/heads/master/2026/worldcup.squads.json')
            const data = await response.json()

            const squad = data.find(t => t.fifa_code === id)
            setSquad(squad)
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
            <div>
                {squad && <SquadCard {...squad} />}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '16px', justifyContent: 'center' }}>
                {playerOrder.map(pos => (
                    playerGroups[pos] && (
                        <div key={pos} style={{ width: '100%' }}>
                            <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 3, mb: 2, textAlign: 'center' }}>
                                {getPosition(pos)}s
                            </Typography>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                            {playerGroups[pos].map(player => (
                                <PlayerCard key={player.number} {...player} />
                            ))}
                            </div>
                        </div>
                    )
                ))}
            </div>
        </PageContainer>
     )
}

export default TeamDetailsPage