import { setCurPageNumLocalStorage } from '@/utils/tools';
import { Outlet } from '@umijs/max';
import TCSLayout from './tcs-layout';

export default function () {
  setCurPageNumLocalStorage(1);
  return (
    <TCSLayout>
      <Outlet />
    </TCSLayout>
  );
}
