import { useCallback, useRef, useState } from 'react';

/** Native-like pull-to-refresh for mobile scroll containers */
export function usePullToRefresh(onRefresh, threshold = 80) {
  const [pulling, setPulling] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const pullDistance = useRef(0);

  const handleTouchStart = useCallback((e) => {
    const scrollTop = e.currentTarget.scrollTop;
    if (scrollTop <= 0) {
      startY.current = e.touches[0].clientY;
    }
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      const scrollTop = e.currentTarget.scrollTop;
      if (scrollTop > 0 || refreshing) return;

      const delta = e.touches[0].clientY - startY.current;
      if (delta > 0) {
        pullDistance.current = Math.min(delta, threshold * 1.5);
        setPulling(pullDistance.current > threshold * 0.5);
      }
    },
    [refreshing, threshold]
  );

  const handleTouchEnd = useCallback(async () => {
    if (pullDistance.current >= threshold && !refreshing) {
      setRefreshing(true);
      setPulling(false);
      try {
        await onRefresh?.();
      } finally {
        setRefreshing(false);
      }
    } else {
      setPulling(false);
    }
    pullDistance.current = 0;
  }, [onRefresh, refreshing, threshold]);

  return {
    pulling,
    refreshing,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
}
