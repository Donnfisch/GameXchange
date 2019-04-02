import React from 'react';
import PropTypes from "prop-types";

const MatchItem = props => {
  const { match } = props;
  const { game, user } = match;
  const {
    title, platform, region, publisher, version,
  } = game;
  const { username, email } = user;
  return (
    <React.Fragment>
      <td>
        {title}
      </td>
      <td>
        {platform}
      </td>
      <td>
        {region}
      </td>
      <td>
        {publisher}
      </td>
      <td>
        {version}
      </td>
      <td>
        {username}
      </td>
      <td>
        {email}
      </td>
    </React.Fragment>

  );
};

MatchItem.propTypes = {
  match: PropTypes.object.isRequired,
};

export default MatchItem;
