import React, { Component, PropTypes } from 'react';
const propTypes = {
};
const defaultProps = {
};
class Introduction extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      // carousel initialization
      $(document).ready(function(){
        $('.carousel').carousel();
      });

      return(
        <div>
          <div className="carousel">
            <img src="img/people/dan.jpg" className="carousel-item"/>
            <img src="img/people/leesm.jpg" className="carousel-item"/>
            <img src="img/people/gwang.jpg" className="carousel-item"/>
            <img src="img/people/jeongjo.PNG" className="carousel-item"/>
            <img src="img/people/ygs.jpg" className="carousel-item"/>
            <img src="img/people/mun.jpg" className="carousel-item"/>
            <img src="img/people/taejo.jpg" className="carousel-item"/>
            <img src="img/people/gojong.png" className="carousel-item"/>
            <img src="img/people/leess.jpg" className="carousel-item"/>
            <img src="img/people/gu.jpg" className="carousel-item"/>
            <img src="img/people/sd.jpg" className="carousel-item"/>
            <img src="img/people/yeonsan.png" className="carousel-item"/>
          </div>
          <div className="grey darken-2 white-text">
            <br/>
            <h5>단<span className="two">2</span>문 : 단군부터 문재인까지</h5>
            <p>단2문은 역사 관련 영화/드라마를 연대기순으로 볼 수 있는 곳입니다.<br/>
            영화/드라마 정보의 출처는 네이버, 위키백과, 나무위키입니다.
            </p>
            <br/>
          </div>
        </div>
      );
    }
}
Introduction.propTypes = propTypes;
Introduction.defaultProps = defaultProps;
export default Introduction;
