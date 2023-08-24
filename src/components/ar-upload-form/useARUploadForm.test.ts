import { act, renderHook } from '@testing-library/react-hooks';
import { configJsonData } from './constant';
import { useARUploadForm } from './useARUploadForm';

describe('useARUploadForm', () => {
  test('should return initial state', () => {
    const { result } = renderHook(() => useARUploadForm());

    expect(result.current.errorText).toBe('');
    expect(result.current.jsonData).toBe(JSON.stringify(configJsonData));
    expect(result.current.configData).toBe(configJsonData);
  });

  test('should update errorText state', () => {
    const { result } = renderHook(() => useARUploadForm());

    act(() => {
      result.current.setErrorText('some error text');
    });

    expect(result.current.errorText).toBe('some error text');
  });

  test('should update jsonData state', () => {
    const { result } = renderHook(() => useARUploadForm());

    act(() => {
      result.current.setJsonData('{"some": "data"}');
    });

    expect(result.current.jsonData).toBe('{"some": "data"}');
  });

  test('should update configData state', () => {
    const { result } = renderHook(() => useARUploadForm());

    act(() => {
      result.current.setConfigData([
        {
          type: 'some type',
          configDetail: 'some value',
          releaseState: 1,
          releaseTime: '2023-09-09',
        },
      ]);
    });

    expect(result.current.configData).not.toEqual([
      { type: 'some type', configDetail: 'some value' },
    ]);
  });
});
