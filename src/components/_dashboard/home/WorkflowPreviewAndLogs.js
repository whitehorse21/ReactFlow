import * as React from 'react';
import { styled } from '@material-ui/styles';

const RootDiv = styled('div')(({ theme }) => ({
  height: 100,
  width: '100%',
  border: '1px solid currentColor',
  display: 'flex'
}));

const Preview = styled('div')(({ theme }) => ({
  borderRight: '1px solid currentColor',
  width: '70%',
  padding: 5,
  fontSize: 14
}));

const Logs = styled('div')({
  display: 'flex',
  flexGrow: 1,
  padding: 5,
  fontSize: 14
});

export default function Details() {
  return (
    <RootDiv>
      <Preview>Preview</Preview>
      <Logs>Logs</Logs>
    </RootDiv>
  );
}
