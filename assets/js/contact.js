const submissionURL = "https://us-central1-mitha-me.cloudfunctions.net/contact-form";

const fnameEl = document.querySelector("#fname");
// const lnameEl = document.querySelector("#lname");
const emailEl = document.querySelector("#email");
// const subjectEl = document.querySelector("#subject");
const messageEl = document.querySelector("#message");
const contactForm = document.querySelector("#contactForm");

var previous = "";

const revert = element => element.innerHTML = previous;

const changeToSpinner = element => {
  previous = element.innerHTML;
  element.innerHTML = `<div class="spinner">
    <div class="rect1"></div>
    <div class="rect2"></div>
    <div class="rect3"></div>
    <div class="rect4"></div>
    <div class="rect5"></div>
  </div>`;
}

const showSuccess = element => {
  element.innerHTML = "<strong>Thanks for getting in touch. I'll get back to you as soon as possible.</strong>";
}

const handleSubmit = async (event) => {
  event.preventDefault();

  changeToSpinner(contactForm);

  const name = `${fnameEl.value}`;
  const email = emailEl.value;
  // const subject = subjectEl.value;
  const message = messageEl.value;

  const body = { name, email, message };

  return fetch(submissionURL, {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  })
    .then(res => {
      showSuccess(contactForm);
      res.json();
    })
    .then(parsed => console.log(parsed))
    .catch(err => console.error(err));
};
