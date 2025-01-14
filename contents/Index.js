import { ConnectButton } from '@rainbow-me/rainbowkit';
import { MDXRemote } from 'next-mdx-remote';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { Box, Hidden, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import mdxStyle from './mdx.module.css';
import Container from '../components/Container';
import Diploma from '../components/Diploma';
import MintBadge from '../components/MintBadge';
import ZksyncSwap from '../components/ZksyncSwap';
import CompressText from '../components/animation/CompressText';
import { MobileDirectory, PcDirectory } from './Directory';
import Progress from './Progress';
import TabChapter from './TabChapter';
import { ReadContext } from './context.js';

const ImpossibleTriangle = dynamic(() => import('../components/ImpossibleTriangle'), { ssr: false });

export default function Content(props) {
  const { md } = props;

  const [name, setName] = useState(md.props.file[0]?.text);
  const [readData, setReadData] = useState({
    counter: 20,
    read: 1,
    currentIndex: 0,
    actionFrom: 'nextButton',
  });
  const [mdxSource, setMdxSource] = useState('');
  const [chapterData, setChapterData] = useState({});
  const [directory, setDirectory] = useState(md.props.file);
  const [readStatus, setReadStatus] = useState([true]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { ref, inView, entry } = useInView({
    threshold: 0.3,
  });

  useEffect(() => {
    requestMdxSource(name);

    setChapterData({
      current: md.props.file[readData?.currentIndex]?.text,
      last: readData?.currentIndex !== 0 ? md.props.file[readData?.currentIndex - 1]?.text : '',
      next: readData?.currentIndex !== readData.counter ? md.props.file[readData?.currentIndex + 1]?.text : '',
    });
  }, [name]);

  const requestMdxSource = (name) => {
    fetch(`/api/getFile/${name}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('data------------', data);
        if (data?.mdxSource) {
          setMdxSource(data.mdxSource);
        }
      })
      .catch((error) => console.error('err--------', error));
  };

  const computeReadCount = (arr) => arr?.reduce((acc, cur) => acc + (cur ? 1 : 0), 0) || 1;

  const handleTabChapter = (action, chapter) => {
    console.log('action', action);
    if (!action) {
      return;
    }

    const targetElement = document.getElementById('root');
    targetElement.scrollIntoView({ behavior: 'smooth' });

    let readStatusStore = readStatus;

    if (action === 'last') {
      if (readStatusStore[readData?.currentIndex - 1] !== true) {
        readStatusStore[readData?.currentIndex - 1] = true;
        setReadStatus(readStatusStore);
        computeReadCount(readStatusStore);
      }

      setName(chapterData?.last);
      setSelectedIndex(readData?.currentIndex - 1);

      setReadData({
        counter: 20,
        read: computeReadCount(readStatus),
        currentIndex: readData?.currentIndex - 1,
        actionFrom: 'nextButton',
      });
    }
    if (action === 'next') {
      if (readStatusStore[readData?.currentIndex + 1] !== true) {
        readStatusStore[readData?.currentIndex + 1] = true;
        setReadStatus(readStatusStore);
        computeReadCount(readStatusStore);
      }
      setName(chapterData?.next);
      setSelectedIndex(readData?.currentIndex + 1);

      setReadData({
        counter: 20,
        read: computeReadCount(readStatusStore),
        currentIndex: readData?.currentIndex + 1,
        actionFrom: 'nextButton',
      });
    }
    if (action === 'lastOrNext') {
      if (readStatusStore[chapter.index] !== true) {
        readStatusStore[chapter.index] = true;
        setReadStatus(readStatusStore);
        computeReadCount(readStatusStore);
      }
      setName(chapter.text);
      setSelectedIndex(chapter?.index);
      setReadData({
        counter: 20,
        read: computeReadCount(readStatusStore),
        currentIndex: chapter.index,
        actionFrom: 'nextButton',
      });
    }
  };

  const components = {
    Diploma,
    CompressText,
    ZksyncSwap,
    ImpossibleTriangle,
    MintBadge,
  };

  const theme = useTheme();
  console.log('theme.palette?.mode', theme.palette?.mode);
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'));

  console.log('mdScreen', mdScreen);
  return (
    <ReadContext.Provider value={{ readData, setReadData }}>
      <Typography
        id={'root'}
        sx={{
          fontSize: mdScreen ? '48px' : '20px',
          fontStyle: 'ExtraBold',
          fontFamily: 'Open Sans',
          color: theme.palette?.mode === 'dark' ? '#fff' : '#000',
          fontWeight: 900,
          textAlign: 'center',
          marginTop: '120px',
          marginBottom: '50px',
        }}
      >
        Start learning
      </Typography>
      <Container paddingX={2}>
        <Box display="flex" justifyContent="space-between" ref={ref}>
          <Box
            marginRight={{
              xs: 0,
              sm: 2,
            }}
            flexGrow={1}
          >
            <Box
              sx={{
                display: 'flex',
                backgroundColor: theme.palette?.mode === 'dark' ? '#0F0F0F' : '#fff',
                maxWidth: mdScreen ? '920px' : '100vw',
                marginRight: mdScreen ? 2 : 0,

                color: theme.palette?.mode === 'dark' ? '#fff' : '#000',
              }}
              borderRadius={2}
              padding={{
                xs: 2,
                sm: 8,
              }}
            >
              <Box className={mdxStyle.root} textDecoration={'none'}>{mdxSource && <MDXRemote components={components} {...mdxSource}></MDXRemote>}</Box>
            </Box>
            <TabChapter marginTop={{ xs: '20px', sm: '160px' }} chapterData={{ ...chapterData, currentIndex: readData?.currentIndex }} onTabChapter={handleTabChapter}></TabChapter>
          </Box>
          <Hidden smDown>
            <PcDirectory directory={md.props.file} readStatus={readStatus} selectedIndex={selectedIndex} onTabChapter={handleTabChapter}></PcDirectory>
          </Hidden>
          {/* <Test /> */}
        </Box>
      </Container>
      {inView && (
        <Hidden smUp>
          <Box
            sx={{
              position: 'fixed',
              bottom: 0,
              top: 'auto',
              width: '100vw',
              zIndex: '1',
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 1)',
            }}
            backgroundColor="#FFFFFF"
            display="flex"
            height={80}
            alignItems="center"
            justifyContent="space-around"
            marginTop={4}
            paddingX={2}
          >
            <Box>
              <ConnectButton />
            </Box>
            <Box flexGrow={2} marginX="20px">
              <Progress />
            </Box>
            <Hidden smUp>
              <MobileDirectory directory={directory} readStatus={readStatus} selectedIndex={selectedIndex} onTabChapter={handleTabChapter}></MobileDirectory>
            </Hidden>
          </Box>
        </Hidden>
      )}
    </ReadContext.Provider>
  );
}
