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
        <div className="w-100 col-9">
        <img
          src={age}
          alt="age"
          style={{ maxWidth: '500px' }}
        />
        <p>Relationship between age at death (adult, child, infant, newborn) and the depth at which the individual was buried. </p>
        </div>
        <div className="w-100 col-9">
        <img
          src={facebundle}
          alt="facebundle"
          style={{ maxWidth: '500px' }}
        />
        <p>This boxplot shows the relationship between whether or not the individual was buried with face bundles and the depth at which the individual was buried. It appears that most people with face bundles were buried closer to the surface.</p>
        </div>
        <div className="w-100 col-9">
        <img
          src={sex}
          alt="sex"
          style={{ maxWidth: '500px' }}
        />
        <p>Relationship between sex and the depth at which the individual was buried. While the depth at which females are buried appear to be normally distributed, the depth at which male are buried is skewed to deeper more often.</p>
        </div>
        <div className="w-100 col-9">
        <img
          src={haircolor}
          alt="haircolor"
          style={{ maxWidth: '500px' }}
        />
        <p>Relationship between hair color and the depth at which the individual was buried. Individuals with red hair are almost always buried closer to the surface while those with black hair are generally buried in mid-ranges.</p>
        </div>
        <div className="w-100 col-9">
        <img
          src={southhead}
          alt="southhead"
          style={{ maxWidth: '500px' }}
        />
        <p>Relationship between the south to head value and depth at which the individual was buried. There appears to be little to no correlation between these factors.</p>
        </div>
        <div className="w-100 col-9">
        <img
          src={southfeet}
          alt="southfeet"
          style={{ maxWidth: '500px' }}
        />
        <p>Relationship between the south to feet value and depth at which the individual was buried. There appears to be little to no correlation between these factors.</p>
        </div>
        <div className="w-100 col-9">
        <img
          src={length}
          alt="length"
          style={{ maxWidth: '500px' }}
        />
        <p>Relationship between length of the burial area and depth at which the individual was buried. There appears to be little to no correlation between these factors.</p>
        </div>
        <div className="w-100 col-9">
        <img
          src={westhead}
          alt="westhead"
          style={{ maxWidth: '500px' }}
        />
        <p>Relationship between the west to head value and depth at which the individual was buried. There appears to be little to no correlation between these factors.</p>
        </div>
        <div className="w-100 col-9">
        <img
          src={westfeet}
          alt="westfeet"
          style={{ maxWidth: '500px' }}
        />
        <p>Relationship between the west to feet value and depth at which the individual was buried. There appears to be little to no correlation between these factors.</p>
        </div>
        <div className="w-100 col-9">
        <img
          src={preservation}
          alt="preservation"
          style={{ maxWidth: '500px' }}
        />
        <p>Relationship between the preservation level (0: poorly preserved, 4: well preserved) and depth at which the individual was buried. While individuals at a preservation level 1 can be found at nearly any depth, individuals at all other preservation levels are found at depths of around 0 to 2 meters.</p>
        </div>
      </div>
    );
  }
}
