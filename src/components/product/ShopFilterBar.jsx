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

const ShopFilterBar = ({ selectedFilters = [], onFilterToggle }) => {
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
        defaultExpandedItems={['paintings', 'collections']}
        selectedItems={selectedFilters}
        onSelectedItemsChange={handleSelectionChange}
      >
        <TreeItem itemId="paintings" label="Paintings">
          <TreeItem itemId="collections" label="Collections">
            <TreeItem itemId="animals" label="Animals" />
            <TreeItem itemId="monopoly" label="Monopoly" />
            <TreeItem itemId="african line art" label="African Line Art" />
          </TreeItem>
          <TreeItem itemId="material" label="Material">
            <TreeItem itemId="acrylics" label="Acrylics" />
            <TreeItem itemId="water-colors" label="Water Colors" />
          </TreeItem>
        </TreeItem>
        <TreeItem itemId="prints" label="Prints">
          <TreeItem itemId="a5" label="A5" />
          <TreeItem itemId="a4" label="A4" />
          <TreeItem itemId="a3" label="A3" />
          <TreeItem itemId="a2" label="A2" />
        </TreeItem>
        <TreeItem itemId="custom-items" label="Custom Items">
          <TreeItem itemId="sneakers" label="Sneakers" />
          <TreeItem itemId="handbags" label="Handbags" />
          <TreeItem itemId="skateboard" label="Skateboards" />
        </TreeItem>
      </SimpleTreeView>
    </Box>
  );
};

export default ShopFilterBar;
