import * as React from 'react';
import { styled } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

const AntTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  borderTop: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff'
  },
  minHeight: 'inherit !important',
  marginTop: 30,
  paddingLeft: 20
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  padding: '5px 0 !important',
  marginRight: '20px !important',
  minHeight: 'inherit !important',
  [theme.breakpoints.up('sm')]: {
    minWidth: 0
  },
  fontSize: '12px !important',
  fontWeight: theme.typography.fontWeightRegular,
  color: 'rgba(0, 0, 0, 0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"'
  ].join(','),
  '&:hover': {
    color: '#40a9ff',
    opacity: 1
  },
  '&.Mui-selected': {
    color: '#1890ff',
    fontWeight: theme.typography.fontWeightMedium
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff'
  }
}));

export default function Details() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <AntTabs value={value} onChange={handleChange} aria-label="ant example">
        <AntTab label="Properties" />
        <AntTab label="Documentation" />
      </AntTabs>
    </Box>
  );
}
