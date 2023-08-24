import ArSearchBar from '@/components/ar-search-bar';
import { DetailPanel } from '@/components/detail-panel';
import ResizableLayout from '@/components/resizable-component';
import { PAGESIZE } from '@/constant';
import { getSearchForm } from '@/services/request';
import { useTcsIntl } from '@/utils/tcs-intl/useTcsIntl';
import { setCurPageNumLocalStorage } from '@/utils/tools';
import { useEffect, useState } from 'react';
import LeftPanel from './left-panel';
import type { SearchData, SearchType } from './typing';
const SearchPage = () => {
  const t = useTcsIntl();
  const [isShow, setShow] = useState(false);
  const [detailId, setDetailId] = useState<string>();
  const [searchData, setSearchData] = useState<SearchData>();
  const [filterData, setFilterData] = useState<SearchType>();
  const sendSearchRequest = async (
    currentPage: number,
    searchValues?: SearchType,
  ) => {
    try {
      console.log('real send data:', searchValues);
      const data: SearchData = (
        await getSearchForm({
          ...searchValues,
          currentPage: currentPage,
          pageSize: PAGESIZE,
        })
      ).data;

      // console.log('response.data:', data);

      setSearchData(data);
      // console.log(
      //   "data.searchResults?.[0].requestId+''",
      //   typeof data.searchResults?.[0]?.requestId + '',
      // );
      const searchResults = data.searchResults;

      setDetailId(
        searchResults.length != 0 ? `${searchResults[0].requestId}` : '',
      );
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    document.title = t('search.title');
  }, [t]);
  useEffect(() => {
    sendSearchRequest(1);
  }, []);
  useEffect(() => {
    console.log('search page xunranle');
  });

  return (
    <ResizableLayout
      isSplit={isShow}
      top={
        <ArSearchBar
          filterConditions={(values) => {
            setFilterData(values);
            sendSearchRequest(1, values);
            setCurPageNumLocalStorage(1);
          }}
        />
      }
      leftPanel={
        <LeftPanel
          filterData={filterData}
          searchData={searchData}
          triggerRightPanel={(itemId: string) => {
            setShow(true);
            setDetailId(itemId);
          }}
          onSearch={sendSearchRequest}
        />
      }
      rightPanel={
        <DetailPanel requestTag={detailId} closePanel={() => setShow(false)} />
      }
    />
  );
};
export default SearchPage;
