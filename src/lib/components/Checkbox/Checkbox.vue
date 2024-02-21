<template>
  <WithLabel :validation-rules="validationRules" :no-padding="noPadding">
    <template #default="{ classes }">
      <div class="sui-checkbox" :class="[ { ...classes}, `sui-checkbox--size--${size}` ]">
        <label class="sui-checkbox__container">
          <span
            v-if="label"
            class="sui-checkbox__text font-body-s-400"
            v-html="label"
          >
          </span>
          <input
            v-model="inputValue"
            :value="inputValue"
            class="sui-checkbox__control"
            type="checkbox"
            :disabled="disabled"
            :name="name"
            :false-value="falseValue"
            :true-value="trueValue"
          />
          <span class="sui-checkbox__label" :class="{'sui-checkbox__disabled': disabled}">
            <svg class="sui-checkbox__icon" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.7 0.3C7.3 -0.1 6.7 -0.1 6.3 0.3L3 3.6L1.7 2.3C1.3 1.9 0.7 1.9 0.3 2.3C-0.1 2.7 -0.1 3.3 0.3 3.7L2.3 5.7C2.5 5.9 2.7 6 3 6C3.3 6 3.5 5.9 3.7 5.7L7.7 1.7C8.1 1.3 8.1 0.7 7.7 0.3Z" fill="white"/>
            </svg>
          </span>
        </label>
      </div>
    </template>
  </WithLabel>
</template>

<script>

export default {
  components: {
    WithLabel: SContainerWithLabel,
  },
  props: {
    value: {
      type: [Boolean, String, Number, null],
      default: false,
    },
    validationRules: {
      type: [Object, String],
      default: () => ({}),
    },
    name: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      required: false,
    },
    noPadding:{
      type:Boolean,
      default:false
    },
    size: {
      type: String,
      default: 's',
      validator(value) {
        return ['m', 's'].includes(value)
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    falseValue:{
      type: [Boolean, null],
      default: null,
    },
    trueValue:{
      default: true,
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
        this.$emit('change', val)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/scss/index.scss';
/* Customize the label (the container) */
.sui-checkbox {
  white-space: normal;
  &.active {
    .sui-checkbox__container {
      color: var(--color-text-primary);
    }
  }
  &.failed {
    .sui-checkbox__label {
      border-color: var(--color-icon-error);
    }
  }
  &__text {
    display: block;
    position: relative;
    padding-left: rem(42px);
    cursor: pointer;
    user-select: none;
    color: var(--color-text-primary);
  }
  &__container {
    display: flex;
    position: relative;
    margin-bottom: 0;
    padding-top: rem(5px);
    padding-bottom: rem(5px);
  }
  &__icon {
    display: block;
    width: rem(12px);
    user-select: none;
  }
  &__control {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  &__label {
    position: absolute;
    left: 0;
    top: 0;
    height: rem(30px);
    width: rem(30px);
    border: 1px solid var(--border-color);
    background-color: var(--color-bg-primary);
    border-radius: var(--border-radius);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  &--size {
    &--s {
      .sui-checkbox {
        &__container {
          padding-top: rem(3px);
          padding-bottom: rem(3px);
        }
        &__label {
          height: rem(25px);
          width: rem(25px);
        }
        &__text {
          padding-left: rem(33px);
        }
      }
    }
    &--m {
      .sui-checkbox {
        &__label {
          height: rem(30px);
          width: rem(30px);
        }
      }
    }
  }
}

/* On mouse-over, add a grey background color */
// .radio__container:hover .radio__control ~ .radio__label {
// 	background-color: #ccc;
// }

/* When the radio button is checked, add a blue background */
.sui-checkbox__container .sui-checkbox__control:checked ~ .sui-checkbox__label {
  &.sui-checkbox__disabled {
    background-color: var(--disabled);
    border-color: var(--disabled);
    & img {
      filter: contrast(0);
    }
  }
  &:not(.sui-checkbox__disabled) {
    background-color: var(--color-icon-accent);
    border-color: var(--color-icon-accent);
  }
}
.sui-checkbox__container .sui-checkbox__control:not(:checked) ~ .sui-checkbox__label.sui-checkbox__disabled {
  border-color: var(--disabled-border);
  & img, & svg {
    opacity: 0;
  }
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.sui-checkbox__label:after {
  content: '';
  position: absolute;
  display: none;
  //background-image: url('/img/icons/checkbox-check.svg');
  background-position: center center;
  background-repeat: no-repeat;
}

/* Show the indicator (dot/circle) when checked */
.sui-checkbox__container .sui-checkbox__control:checked ~ .sui-checkbox__label:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.sui-checkbox__container .sui-checkbox__label:after {
  top: rem(6px);
  left: rem(3px);
  width: rem(16px);
  height: rem(11px);
  // border-radius: 50%;
  // background: white;
}
</style>
