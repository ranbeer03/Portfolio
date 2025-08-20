import * as React from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem as MuiTreeItem } from '@mui/x-tree-view/TreeItem';

// Wrap TreeItem so it automatically hides its checkbox when it has children
function TreeItem(props) {
  const { children, slotProps: incomingSlotProps = {}, ...other } = props;
  const hasChildren = React.Children.count(children) > 0;

  // If it has children, we inject sx to hide the checkbox slot
  const checkboxProps = hasChildren
    ? { sx: { display: 'none' } }
    : {};

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

export default function ShopFilterBar({selectedFormats=[], onFormatToggle}) {
  return (
    <Box >
      <SimpleTreeView 
        multiSelect 
        checkboxSelection 
        defaultExpandedItems={["paintings","collections"]}
        selectedItems={selectedFormats}
        onSelectedItemsChange = {(e, newSelectedIds) => {
          selectedFormats
          .filter(id => !newSelectedIds.includes(id))
          .forEach(id => onFormatToggle({ target: {value:id}}));
          newSelectedIds
            .filter(id => !selectedFormats.includes(id))
            .forEach(id => onFormatToggle({ target: {value: id}}));
        }}
      >
        <TreeItem itemId="paintings" label="Paintings">
            <TreeItem itemId="collections" label="Collections">
              <TreeItem itemId="animals"  label="Animals" />
              <TreeItem itemId="monopoly" label="Monopoly" />
              <TreeItem itemId="african line art"  label="African Line Art" />
            </TreeItem>
            <TreeItem itemId="material" label="Material">
              <TreeItem itemId="acrylics" label="acrylics" />
              <TreeItem itemId="water-colors" label="water colros" />
            </TreeItem>
        </TreeItem>      
        <TreeItem itemId="prints" label="Prints">
          <TreeItem itemId="a5" label="A5" />
          <TreeItem itemId="a4" label="A4" />
          <TreeItem itemId="a3" label="A3" />
          <TreeItem itemId="a2" label="A2" />
        </TreeItem>
        <TreeItem itemId="custom-items" label="Custom Items">
          <TreeItem itemId="sneakers" label="sneakers" />
          <TreeItem itemId="handbags" label="handbags" />
          <TreeItem itemId="skateboard" label="skateboards" />
        </TreeItem>
      </SimpleTreeView>
    </Box>
  );
}
