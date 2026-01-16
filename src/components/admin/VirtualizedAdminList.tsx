import React, { CSSProperties } from "react";
import { FixedSizeList as List } from "react-window";

interface VirtualizedAdminListProps<T> {
  items: T[];
  height: number;
  itemHeight: number;
  renderItem: (item: T, index: number, style: CSSProperties) => React.ReactNode;
  className?: string;
}

export function VirtualizedAdminList<T>({
  items,
  height,
  itemHeight,
  renderItem,
  className,
}: VirtualizedAdminListProps<T>) {
  if (items.length === 0) return null;

  return (
    <List
      height={height}
      itemCount={items.length}
      itemSize={itemHeight}
      width="100%"
      className={className}
    >
      {({ index, style }) => renderItem(items[index], index, style)}
    </List>
  );
}
