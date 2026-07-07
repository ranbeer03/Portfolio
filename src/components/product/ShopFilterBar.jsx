import * as React from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem as MuiTreeItem } from '@mui/x-tree-view/TreeItem';

// TreeItem that hides its checkbox when it has children,
// so only leaf filters are selectable.
function TreeItem(props) {
  const { children, slotProps: incomingSlotProps = {}, ...other } = props;
  const hasChildren = React.Children.count(children) > 0;

  const checkboxProps = hasChildren ? { sx: { display: 'none' } } : {};

  return (
    <MuiTreeItem
      {...other}
      slotProps={{
        ...incomingSlotProps,
        checkbox: {
          ...incomingSlotProps.checkbox,
          ...checkboxProps,
        },
      }}
    >
      {children}
    </MuiTreeItem>
  );
}

const titleCase = (value) =>
  value.replace(/\b\w/g, (letter) => letter.toUpperCase());

/**
 * Collection filter tree. `collections` comes from the artworks actually on
 * display, so the options can never go stale or point at empty results.
 */
const ShopFilterBar = ({ collections = [], selectedFilters = [], onFilterToggle }) => {
  const handleSelectionChange = (event, newSelectedIds) => {
    // Emit one toggle per filter that was added or removed.
    selectedFilters
      .filter((id) => !newSelectedIds.includes(id))
      .forEach((id) => onFilterToggle({ target: { value: id } }));
    newSelectedIds
      .filter((id) => !selectedFilters.includes(id))
      .forEach((id) => onFilterToggle({ target: { value: id } }));
  };

  return (
    <Box>
      <SimpleTreeView
        multiSelect
        checkboxSelection
        defaultExpandedItems={['collections']}
        selectedItems={selectedFilters}
        onSelectedItemsChange={handleSelectionChange}
      >
        <TreeItem itemId="collections" label="Collections">
          {collections.map((collection) => (
            <TreeItem
              key={collection}
              itemId={collection}
              label={titleCase(collection)}
            />
          ))}
        </TreeItem>
      </SimpleTreeView>
    </Box>
  );
};

export default ShopFilterBar;
