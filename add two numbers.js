/**
 * Definition for singly-linked list.

 * }
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

function ListNode(val) {
  this.val = val;
  this.next = null;
}

function getListAdder(list) {
  const head = list;
  let curr = head;
  function addNumberToList(num) {
    const newNode = new ListNode(num);
    console.log(curr);
    console.log(`num:${num}`);
    curr.next = newNode;
    curr = newNode;
  }
  return addNumberToList;
}

var addTwoNumbers = function(l1, l2) {
  //add two numbers until one or both run out
  //carry over if greater than 10
  let carry = 0;
  let resultHead = null;
  let addToList;
  while (l1 != null && l2 != null) {
    let newVal = l1.val + l2.val + carry;
    carry = 0;
    if (newVal >= 10) {
      newVal -= 10;
      carry = 1;
    }

    if (resultHead === null) {
      resultHead = new ListNode(newVal);
      addToList = getListAdder(resultHead);
    } else {
      addToList(newVal);
    }
    l1 = l1.next;
    l2 = l2.next;
  }
  //expect one or both to be null here
  let remainder = l1 ? l1 : (l2 ? l2 : null);

  while (remainder) {
    let newVal = remainder.val + carry;
    carry = 0;
    if (newVal >= 10) {
      carry = 1;
      newVal -= 10;
    }
    addToList(newVal);
    remainder = remainder.next;
  }

  if (carry) {
    addToList(carry);
  }

  return resultHead;
};

function makeList(num) {
  num = num.toString();
  const head = new ListNode(parseInt(num[0]));
  let curr = head;
  for (let i = 1; i < num.length; i++) {
    const element = num[i];
    const newNode = new ListNode(parseInt(element));
    curr.next = newNode;
    curr = newNode;
  }
  return head;
}

function printList(list) {
  let out = "";
  while (list) {
    out += list.val;
    list = list.next;
  }
  console.log(
    out
      .split("")
      .reverse()
      .join("")
  );
}

const myList = makeList(18);
const myList2 = makeList(0);

out = addTwoNumbers(myList, myList2);

printList(out);
