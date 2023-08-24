import type { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

export function rootContainer(container: ReactNode) {
  return <RecoilRoot>{container}</RecoilRoot>;
}
