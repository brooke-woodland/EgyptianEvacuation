import React, { Component } from 'react';
import age from '../img/Age_at_Death.png';
import length from '../img/Length.png';
import sex from '../img/Sex.png';
import haircolor from '../img/Hair_Color.png';
import southhead from '../img/South_To_Head.png';
import southfeet from '../img/South_To_Feet.png';
import westhead from '../img/West_To_Head.png';
import westfeet from '../img/West_to_Feet.png';
import preservation from '../img/Preservation.png';
import facebundle from '../img/Face_Bundles.png';

export class UnsupervisedAnalysis extends Component {
  static displayName = UnsupervisedAnalysis.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1,
    });
  }

  render() {
    return (
      <div>
        <img
          src={age}
          alt="age"
          className="w-100 col-9"
          style={{ maxWidth: '500px' }}
        />
        <img
          src={facebundle}
          alt="facebundle"
          className="w-100 col-9"
          style={{ maxWidth: '500px' }}
        />
        <img
          src={sex}
          alt="sex"
          className="w-100 col-9 mt-5"
          style={{ maxWidth: '500px' }}
        />
        <img
          src={haircolor}
          alt="haircolor"
          className="w-100 col-9 mt-5"
          style={{ maxWidth: '500px' }}
        />
        <img
          src={southhead}
          alt="southhead"
          className="w-100 col-9 mt-5"
          style={{ maxWidth: '500px' }}
        />
        <img
          src={southfeet}
          alt="southfeet"
          className="w-100 col-9 mt-5"
          style={{ maxWidth: '500px' }}
        />
        <img
          src={length}
          alt="length"
          className="w-100 col-9 mt-5"
          style={{ maxWidth: '500px' }}
        />
        <img
          src={westhead}
          alt="westhead"
          className="w-100 col-9 mt-5"
          style={{ maxWidth: '500px' }}
        />
        <img
          src={westfeet}
          alt="westfeet"
          className="w-100 col-9 mt-5"
          style={{ maxWidth: '500px' }}
        />
        <img
          src={preservation}
          alt="preservation"
          className="w-100 col-9 mt-5"
          style={{ maxWidth: '500px' }}
        />
      </div>
    );
  }
}
