---
title: "Computer Algorithms & What you need to know"
excerpt: ""
publishDate: "2023-08-17T11:39:36.050Z"
image: "https://images.unsplash.com/photo-1627163439134-7a8c47e08208"
category: "technology"
author: "brian-kariu"
tags: [web-dev]
---

### *Disclaimer: This is a test article remov*e*
### Binary Search
- [[Binary Search]] algorithm that reduces the search range by half each time.
- Similar to how a physical dictionary is used.
- It works by getting the middle element first, then checks if the target is to the left or right of the array. If its to the left we discard everything the right and vice versa.
- It can be done iteratively or recursively but the iterative version is o(1) while recursive version is o log(n) 
```python
from typing import List
2
3def binary_search(arr: List[int], target: int) -> int:
4    left, right = 0, len(arr) - 1
5    while left <= right:  # <= because left and right could point to the same element, < would miss it
6        mid = (left + right) // 2 # double slash for integer division in python 3, we don't have to worry about integer `left + right` overflow since python integers can be arbitrarily large
7        # found target, return its index
8        if arr[mid] == target:
9            return mid
10        # middle less than target, discard left half by making left search boundary `mid + 1`
11        if arr[mid] < target:
12            left = mid + 1
13        # middle greater than target, discard right half by making right search boundary `mid - 1`
14        else:
15            right = mid - 1
16    return -1 # if we get here we didn't hit above return so we didn't find target
17
18if __name__ == '__main__':
19    arr = [int(x) for x in input().split()]
20    target = int(input())
21    res = binary_search(arr, target)
22    print(res)
```

##### Notes
It's essential to understand and deduce the algorithm yourself instead of memorizing it. In an actual interview, interviewers may ask you additional questions to test your understanding, so simply memorizing the algorithm may not be enough to convince the interviewer.

Key elements in writing a correct binary search:

### 1. When to terminate the loop

Make sure the `while` loop has an equality comparison. Otherwise, we'd skip the loop and miss the potential match for the edge case of a one-element array.

### 2. Whether/how to update `left` and `right` boundary in the `if` conditions

Consider which side to discard. If `arr[mid]` is already smaller than the `target,` we should discard everything on the left by making `left = mid + 1`.

### 3. Should I discard the current element?

For vanilla binary search, we can discard it since it can't be the final answer if it is not equal to the target. There might be situations where you would want to think twice before discarding the current element. We'll discuss this in the next module.

### Depth First Search
##### Recursion Review
- [[Recursion]] is a concept where a function calls itself until it fulfills a certain condition.
- It has two parts:
	1. The base call or what is called the exit 
	2. Recursive call
- Behind the scenes the machine make use of the call stack.

##### Trees
- *NB Look into trees in depth [here](https://algo.monster/problems/tree_intro)

##### Depth First Search
- [[Depth First Search]] is an algorithm where we go as deep as we can in a tree to look for a value, if we don't find what we need we backtrack to find it somewhere else in the tree.
- Look at this example where we are looking for a target.
```python
def dfs(root, target):
2    if root is None:
3        return None
4    if root.val == target:
5        return root
6    # return non-null return value from the recursive calls
7    left = dfs(root.left, target)
8    if left is not None:
9        return left
10
11    # at this point, we know left is null, and right could be null or non-null
12    # we return right child's recursive call result directly because
13    # - if it's non-null we should return it
14    # - if it's null, then both left and right are null, we want to return null
15    return dfs(root.right, target)
16    # the code can be shortened to: return dfs(root.left, target) or dfs(root.right, target)
```
#### When to use DFS
###### Tree
- When you want to create, modify, delete or find a node in a tree
- Traversal and find a value
##### Combinatorial problems
- How many ways can you arrange something
- Find all possible combinations
- Find all solutions
##### Graph
- Find a path from A to B
- Find connected components
- Detected cycles.
### Breadth First Search
- [[Breadth First Search]] is similar to depth first search in that it traverses a tree, but instead of going deep it *goes through all nodes at the same level before moving to the next*
- Its useful for searching targets that are closer to the root.
```python
from collections import deque
2
3def bfs_by_queue(root):
4    queue = deque([root]) # at least one element in the queue to kick start bfs
5    while len(queue) > 0: # as long as there is an element in the queue 
6        node = queue.popleft() # dequeue
7        for child in node.children: # enqueue children
8            if OK(child): # early return if problem condition met
9                return FOUND(child)
10            queue.append(child)
11    return NOT_FOUND
```
#### Two pointer
- [[Two Pointers]] is an algorithm that solves problems involving an iterable structure like an array by using two pointers.
- It has various characteristics:
	1. Two moving pointers, regardless of directions, moving dependently or independently;
	2. A function that utilizes the entries referenced by the two pointers, which relates to the answer in a way;
	3. An easy way of deciding which pointer to move;
	4. A way to process the array when the pointers are moved.
#### Classifications
1. Same Direction
2. Opposite Direction
3. Sliding Window
#### Graph
- A tree is a connected acyclic(cycle-less) graph
- A [Graph] on the other hand contains cycles and nodes could be connected.
- Another difference is that a tree only has 1 path between 2 nodes while this isn't a must in a graph.
- Structure of a graph looks like this:

#### BFS on Graphs
- The difference between [Graph BFS] and normal BFS is that it deals with all graphs and you introduce the element of a node being visited.
- To do this we add an element of tracking the neighbours of a node and after appending the node we add it to the visited set.
```python
from collections import deque
2
3def bfs(root):
4    queue = deque([root])
5    visited = set([root])
6    while len(queue) > 0:
7        node = queue.popleft()
8        for neighbor in get_neighbors(node):
9            if neighbor in visited:
10                continue
11            queue.append(neighbor)
12            visited.add(neighbor)
```

DFS on Graphs
- [[Graph DFS]] follows the same logic as above.
```python
def dfs(root, visited)
	for neighbor in get_neighbors(root)
		if neighbor in visited
			continue
		visited.add(neighbor)
        dfs(neighbor, visited)
```

### Sorting Algorithms
##### Selection Sort
- S**election sort** is a simple and efficient sorting algorithm that works by repeatedly selecting the smallest (or largest) element from the unsorted portion of the list and moving it to the sorted portion of the list.
- In [[Grokking the coding Interview]] they use an example of trying to get the most popular song from a list.
- Selection sort works by going through the list, identify the smallest or largest value, then swap it with the minimum index
```python
unsorted_list = [3,6,2,7,1]
def selection_sort(unsorted_list):
    # Traverse through all array elements
    for i in range(len(unsorted_list)):
        # Find the minimum element in remaining
        # unsorted array
        min_idx = i
        for j in range(i+1, len(unsorted_list)):
            if unsorted_list[min_idx] > unsorted_list[j]:
                min_idx = j
        # Swap the found minimum element with
        # the first element      
        unsorted_list[i], unsorted_list[min_idx] = unsorted_list[min_idx], unsorted_list[i]
if __name__ == "__main__":
    selection_sort(unsorted_list)
    print(unsorted_list)
```