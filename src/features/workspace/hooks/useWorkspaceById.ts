import { useAppSelector } from '@/store/hooks';
import { workspaceSelectors } from '@/features/workspace/workspace.reducer';

export const useWorkspaceById = (id: string) => {
  return useAppSelector((state) => workspaceSelectors.selectById(state.workspace.items, id));
};
