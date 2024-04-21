import React from "react";
import { Typography, Box, CircularProgress } from "@mui/material";

function Statistiques({ stat }) {
  return (
    <>
      <Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" value={stat["base_stat"]} />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
              >
                {stat["base_stat"]}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2">{stat["stat"]["name"]}</Typography>
        </Box>
      </Box>
    </>
  );
}

export default Statistiques;