import React, { Component, useState } from "react";
import { Card, CardContent } from "@material-ui/core";
export function useHelloWorld() {
  return useState("hello");
}
export default class extends Component {
  render() {
    return (
      <div>
        <h2>Welcome to TicTacToe components. </h2>
        <Card>
          <CardContent>Please feel free.</CardContent>
        </Card>
      </div>
    );
  }
}
