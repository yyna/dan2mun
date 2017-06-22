import React from 'react';
import { Link } from 'react-router';

class Admin extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="center">
          <br/><br/><div><h5>관리자 기능 :-)</h5></div>
        </div>
        <div>
          <div className="center">
            <ul>
              <li><Link to="/newdrama" className="waves-effect waves-light btn grey darken-3 myButton">새 영화, 드라마 추가</Link></li>
              <li><Link to="/viewerrors" className="waves-effect waves-light btn grey darken-3 myButton">오류 리포트 보기</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
