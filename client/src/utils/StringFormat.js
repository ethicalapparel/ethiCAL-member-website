import React, { Component } from 'react';

const formatLine = (line) => {
  var convertLinks = line.split(" ")
    .map((word) => {
      return word.includes("https://") || word.includes("http://") ?
       <a href={word} target="_blank"> {word} </a> : " " + word;
    });
    // Trying to do links :(
  return <p> {convertLinks} </p>;
}
const DescFormat = (props) => {
  return props.text.split("\n").map(formatLine);
}

export default DescFormat;
