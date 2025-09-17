import { useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  clearCurrentWorkspaceId,
  setCurrentWorkspaceId,
} from '@/features/workspace/workspace.reducer';

export const useCurrentWorkspace = () => {
  const dispatch = useAppDispatch();
  const currentWorkspaceId = useAppSelector((state) => state.workspace.currentWorkspaceId);

  return useMemo(() => ({
    currentWorkspaceId,
    setCurrentWorkspaceId: (payload: Parameters<typeof setCurrentWorkspaceId>[0]) =>
      dispatch(setCurrentWorkspaceId(payload)),
    clearCurrentWorkspaceId: () => dispatch(clearCurrentWorkspaceId()),
  }), [dispatch, currentWorkspaceId]);
};
