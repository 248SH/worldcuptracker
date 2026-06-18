import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PageHeader from '../components/PageHeader'
import GroupCard from '../components/GroupCard'
import PageContainer from '../components/PageContainer'

const KnockoutStandingsPage = () => {

    const [matches, setMatches] = useState([])
    const [teams, setTeams] = useState([])

    useEffect(() => {
        const getData = async () => {
            const [matches, teams] = await Promise.all([
                fetch('https://raw.githubusercontent.com/openfootball/worldcup.json/refs/heads/master/2026/worldcup.json'),
                fetch('https://raw.githubusercontent.com/openfootball/worldcup.json/refs/heads/master/2026/worldcup.teams.json')
            ])
            const matchesData = await matches.json()
            const teamsData = await teams.json()

            const teamsGroupAdjust = teamsData.map(team => ({
            ...team,
            group: "Group " + team.group
        }))

            setMatches(matchesData.matches)
            setTeams(teamsGroupAdjust)
            
        }
        getData()
    }, [])
    const standings = teams.reduce((acc, team) => {
    if (!acc[team.group]) acc[team.group] = {}
    acc[team.group][team.name] = { name: team.name, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0 }
    return acc
}, {})

    matches.forEach(match => {
        const { team1, team2, score, group} = match
        if (!group ||!score) return

        const score1 = score.ft[0]
        const score2 = score.ft[1]

        standings[group][team1].played += 1
        standings[group][team2].played += 1
        standings[group][team1].gf += score1
        standings[group][team1].ga += score2
        standings[group][team2].gf += score2
        standings[group][team2].ga += score1

        standings[group][team1].gd = standings[group][team1].gf - standings[group][team1].ga
        standings[group][team2].gd = standings[group][team2].gf - standings[group][team2].ga

        if(score1 > score2) {
            standings[group][team1].won += 1
            standings[group][team2].lost += 1
            standings[group][team1].points += 3
        } else if(score1 < score2) {
            standings[group][team2].won += 1
            standings[group][team1].lost += 1
            standings[group][team2].points += 3
        } else {
            standings[group][team1].drawn += 1
            standings[group][team1].points += 1
            standings[group][team2].drawn += 1
            standings[group][team2].points += 1
        }
    })

    return (
        <PageContainer>
            <PageHeader title="Knockout Standings" subtitle="View the current standings for the knockout stages." />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {Object.entries(standings).map(([groupName, teams]) => (
                    <GroupCard key={groupName} groupName={groupName} teams={Object.values(teams).sort((a, b) => b.points - a.points)} />
                ))}
            </Box>
        </PageContainer>
    )
}

export default KnockoutStandingsPage