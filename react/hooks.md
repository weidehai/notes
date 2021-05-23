react中，性能的优化点在于：

1. 调用setState，就会触发组件的重新渲染，无论前后的state是否不同
2. 父组件更新，子组件也会自动的更新



基于上面的两点，我们通常的解决方案是：使用immutable进行比较，在不相等的时候调用setState；在shouldComponentUpdate中判断前后的props和state，如果没有变化，则返回false来阻止更新。





## useCallback的应用场景

有一个父组件，其中包含子组件，子组件接收一个函数作为props；通常而言，如果父组件更新了，子组件也会执行更新；但是大多数场景下，更新是没有必要的，我们可以借助useCallback来返回函数，然后把这个函数作为props传递给子组件；这样，子组件就能避免不必要的更新。