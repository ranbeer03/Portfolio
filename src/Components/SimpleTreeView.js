import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';
import Label from '@mui/icons-material/Label';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import InfoIcon from '@mui/icons-material/Info';
import ForumIcon from '@mui/icons-material/Forum';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import {
  TreeItemContent,
  TreeItemIconContainer,
  TreeItemRoot,
  TreeItemGroupTransition,
} from '@mui/x-tree-view/TreeItem';
import { useTreeItem } from '@mui/x-tree-view/useTreeItem';
import { TreeItemProvider } from '@mui/x-tree-view/TreeItemProvider';
import { TreeItemIcon } from '@mui/x-tree-view/TreeItemIcon';

const CustomTreeItemRoot = styled(TreeItemRoot)(({ theme, ownerState }) => ({
  '--tree-view-color': ownerState.color,
  '--tree-view-bg-color': ownerState.bgColor,
  color: (theme.vars || theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    '--tree-view-color': ownerState.colorForDarkMode,
    '--tree-view-bg-color': ownerState.bgColorForDarkMode,
  }),
}));

const CustomTreeItemContent = styled(TreeItemContent)(({ theme }) => ({
  marginBottom: theme.spacing(0.3),
  color: (theme.vars || theme).palette.text.secondary,
  borderRadius: theme.spacing(2),
  paddingRight: theme.spacing(1),
  paddingLeft: `calc(${theme.spacing(1)} + var(--TreeView-itemChildrenIndentation) * var(--TreeView-itemDepth))`,
  fontWeight: theme.typography.fontWeightMedium,
  '&[data-expanded]': {
    fontWeight: theme.typography.fontWeightRegular,
  },
  '&:hover': {
    backgroundColor: (theme.vars || theme).palette.action.hover,
  },
  '&[data-focused], &[data-selected], &[data-selected][data-focused]': {
    backgroundColor: `var(--tree-view-bg-color, ${(theme.vars || theme).palette.action.selected})`,
    color: 'var(--tree-view-color)',
  },
}));

const CustomTreeItemIconContainer = styled(TreeItemIconContainer)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const CustomTreeItem = React.forwardRef(function CustomTreeItem(props, ref) {
  const {
    id,
    itemId,
    label,
    disabled,
    children,
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    colorForDarkMode,
    bgColorForDarkMode,
    ...other
  } = props;

  const {
    getContextProviderProps,
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getLabelProps,
    getGroupTransitionProps,
    status,
  } = useTreeItem({ id, itemId, children, label, disabled, rootRef: ref });

  const treeItemRootOwnerState = {
    color,
    bgColor,
    colorForDarkMode,
    bgColorForDarkMode,
  };

  return (
    <TreeItemProvider {...getContextProviderProps()}>
      <CustomTreeItemRoot
        {...getRootProps(other)}
        ownerState={treeItemRootOwnerState}
      >
        <CustomTreeItemContent {...getContentProps()}>
          <CustomTreeItemIconContainer {...getIconContainerProps()}>
            <TreeItemIcon status={status} />
          </CustomTreeItemIconContainer>
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              p: 0.5,
              pr: 0,
            }}
          >
            <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
            <Typography
              {...getLabelProps({
                variant: 'body2',
                sx: { display: 'flex', fontWeight: 'inherit', flexGrow: 1 },
              })}
            />
            <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography>
          </Box>
        </CustomTreeItemContent>
        {children && <TreeItemGroupTransition {...getGroupTransitionProps()} />}
      </CustomTreeItemRoot>
    </TreeItemProvider>
  );
});

function EndIcon() {
  return <div style={{ width: 24 }} />;
}

