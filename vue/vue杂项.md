组件名字大小写，横杠是如何转化的
组件名字：slideAdjuster
使用的时候slide-adjuster  slideAdjuster slide-Adjuster 都可以

再匹配组件名字的时候会进行驼峰转化和帕斯卡转化，先匹配原始字符串，不能匹配上再转化



function resolveAsset(options, type, id, warnMissing) {
    /* istanbul ignore if */
    if (typeof id !== "string") {
      return;
    }
    var assets = options[type];
    // check local registration variations first
    if (hasOwn(assets, id)) {
      return assets[id];
    }
    var camelizedId = camelize(id);
    if (hasOwn(assets, camelizedId)) {
      return assets[camelizedId];
    }
    var PascalCaseId = capitalize(camelizedId);
    if (hasOwn(assets, PascalCaseId)) {
      return assets[PascalCaseId];
    }
    // fallback to prototype chain
    var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
    if (warnMissing && !res) {
      warn("Failed to resolve " + type.slice(0, -1) + ": " + id, options);
    }
    return res;
  }




属性名字大小写，横杠是如何转化的


avoid using JavaScript keyword as property name: "class"
props可以接受静态或者非静态属性，也就是加冒号或者不加都可以，但不能使用html预留的属性

属性名字不加冒号是静态属性，加了冒号是变量属性