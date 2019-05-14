import React from 'react';
import logo from './logo.svg';
import './Dashboard.css';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';

const WidgetList: React.FC = () => {

  const tileData = [
    {
      img:'http://www.google.com/intl/en_ALL/images/logo.gif',
      title: 'Sample',
      author: 'Samuel',
      cols: 2,
      featured: true,
    },
    {
      img:'http://www.google.com/intl/en_ALL/images/logo.gif',
      title: 'Sample2',
      author: 'Samuel Again',
      cols: 2,
      featured: true,
    },
    {
      img:'http://www.google.com/intl/en_ALL/images/logo.gif',
      title: 'Sample2',
      author: 'Samuel Again',
      cols: 2,
      featured: true,
    },
    {
      img:'http://www.google.com/intl/en_ALL/images/logo.gif',
      title: 'Sample2',
      author: 'Samuel Again',
      cols: 2,
      featured: true,
    },
    {
      img:'http://www.google.com/intl/en_ALL/images/logo.gif',
      title: 'Sample2',
      author: 'Samuel Again',
      cols: 2,
      featured: true,
    },
  ];
  return (
    <div className='widgetlist-div'>
      <GridList>
        {tileData.map(tile => (
          <GridListTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.title}/>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default WidgetList;
