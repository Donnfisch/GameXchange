/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';

const TradeItem = ({ trade }) => {
  const { game } = trade;
  const {
    title, platform, region,
  } = game;
  return (
    <tr>
      <td>
        {title}
      </td>
      <td>
        {platform}
      </td>
      <td>
        {region}
      </td>
    </tr>
  );
};


TradeItem.propTypes = { trade: PropTypes.array.isRequired };

export default TradeItem;
