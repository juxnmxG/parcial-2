import { createContext, useContext, useEffect, useRef, useState } from 'react';

import Button from '../../button/button';

const ResourcesContext = createContext();
const ItemsContext = createContext();
const IndividualContext = createContext();

const Info = ({ children }) => {
  const [activeInfo, setActiveInfo] = useState();
  const [items, setItems] = useState([]);

  return (
    <ResourcesContext.Provider value={[activeInfo, setActiveInfo]}>
      <ItemsContext.Provider value={[items, setItems]}>
        <div className="wrapperInfo">{children}</div>
      </ItemsContext.Provider>
    </ResourcesContext.Provider>
  );
};

const ButtonItem = ({ children, variant }) => {
  // eslint-disable-next-line no-unused-vars
  const [_, setActiveInfo] = useContext(ResourcesContext);
  const item = useContext(IndividualContext);

  return (
    <Button
      variant={variant}
      onClick={() => {
        setActiveInfo(item);
      }}
    >
      {children}
    </Button>
  );
};

const ItemContent = ({ children }) => {
  const [activeInfo] = useContext(ResourcesContext);
  const item = useContext(IndividualContext);

  const isActive = item === activeInfo;

  if (!isActive) return null;
  return <div className={activeInfo ? 'speaker' : 'hidden'}>{children}</div>;
};

const IndividualItem = ({
  children,
  defaultActive: isDefaultActive = false,
}) => {
  const [activeInfo, setActiveInfo] = useContext(ResourcesContext);
  const [items, setItems] = useContext(ItemsContext);
  const itemRef = useRef();

  useEffect(() => {
    const currentItem = itemRef.current;

    const isAnyItemActive = Boolean(activeInfo);
    const isActiveItem = activeInfo === currentItem;
    if (isActiveItem || isAnyItemActive) return;

    if (isDefaultActive) setActiveInfo(currentItem);
  }, [activeInfo, isDefaultActive, setActiveInfo]);

  useEffect(() => {
    const currentItem = itemRef.current;

    const needsRegisteringItem =
      currentItem && !items.some((item) => item === currentItem);
    if (!needsRegisteringItem) return;

    setItems((previousItem) => [...previousItem, currentItem]);
  }, [setItems, items]);

  useEffect(() => {
    const currentItem = itemRef.current;

    return () => {
      setItems((previousItem) =>
        previousItem.filter((item) => item !== currentItem)
      );
    };
  }, [setItems]);

  return (
    <IndividualContext.Provider value={itemRef.current}>
      <div ref={itemRef}>{itemRef.current != null && children}</div>
    </IndividualContext.Provider>
  );
};

export { IndividualItem, ItemContent, ButtonItem, Info };
