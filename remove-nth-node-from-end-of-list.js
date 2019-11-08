// Given a linked list, remove the n-th node from the end of list and return its head.

// Example:

// Given linked list: 1->2->3->4->5, and n = 2.

// After removing the second node from the end, the linked list becomes 1->2->3->5.
// Note:

// Given n will always be valid.

// Follow up:

// Could you do this in one pass?

// https://leetcode.com/problems/remove-nth-node-from-end-of-list/

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  let endPoint = head,
    curr,
    prev;
  let i = 0;
  while (i < n) {
    endPoint = endPoint.next;
    i++;
    if(endPoint === null && i < n) return null;
  }
  // console.log('EndPoint Val:',endPoint.val)
  prev = head;
  curr = prev.next;
  if(endPoint === null) return head.next

  while (endPoint.next != null) {
    curr = curr.next;
    prev = prev.next;
    endPoint = endPoint.next;
  }
  // console.log('Curr Val:',curr.val)
  // console.log('prev Val:',prev.val)

  prev.next = curr.next;
  return head;
};

function ListNode(val) {
  this.val = val;
  this.next = null; 
}

function makeList(array) {
  const head = new ListNode(array[0]);
  let curr = head;
  for (let i = 1; i < array.length; i++) {
    const element = array[i];
    const newNode = new ListNode(element);
    curr.next = newNode;
    curr = newNode;
  }
  return head;
}

let list = makeList([1,2])


let out = removeNthFromEnd(list,2);

console.log("Answer",out);
