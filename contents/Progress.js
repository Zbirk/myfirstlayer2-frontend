import { useContext } from 'react';

import {
  Box,
  CircularProgress,
  LinearProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';

import { ReadContext } from './context.js';
import { getStorage, removeStorage, setStorage } from './storage.js';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 4,
    borderRadius: 5,
    color: theme.palette?.mode === 'dark' ? '#fff' : '#000',
    fontStyle: 'SemiBold',
  },
  colorPrimary: {
    backgroundColor: theme.palette?.mode === 'dark' ? '#4E4E4E' : '#AEAEAE',
  },
  bar: {
    borderRadius: 5,
    backgroundColor:
      theme.palette?.mode === 'dark' ? '#ffffff' : 'background: #000000',
  },

}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    fontStyle: 'SemiBold',
    fontWeight: 700,
    color:  theme.palette?.mode === 'dark' ? '#ffffff' : '#747474',
    // marginBottom: '18px',
    // textAlign: 'center',
  },
  data: {
    color:  theme?.palette?.mode === 'dark' ? '#fff' : '#000',
  }
}));

export default function Progress() {
  const classes = useStyles();
  let x = 10;

  const { readData } = useContext(ReadContext);
  const { read, counter } = readData;

  const th = useTheme();
  
  const mdScreen = useMediaQuery(th?.breakpoints?.up('md'));

  return (
    <Box className={classes.root}>
      <Box
        variant="progress"
        className={classes.title}
        sx={{ 
          marginBottom: mdScreen ? '18px' : '6px',
          textAlign: mdScreen ? 'center' : 'left',
          fontSize: mdScreen ? '12px' : '8px',
        }}>当前浏览进度</Box>
      <BorderLinearProgress
        variant="determinate"
        value={(read / counter) * 100}
      />
      <Box className={classes.data} style={{ transform: `translateX(${x}%)`, fontSize: '10px' }}>
        {((read / counter) * 100).toFixed(2)}%
      </Box>
    </Box>
  );
}
