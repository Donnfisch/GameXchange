import React from "react";
import PropTypes from "prop-types";
import "./styles/Games.css";

const GameItem = ({ game, changeGameStatus }) => {
  const { id, title, platform, region, publisher, version, inventories } = game;
  const { have, want, trade } = inventories[0];
  return (
    <tr>
      <td width="10" className="inventoryCheckbox">
        <input
          type="checkbox"
          value={id}
          checked={have}
          onChange={changeGameStatus.bind(this, !have, want, trade, id)}
        />
      </td>
      <td width="10" className="inventoryCheckbox">
        <input
          type="checkbox"
          value={id}
          checked={want}
          onChange={changeGameStatus.bind(this, have, !want, trade, id)}
        />
      </td>
      <td width="10" className="inventoryCheckbox">
        <input
          type="checkbox"
          value={id}
          checked={trade}
          onChange={changeGameStatus.bind(this, have, want, !trade, id)}
        />
      </td>
      <td>{title}</td>
      <td>{platform}</td>
      <td>{region}</td>
      <td>{publisher}</td>
      <td>{version}</td>
    </tr>
  );
};

GameItem.propTypes = {
  game: PropTypes.object.isRequired,
  changeGameStatus: PropTypes.func.isRequired
};

export default GameItem;
