import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const saveFormState = throttle(() => {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
}, 500);

const loadFormState = () => {
  const savedFormState = localStorage.getItem('feedback-form-state');
  if (savedFormState) {
    const formState = JSON.parse(savedFormState);
    emailInput.value = formState.email;
    messageInput.value = formState.message;
  }
};

const clearFormState = () => {
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
};

form.addEventListener('submit', event => {
  event.preventDefault();

  const isEmailFilled = emailInput.value.trim() !== '';
  const isMessageFilled = messageInput.value.trim() !== '';

  if (isEmailFilled && isMessageFilled) {
    const formState = {
      email: emailInput.value,
      message: messageInput.value,
    };
    console.log(formState);
    clearFormState();
  } else {
    alert('Будь ласка, заповніть обидва поля');
  }
});