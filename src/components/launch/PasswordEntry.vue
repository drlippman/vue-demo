<template>
  <div>
    <p>This assessment requires a password.</p>
    <p>Password:
      <input
        :value="value"
        @input="handleInput"
      >
    </p>
  </div>
</template>

<script>
export default {
  name: 'PasswordEntry',
  props: ['value'],
  methods: {
    handleInput (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
