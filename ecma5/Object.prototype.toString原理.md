Object.prototype.toString的原理与对象的内部属性[[class]]有关

8.6.2 Object Internal Properties and Methods
This specification uses various internal properties to define the semantics of object values. These internal properties are not part of the ECMAScript language. They are defined by this specification purely for expository purposes. An implementation of ECMAScript must behave as if it produced and operated upon internal properties in the manner described here. The names of internal properties are enclosed in double square brackets [[ ]]. When an algorithm uses an internal property of an object and the object does not implement the indicated internal property, a TypeError exception is thrown.

**The Table 8 summarises the internal properties used by this specification that are applicable to all ECMAScript objects.** The Table 9 summarises the internal properties used by this specification that are only applicable to some ECMAScript objects. The descriptions in these tables indicate their behaviour for native ECMAScript objects, unless stated otherwise in this document for particular kinds of native ECMAScript objects. Host objects may support these internal properties with any implementation-dependent behaviour as long as it is consistent with the specific host object restrictions stated in this document.

The ―Value Type Domain‖ columns of the following tables define the types of values associated with internal properties. The type names refer to the types defined in Clause 8 augmented by the following additional names. ―any‖ means the value may be any ECMAScript language type. ―primitive‖ means Undefined, Null, Boolean, String, or Number. ―SpecOp‖ means the internal property is an internal method, an implementation provided procedure defined by an abstract operation specification. ―SpecOp‖ is followed by a list of descriptive parameter names. If a parameter name is the same as a type name then the name describes the type of the parameter. If a ―SpecOp‖ returns a value, its parameter list is followed by the symbol ―→‖ and the type of the returned value.

![image-20210520104629747](https://i.loli.net/2021/05/20/e4Rb7XtKELfPqjn.png)

对象的内部属性不是ecma语言的一部分，定义内部属性为了描述对象的属性和意图

Object.prototype.toString就使用了[[class]]内部属性

