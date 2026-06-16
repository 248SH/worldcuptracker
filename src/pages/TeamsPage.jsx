import TeamCard from '../components/TeamCard'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import PageHeader from '../components/PageHeader'
import PageContainer from '../components/PageContainer'

const TeamsPage = () => {

    const [teams, setTeams] = useState([])
    const [groups, setGroups] = useState([])
    const [selectedGroup, setSelectedGroup] = useState('all')
    const [search, setSearch] = useState('')

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.teams.json')
            const data = await response.json()
            setTeams(data)
            const uniqueGroups = [...new Set(data.map(team => team.group))]
            setGroups(uniqueGroups)
        }
        getData()
    }, [])

    return (
        <PageContainer>
            <PageHeader title="Teams" subtitle="Browse all 48 qualified nations." />

            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
                <TextField
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search teams..."
                    variant="outlined"
                />
                <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>Group</InputLabel>
                    <Select
                        value={selectedGroup}
                        onChange={(e) => setSelectedGroup(e.target.value)}
                        label="Group"
                    >
                        <MenuItem value="all">All Groups</MenuItem>
                        {groups.map((group, index) => (
                            <MenuItem key={index} value={group}>{group}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', justifyContent: 'center' }}>
                {teams
                    .filter(team => team.name.toLowerCase().includes(search.toLowerCase()))
                    .filter(team => selectedGroup === 'all' ? true : team.group === selectedGroup)
                    .map((team, index) => (
                        <Link to={`/team-details/${team.fifa_code}`} key={index} style={{ textDecoration: 'none' }}>
                            <TeamCard {...team} />
                        </Link>
                    ))
                }
            </div>
        </PageContainer>
    )
}

export default TeamsPage