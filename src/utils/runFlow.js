import { elementsDetail } from './elementsDetail';

const runFlow = (elements) => {
  const inputNodes = elements.filter(({ type }) => type === 'input');
  if (!inputNodes) return false;

  const excuteAndMove = async (element) => {
    const name = element?.data?.label;
    const type = element?.type;
    if (!name || !type) return;
    const method = elementsDetail?.get(name)?.method;
    if (method) await method();
    if (type === 'output') return;
    const edge = elements.find(({ source }) => source === element.id);
    if (edge) {
      const nextNode = elements.find(({ id }) => id === edge.target);
      if (nextNode) excuteAndMove(nextNode);
    }
  };

  inputNodes.forEach((inputNode) => {
    excuteAndMove(inputNode);
  });
};

export default runFlow;
