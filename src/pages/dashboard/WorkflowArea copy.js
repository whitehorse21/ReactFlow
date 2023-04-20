import React, { useRef, useState, useContext, useImperativeHandle, forwardRef } from 'react';
import WorkflowTabs from '../../layouts/dashboard/WorkflowTabs';
import Workflow from '../../components/_dashboard/home/Workflow';
import { FlowsContext } from '../../contexts/FlowsContext';

const initialFlows = {
  name: 'flow1',
  elements: [
    {
      id: '1',
      type: 'input',
      data: { label: 'Element 1' },
      position: { x: 50, y: 50 },
      targetPosition: 'left',
      sourcePosition: 'right'
    },
    {
      id: '2',
      data: { label: 'Element 2' },
      position: { x: 250, y: 50 },
      targetPosition: 'left',
      sourcePosition: 'right'
    },
    {
      id: '3',
      type: 'output',
      data: { label: 'Element 2' },
      position: { x: 450, y: 50 },
      targetPosition: 'left',
      sourcePosition: 'right'
    },
    {
      id: 'e1-1',
      source: '1',
      target: '2',
      label: 'edge label 1'
    },
    {
      id: 'e2-3',
      source: '2',
      target: '3',
      label: 'edge label 2'
    }
  ]
};

const TabPanel = (props) => {
  const { children, value, current, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== current}
      id={`full-width-tabpanel-${current}`}
      aria-labelledby={`full-width-tab-${current}`}
      {...other}
      style={{ height: '100%', width: '100%' }}
    >
      {value === current && children}
    </div>
  );
};

const MemoTabpanel = React.memo(TabPanel);

// let newFlowNum = 1;

const WorkflowArea = (props, ref) => {
  const elRef = useRef(null);
  const { data, status, changeCurrentFlow, addNewFlow, deleteFlow, saveToFlash } = useContext(FlowsContext);
  // const [flows, setFlows] = useState([initialFlows]);
  // const [currentFlow, setCurrentFlow] = useState(initialFlows);

  // const changeCurrentFlow = (name) => {
  //   setFlows(flowsRef.current);
  //   const newFlow = flowsRef.current.find((item) => item.name === name);
  //   if (newFlow) {
  //     setCurrentFlow({ ...newFlow });
  //   }
  // };

  // const addNewFlow = () => {
  //   newFlowNum += 1;
  //   const newFlow = {
  //     name: `Flow ${newFlowNum}`,
  //     elements: []
  //   };
  //   const newFlows = [...flowsRef.current, newFlow];
  //   flowsRef.current = newFlows;
  //   setFlows([...newFlows]);
  // };

  // const deleteFlow = (flowName) => {
  //   flowsRef.current = flowsRef.current.filter(({ name }) => name !== flowName);
  //   setFlows([...flowsRef.current]);
  // };

  // const saveToFlash = (flow) => {
  //   const newFlows = flowsRef.current.map((item) => {
  //     if (item.name === flow.name) {
  //       return flow;
  //     }
  //     return item;
  //   });
  //   flowsRef.current = newFlows;
  // };

  useImperativeHandle(ref, () => ({
    saveToDb: () => {
      elRef.current?.saveToDb();
    }
  }));

  if ((status !== 'idle' && status !== 'resolved') || !data) return null;

  const { flows, currentFlow } = data;

  const flowNames = flows.map(({ name }) => name);
  const currentFlowName = currentFlow?.name;

  return (
    <WorkflowTabs
      flows={flowNames}
      currentFlow={currentFlowName}
      changeCurrentFlow={changeCurrentFlow}
      addNewFlow={addNewFlow}
      deleteFlow={deleteFlow}
    >
      {flows.map((flow, index) => (
        <MemoTabpanel current={currentFlowName} value={flow.name} key={flow.name}>
          <Workflow flow={flow} saveToFlash={saveToFlash} ref={elRef} />
        </MemoTabpanel>
      ))}
    </WorkflowTabs>
  );
};

const WorkflowAreaWithRef = forwardRef(WorkflowArea);

export default WorkflowAreaWithRef;
