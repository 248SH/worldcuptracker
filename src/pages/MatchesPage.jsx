import MatchCard from "../components/MatchCard";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import PageHeader from "../components/PageHeader";
import PageContainer from "../components/PageContainer";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const MatchesPage = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [matches, setMatches] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRound, setSelectedRound] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json",
      );
      const data = await response.json();
      data.matches.sort((a, b) => new Date(a.date) - new Date(b.date));
      setMatches(data.matches);
      const uniqueRounds = [
        ...new Set(data.matches.map((match) => match.round)),
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
        title="Matches"
        subtitle="Browse fixtures by round, date, or search for individual teams."
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
        <TextField
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search matches..."
          variant="outlined"
          slotProps={{ input: { "aria-label": "Search matches" } }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="round-select-label">Round</InputLabel>
          <Select
            labelId="round-select-label"
            id="round-select"
            value={selectedRound}
            onChange={(e) => {
              setSelectedRound(e.target.value);
              setSelectedDate(null);
            }}
            label="Round"
          >
            <MenuItem value="">All Rounds</MenuItem>
            {rounds.map((round, index) => (
              <MenuItem key={index} value={round}>
                {round}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <DatePicker
  value={selectedDate}
  onChange={(date) => {
    setSelectedDate(date)
    setSelectedRound('')
  }}
  label="Filter by date"
  slotProps={{ 
    textField: { 
      size: 'small', 
      slotProps: { htmlInput: { 'aria-label': 'Filter by date' } } 
    } 
  }}
  format="dd-MM-yyyy"
/>
      </div>

      {Object.entries(groupedMatches).map(([round, roundMatches]) => (
        <section
          key={round}
          style={{
            backgroundColor: "var(--dark-green)",
            marginBottom: "50px",
            border: "5px solid white",
            borderRadius: "15px",
            padding: "16px",
          }}
        >
          <Typography
            align="center"
            variant="h4"
            component="h2"
            sx={{ color: "white" }}
          >
            {round}
          </Typography>
          <Typography
            align="center"
            variant="h5"
            component="h3"
            sx={{ color: "white", mb: 2 }}
          >
            {dayjs(roundMatches[0].date).format("DD MMM YYYY")}
          </Typography>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              justifyContent: "center",
              marginBottom: "32px",
            }}
          >
            {roundMatches.map((match, index) => (
              <article key={index} style={{ width: isMobile ? "100%" : "35%" }}>
                <MatchCard {...match} />
              </article>
            ))}
          </div>
        </section>
      ))}
    </PageContainer>
  );
};

export default MatchesPage;
