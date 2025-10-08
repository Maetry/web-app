import { useAppSelector } from '@/store/hooks';
import { settingsSelectors } from '@/features/workspace/workspace.reducer';

export const useWorkspaceSettings = (id: string) => {
  return useAppSelector((state) => settingsSelectors.selectById(state.workspace.settings, id));
};
