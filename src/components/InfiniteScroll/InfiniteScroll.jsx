import { faker } from "@faker-js/faker";
import React, { Component } from "react";

export class InfiniteScroll extends Component {
  state = {
    lines: 100,
    count: [],
  };
  componentDidMount() {
    // let observer = new MutationObserver((mutationRecords) => {
    //   console.log("observer called", mutationRecords);
    // });
    // observer.observe(document.body, {
    //   childList: true, // observe direct children
    //   subtree: true,
    //   characterDataOldValue: true
    // });
    // setInterval(() =>{
    //   // this.setState(prevState => ({ count: [...prevState.count, prevState.count.length] }));
    // }, 2000)
    window.onscroll = this.onScrollDocument;
  }
  onScrollDocument = () => {
    console.log(
      "scroll event",
      window.scrollY,
      document.body.clientHeight,
      document.body.getBoundingClientRect(),
      document.body.scrollHeight,
      document.body.offsetHeight
    );
    if (
      document.body.scrollHeight <
      window.scrollY + window.outerHeight + 100
    ) {
      this.setState((prevState) => ({ lines: prevState.lines + 10 }));
    }
  };

  // console.log(window.cookieStore, window.getParams);
  // window.confirm('Are you sure');
  // setTimeout(() => {
  //   // window.close();
  //   console.log(window.createImageBitmap(document.getElementById('canvas')));
  // }, 3000);
  render() {
    return (
      <>
        <h1>{faker.lorem.lines(this.state.lines)}</h1>
        {/* <h1>{this.state.count.length}</h1> */}
      </>
    );
  }
}

export default InfiniteScroll;
