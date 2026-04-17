import React from 'react';
import { Drawer, IconButton, List, ListItem, ListSubheader, TextField } from '@mui/material';
import { createPortal } from 'react-dom';
import {
  useIsInsertMode,
  useUiTranslator,
  useDisplayModeReferenceNodeId,
  useAllCellPluginsForNode,
  useSetEditMode,
} from '../../core/components/hooks';
import type { CellPlugin } from '../../core/types';
import Item from './Item/index';
import { CancelOutlined } from '@mui/icons-material';

export interface PluginDrawerLabels {
  noPluginFoundContent: string;
  searchPlaceholder: string;
  insertPlugin: string;
  dragMe: string;
}
import { ThemeProvider } from '@mui/material';
import { defaultTheme } from '../defaultTheme';


const getPluginTitle = (plugin: CellPlugin) =>
  (plugin.title || plugin.text) ?? '';

export const PluginDrawer: React.FC = React.memo(() => {
  const defaultLabels: PluginDrawerLabels = {
    noPluginFoundContent: 'No blocks found',
    searchPlaceholder: 'Search for blocks',
    insertPlugin: 'Add blocks to page',
    dragMe: 'Drag me!',
  };
  const nodeId = useDisplayModeReferenceNodeId();
  const plugins = useAllCellPluginsForNode(nodeId);
  const setEditMode = useSetEditMode();

  const { t } = useUiTranslator();
  const [searchText, setSearchText] = React.useState<string>('');
  const searchFilter = React.useCallback(
    (plugin: CellPlugin) => {
      const id = plugin.id;
      const title = getPluginTitle(plugin);

      return (
        plugin &&
        id &&
        !plugin.hideInMenu &&
        (id.toLowerCase().includes(searchText?.toLowerCase()) ||
          (plugin.description &&
            plugin.description
              .toLowerCase()
              .includes(searchText?.toLowerCase())) ||
          (title && title.toLowerCase().includes(searchText?.toLowerCase())))
      );
    },
    [searchText]
  );

  const onSearch = React.useCallback(
    (e: React.ChangeEvent) => {
      const target = e.target;
      if (target instanceof HTMLInputElement) {
        setSearchText(target.value);
      }
    },
    [setSearchText]
  );
  const isInsertMode = useIsInsertMode();
  const inputRef = React.useRef<HTMLInputElement>();
  React.useEffect(() => {
    let handle: NodeJS.Timeout;
    if (inputRef.current && isInsertMode) {
      handle = setTimeout(() => {
        const e = inputRef?.current?.querySelector('input');
        if (e) {
          e.focus();
        }
      }, 100);
    }

    return () => {
      clearTimeout(handle);
    };
  }, [inputRef.current, isInsertMode]);

  const filteredPlugins = plugins.filter(searchFilter);

  const portalContent = (
    <Drawer
      variant="persistent"
      className="react-page-plugin-drawer"
      open={isInsertMode}
      PaperProps={{
        style: {
          width: 320,
        },
      }}
    >


      <List
        subheader={
          <ListSubheader>
            {t(defaultLabels.insertPlugin)}

            <IconButton
              sx={{
                float: "right",
                mt: 0.5,
              }}
              onClick={() => setEditMode()}
            >
              <CancelOutlined />
            </IconButton>

          </ListSubheader>
        }
      >
        <ListItem>
          <TextField
            inputRef={inputRef}
            placeholder={t(defaultLabels.searchPlaceholder) ?? ''}
            fullWidth={true}
            onChange={onSearch}
          />
        </ListItem>
        {filteredPlugins.length === 0 && (
          <ListSubheader>
            {t(defaultLabels.noPluginFoundContent)}
          </ListSubheader>
        )}
      </List>
      {filteredPlugins.length > 0 && (
        <List>
          {filteredPlugins.map((plugin, k: number) => {
            return (
              <Item
                translations={defaultLabels}
                plugin={plugin}
                key={k.toString()}
                insert={{
                  plugin: plugin.id,
                }}
              />
            );
          })}
        </List>
      )}
    </Drawer>
  );

  if (typeof document === 'undefined') {
    return null;
  }
  return (
    <>
      {createPortal(
        <ThemeProvider theme={defaultTheme}>{portalContent}</ThemeProvider>,
        document.body
      )}
    </>
  );
});
