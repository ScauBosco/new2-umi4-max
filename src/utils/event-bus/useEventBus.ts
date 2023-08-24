import { createContext, useContext } from 'react';
import tcsEventBus from './index';

const EventBusContext = createContext(tcsEventBus);
export const useEventBus = () => {
  return useContext(EventBusContext);
};
// export const EventBusProvider = ({ children }) => {
//     const eventBus = new EventBus();
//     return (
//       <>
//         <EventBusContext.Provider value={eventBus}>
//           {children}
//         </EventBusContext.Provider>
//       </>
//     );
//   };
