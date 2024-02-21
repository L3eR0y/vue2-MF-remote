<template>
  <ValidationProvider
    v-if="hasValidation"
    v-slot="{ errors, classes }"
    ref="provider"
    tag="div"
    :rules="validationRules"
    :name="name"
    :mode="validationMode"
  >
    <div
      class="sui-container-with-label-wrapper"
      :class="{'sui-container-with-label-wrapper--no-padding':noPadding}"
    >
      <div
        class="sui-container-with-label"
        :class="{
          'sui-container-with-label--focused': isFocused,
          'sui-container-with-label--has-value': hasValue,
          ...classes,
        }"
      >
        <slot :classes="classes" />

        <label v-if="label" :for="attributeName" class="sui-container-with-label__label" :class="{disabled}">
          <span class="font-body-s-400">{{ label }}</span>
        </label>
        <span v-if="errors.length" class="sui-container-with-label__validation-msg font-body-xs-400">
          {{ errors[0] }}
        </span>
      </div>
    </div>
  </ValidationProvider>
  <div v-else>
    <div
      class="sui-container-with-label-wrapper"
      :class="{'sui-container-with-label-wrapper--no-padding':noPadding}"
    >
      <div
        class="sui-container-with-label"
        :class="{
          'sui-container-with-label--focused': isFocused,
          'sui-container-with-label--has-value': hasValue,
        }"
      >
        <slot />

        <label v-if="label" :for="attributeName" class="sui-container-with-label__label" :class="{disabled}">
          <span class="font-body-s-400">{{ label }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationProvider,
  },
  props: {
    isFocused: {
      type: Boolean,
      default: false,
    },
    validationMode: {
      type: String,
      default: 'lazy',
      validator(value) {
        return ['aggressive', 'passive', 'lazy', 'eager'].includes(value)
      },
    },
    attributeName: {
      type: String,
      default: '',
    },
    noPadding:{
      type:Boolean,
      default:false
    },
    name: {
      type: String,
      default: '',
    },
    hasValue: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    validationRules: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    hasValidation() {
      return this.validationRules && !!Object.keys(this.validationRules).length && Object.values(this.validationRules).some(value => !!value)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/scss/index.scss';
//Left and right padding
$px: 0.8rem;

.sui-container-with-label {
  margin: 0;
  width: 100%;
  position: relative;

  &--focused &__label {
    top: 0.3rem;
    transform: translateY(0) scale(0.85);
  }
  &--has-value &__label {
    top: 0.3rem;
    transform: translateY(0) scale(0.85);
  }
  &-wrapper {
    padding-bottom: 20px;
    width: 100%;
    &--no-padding {
      padding-bottom: 0;
    }
  }
  &__label {
    pointer-events: none;
    display: block;
    position: absolute;
    top: 16px;
    left: rem(12px);
    max-width: 80%;
    transform-origin: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: all 0.2s ease-out;
    margin-bottom: 0;
    z-index: 1;
    span {
      color: var(--color-text-tertiary);
      letter-spacing: 0.25px;
    }
    &.disabled {
      span {
        color: var(--color-text-secondary);
      }
    }
  }

  input:placeholder-shown ~ .sui-container-with-label__label,
  input.input--has-value ~ .sui-container-with-label__label,
  .autofill-fix ~ .sui-container-with-label__label {
    top: 0.3rem;
    transform: translateY(0) scale(0.85);
  }
}
//Validation styles
.sui-container-with-label--error {

}
.sui-container-with-label__validation-msg {
  color: var(--color-text-error);
  position: absolute;
  left: 0;
  top: calc(100% + 4px);
}

//Mods styles
.sui-container-with-label--disabled {
  pointer-events: none;
}
.sui-container-with-label--readonly {
  cursor: default;
  border: none;
  padding-left: 0;
  padding-right: 0;
  .container-with-label__label {
    left: 0;
  }
}

.sui-input--inline {
  input.sui-input__control {
    height: auto;
    margin-left: 0.4rem;
    padding-left: 0;
    border: none;
    border-bottom: 1px solid var(--color-text-accent);
    border-radius: 0;
    box-shadow: none !important;
    outline: none !important;
  }

  .input.failed > input.sui-input__control {
    box-shadow: none !important;
    border: none;
    border-bottom: 1px solid var(--error-color);

    &:hover {
      border-color: var(--error-hover);
      box-shadow: none !important;
    }
  }

  .sui-container-with-label__validation-msg {
    display: none;
  }

  .sui-container-with-label-wrapper--has-validation {
    padding-bottom: 0;
  }
}

.a-margin-b-6 .sui-container-with-label-wrapper--has-validation {
  padding-bottom: 0;
}

</style>
