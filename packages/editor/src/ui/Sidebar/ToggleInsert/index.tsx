import { AddBox as AddIcon } from '@mui/icons-material';
import React from 'react';
import {
  useIsInsertMode,
  useSetInsertMode,
} from '../../../core/components/hooks';
import Button from '../Button/index';

type Props = {
  label: string;
};
const ToggleInsert: React.FC<Props> = ({ label }) => {
  const isInsertMode = useIsInsertMode();
  const setInsertMode = useSetInsertMode();
  return (
    <Button
      icon={<AddIcon />}
      description={label}
      active={isInsertMode}
      onClick={setInsertMode}
    />
  );
};

export default React.memo(ToggleInsert);
