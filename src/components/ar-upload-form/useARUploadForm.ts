import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { pageCurrentReoil } from '../../store/atom';
import { configJsonData } from './constant';

export const useARUploadForm = () => {
  const setCurrentRecoil = useSetRecoilState(pageCurrentReoil);
  const [errorText, setErrorText] = useState('');
  const [jsonData, setJsonData] = useState(JSON.stringify(configJsonData));
  const [configData, setConfigData] = useState(configJsonData);

  return {
    errorText,
    jsonData,
    setCurrentRecoil,
    setErrorText,
    setJsonData,
    configData,
    setConfigData,
  };
};
