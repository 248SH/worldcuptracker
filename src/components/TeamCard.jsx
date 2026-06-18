import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import teamNameToCountryCode from "../lib/teamNameToCountryCode";
import teamColours from "../lib/teamColours";

const getFlagUrl = (teamName) => {
  const code = teamNameToCountryCode[teamName];
  if (!code) return null;
  return `https://flagcdn.com/${code}.svg`;
};

const TeamCard = ({ name, group, confed, fontSize }) => {
  const colours = teamColours[name] || {
    primary: "var(--dark-green)",
    secondary: "white",
  };

  return (
    <Box
      mb={4}
      sx={{
        backgroundColor: `rgba(10, 10, 10, 0.5)`,
        border: "7px solid var(--gold)",
        borderRadius: "20px 20px 75px 75px",
        display: "flex",
        flexDirection: "column",
        width: "clamp(350px, 45vw, 300px)",
        height: "clamp(400px, 40vw, 450px)",
        transform: "scale(0.85)",
        boxShadow: "5px 4px 8px rgba(0, 0, 0, 0.5)",
        transition: "border-color 0.3s ease, transform 0.3s ease",
        "&:hover": {
          borderColor:
            colours.primary === "#FFFFFF" ? colours.secondary : colours.primary,
          transform: "scale(0.95)",
          boxShadow: "10px 10px 50px rgba(0, 0, 0, 0.5)",
        },
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
        "&:hover::after": {
          left: "125%",
        },
      }}
    >
      <Box sx={{ padding: "16px", height: "40%" }}>
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            textAlign: "left",
            color:
              colours.primary === "#000000"
                ? colours.secondary
                : colours.primary,
            fontSize: "clamp(3rem, 5vw, 3.5rem)",
            lineHeight: 1,
            fontFamily: "Bebas Neue, sans-serif",
          }}
        >
          {name}
        </Typography>
        <Typography variant="h6" component="p" mb={0.5} sx={{ color: "white", fontSize: fontSize || 'clamp(1.5rem, 2vw, 2rem)' }}>
          Group {group}
        </Typography>
        <Typography variant="h6" component="p" mb={0.5} sx={{ color: "white", fontSize: fontSize || 'clamp(1rem, 2vw, 1.5rem)' }}>
          {confed}
        </Typography>
      </Box>
      <Box
        sx={{
          height: "50%",
          marginTop: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "0 0 50px 50px",
          overflow: "hidden",
        }}
      >
        <img
          src={getFlagUrl(name)}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
    </Box>
  );
};

export default TeamCard;
