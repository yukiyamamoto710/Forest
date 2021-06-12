import React from 'react';
import PropTypes from 'prop-types';
import SRList from '../srlist';
import Characteristics from '../characteristics';
import { Data } from '../data';
import Stars from '../star';

const Rating = (props) => {
  const { rating, starsClicked } = props;
  const obj = { ...rating.ratings };
  const key = Object.keys(obj).sort();
  let num = 0;
  const keyArray = [...Array(5)].map(() => {
    num += 1;
    return String(num);
  });
  const valueArray = keyArray.map((i) => {
    if (obj[i] !== undefined) {
      return Number(obj[i]);
    }
    return 0;
  });
  const size = key.reduce((sum, i) => (sum + Number(obj[i])), 0);
  const perArray = valueArray.map((i) => Math.floor((i / size) * 100));
  const total = key.reduce((sum, i) => (sum + Number(i) * (Number(obj[i]))), 0);
  let ave = 0;
  if (size !== 0) {
    ave = Math.round((total / size) * 10) / 10;
  }
  let tNum = 0;
  if (rating.recommended.true) {
    tNum = Number(rating.recommended.true);
  }
  let fNum = 0;
  if (rating.recommended.false) {
    fNum = Number(rating.recommended.false);
  }
  let rAve = 0;
  if (tNum + fNum !== 0) {
    rAve = Math.floor((tNum / (tNum + fNum)) * 100);
  }
  let cKey = [];
  if (rating.characteristics !== undefined) {
    cKey = Object.keys(rating.characteristics);
  }
  return (
    <div
      className="rating"
      data-testid="rating"
    >
      <div
        className="ratingHead"
        data-testid="head"
      >
        {ave}
        <Stars rate={ave} />
      </div>
      <h5 data-testid="text">
        {`${rAve}% of reviews recommend this product`}
      </h5>
      <div data-testid="starList">
        <SRList
          star={keyArray.reverse()}
          ratingstar={starsClicked}
          per={perArray}
        />
      </div>
      {cKey.map((i) => (
        <div
          key={rating.characteristics[i].id}
          data-testid="characteristics"
        >
          <Characteristics
            array={Data[i]}
            name={i}
            value={rating.characteristics[i].value}
          />
        </div>
      ))}
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.shape({
    product_id: PropTypes.string,
    ratings: PropTypes.objectOf(PropTypes.string),
    recommended: PropTypes.objectOf(PropTypes.string),
    characteristics: PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.number,
        value: PropTypes.string,
      }),
    ),
  }),
  starsClicked: PropTypes.func,
};

Rating.defaultProps = {
  rating: {},
  starsClicked: () => 1,
};
export default Rating;
