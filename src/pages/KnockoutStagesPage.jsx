import KnockoutCard from "../components/KnockoutCard";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import PageHeader from "../components/PageHeader";
import PageContainer from "../components/PageContainer";
import dayjs from "dayjs";

const KnockoutStagesPage = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [matches, setMatches] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRound, setSelectedRound] = useState("");
  const [search, setSearch] = useState("");
  const KNOCKOUT_ROUNDS = ['Round of 32', 'Round of 16', 'Quarter-final', 'Semi-final', 'Match for third place', 'Final']
  const ROUND_ORDER = ['Round of 32', 'Round of 16', 'Quarter-final', 'Semi-final', 'Match for third place', 'Final']

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json",
      );
      const data = await response.json();
      const knockOutMatches = data.matches.filter(match => KNOCKOUT_ROUNDS.includes(match.round));

      knockOutMatches.sort((a, b) => new Date(a.date) - new Date(b.date));
      setMatches(knockOutMatches);
      const uniqueRounds = [
        ...new Set(knockOutMatches.map((match) => match.round)),
      ];
      setRounds(uniqueRounds);
    };
    getData();
  }, []);

  const filteredMatches = matches
    .filter(
      (match) =>
        match.round.toLowerCase().includes(search.toLowerCase()) ||
        match.team1.toLowerCase().includes(search.toLowerCase()) ||
        match.team2.toLowerCase().includes(search.toLowerCase()) ||
        (match.group &&
          match.group.toLowerCase().includes(search.toLowerCase())) ||
        (match.ground &&
          match.ground.toLowerCase().includes(search.toLowerCase())) ||
        match.time.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((match) => (selectedRound ? match.round === selectedRound : true))
    .filter((match) =>
      selectedDate
        ? match.date === dayjs(selectedDate).format("YYYY-MM-DD")
        : true,
    );

  const groupedMatches = filteredMatches.reduce((acc, match) => {
    if (!acc[match.round]) acc[match.round] = [];
    acc[match.round].push(match);
    return acc;
  }, {});

  return (
    <PageContainer>
      <PageHeader
        title="Knockout Stages"
        subtitle="See the results of the knockout stages of the tournament, including the Round of 32, Round of 16, Quarter-finals, Semi-finals, Third Place Match, and Final."
      />
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "24px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
      </div>

<div style={{ display: 'flex', gap: '32px', overflowX: 'auto', alignItems: 'stretch', padding: '0 24px', backgroundColor: 'rgba(255, 255, 255, 0.025)', borderRadius: '8px', paddingBottom: '16px', paddingTop: '16px', marginBottom: '24px' }}>
  {ROUND_ORDER
    .filter(round => groupedMatches[round]) // only show rounds that have matches
    .map(round => (
      <div key={round} style={{ 
  display: 'flex', 
  flexDirection: 'column', 
  gap: '16px', 
  minWidth: '180px',
  justifyContent: 'center',
}}>
        <Typography align="center" variant="h5" sx={{ color: 'white' }}>
          {round}
        </Typography>
        {groupedMatches[round].map((match, index) => (
          <KnockoutCard key={index} {...match} />
        ))}
      </div>
    ))}
</div>
    </PageContainer>
  );
};

export default KnockoutStagesPage;
