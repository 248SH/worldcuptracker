import teamNameToCountryCode from "../lib/teamNameToCountryCode";
import teamNameToFifaCode from "../lib/teamNameToFifaCode";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { baseCard } from "../lib/cardStyles";
import { Link } from "react-router-dom";

const getFlag = (teamName) => {
  const code = teamNameToCountryCode[teamName];
  if (!code) return null;
  return (
    <img
      src={`https://flagcdn.com/${code}.svg`}
      alt={teamName}
      style={{
        width: "36px",
        height: "22px",
        objectFit: "cover",
        border: "1px solid white",
        borderRadius: "3px",
      }}
    />
  );
};

const KnockoutCard = ({ round, team1, team2, score }) => {
  const score1 = score?.ft[0];
  const score2 = score?.ft[1];
  const code1 = teamNameToCountryCode[team1];
  const code2 = teamNameToCountryCode[team2];
  const fifaCode1 = teamNameToFifaCode[team1];
  const fifaCode2 = teamNameToFifaCode[team2];
  const team1Won = score && score1 > score2;
  const team2Won = score && score2 > score1;
  const isFinal = round === "Final";
  const isPlayed = score && score1 !== null && score2 !== null;

  return (
    <Card
      sx={{
    color: "white",
    ...baseCard,
    width: "100%",
    maxWidth: "240px",
    border: !isFinal ? "3px solid rgba(255, 255, 255, 0.8)" : "3px solid var(--gold)",
    backgroundColor: isPlayed ? "rgba(60, 60, 60, 0.5)" : "rgba(10, 10, 10, 0.5)",
    boxShadow: isFinal ? "0 0 20px 5px var(--gold)" : "none",
    position: "relative",
    overflow: "hidden",
       "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0.04) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-75%",
          width: "50%",
          height: "100%",
          background:
            "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)",
          transform: "skewX(-20deg)",
          pointerEvents: "none",
          transition: "left 0.6s ease",
        },
}}
    >
      <CardContent sx={{ padding: "6px 8px", "&:last-child": { paddingBottom: "6px" } }}>
        {/* Team 1 row */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: !score ? "transparent" : team1Won ? "linear-gradient(var(--light-bronze) 100%, var(--light-bronze) 0%)" : "transparent",
            padding: "3px 6px",
            borderRadius: "4px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {getFlag(team1) && (
              <Link
                to={`/team-details/${teamNameToFifaCode[team1]}`}
                style={{ textDecoration: "none" }}
                aria-label={team1}
              >
                {getFlag(team1)}
              </Link>
            )}
            <Typography
              variant="body2"
              noWrap
              sx={{
                maxWidth: "100px",
                fontWeight: team1Won ? "bold" : "normal",
                color: !score ? "white" : team1Won ? "white" : "rgba(255,255,255,0.4)",
              }}
              aria-label={team1}
            >
              {code1 ? fifaCode1 : "TBD"}
            </Typography>
          </Box>
          <Typography variant="h6" fontWeight="700">
            {score ? score1 : ""}
          </Typography>
        </Box>

        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)", my: 0.5 }} />

        {/* Team 2 row */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: !score ? "transparent" : team2Won ? "var(--light-bronze)" : "transparent",
            padding: "3px 6px",
            borderRadius: "4px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {getFlag(team2) && (
              <Link
                to={`/team-details/${teamNameToFifaCode[team2]}`}
                style={{ textDecoration: "none" }}
                aria-label={team2}
              >
                {getFlag(team2)}
              </Link>
            )}
            <Typography
              variant="body2"
              noWrap
              sx={{
                maxWidth: "100px",
                fontWeight: team2Won ? "bold" : "normal",
                color: !score ? "white" : team2Won ? "white" : "rgba(255,255,255,0.4)",
              }}
              aria-label={team2}
            >
              {code2 ? fifaCode2 : "TBD"}
            </Typography>
          </Box>
          <Typography variant="h6">
            {score ? score2 : ""}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default KnockoutCard;