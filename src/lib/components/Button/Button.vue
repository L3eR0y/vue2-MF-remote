<template>
  <component class="sui-button" :is="getComponent" @click="onClick" :disabled="disabled" :class="[buttonClasses]" v-bind="getProps">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    variant:{
      type:String,
      default:'primary',
      required:true,
      validator: (val) => {
        return [
          'primary',
          'secondary',
          'tertiary',
          'light',
          'icon',
          'transparent',
        ].includes(val)
      },
    },
    disabled:{
      type:Boolean,
      default:false
    },
    size:{
      type:String,
      default:'large'
    },
    wide:{
      type:Boolean,
      default:false
    },
    type: {
      type:String,
      default:'button'
    },
    to:{
      type:[Object, String],
      default:()=>({})
    },
    href:{
      type:String,
      default:''
    }
  },

  computed: {
    getComponent(){
      if(this.href){
        return 'a'
      } else if(Object.keys(this.to).length){
        return 'router-link'
      } else {
        return 'button'
      }
    },
    getProps(){
      if(this.href){
        return {href:this.href, target:'_blank'}
      } else if(Object.keys(this.to).length){
        return {to:this.to}
      } else {
        return {type:this.type}
      }
    },
    buttonClasses(){
      return [`sui-button--${this.variant}`, `sui-button--${this.size}`,{'sui-button--wide':this.wide}]
    }
  },

  methods: {
    onClick(e){
      this.$emit('click', e)
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/scss/index.scss';

:deep(){
  font-weight: var(--font-weight-button-default);
  line-height: var(--line-height-button-default);
}
.sui-button {
  padding: 0 rem(27px);
  display: inline-flex;
  align-items:center;
  justify-content:center;
  border:rem(1px) solid transparent;
  cursor:pointer;
  border-radius: var(--radius-button);
  transition: background-color .2s;
  background-color: transparent;
  text-decoration: none;
  font-family: inherit;
  &--large {
    min-height: rem(42px);
    &:deep() {
      font-size: var(--font-button-l);
    }
  }
  &--medium {
    min-height: rem(40px);
    &:deep() {
      font-size: var(--font-button-m);
    }
  }
  &--small {
    min-height: rem(38px);
    &:deep() {
      font-size: var(--font-button-s);
    }
  }
  &--wide {
    width: 100%;
  }
  &:disabled {
    cursor: auto;
  }
  &--primary {
    color:var(--color-text-contrast);
    background-color: var(--color-button-normal);
    &:hover:not(:disabled) {
      box-shadow: var(--box-shadow-button-primary);
      border-color:var(--color-button-primary);
    }
    &:active:not(:disabled) {
      background-color: var(--color-button-primary-active);
      box-shadow: none;
    }
    &:disabled {
      background-color: var(--color-button-disabled);
      color:var(--color-button-text-disabled);
    }
  }
  &--secondary {
    background-color: transparent;
    border-color:var(--color-button-normal);
    color:var(--color-text-accent);
    &:hover:not(:disabled) {
      box-shadow: var(--box-shadow-button-secondary);
    }
    &:active:not(:disabled) {
      border-color:var(--color-button-primary-active);
      color:var(--color-button-primary-active);
      box-shadow: var(--box-shadow-button-secondary);
    }
    &:disabled {
      border-color:var(--color-button-disabled);
      color:var(--color-button-text-disabled);
    }
  }
  &--tertiary {
    background-color: transparent;
    border-color:transparent;
    color:var(--color-button-primary);
    &:hover:not(:disabled) {
      color:var(--color-button-tertiary-hover);
    }
    &:active:not(:disabled) {
      color:var(--color-button-primary-active);
    }
    &:disabled {
      color:var(--color-button-text-disabled);
    }
  }
  &--light {
    color:var(--color-text-contrast);
    background-color: var(--color-lbutton-light);
    &:hover:not(:disabled) {
      box-shadow: var(--box-shadow-button-light);
      background-color: var(--color-lightbutton-hover);
    }
    &:active:not(:disabled) {
      background-color: var(--color-lightbutton-active);
      box-shadow: none;
    }
    &:disabled {
      background-color: var(--color-button-disabled);
      color:var(--color-button-text-disabled);
    }
  }
  &--icon {
    color:var(--color-text-contrast);
    background-color: var(--color-lbutton-light);
    &.sui-button {
      padding: 0 rem(8px);
      //&--large {
      //  padding: 0 rem(13px);
      //}
      //&--medium {
      //  padding: 0 rem(12px);
      //}
      //&--small {
      //  padding: 0 rem(11px);
      //}
    }
    &:hover:not(:disabled) {
      box-shadow: var(--box-shadow-button-light);
      background-color: var(--color-lightbutton-hover);
    }
    &:active:not(:disabled) {
      background-color: var(--color-lightbutton-active);
      box-shadow: none;
    }
    &:disabled {
      background-color: var(--color-button-disabled);
      color:var(--color-icon-secondary);
    }
  }
  &--transparent {
    color:var(--color-icon-tertiary);
    background-color: transparent;
    padding: rem(3px);
    min-height: auto;
    &:hover:not(:disabled) {
      color: var(--color-icon-accent);
    }
  }
}
</style>
