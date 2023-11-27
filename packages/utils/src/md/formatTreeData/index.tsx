const formatTreeData = (data: any) => {
  let copyData = Array.isArray(data) ? JSON.parse(JSON.stringify(data)) : [];
  function _formatAndGetIds(data: any[]) {
    if (Array.isArray(data) && data.length > 0) {
      for (const item of data) {
        item.type = String(item.type);
        item.path = item.routeUrl;
        item.icon = item.icon && (
          <i
            className={`ri-${item.icon} ant-menu-item-icon`}
            style={{ verticalAlign: 'bottom' }}
          ></i>
        );
        item.hideInMenu = false;
        if (item.type === '3') {
          item.path = item.routeUrl || '/blank';
          item.hideInMenu = true;
        }
        if (item.children && item.children.length > 0) {
          _formatAndGetIds(item.children);
        }
      }
    }
  }

  _formatAndGetIds(copyData);
  return copyData;
};

export default formatTreeData;
