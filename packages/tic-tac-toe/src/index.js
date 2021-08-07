import React, { Component, useState } from "react";

export function useHelloWorld() {
  return useState("hello");
}
export default class extends Component {
  render() {
    return (
      <div>
        <h2>Welcome to TicTacToe components. Please feel free.</h2>
      </div>
    );
  }
}
