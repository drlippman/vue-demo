<template>
  <div class="menubutton"
    @keyup.esc="toggleOpen(true)"
    @keydown.up.prevent = "handleUpDown(-1)"
    @keydown.down.prevent = "handleUpDown(1)"
    @keydown = "handleKeys"
  >
    <button
      :id = "id"
      ref = "button"
      :tabindex = "open?-1:0"
      :class = "{'nobutton': !!nobutton}"
      aria-haspopup = "true"
      :aria-controls = "id + '_wrap'"
      :aria-expanded = "open?'true':'false'"
      @click = "toggleOpen"
      @keydown.space.prevent = "toggleOpen"
      @blur = "handleBlur"
      @focus = "handleFocus"
    >
      <slot v-if="!hasButton" :option="options[selected]"></slot>
      <slot v-if="hasButton" name=button></slot>
      <i v-if="!noarrow" class="fa fa-caret-down" style="margin-left: 10px" ></i>
    </button>
    <ul
      v-if="open"
      role = "menu"
      :aria-labelledby="id"
      :aria-activedescendant="id + '_' + curSelected"
      :id = "id + '_wrap'"
      tabindex = "-1"
      :class = "{'menubutton-right': position=='right'}"
      @focus = "handleFocus"
      @blur = "handleBlur"
    >
      <li v-if="!!header" class="menubutton-header">
        {{ header }}
      </li>
      <li v-for="(option,index) in options"
        :key="index"
      >
        <router-link v-if="!!option.link"
          :to = "option.link"
          :id = "id + '_' + index"
          :class="{'menubutton-focus': index==curSelected}"
          @mouseover.native = "curSelected = index"
          @click.native = "toggleOpen"
          @blur.native = "handleBlur"
          @focus.native = "handleFocus"
          role = "menuitem"
          tabindex = "-1"
        >
          <slot v-if="hasSlot" :option="option"></slot>
          <template v-if="!hasSlot">
            {{option.title}}
          </template>
        </router-link>
        <a v-if="!!option.url"
          :href = "option.url"
          target = "_blank"
          :id = "id + '_' + index"
          :class="{'menubutton-focus': index==curSelected}"
          @mouseover = "curSelected = index"
          @click = "toggleOpen"
          @blur = "handleBlur"
          @focus = "handleFocus"
          role = "menuitem"
          tabindex = "-1"
        >
          <slot v-if="hasSlot" :option="option"></slot>
          <template v-if="!hasSlot">
            {{option.title}}
          </template>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
//curSelected = index
//This menu button follows the patterns recommended at
// https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-actions-active-descendant.html

export default {
  name: 'MenuButton',
  model: {
    prop: 'selected',
    event: 'change'
  },
  props: ['options', 'selected', 'id', 'header', 'nobutton', 'noarrow', 'position'],
  data: function() {
    return {
      open: false,
      curSelected: 0,
      keybuffer: '',
      closetimer: null
    }
  },
  computed: {
    hasButton () {
      return !!this.$scopedSlots['button']
    },
    hasSlot () {
      return !!this.$scopedSlots['default']
    }
  },
  methods: {
    toggleOpen (val) {
      if (typeof val == "Boolean") {
        this.open = val;
      } else {
        this.open = !this.open;
      }
      if (this.open) { //now open
        this.curSelected = !!this.selected?this.selected:0;
        this.$nextTick(this.setMenuHeight);
        this.$nextTick(this.scrollToCurrent);
        this.$nextTick(()=>{document.getElementById(this.id + "_" + this.curSelected).focus()});
      } else {
        this.$nextTick(()=>{document.getElementById(this.id).focus()});
      }
    },
    setMenuHeight () {
      let wrapper = document.getElementById(this.id + "_wrap");
      let wrapperHeight = wrapper.clientHeight;
      let wrapperTop = wrapper.getBoundingClientRect().top;
      let windowHeight = window.innerHeight;
      if (wrapperTop + wrapperHeight > windowHeight - 30) {
        wrapper.style.height = (windowHeight - wrapperTop - 30) + "px";
      } else {
        wrapper.style.height = "auto";
      }
    },
    scrollToCurrent () {
      let selectedEl = document.getElementById(this.id + "_" + this.curSelected);
      let selectedPos = selectedEl.offsetTop;
      let selectedHeight = selectedEl.clientHeight;
      let wrapper = document.getElementById(this.id + "_wrap");
      let wrapperHeight = wrapper.clientHeight;
      let offset = selectedPos - (wrapperHeight/2 - selectedHeight/2);
      wrapper.scrollTop = offset;
    },
    handleUpDown (val) {
      if (!this.open) {
        this.toggleOpen();
        if (val==1) {
          this.curSelected = 0
        } else if (val==-1) {
          this.curSelected = this.options.length-1;
        }
      } else {
        this.curSelected = (this.curSelected + val + this.options.length)%this.options.length;
      }
      this.$nextTick(()=>{document.getElementById(this.id + "_" + this.curSelected).focus()});
    },
    processKeyBuffer () {
      if (this.keybuffer != '') {
        let val = parseInt(this.keybuffer);
        if (val >= 0 && val < this.options.length) {
          this.curSelected = val;
          this.$nextTick(this.scrollToCurrent);
        }
      }
      this.keybuffer = '';
    },
    handleKeys (event) {
      if (this.open) {
        let key = event.key;
        if (key == 'Home') {
          this.curSelected = 0;
        } else if (key == 'End') {
          this.curSelected = this.options.length-1;
        } else if (key >= '0' && key <= '9') {
          this.keybuffer += key;
          setTimeout(this.processKeyBuffer, 300);
        }
      }
    },
    handleBlur () {
      this.closetimer = setTimeout(() => {this.open = false;}, 50);
    },
    handleFocus () {
      clearTimeout(this.closetimer);
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.menubutton {
  position: relative;
}
.menubutton-right {
  right: 0px;
}
.menubutton button {
  margin: 0;
  padding: 8px 20px;
  background-color: #fff;
  color: #000;
  border-radius: 0;
}
.menubutton button.nobutton {
  border: 0;
  padding: 0;
}
.menubutton-focus {
  background-color: #f0f0f0;
}
.menubutton ul {
  background-color: #fff;
  display: block;
  position: absolute;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  box-shadow: 0 2px 32px 0 rgba(145, 158, 171, 0.3), 0 1px 3px 0 rgba(63, 63, 68, 0.15), 0 0 0 1px rgba(63, 63, 68, 0.05);
}
.menubutton li {
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #ddd;
}
.menubutton li a {
  padding: 12px 20px;
  display: block;
  white-space: nowrap;
}
li.menubutton-header {
  padding: 12px 20px;
  display: block;
  font-weight: bold;
}
.menubutton a, .menubutton a:hover, .menubutton a:focus, .menubutton a:active {
  text-decoration: none;
  outline: none;
}
.menubutton a, .menubutton a:hover, .menubutton a:focus, .menubutton a:visited {
  color: #000;
}
.menubutton ul::-webkit-scrollbar {
    width: 12px;
}

.menubutton ul::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
}

.menubutton ul::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
}
</style>
