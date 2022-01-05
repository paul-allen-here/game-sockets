import { useState, useEffect } from 'react';

const initBeforeUnLoad = (showExitPrompt) => {
  window.onbeforeunload = (event) => {
    if (showExitPrompt) {
      const customEvent = event || window.event;
      customEvent.preventDefault();
      if (customEvent) {
        customEvent.returnValue = '';
      }
      return '';
    }
  };
};

export default function useExitPrompt(bool) {
  const [showExitPrompt, setShowExitPrompt] = useState(bool);

  window.onload = function() {
    initBeforeUnLoad(showExitPrompt);
  };

  useEffect(() => {
    initBeforeUnLoad(showExitPrompt);
  }, [showExitPrompt]);

  return [showExitPrompt, setShowExitPrompt];
}