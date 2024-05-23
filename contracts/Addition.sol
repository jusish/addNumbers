// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Addition {
   int public sumation;
   constructor() public{
    sumation = 0;
   }
  function addTwoNumbers(int number1,int number2) public  {
      sumation = number1 + number2;
  }
  function displaySum() public view returns(int) {
    return sumation;
  }
}
