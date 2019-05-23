const initialData = {
  widgets: {
    'widget-1': { id: 'widget-1', content: 'clock widget' },
    'widget-2': { id: 'widget-2', content: 'instagram widget' },
    'widget-3': { id: 'widget-3', content: 'schedule widget' },
  },
  sections: {
    'dashboard': {
      id: 'dashboard',
      title: 'Dashboard',
      widgetIds: ['widget-1', 'widget-2', 'widget-3'],
    },
    'widgetList': {
      id: 'widgetList',
      title: 'Widget List',
      widgetIds: [],
    },
  },
  sectionOrder: ['section-1', 'section-2'],
};

export default initialData;
