import React from "react";
import { Typography, Box, CircularProgress } from "@mui/material";

function Statistiques({ stat }) {
  return (
    <>
      <Box>
        {/* Conteneur pour une statistique */}
        <Box display="flex" flexDirection="column" alignItems="center">
          {/* Box pour afficher la statistique et son nom */}
          <Box position="relative" display="inline-flex">
            {/* CircularProgress pour afficher la valeur de la statistique */}
            <CircularProgress variant="determinate" value={stat["base_stat"]} />
            {/* Box pour afficher la valeur de la statistique au centre du CircularProgress */}
            <Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center" >
              {/* Typographie pour afficher la valeur de la statistique */}
              <Typography variant="caption" component="div" color="text.secondary" >{stat["base_stat"]}</Typography>
            </Box>
          </Box>
          {/* Typographie pour afficher le nom de la statistique */}
          <Typography variant="body2">{stat["stat"]["name"]}</Typography>
        </Box>
      </Box>
    </>
  );
}

export default Statistiques;
