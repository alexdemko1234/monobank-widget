<script setup>
  import { ref } from 'vue';
  import { reviews } from '@/firebase/db';

  import Failure from './Info/Failure.vue';
  import Success from './Info/Success.vue';
  import Loader from './Info/Loader.vue';
  import { addDoc, serverTimestamp } from 'firebase/firestore'

  const dialog = ref(true)
  const loader = ref(false);
  const success = ref(false);
  const failure = ref(false);

  import { useField, useForm } from 'vee-validate'

  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
      name (value) {
        if (value?.length >= 3) return true

        return 'Імʼя повинно бути не менше 3 символів.'
      },
      phone (value) {
        if (value?.length > 9 && /[0-9-]+/.test(value)) return true

        return 'Номер телефону повинен бути з 9 чисел.'
      },
      email (value) {
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value)) return true

        return 'Не правильна електронна пошта.'
      },
      text (value) {
        if (value?.length >= 5) return true

        return 'Напишіть Вашу думку про продукт, не менше 5 символів.'
      }
    }
  })

  const name = useField('name')
  const phone = useField('phone')
  const email = useField('email')
  const rating = useField('rating')
  const text = useField('text')

  rating.value.value = 5 // Default value

  const submit = handleSubmit(values => {
    Object.assign(values, {createdAt: serverTimestamp()});

    loader.value = true
    
    addDoc(reviews, values)
      .then(_ => {
        loader.value = false
        success.value = true

        handleReset();
      })
      .catch(_ => {
        loader.value = false
        failure.value = true
      })

  })
</script>

<template>
  <v-container class="fill-height">
      <v-dialog
        v-model="dialog"
        persistent
        width="1024"
      >
        <form @submit.prevent="submit">
          <v-card>
            <v-card-title>
              <span class="text-h5">Відгук</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                      label="Ваше імʼя"
                      placeholder="Кіт Моно"
                      v-model="name.value.value"
                      :error-messages="name.errorMessage.value"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="4" sm="6" xs="12">
                    <v-text-field
                      label="Електронна пошта"
                      placeholder="example@monobank.ua"
                      type="email"
                      v-model="email.value.value"
                      :error-messages="email.errorMessage.value"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6" xs="12">
                    <v-text-field
                      label="Телефон"
                      type="phone"
                      placeholder="0442372060"
                      v-model="phone.value.value"
                      :error-messages="phone.errorMessage.value"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6" xs="12" class="align-self-center">
                    <v-rating
                      hover
                      active-color="primary"
                      v-model="rating.value.value"
                    />
                  </v-col>
                  <v-col cols="12" md="12" sm="6" xs="12">
                    <v-textarea
                      label="Відгук"
                      placeholder="Моє враження від цього продукти - неймовірно..."
                      v-model="text.value.value"
                      :error-messages="text.errorMessage.value"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer />

              <v-btn
                color="indigo-lighten-2"
                @click="handleReset"
              >
                Очистити
              </v-btn>

              <v-btn
                color="primary"
                type="submit"
              >
                Відправити
              </v-btn>
            </v-card-actions>
          </v-card>
        </form>
      </v-dialog>

    <Loader :loader="loader" @loaderClose="res => loader = res" />
    <Success :success="success" @successClose="res => success = res" />
    <Failure :failure="failure" @failureClose="res => failure = res" />
  </v-container>
</template>