export default function GmailTreeView() {
  return (
    <SimpleTreeView
      aria-label="gmail"
      defaultExpandedItems={['1']}
      defaultSelectedItems="5"
      slots={{
        expandIcon: ArrowRightIcon,
        collapseIcon: ArrowDropDownIcon,
        endIcon: EndIcon,
      }}
      sx={{ flexGrow: 1, maxWidth: 400, padding: '20px'}}
      itemChildrenIndentation={20}
    >
      <CustomTreeItem itemId="1" label="Paintings" labelIcon={MailIcon} >
        <CustomTreeItem
            itemId="1.1"
            label="Subject Matter"
            labelIcon={SupervisorAccountIcon}
            labelInfo="90"
            >
            <CustomTreeItem
            itemId="1.1.1"
            label="Abstract"
            labelIcon={SupervisorAccountIcon}
            labelInfo="90"
            />
            <CustomTreeItem
            itemId="1.1.2"
            label="Landscape"
            labelIcon={InfoIcon}
            labelInfo="2,294"
            />
            <CustomTreeItem
            itemId="1.1.3"
            label="Portrait"
            labelIcon={ForumIcon}
            labelInfo="3,566"
            />
            <CustomTreeItem
            itemId="1.1.4"
            label="Still Life"
            labelIcon={LocalOfferIcon}
            labelInfo="733"
            />
            <CustomTreeItem
            itemId="1.1.5"
            label="Urban"
            labelIcon={LocalOfferIcon}
            labelInfo="733"
            />
        </CustomTreeItem>
        <CustomTreeItem
            itemId="1.2"
            label="Sizes"
            labelIcon={InfoIcon}
            labelInfo="2,294"
            >
            <CustomTreeItem
            itemId="1.2.1"
            label="Small (<= 30m)"
            labelIcon={SupervisorAccountIcon}
            labelInfo="90"
            />
            <CustomTreeItem
            itemId="1.2.2"
            label="Medium (31–60cm)"
            labelIcon={InfoIcon}
            labelInfo="2,294"
            />
            <CustomTreeItem
            itemId="1.2.3"
            label="Large (61–100cm)"
            labelIcon={ForumIcon}
            labelInfo="3,566"
            />
            <CustomTreeItem
            itemId="1.2.4"
            label="Extra Large (> 100cm)"
            labelIcon={LocalOfferIcon}
            labelInfo="733"
            />
        </CustomTreeItem>
        <CustomTreeItem
            itemId="1.3"
            label="Material"
            labelIcon={ForumIcon}
            labelInfo="3,566"
            >
            <CustomTreeItem
            itemId="1.3.1"
            label="Acrylic on canvas"
            labelIcon={SupervisorAccountIcon}
            labelInfo="90"
            />
            <CustomTreeItem
            itemId="1.3.2"
            label="Mixed Media"
            labelIcon={InfoIcon}
            labelInfo="2,294"
            />
            <CustomTreeItem
            itemId="1.3.3"
            label="Water Colors"
            labelIcon={ForumIcon}
            labelInfo="3,566"
            />
            <CustomTreeItem
            itemId="1.3.4"
            label="Charcoal"
            labelIcon={LocalOfferIcon}
            labelInfo="733"
            />
        </CustomTreeItem>
            <CustomTreeItem
            itemId="1.4"
            label="Style"
            labelIcon={LocalOfferIcon}
            labelInfo="733"
            >
        
        <CustomTreeItem
            itemId="1.4.1"
            label="Minimalist"
            labelIcon={SupervisorAccountIcon}
            labelInfo="90"
            />
            <CustomTreeItem
            itemId="1.4.2"
            label="Expressionist"
            labelIcon={InfoIcon}
            labelInfo="2,294"
            />
            <CustomTreeItem
            itemId="1.4.3"
            label="Surrealistic"
            labelIcon={ForumIcon}
            labelInfo="3,566"
            />
            <CustomTreeItem
            itemId="1.4.4"
            label="Pop Art"
            labelIcon={LocalOfferIcon}
            labelInfo="733"
            />
        </CustomTreeItem>
        </CustomTreeItem>
      <CustomTreeItem itemId="2" label="Prints" labelIcon={DeleteIcon} >
      <CustomTreeItem
          itemId="2.1"
          label="A2 42×59.4 cm)"
          labelIcon={SupervisorAccountIcon}
          labelInfo="90"
          color="#1a73e8"
          bgColor="#e8f0fe"
          colorForDarkMode="#B8E7FB"
          bgColorForDarkMode={alpha('#00b4ff', 0.2)}
        />
        <CustomTreeItem
          itemId="2.2"
          label="A3 (29.7×42 cm)"
          labelIcon={InfoIcon}
          labelInfo="2,294"
          color="#e3742f"
          bgColor="#fcefe3"
          colorForDarkMode="#FFE2B7"
          bgColorForDarkMode={alpha('#ff8f00', 0.2)}
        />
        <CustomTreeItem
          itemId="2.3"
          label="A4 (21×29.7 cm)"
          labelIcon={ForumIcon}
          labelInfo="3,566"
          color="#a250f5"
          bgColor="#f3e8fd"
          colorForDarkMode="#D9B8FB"
          bgColorForDarkMode={alpha('#9035ff', 0.15)}
        />
        <CustomTreeItem
          itemId="2.4"
          label="A5"
          labelIcon={LocalOfferIcon}
          labelInfo="733"
          color="#3c8039"
          bgColor="#e6f4ea"
          colorForDarkMode="#CCE8CD"
          bgColorForDarkMode={alpha('#64ff6a', 0.2)}
        />
        </CustomTreeItem>
      <CustomTreeItem itemId="3" label="Custom Items" labelIcon={Label}>
        <CustomTreeItem
          itemId="3.1"
          label="Shoes"
          labelIcon={SupervisorAccountIcon}
          labelInfo="90"
        />
        <CustomTreeItem
          itemId="3.2"
          label="Handbags"
          labelIcon={InfoIcon}
          labelInfo="2,294"
        />
        <CustomTreeItem
          itemId="3.3"
          label="Skateboards"
          labelIcon={ForumIcon}
          labelInfo="3,566"
        />
      </CustomTreeItem>
    </SimpleTreeView>
  );
}