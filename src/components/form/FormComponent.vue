<script setup>

const props = defineProps({
  fields: {
    type: Array,
    required: true
  },
  onSubmit: {
    type: Function,
    required: true
  }
});

const handleSubmit = (event) => {
  event.preventDefault();
  props.onSubmit();
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div v-for="field in fields" :key="field.name">
      <label :for="field.name">{{ field.label }}</label>
      <input
        :type="field.type"
        :id="field.name"
        :name="field.name"
        v-model="field.model"
        :required="field.required"
      />
    </div>
    <button type="submit">Soumettre</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

div {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  box-sizing: border-box;
}

button {
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
