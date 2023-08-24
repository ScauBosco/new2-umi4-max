import { useIntl } from 'umi';

export function useTcsIntl() {
  const intl = useIntl();
  const t = (id: string) => {
    return intl.formatMessage({
      id,
    });
  };
  return t;
}
