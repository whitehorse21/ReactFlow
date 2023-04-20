import React, { useCallback, useEffect, useRef } from 'react';
import { useAsync } from './useAsync';

let newFlowNum = 1;

const initialFlow = {
  id: 'flow-id-1',
  name: 'flow1',
  elements: [
    {
      id: '1',
      type: 'input',
      data: { label: 'Element1' },
      position: { x: 50, y: 50 },
      targetPosition: 'left',
      sourcePosition: 'right',
      style: { borderColor: 'black', boxShadow: 'none' }
    },
    {
      id: '2',
      data: { label: 'Element7' },
      position: { x: 250, y: 50 },
      targetPosition: 'left',
      sourcePosition: 'right',
      style: { borderColor: 'black ', boxShadow: 'none' }
    },
    {
      id: '3',
      type: 'output',
      data: { label: 'Element12' },
      position: { x: 450, y: 50 },
      targetPosition: 'left',
      sourcePosition: 'right',
      style: { borderColor: 'black', boxShadow: 'none' }
    },
    {
      id: 'e1-1',
      source: '1',
      target: '2'
    },
    {
      id: 'e2-3',
      source: '2',
      target: '3'
    }
  ]
};

const useFlows = () => {
  const { status, data, error, dispatch } = useAsync({
    data: {
      flows: [initialFlow],
      currentFlow: initialFlow
    }
  });
  const flowsRef = useRef([initialFlow]);
  const setData = React.useCallback((data) => dispatch({ type: 'resolved', data }), [dispatch]);
  const setError = React.useCallback((error) => dispatch({ type: 'rejected', error }), [dispatch]);

  const changeCurrentFlow = (flowId) => {
    const newFlow = flowsRef.current.find((item) => item.id === flowId);
    if (newFlow) {
      setData({ flows: [...flowsRef.current], currentFlow: { ...newFlow } });
    }
  };

  const addNewFlow = () => {
    newFlowNum += 1;
    const newFlow = {
      id: `flow-id-${newFlowNum}`,
      name: `flow${newFlowNum}`,
      elements: []
    };
    const newFlows = [...flowsRef.current, newFlow];
    flowsRef.current = newFlows;
    setData({ flows: [...newFlows], currentFlow: newFlow });
  };

  const deleteFlow = (flowId) => {
    if (data) {
      const { currentFlow } = data;
      if (flowId === currentFlow.id) {
        flowsRef.current = flowsRef.current.filter(({ id }) => id !== flowId);
        if (flowsRef.current?.length) {
          setData({ ...data, flows: [...flowsRef.current], currentFlow: flowsRef.current[0] });
        }
      } else {
        setData({ ...data, flows: [...flowsRef.current] });
      }
    }
  };

  const saveToFlash = (flow) => {
    const newFlows = flowsRef.current.map((item) => {
      if (item.id === flow.id) {
        return flow;
      }
      return item;
    });
    flowsRef.current = newFlows;
  };

  const loadFlow = (flow) => {
    const flowId = flow?.id;
    if (!flowId) return;
    const oldFlow = flowsRef.current.find(({ id }) => flowId === id);
    if (!oldFlow) {
      flowsRef.current = [...flowsRef.current, flow];
      setData({ ...data, flows: [...flowsRef.current] });
    } else {
      const removed = flowsRef.current.filter(({ id }) => flowId !== id);
      flowsRef.current = [...removed, flow];
      setData({ ...data, flows: [...flowsRef.current] });
    }
  };

  return {
    data,
    status,
    error,
    changeCurrentFlow,
    addNewFlow,
    deleteFlow,
    saveToFlash,
    loadFlow
  };
};

export default useFlows;
