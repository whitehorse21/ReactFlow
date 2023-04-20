import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import Page from '../../components/Page';
import { WorkflowPreviewAndLogs } from '../../components/_dashboard/home';
import { MHidden } from '../../components/@material-extend';

const FooterDiv = styled(Page)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
});

const Children = styled('div')({
  flexGrow: 1
});

const WorkflowFooter = ({ children }) => (
  <FooterDiv>
    <Children>{children}</Children>
    <MHidden width="mdDown">
      <WorkflowPreviewAndLogs />
    </MHidden>
  </FooterDiv>
);

WorkflowFooter.propTypes = {
  children: PropTypes.node
};

export default WorkflowFooter;
