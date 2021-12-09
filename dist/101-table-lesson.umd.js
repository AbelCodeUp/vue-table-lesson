(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["101-table-lesson"] = global["101-table-lesson"] || {}));
})(this, (function (exports) { 'use strict';

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script = {
    name: "VTableLesson",

    data() {
      return {
        labelMin: 5,
        labelHeight: 26,
        labelWidth: 93,
        allPoints: [],
        allLessonItem: [],
        dataCenterWidth: 8
      };
    },

    props: ['lessonData', 'pageWeekOne'],
    computed: {
      thisWeekOne() {
        return this.pageWeekOne;
      }

    },
    watch: {
      lessonData(val) {
        this.allLessonItem = [];

        if (val) {
          this.allLessonItem = this.getAllLessonItem(val);
          this.allPoints = this.getAllAreaPrints(this.allLessonItem);
        }
      }

    },

    mounted() {// this.allLessonItem = this.getAllLessonItem(this.lessonData);
      // this.allPoints = this.getAllAreaPrints(_.cloneDeep(this.allLessonItem));
    },

    methods: {
      // 获取X轴所有时间点
      getAllAreaPrints(allLessonItem) {
        if (!allLessonItem[0]) return [];
        var maxPoint = allLessonItem[allLessonItem.length - 1].endAt;
        var minPoint = allLessonItem[0].startAt;
        var minHour = minPoint.split(':')[0];
        var maxHour = maxPoint.split(':')[0];
        var diff = maxHour - minHour + 2;
        var newArr = new Array(diff).fill('').map(function (el, index) {
          var hour = Number(minHour) + index;
          return (hour < 10 ? '0' + hour : hour) + ':00';
        });
        return newArr;
      },

      // 获取所有课程块
      getAllLessonItem(lessonList) {
        var _this = this;

        var labelMin = this.labelMin,
            labelHeight = this.labelHeight,
            labelWidth = this.labelWidth;
        var allLesson = [];
        Object.keys(lessonList).forEach(function (el) {
          if (lessonList[el]) {
            allLesson = [].concat(_toConsumableArray(allLesson), _toConsumableArray(lessonList[el]));
          }
        });

        if (!allLesson.length) {
          return [];
        } // 筛选出所有想同Levelid的项


        var renderLessonJSON = {};

        for (var i = 0; i < allLesson.length; i++) {
          var item = allLesson[i];

          if (!renderLessonJSON[item.levelId]) {
            renderLessonJSON[item.levelId] = [item];
          } else {
            renderLessonJSON[item.levelId].push(item);
          }
        } // 连续的课程生成二维数组


        var targetArr = [];
        Object.keys(renderLessonJSON).forEach(function (el) {
          var itemArr = renderLessonJSON[el];

          for (var _i = 0; _i < itemArr.length; _i++) {
            var irr = itemArr[_i];

            if (_i >= 1 && irr.date - itemArr[_i - 1].date == 1 && irr.startAt == itemArr[_i - 1].startAt && irr.endAt == itemArr[_i - 1].endAt) {
              targetArr[targetArr.length - 1].push(irr);
            } else {
              var newArr = [irr];
              targetArr.push(newArr);
            }
          }
        });
        var newRlLesson = [];
        targetArr.forEach(function (el) {
          var rlItem = {};
          var rlData = el[0];

          var date = _this.formatDay(rlData.date);

          rlItem.date = date;
          rlItem.startAt = rlData.startAt;
          rlItem.endAt = rlData.endAt;
          rlItem.dataWidth = el.length * labelWidth;
          rlItem.name = rlData.level1; // 计算课程时长

          var dateDiff = (new Date(date + ' ' + rlData.endAt).getTime() - new Date(date + ' ' + rlData.startAt).getTime()) / 1000 / 60;
          var oneDateHeight = dateDiff / labelMin;
          var dateHeight = oneDateHeight * labelHeight;
          rlItem.dataHeight = dateHeight - _this.dataCenterWidth < 1 ? 1 : dateHeight - _this.dataCenterWidth;
          rlItem.mins = dateDiff;
          rlItem.typeColor = rlData.typeColor;
          rlItem.typeBgColor = rlData.typeBgColor;
          newRlLesson.push(rlItem);
        }); // 排序

        newRlLesson.sort(this.compare('startAt')); // 最小开始时间

        var minTimeStartAt = newRlLesson[0].startAt; // 最小时间分钟数

        var minTimeStartAtTimeArr = minTimeStartAt.split(':');
        var minTimeStartAtMins = Number(minTimeStartAtTimeArr[0]) * 60 + Number(minTimeStartAtTimeArr[1]); // 取得课程块的开始坐标 top left

        newRlLesson = newRlLesson.map(function (el, index) {
          // 当前开始时间总分钟
          var timeArr = el.startAt.split(':');
          var _hour = timeArr[0];
          var _mins = timeArr[1];
          var sumMins = Number(_hour) * 60 + Number(_mins); // 计算间隔 top

          var diffMins = (sumMins - minTimeStartAtMins) / labelMin * labelHeight;
          el.top = diffMins + _this.dataCenterWidth;
          var diffDays = (new Date(el.date).getTime() - new Date(_this.thisWeekOne).getTime()) / 1000 / 60 / 60 / 24 * labelWidth;
          el.left = diffDays + 10;
          return el;
        });
        return newRlLesson;
      },

      formatDay(date) {
        return date.substr(0, 4) + '/' + date.substr(4, 2) + '/' + date.substr(6, 2);
      },

      findLessonList(arr) {},

      compare(p) {
        //比较函数
        return function (m, n) {
          var val1 = m[p];
          var val2 = n[p];

          if (val1 < val2) {
            return -1;
          } else if (val1 > val2) {
            return 1;
          } else {
            return 0;
          }
        };
      }

    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  /* script */
  const __vue_script__ = script;
  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _vm.allLessonItem.length
      ? _c("div", { staticClass: "container" }, [
          _c("div", { staticClass: "container-schedule" }, [
            _c("div", { staticClass: "container-schedule-time-ground" }, [
              _c(
                "ul",
                _vm._l(_vm.allPoints, function(item, index) {
                  return _c(
                    "li",
                    {
                      key: index,
                      staticClass: "container-schedule-time-ground-item",
                      style: { height: _vm.labelHeight * 12 + 1 + "px" }
                    },
                    [
                      _c(
                        "span",
                        {
                          staticClass: "container-schedule-time-ground-item-text"
                        },
                        [_vm._v(_vm._s(item))]
                      ),
                      _vm._v(" "),
                      _c("p", {
                        staticClass: "container-schedule-time-ground-item-line",
                        style: { top: (_vm.labelHeight * 12 + 2) / 2 + "px" }
                      })
                    ]
                  )
                }),
                0
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "container-schedule-task-ground" },
              _vm._l(_vm.allLessonItem, function(item, index) {
                return _c(
                  "div",
                  {
                    key: index,
                    staticClass: "container-schedule-task-ground-item",
                    style: {
                      width: item.dataWidth + "px",
                      height: item.dataHeight + "px",
                      top: item.top + "px",
                      left: item.left + "px",
                      color: item.typeColor,
                      background: item.typeBgColor,
                      borderColor: item.typeColor
                    }
                  },
                  [
                    _c(
                      "p",
                      {
                        staticClass: "container-schedule-task-ground-item-text",
                        class: { "item-over": item.mins > 5 && item.mins <= 10 }
                      },
                      [
                        _vm._v(
                          "\n\t\t\t\t\t" +
                            _vm._s(
                              item.dataHeight <= _vm.labelHeight ? "" : item.name
                            )
                        )
                      ]
                    )
                  ]
                )
              }),
              0
            )
          ])
        ])
      : _c("div", { staticClass: "time-default" }, [
          _c("img", {
            staticClass: "default-img",
            attrs: {
              src:
                "https://tal-101-static.oss-cn-beijing.aliyuncs.com/wxapp/parent/center/icon-center-default.png"
            }
          }),
          _vm._v(" "),
          _c("p", [_vm._v("本周还没有课表")])
        ])
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = undefined;
    /* scoped */
    const __vue_scope_id__ = "data-v-32ae35df";
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Main = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      undefined,
      undefined
    );

  var components = [Main];

  var install = function install(Vue) {
    components.forEach(function (component) {
      Vue.component(component.name, component);
    });
  };

  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  exports["default"] = install;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
